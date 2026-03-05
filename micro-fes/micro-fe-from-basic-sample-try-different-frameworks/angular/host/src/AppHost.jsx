import React from "react";
import ReactDOM from "react-dom";

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

ReactDOM.render(<AppHost />, document.getElementById("app"));
