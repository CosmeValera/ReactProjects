import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import MainHost from "./MainHost";
import RemoteWrapper from "./RemoteWrapper";

const AppHost = () => (
  <div className="container">
    <MainHost />
    <RemoteWrapper />
  </div>
);

const root = createRoot(document.getElementById("app"));
root.render(<AppHost />);