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
Go to the lateral menu:
- Click Manage realms
- Click Create realm
- Add the name of realm
- Click create

> The `master` realm is not recommended to be used for authentication or authorization, it's just for configuring your keycloak server. That's why we create another realm.

![alt text](image.png)
![alt text](image-2.png)
![alt text](image-4.png)
![alt text](image-3.png)

## 👤 Creating user
Go to the lateral menu:
- Click Users
- Click Create new user
- Fill the user information
- Save it
- Now go to credentials
- Add as password <b>123</b>
- Save the user

![alt text](image-5.png)
![alt text](image-6.png)
![alt text](image-7.png)
![alt text](image-8.png)
![alt text](image-9.png)

Now the user is saved!.

**Log In with the user:**

Go to the URL: `http://localhost:8080/realms/cosme/account`. Change `cosme` for the name of your realm.

Add username `cosme` and password `123`, as we configured it.

![alt text](image-11.png)
![alt text](image-12.png)

Here we can manage some general configurations about the user.

## 🔌 Creating OAuth Client

Let's see how to create a client. A client represents an application that can request authentication on behalf of a user. This application could be a web user interface, or a backend API.

> [!IMPORTANT]
> There is a distinction between public clients and confidential clients.
> - Public clients represent an application that cannot securely store a client secret. For example a web user interface.
> - Confidential clients represent an application that can securely store a client secret. It is more appropriate for server to server communication.


Let's create a public client:
- Click Clients
- Click Create client
- **General Settings**
- Client type -> OpenId Connect (the other options is SAML)
- Client ID -> e.g., <i>public-client</i>
- Next -> **Capability Config**
- Set Client Authentication: OFF (we are creating a public client)
- Check on Direct access grants
- Next -> **Login settings**
- Valid redirect URIs -> https://keycloak.org/app/*
- Web origins -> https://keycloak.org
- Click Save

![alt text](image-13.png)
![alt text](image-14.png)
![alt text](image-15.png)
![alt text](image-16.png)
![alt text](image-17.png)

## 🔄 Demo: Authorization code flow

We are going to test the client in the test application on the keycloak website.

Go to `https://www.keycloak.org/app/`.

Fill the fields with the realm name and the client ID. In this case: `cosme` and `public-client`. Click save.

![alt text](image-18.png)

It is not authenticated, so we need first to click Sign in

![alt text](image-19.png)
![alt text](image-21.png)

As you can see in the network tab, the client sent a redirect 200 command to our keycloak instance.

> [!TIP]
> If the redirect fails, and you have a Redirect URI Mismatch (`Invalid parameter: redirect_uri`). Check that you have the correct Valid redirect URIs and valid web origins in your client `public-client`.
> ![alt text](image-22.png)

And once we sign in, it should tell you something like this, but with your username.

![alt text](image-24.png)

## 🔒 Creating a confidential client

Let's create a confidential client:
- Click Clients
- Click Create client
- **General Settings**
- Client type -> OpenId Connect (the other options is SAML)
- Client ID -> e.g., <i>confidential-client</i>
- Next -> **Capability Config**
- Set Client Authentication: ON (we are creating a confidential client)
- Check on Direct access grants
- Check on Service accounts roles
- Next -> **Login settings**
- No need to add anything
- Click Save

![alt text](image-25.png)
![alt text](image-26.png)
![alt text](image-27.png)


<!-- ## 👤 Creating user
## 🔌 Creating OAuth Client
## 🔄 Demo: Authorization code flow
## 🔒 Creating a confidential client
## 🎫 Access tokens, refresh tokens -->