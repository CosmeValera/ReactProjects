Static files are served out of the public directory.

```
$ curl http://localhost:8080/placeholder.txt
$ # result -> Put your static files in this directory and then delete this file.
```

You can have un-authorized routes.

```
$ curl http://localhost:8080/unauthorized
$ # result -> true
```

Trying authorized routes without a JWT will result in a 401.

```
$ curl http://localhost:8080/authorized
$ # result -> {"statusCode":401,"message":"Unauthorized"}                                 
```

Use the `/auth/login` route to login. **The first one is for windows with \ .**

```
$ # POST /auth/login
$ curl -X POST http://localhost:8080/auth/login -d "{\"username\": \"maria\", \"password\": \"123\"}" -H "Content-Type: application/json"
$ curl -X POST http://localhost:8080/auth/login -d '{"username": "maria", "password": "123"}' -H "Content-Type: application/json"
$ # result -> {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm... }
```
## 🚀 Example Maria token:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hcmlhIiwic3ViIjoyLCJpYXQiOjE2OTcyMDkwNjUsImV4cCI6MTY5NzI5NTQ2NX0.aXDHFP3imbTEfXODwZ7ZdN-Kr9ANRTvEQp8gihT8yMk

---

Send the JWT to authorized routes using the `Authorization` header and prefixing the JWT with `Bearer `.

```
$ # GET /profile using access_token returned from previous step as bearer code
$ curl http://localhost:8080/authorized -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."
$ # result -> {"userId":2}
```

## 🚀 Curl for Maria using her token:

curl http://localhost:8080/authorized -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hcmlhIiwic3ViIjoyLCJpYXQiOjE2OTcyMDkwNjUsImV4cCI6MTY5NzI5NTQ2NX0.aXDHFP3imbTEfXODwZ7ZdN-Kr9ANRTvEQp8gihT8yMk"
