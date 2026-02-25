import React from "react";
import { createRoot } from 'react-dom/client';
import MainRemote from "./MainRemote";

import "./index.css";

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<MainRemote />);
