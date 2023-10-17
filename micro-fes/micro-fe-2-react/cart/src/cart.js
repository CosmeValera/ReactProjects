import React, {useState, useEffect} from "react";
import { BehaviorSubject } from "rxjs";

const API_SERVER = "http://localhost:8080";

export const jwt = new BehaviorSubject(null);

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

export function useLoggedIn() {
    const [loggedIn, setLoggedIn] = useState(!!jwt.value);
    useEffect(() => {
        setLoggedIn(!!jwt.value);
        return jwt.subscribe((c) => {
            setLoggedIn(!!jwt.value);
          });
    }, []);
    return loggedIn;
}