# 👌 Cert Manager

## What are SSL Certificates?
HTTP is a type of site that shares information like this: `username=john&password=mysecretpassword123`. It's considered not secure, because it can be under a "man-in-the-middle" attack.

That's why HTTPS = HTTP + SSL Certificate. HTTPS in reality just means two things:

1. ✅ **Authentication:** verifying that the server you're talking to is actually the one you intend to reach.
2. ✅ **Encryption:** ensuring no one can intercept the data exchanged between client and server.
3. ❌ Nothing else. The company still could sell your data, store your password in plain text, etc. But at least you are given the other two things.

> SSL, TLS and HTTPS are often used as synonyms. Technically TLS is the modern version of SSL, and HTTPS is just HTTP + TLS. But "SSL certificate" stuck as the common term.

### How the Encryption works (The Handshake)
```m
  Client                                      Server
  |                                            |
  |--- "I want to talk HTTPS" ---------------> |
  |                                            |
  |<-- Certificate (which contains             |
  |    the public key + identity + CA sig) ----|
  |                                            |
  | [Client verifies the CA signature]         |
  | [Extracts the public key from the cert]    |
  |                                            |
  | [Client generates a session key]           |
  | [Encrypts it with the public key]          |
  |                                            |
  |--- Encrypted session key ----------------> |
  |                                            |
  |           [Server decrypts it              |
  |            using its private key]          |
  |                                            |
  |<========= Encrypted communication ========>|
```

1. The client requests an HTTPS connection.
2. The server responds with its **certificate** (which contains its **public key**), this can be shared freely with anyone.
3. The client generates a **session key** (used to encrypt all subsequent traffic), encrypts it with the server's public key, and sends it over.
4. Only the server, which holds the **private key,** can decrypt the session key. The private key never leaves the server.
5. Both parties now share the same session key, and all further communication is encrypted with it.

### How the Authentication works (Certificate Validation)

Encryption alone doesn't confirm *who* you're talking to. That's where **certificates** come in:

- When the server sends its **certificate**, it contains its public key, the domain it claims to be, validity period, and a **CA signature** (a digital signature from a Certificate Authority (CA)).
- The client verifies this signature **locally**, using a list of trusted CA certificates 
  pre-installed in your OS and browser (you can see them in your browser's trust store). 
  No network call to the CA happens at this point.
- If the signature is valid, the client knows the public key genuinely belongs to the claimed 
  domain, and proceeds with the encrypted session.

> ⚠️ **Never use self-signed certificates in production.** For local development and practice they are perfectly fine. But in production, clients have no way to trust them without already having the certificate in their trusted list beforehand, which defeats the purpose. Always sign certificates through a trusted CA (e.g., Let's Encrypt).

In order to have HTTPS, you need an SSL Certificate that expires usually every 90 days, and it needs to be renewed. Doing this manually is a pain.

> Certificates expire after ~90 days (Let's Encrypt's choice) because:
> 1. If compromised, limits the damage window
> 2. Forces automation, which reduces human error
> 
> This is considered better than having eternal certificates that assume humans are reliable (revocation exists but is unreliable in practice).

## Cert Manager

`cert-manager` is a Kubernetes engine (installed via Helm) that **automatically creates, manages, and renews SSL certificates** for your apps.

It works with three concepts:

- **ClusterIssuer:** tells cert-manager *where* to get certificates from (e.g. `Let's Encrypt`). Cluster-scoped, so it works across all namespaces.
- **Certificate:** a K8s resource where you declare *"I want a cert for this domain."* `cert-manager` reads this and goes fetch it.
- **Secret:** where the actual cert files end up once issued, so your Ingress can use them for HTTPS.
```
cert-manager  ── requests cert from ──▶  Let's Encrypt (CA)
     │                                         │
     │◀──────── signed certificate ────────────│
     │
     └── stores it in a Kubernetes Secret
             └── Ingress uses it for HTTPS
```

## Local commands for HTTPS configuration (no k8s)
You can either do 2a to have self-signed certificates (not safe for prod), or 2b+2c to practice creating your localhost CA (more similar to what will happen with K8s).

> ⚠️ **Windows (Git Bash) users:** prefix every `openssl` command that uses `-subj` with `MSYS_NO_PATHCONV=1` to avoid path conversion issues.

### 2a. Self-signed certificate (quickest, browser warns you)
```bash
mkdir -p ssl-demo/certs && cd ssl-demo/certs

# Generate a private key
openssl genrsa -out server.key 2048

# Generate a self-signed certificate (valid 365 days)
openssl req -new -x509 -key server.key -out server.crt -days 365 \
  -subj "/C=ES/ST=Madrid/L=Madrid/O=Dev/CN=localhost"
```

- `server.key` → private key (keep secret, never commit)
- `server.crt` → certificate (public, sent to browsers, contains public key)

You can see the content of the certificate (which contains the public key, identity, validity period, CA signature if it has) with these commands:

```bash
# Extract the public key out of your certificate
openssl x509 -in certs/server.crt -pubkey -noout
# prints: -----BEGIN PUBLIC KEY----- ...

# See everything inside the cert, including the public key
openssl x509 -in certs/server.crt -text -noout
# look for "Subject Public Key Info" section
```

> The browser will show a security warning because the server is signing its own certificate, there's no third party vouching for it.

---

### 2b. Local CA + signed certificate (browser trusts it, recommended)

This mirrors exactly what cert-manager does in Kubernetes, just manually. You create your own CA, sign the server cert with it, and then tell your OS to trust that CA.
```bash
mkdir -p ssl-demo/certs && cd ssl-demo/certs

# Step 1: Create your own CA (Certificate Authority)
# Generate CA private key
openssl genrsa -out ca.key 4096

# Generate CA certificate (self-signed — this is the "root" you'll trust)
openssl req -new -x509 -key ca.key -out ca.crt -days 3650 \
  -subj "/C=ES/ST=Madrid/O=MyLocalCA/CN=MyLocalCA"

# Step 2: Create the server key and a Certificate Signing Request (CSR)
openssl genrsa -out server.key 2048

# The CSR says "I am localhost, please sign my public key"
openssl req -new -key server.key -out server.csr \
  -subj "/C=ES/ST=Madrid/O=Dev/CN=localhost"

# Step 3: Create an extensions file (needed for modern browsers — SAN required)
cat > server.ext << EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
IP.1 = 127.0.0.1
EOF

# Step 4: Sign the CSR with your CA → produces the server certificate
openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key \
  -CAcreateserial -out server.crt -days 365 -extfile server.ext
```

- **`ca.key`** → CA private key (keep very safe, never commit)
- **`ca.crt`** → CA certificate (this is what you import into your OS in step 2c)
- **`server.key`** → server private key
- **`server.crt`** → server certificate, signed by your CA
> Temporary files:
> - <small>`ca.srl` (CA serial number tracker (auto-managed by openssl, ignore it) )</small>
> - <small>`server.csr`(signing request (temporary, discarded after step 4) )</small>
> - <small>`server.ext` (certificate extensions config (temporary, discarded after step 4) )</small>


### 2c. Trust the CA in your OS (removes the browser warning)

**macOS:**
```bash
sudo security add-trusted-cert -d -r trustRoot \
  -k /Library/Keychains/System.keychain certs/ca.crt
```

**Linux (Debian/Ubuntu):**
```bash
sudo cp certs/ca.crt /usr/local/share/ca-certificates/myca.crt
sudo update-ca-certificates
```

**Windows (PowerShell as Admin):**
```powershell
Import-Certificate -FilePath "certs\ca.crt" -CertStoreLocation Cert:\LocalMachine\Root
```

After this, your browser will show a valid padlock for `https://localhost`, no warning. This is exactly what Let's Encrypt does at scale, except their CA is already pre-trusted by every browser in the world, so step 2c is not needed.

This is why self-signed certs trigger a browser warning: the client can't verify the signature because the CA that signed it (you) is not in its trusted list. And it's also why importing `ca.crt` into your OS fixed the warning: you manually added your CA to that trusted list.


> | Manual step (what you did) | cert-manager equivalent |
> |---|---|
> | `openssl genrsa` → generate `server.key` | cert-manager creates a `Secret` with the private key |
> | `openssl req` → create a CSR | cert-manager generates a `CertificateRequest` resource |
> | CA signs the CSR → `server.crt` | `Issuer` / `ClusterIssuer` (Let's Encrypt or your own CA) signs it |
> | You copy `server.crt` + `server.key` to the app | cert-manager populates a Kubernetes `Secret`, mounted into pods |
> | You renew manually before expiry | cert-manager watches expiry and **auto-renews** |
> | You trust `ca.crt` in your OS | In k8s with a private CA, cert-manager trusts its own `Issuer` |

## K8s + cert-manager

**Enable an ingress controller for reverse proxy**
```sh
# minikube ships nginx ingress as an addon — easiest way
minikube addons enable ingress

# Wait for it to be ready
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=120s

kubectl get pods -n ingress-nginx
# ingress-nginx-controller-xxxx   1/1   Running
```


**Install cert-manager**
```sh
# Add the cert-manager Helm repo
helm repo add jetstack https://charts.jetstack.io
helm repo update

# Install cert-manager — the CRDs flag is crucial
# CRDs = CustomResourceDefinitions (Certificate, Issuer, ClusterIssuer, etc.)
helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --set installCRDs=true \
  --wait \
  --timeout 5m

# Wait for cert-manager to be ready
kubectl wait --namespace cert-manager \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/instance=cert-manager \
  --timeout=120s

kubectl get pods -n cert-manager
# cert-manager-xxxx                  1/1   Running
# cert-manager-cainjector-xxxx       1/1   Running
# cert-manager-webhook-xxxx          1/1   Running
```

**Create issuer (ClusterIssuer):**

Option 1 (self-signed):
```yaml
# k8s/issuer-selfsigned.yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: selfsigned-issuer
spec:
  selfSigned: {}   # that's it — no CA needed
```
```sh
kubectl apply -f k8s/issuer-selfsigned.yaml
kubectl get clusterissuer
# NAME                READY   AGE
# selfsigned-issuer   True    5s
```

Option 2 (CA Issuer):

```sh
# Import your Part 1 CA into a k8s Secret
kubectl create secret tls my-ca-secret \
  --namespace cert-manager \
  --cert=certs/ca.crt \
  --key=certs/ca.key
```

```yaml
# k8s/issuer-ca.yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: my-ca-issuer
spec:
  ca:
    secretName: my-ca-secret   # cert-manager reads the CA from this Secret
```

```sh
kubectl apply -f k8s/issuer-ca.yaml
kubectl get clusterissuer
# NAME            READY   AGE
# my-ca-issuer    True    5s
```

> The connection to Part 1: `my-ca-issuer` is doing programmatically exactly what you did with `openssl x509 -req -CA ca.crt -CAkey ca.key`, it signs new CSRs using your CA's private key.

**Create a Certificate resource**
```yaml
# k8s/certificate.yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: todo-tls
  namespace: todo-app
spec:
  secretName: todo-tls-secret      # cert-manager will CREATE this Secret
  duration: 2160h                  # 90 days
  renewBefore: 360h                # renew 15 days before expiry (auto!)
  
  issuerRef:
    name: my-ca-issuer             # use our CA (or selfsigned-issuer)
    kind: ClusterIssuer
  
  dnsNames:
    - todo.local                   # the domain this cert is valid for
```
```sh
kubectl apply -f k8s/certificate.yaml

# Watch cert-manager work
kubectl get certificate -n todo-app
# NAME       READY   SECRET            AGE
# todo-tls   True    todo-tls-secret   10s

# Look at the Secret cert-manager created
kubectl get secret todo-tls-secret -n todo-app
# NAME               TYPE                DATA
# todo-tls-secret    kubernetes.io/tls   2       ← tls.crt and tls.key
```

Inspect the flow with:
```sh
# See the intermediate CertificateRequest (like the CSR in Part 1)
kubectl get certificaterequest -n todo-app

# Describe the Certificate for detailed status + events
kubectl describe certificate todo-tls -n todo-app
```

**Create Ingress with TLS**
```yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: todo-ingress
  namespace: todo-app
  annotations:
    # Tell nginx to redirect HTTP → HTTPS automatically
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    
    # Optional: if using cert-manager to manage the cert via Ingress annotations
    # instead of a separate Certificate resource (see note below)
    # cert-manager.io/cluster-issuer: my-ca-issuer

spec:
  ingressClassName: nginx

  tls:
    - hosts:
        - todo.local
      secretName: todo-tls-secret    # the Secret cert-manager filled in

  rules:
    - host: todo.local
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: backend-service
                port:
                  number: 3000
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-service
                port:
                  number: 80
```

```sh
kubectl apply -f k8s/ingress.yaml

kubectl get ingress -n todo-app
# NAME           CLASS   HOSTS        ADDRESS        PORTS     AGE
# todo-ingress   nginx   todo.local   192.168.49.2   80, 443   5s
```

> **Bonus — the annotation shortcut:** Instead of creating a `Certificate` resource separately, you can add the annotation `cert-manager.io/cluster-issuer: my-ca-issuer` directly to the Ingress. cert-manager will detect the Ingress, automatically create a `Certificate` and fill in the Secret. The explicit `Certificate` resource gives you more control; the annotation is the quick path.

**Access the App:**

Step 1, let's check the ingress and certificate:
```sh
kubectl get ingress -n todo-app
kubectl get certificate -n todo-app
kubectl get secret todo-tls-secret -n todo-app

# If cert is not READY=True, describe it
kubectl describe certificate todo-tls -n todo-app
```
Step 2, port-forward the ingress controller (not the pod)
```sh
# Find the ingress-nginx-controller pod
kubectl get pods -n ingress-nginx

# Port-forward it — map local 8443→443 and 8080→80
kubectl port-forward -n ingress-nginx \
  service/ingress-nginx-controller 8443:443 8080:80
```

Step 3, fix the hosts file on the Windows side

This is the WSL gotcha. Your browser runs on Windows, so it reads the **Windows** hosts file, not the WSL one. Open Notepad **as Administrator** and edit:
```
C:\Windows\System32\drivers\etc\hosts
```

Add this line (just use `127.0.0.1` since we're port-forwarding):
```
127.0.0.1   todo.local
```

**Step 4, access the app**

Now open your browser and go to `https://todo.local:8443`

If you used your local CA issuer (from Part 1), and it's trusted on Windows, you'll get the green padlock. If it's self-signed you'll get the warning, click through to verify it's working.

> **Why `minikube ip` + `/etc/hosts` in WSL doesn't work from Windows:**
> ```
> Windows Browser
>      │
>      │ tries to reach todo.local
>      │ looks in C:\Windows\System32\drivers\etc\hosts  ← Windows file
>      │                                                    NOT /etc/hosts in WSL
>      ▼
>   WSL network (192.168.49.x)  ← not directly routable from Windows browser
> ```
`kubectl port-forward` binds to `127.0.0.1` which is shared between WSL2 and Windows, so that's the reliable path on your setup.

**Extra:**

To see the certificate-secret change, you could try with a very short lived certificate, but cert-manager doesn't allow less than 1 hour for duration of certificates, instead we can just delete the secret, to see the new one that gets created.

```sh
kubectl delete secret <secret-name> -n todo-app
```

You can compare the difference, by looking at the SHA-256 of the Certificate and the Public Key to see that it's a new certificate, also by the *Valid From / Valid To* dates (use another browser if needed if the certificate is being cached).

```sh
kubectl get secret -n todo-app
# NAME              TYPE                DATA   AGE
# todo-tls-secret   kubernetes.io/tls   3      4s # <- New Secret
```

To see the content of the secret:

```sh
kubectl get secret todo-tls-secret -n todo-app -o yaml
# apiVersion: v1
# data:
#   ca.crt: LS0tLS1CRUdJTiBDRVJUSUZJQ0F...
#   tls.crt: LS0tLS1CRUdJTiBDRVJUSUZJQ0...
#   tls.key: LS0tLS1CRUdJTiBSU0EgUFJJVk...
# kind: Secret
# metadata:
#   annotations:
#     cert-manager.io/alt-names: todo.local
#     cert-manager.io/certificate-name: todo-tls
#     cert-manager.io/common-name: ""
#     cert-manager.io/ip-sans: ""
#     cert-manager.io/issuer-group: ""
#     cert-manager.io/issuer-kind: ClusterIssuer
#     cert-manager.io/issuer-name: my-ca-issuer
#     cert-manager.io/uri-sans: ""
#   creationTimestamp: "2026-03-26T17:24:55Z"
#   labels:
#     controller.cert-manager.io/fao: "true"
#   name: todo-tls-secret
#   namespace: todo-app
#   resourceVersion: "318648"
#   uid: 5c369b8f-d09e-4907-89a0-5fae10245827
# type: kubernetes.io/tls
```

It has in data three values: `ca.crt`, `tls.crt` and `tls.key`. Every time the secret with the certificate gets renewed the data changes.

**Full resource map:**
```sh
ClusterIssuer (my-ca-issuer)
│  knows how to sign with ca.crt / ca.key (from Secret my-ca-secret)
│
└─► Certificate (todo-tls)
    │  requests a cert for todo.local, to be stored in todo-tls-secret
    │
    └─► CertificateRequest  [auto-created by cert-manager]
        │  the actual CSR — equivalent to your openssl req in Part 1
        │
        └─► Secret (todo-tls-secret)  [auto-created + auto-renewed]
            │  ca.crt  (the Certificate Authority certificate)
            │  tls.crt  (the signed certificate)
            │  tls.key  (the private key)
            │
            └─► Ingress (todo-ingress)
                   reads the Secret → terminates TLS
                   routes traffic to frontend-service and backend-service
```

**Bonus: Let's Encrypt (ACME), for a real domain**

When you have a real domain (not localhost), replace your CA issuer with an ACME issuer that talks to Let's Encrypt.

> **cert-manager** = the robot watching your cluster. It doesn't sign anything itself.
> 
> **Issuer** = the strategy. Specifically, *how* cert-manager obtains certificates: this is where you choose `ca:` vs `acme:` (swapping this one block is all it takes to go from local dev to production Let's Encrypt): 
> - `ca` → signs certs itself using a CA key you provide (good for local dev)
> - `acme` → requests certs from an external CA (e.g. Let's Encrypt) via the ACME protocol (production). ACME is a protocol (RFC 8555) for automating the process of requesting and renewing certificates from a CA
> 
> **CA** = the actual authority that puts its signature on the cert. In your current setup that's your local ca.crt/ca.key. In production it's Let's Encrypt's servers.

```yaml
# k8s/issuer-letsencrypt.yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    # Let's Encrypt's ACME server
    server: https://acme-v02.api.letsencrypt.org/directory
    email: you@yourdomain.com    # for expiry notifications
    
    # Where cert-manager stores the ACME account private key
    privateKeySecretRef:
      name: letsencrypt-prod-account-key
    
    solvers:
      # HTTP-01 challenge: LE will call http://yourdomain.com/.well-known/acme-challenge/...
      # Your Ingress must be publicly reachable for this to work
      - http01:
          ingress:
            ingressClassName: nginx
```
```yaml
# Then reference it in your Certificate:
spec:
  issuerRef:
    name: letsencrypt-prod
    kind: ClusterIssuer
```

**Useful kubcetl commands cheatsheet:**
```sh
# All cert-manager resources in one shot
kubectl get certificate,certificaterequest,clusterissuer,issuer -A

# Describe a failing cert (most useful for debugging)
kubectl describe certificate <name> -n <namespace>

# Decode and inspect the certificate inside a Secret
kubectl get secret todo-tls-secret -n todo-app \
  -o jsonpath='{.data.tls\.crt}' | base64 -d | openssl x509 -text -noout

# Check cert expiry
kubectl get secret todo-tls-secret -n todo-app \
  -o jsonpath='{.data.tls\.crt}' | base64 -d | \
  openssl x509 -noout -dates

# Trigger a manual renewal (for testing)
kubectl annotate certificate todo-tls -n todo-app \
  cert-manager.io/issueAnce-time="$(date -u +%Y-%m-%dT%H:%M:%SZ)" --overwrite

# cert-manager controller logs (your first stop when debugging)
kubectl logs -n cert-manager deploy/cert-manager -f
```

**Summary of Part 1 vs Part 2:**

| | Part 1 (manual) | Part 2 (cert-manager) |
|---|---|---|
| Key generation | `openssl genrsa` | cert-manager generates, stores in `Secret` |
| CSR | `openssl req` | `CertificateRequest` resource |
| Signing | `openssl x509 -req -CA …` | `Issuer` / `ClusterIssuer` |
| Cert storage | files on disk | Kubernetes `Secret` (tls type) |
| App reads cert | `fs.readFileSync` | mounted volume or Ingress reads it |
| TLS termination | inside Node.js | nginx Ingress controller |
| Renewal | you, manually, before expiry | cert-manager, automatically |
| Public CA | not covered | ACME / Let's Encrypt (`ClusterIssuer`) |

## Resources:
- https://www.youtube.com/watch?v=D7ijCjE31GA (18 min video -> k8s, Let's Encrypt, cert-manager)

<!-- Claude conversation: https://claude.ai/chat/85c78a33-a954-4ed7-ba68-238ad09407c3 -->