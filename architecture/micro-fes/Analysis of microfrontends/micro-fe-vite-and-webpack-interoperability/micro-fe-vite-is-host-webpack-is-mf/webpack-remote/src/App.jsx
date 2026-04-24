import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import WebpackApp from "./WebpackApp";

const App = () => (
  <WebpackApp />
);
ReactDOM.createRoot(document.getElementById("app")).render(
  <App />
);
