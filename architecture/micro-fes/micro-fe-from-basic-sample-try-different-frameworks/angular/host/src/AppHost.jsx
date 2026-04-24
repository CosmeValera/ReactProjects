import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import MainHost from "./MainHost";
import RemoteWrapper from "./RemoteWrapper";
import RemoteApp from "remote/MainRemote";

const AppHost = () => (
  <div className="container">
    <MainHost />
    <RemoteWrapper mount={RemoteApp} />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<AppHost />);
