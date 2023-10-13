import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";

import SafeComponent from "./SafeComponent";
import Header from "home/Header";
import Footer from "home/Footer";

const App = () => (
  <div className="text-3xl mx-auto max-w-6xl">
    <SafeComponent>
      <Header/>
    </SafeComponent>
    <div className="my-10">PDP Page Content </div>
    <Footer />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
