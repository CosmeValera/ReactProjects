<!-- https://www.youtube.com/watch?v=fvxQ8bW0vO8 -->

# 🔑🛠️ Keycloak

## 🤔 Why Keycloak?
Keycloak is an open-source identity and access management server that provides turnkey SSO, OAuth2/OpenID Connect/SAML, user federation and fine-grained access control so your apps don’t handle auth.

## 🔑 Core Keycloak Concepts

| Concept | Description |
|---------|-------------|
| **Realm** | An isolated space that manages its own set of users, credentials, roles, and groups |
| **Client** | An application or service that wants to use Keycloak for authentication (your web app, mobile app, or API) |
| **User** | A person who can log in and authenticate through Keycloak |


## ⚙️ Installation
Let's install it in a `docker` container:

```sh
docker run --name keycloak -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak start-dev
```

> In your browser go to: http://localhost:8080/.
> 
> And login with user `admin` and password `admin`.


## 📋 Keycloak Lateral Menu Options
**1. Manage options:**

| Menu Option | Description |
|-------------|-------------|
| **Manage realms** | Switch between or create new realms (isolated authentication environments) |
| **Clients** | Register and configure applications that will use Keycloak for authentication |
| **Client scopes** | Define reusable sets of claims/permissions that can be shared across multiple clients |
| **Realm roles** | Create and manage permission roles that apply across the entire realm |
| **Users** | Add, edit, and manage user accounts, their credentials, and assigned roles |
| **Groups** | Organize users into groups for easier role/permission management |
| **Sessions** | View and manage active user login sessions across all clients |
| **Events** | View audit logs of authentication events (logins, errors, admin actions) |

**2. Configure options:**

| Menu Option | Description |
|-------------|-------------|
| **Realm settings** | Configure general realm settings like tokens, login policies, themes, and email |
| **Authentication** | Configure login flows, password policies, OTP, and multi-factor authentication settings |
| **Identity providers** | Set up external login sources (Google, SAML, social logins) for federated authentication |
| **User federation** | Connect to external user directories like LDAP or Active Directory to sync users |

## 🏰 Create a Keycloak realm
.

<!-- ## 👤 Creating user
## 🔌 Creating OAuth Client
## 🔄 Demo: Authorization code flow
## 🔒 Creating a confidential client
## 🎫 Access tokens, refresh tokens -->