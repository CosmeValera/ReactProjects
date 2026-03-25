# 👌 Cert Manager

## What are SSL Certificates?
HTTP is a type of site that shares information like this: `username=john&password=mysecretpassword123`. It's considered not secure, because it can be under a "man-in-the-middle" attack.

That's why HTTPS = HTTP + SSL Certificate. HTTPS in reality just means two things:

1. ✅ **Authentication:** verifying that the server you're talking to is actually the one you intend to reach.
2. ✅ **Encryption:** ensuring no one can intercept the data exchanged between client and server.
3. ❌ Nothing else. The company still could sell your data, store your password in plain text, etc. But at least you are given the other two things.

> SSL, TLS and HTTPS are often used as synonyms. Technically TLS is the modern version of SSL, and HTTPS is just HTTP + TLS. But "SSL certificate" stuck as the common term.

In order to have HTTPS, you need an SSL Certificate that expires usually every 90 days, and it needs to be renewed. Doing this manually is a pain.

> Certificates expire after ~90 days (Let's Encrypt's choice) because:
> 1. If compromised, limits the damage window
> 2. Forces automation, which reduces human error
> 
> This is considered better than having eternal certificates that assume humans are reliable (revocation exists but is unreliable in practice).

### How the Encryption works (The Handshake)
```m
Client                                 Server
  |                                      |
  |--- "I want to talk HTTPS" ---------->|
  |                                      |
  |<-- "Here is my public key" ----------|
  |                                      |
  | [Client generates a session key]     |
  | [Encrypts it with the public key]    |
  |                                      |
  |--- Encrypted session key ----------->|
  |                                      |
  |        [Server decrypts it           |
  |         using its private key]       |
  |                                      |
  |<====== Encrypted communication =====>|
```

1. The client requests an HTTPS connection.
2. The server responds with its **public key,** this can be shared freely with anyone.
3. The client generates a **session key** (used to encrypt all subsequent traffic), encrypts it with the server's public key, and sends it over.
4. Only the server, which holds the **private key,** can decrypt the session key. The private key never leaves the server.
5. Both parties now share the same session key, and all further communication is encrypted with it.

### How the Authentication works (Certificate Validation)

Encryption alone doesn't confirm *who* you're talking to. That's where **certificates** come in:

- When the server sends its public key, it includes a **certificate**.
- The client contacts a trusted **Certificate Authority (CA)** to verify that the public key genuinely belongs to the claimed domain.
- If the CA confirms it, the client proceeds with the encrypted session knowing it has reached the correct server.

> ⚠️ **Never use self-signed certificates in production.** For local development and practice they are perfectly fine. But for production clients have no way to trust them without already having the certificate beforehand, which defeats the purpose. Always sign certificates through a trusted CA (e.g., Let's Encrypt).

## Cert Manager

`cert-manager` is a Kubernetes add-on (installed via Helm) that **automatically creates, manages, and renews SSL certificates** for your apps. Equivalent to Certbot on a normal server, but for K8s.

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

In practice, just one annotation on your Ingress triggers the whole flow:
```yaml
annotations:
  cert-manager.io/cluster-issuer: "letsencrypt-prod"
```
`cert-manager` gets the cert, stores it in a Secret, and renews it automatically before expiry.

## Resources:
- https://www.youtube.com/watch?v=D7ijCjE31GA (18 min video -> k8s, Let's Encrypt, cert-manager)