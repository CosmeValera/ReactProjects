import React from "react";
import { createRoot } from "react-dom/client"; // React 18's createRoot

import "./index.css";

const MainRemote = () => (
  <div className="container">
    <div>Name: remote</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
    <div><b>React version: 18</b></div>
  </div>
);

// This is what the host calls — React 18 renders into its own isolated node
export function mount(el) {
  const root = createRoot(el);
  root.render(<MainRemote />);
  return root; // return root so the host can call root.unmount() on cleanup if needed
}

export default MainRemote;