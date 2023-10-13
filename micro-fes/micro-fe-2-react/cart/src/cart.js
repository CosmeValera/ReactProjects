import { BehaviourSubject } from "rxjs";

const API_SERVER = "http://localhost:8080";

export const jwt = new BehaviourSubject(null);
jwt.subscribe((token) => console.log(token));
jwt.next(newValue);

export const login = function(username, password) {
    return fetch(`${API_SERVER}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            jwt.next(data.access_token);
            // getCart();
            return data.access_token;
        })
}