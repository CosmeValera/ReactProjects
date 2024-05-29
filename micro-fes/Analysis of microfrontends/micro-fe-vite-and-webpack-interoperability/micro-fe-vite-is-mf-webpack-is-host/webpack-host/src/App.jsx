import React from "react";
import ReactDOM from "react-dom/client";

import RemoteAppModule from "remote/App";
const RemoteApp = RemoteAppModule.default;

import "./index.css";

const App = () => (
  <div className="container">
    <RemoteApp />
    <div>Name: webpack-host</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
  </div>
);
ReactDOM.createRoot(document.getElementById("app")).render(
  <App />
);
