import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import MainHost from "./MainHost";
import DynamicRemoteApp from "./DynamicRemoteApp";

const AppHost = () => (
  <div className="container">
    <MainHost />
    <DynamicRemoteApp name="remote/MainRemote"/>    
  </div>
);

ReactDOM.render(<AppHost />, document.getElementById("app"));
