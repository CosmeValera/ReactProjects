import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import RemoteWrapper from "./RemoteWrapper"  // ✅ use the wrapper

const AppHost = () => (
  <div className="container">
    <MainHost />
    <RemoteWrapper />  {/* ✅ not RemoteApp directly */}
  </div>
);