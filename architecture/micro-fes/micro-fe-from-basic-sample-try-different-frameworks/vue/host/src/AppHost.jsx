import React from "react";
import "./index.css";
import MainHost from "./MainHost";
import RemoteWrapper from "./RemoteWrapper";

const AppHost = () => (
  <div className="container">
    <MainHost />
    <RemoteWrapper />
  </div>
);

export default AppHost;
