import React from "react";
import ReactDOM from "react-dom";


import 'primereact/resources/themes/lara-dark-teal/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import "./index.css";
import "./flags.css";

import MultiRowTable from "./components/MultiRowTable"

const App = () => (
  <div className="container">
    <MultiRowTable />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
