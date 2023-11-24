import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";

import "./index.css";

const RemoteApp = lazy(() => import("remote/AppRemote"));

const AppHost = () => (
  <div className="container">
    <div>Name: host</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
    <Suspense fallback={<div>Loading...</div>}>
      <RemoteApp />
    </Suspense>
  </div>
);

ReactDOM.render(<AppHost />, document.getElementById("app"));
