import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";


import "./index.scss";

import SafeComponent from "./SafeComponent";
import Header from "home/Header";
import Footer from "home/Footer";
import PDPContent from "./PDPContent";

const App = () => (
  <Router>
    <div className="text-3xl mx-auto max-w-6xl">
      <Header/>
      <div className="my-10">
        <PDPContent />
        {/* <Switch> */}
        <Routes>
          <Route path="/product/:id" component={PDPContent} />
        </Routes>
        {/* </Switch> */}
      </div>
      <Footer />
    </div>
  </Router>
);
ReactDOM.render(<App />, document.getElementById("app"));
