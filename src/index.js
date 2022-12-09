import React from "react";
import ReactDOM from "react-dom/client";

const App = () => {
    return (
        <>
            <img src={require('./react-logo.png')} alt="react-logo" width='40px'/>
            <h1>Fun facts about React</h1>
            <ul>
                <b>
                  <li>Was first released in 2013</li>
                  <li>Was originally created by Jordan Walke</li>
                  <li>Has well over 100K starts on GitHub</li>
                  <li>Is mantained by Facebook</li>
                  <li>Powers thousands of enterprise apps, includign mobile apps</li>
                </b>
            </ul>
        </>
    );
};

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
