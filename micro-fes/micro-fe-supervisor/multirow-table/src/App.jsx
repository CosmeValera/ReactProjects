import React from "react";
import ReactDOM from "react-dom";

import MultiRowTable from "./components/MultiRowTable"

import "./index.css";
import "./flags.css";

const App = () => (
  <div className="container">
    <MultiRowTable />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
