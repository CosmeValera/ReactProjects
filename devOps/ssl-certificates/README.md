# 👌 Cert Manager

## What are SSL Certificates?
HTTP is a type of site that shares information like this: `username=john&password=mysecretpassword123`. It's considered not secure, because it can be under a "man-in-the-middle" attack.

That's why HTTPS = HTTP + SSL Certificate. HTTPS in reality just means two things:
- ✅ I am really who I say I am (identity)
- ✅ Encrypt the traffic between you and me (security)
- ❌ Nothing else. The company still could sell your data, store your password in plain text, etc. But at least you are given the other two things.

> SSL, TLS and HTTPS are often used as synonyms. Technically TLS is the modern version of SSL, and HTTPS is just HTTP + TLS. But "SSL certificate" stuck as the common term.

In order to have HTTPS, you need an SSL Certificate that expires usually every 90 days, and it needs to be renewed. Doing this manually is a pain.

Certificates expire after ~90 days (Let's Encrypt's choice) because:
1. If compromised, limits the damage window
2. Forces automation, which reduces human error

This is considered better than having eternal certificates that assume humans are reliable (revocation exists but is unreliable in practice).


## Cert Manager

`cert-manager` is a Kubernetes add-on (installed via Helm) that **automatically creates, manages, and renews SSL certificates** for your apps. Equivalent to Certbot on a normal server, but for K8s.

**The three players:**
- **Let's Encrypt:** the Certificate Authority that actually issues the cert (free)
- **cert-manager:** the tool that talks to Let's Encrypt automatically
- **Issuer / ClusterIssuer:** K8s config that tells cert-manager to use Let's Encrypt

**Main K8s pieces:**
- **Issuer / ClusterIssuer:** points to the Certificate Authority (usually Let's Encrypt)
- **Certificate:** K8s resource where you say *"I want a cert for this domain"*
- **Secret:** where the actual cert files end up, so your Ingress can use them

**Example: just one annotation triggers everything:**
```yaml
annotations:
  cert-manager.io/cluster-issuer: "letsencrypt-prod"
```
`cert-manager` gets the cert, stores it in a Secret, and renews it automatically before expiry.