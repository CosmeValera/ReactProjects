import React from "react";
import { createRoot } from "react-dom/client"; // React 18's createRoot

import "./index.css";

const MainRemote = () => (
  <div className="container">
    <div><b>Name: remote</b></div>
    <div>Framework: react</div>
    <div>Port: 7024</div>
    <div>React version: 18</div>
  </div>
);

// This is what the host calls — React 18 renders into its own isolated node
export function mount(el) {
  const root = createRoot(el);
  root.render(<MainRemote />);
  return root; // return root so the host can call root.unmount() on cleanup if needed
}

export default MainRemote;