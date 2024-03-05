import React from "react";
import { createRoot } from 'react-dom/client';

import TanStackTable from "./components/tanStackTable"

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

createRoot(rootElement).render(
  <React.StrictMode>
    <TanStackTable />
  </React.StrictMode>
)
