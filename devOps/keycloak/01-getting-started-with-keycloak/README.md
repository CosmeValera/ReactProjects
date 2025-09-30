<!-- https://www.youtube.com/watch?v=fvxQ8bW0vO8 -->

# 🛠️ Keycloak

## 🤔 Why Keycloak?
Keycloak is an open-source identity and access management server that provides turnkey SSO, OAuth2/OpenID Connect/SAML, user federation and fine-grained access control so your apps don’t handle auth.

## Installation
Let's install it in a `docker` container:
```sh
docker run --name keycloak -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak start-dev
```