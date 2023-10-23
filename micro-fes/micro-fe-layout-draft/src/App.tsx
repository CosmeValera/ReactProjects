import React from 'react';
import ReactDOM from 'react-dom';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primeflex/primeflex.css';                                   // css utility
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';

import "./index.scss";
import BasicDemo from "./components/BasicDemo";
import PanelPassThrough from './components/PanelPassThrough';

const App = () => (
  <PrimeReactProvider>
    <BasicDemo />
    <PanelPassThrough />
  </PrimeReactProvider>
);
ReactDOM.render(<App />, document.getElementById("app"));
