import React from "react";
import { createRoot } from "react-dom/client";
import AppHost from "./AppHost";

const root = createRoot(document.getElementById("app"));
root.render(<AppHost />);