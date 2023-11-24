import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

const AppRemote = () => (
  <div className="container">
    <div>Name: remote</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
  </div>
);

ReactDOM.render(<AppRemote />, document.getElementById("app"));
