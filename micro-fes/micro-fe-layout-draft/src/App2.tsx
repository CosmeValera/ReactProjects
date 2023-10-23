import React from 'react';
import ReactDOM from 'react-dom';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';

import "./index.scss";

const App = () => (
  <PrimeReactProvider>
    <div className='container'>
      
    </div>
  </PrimeReactProvider>
);
ReactDOM.render(<App />, document.getElementById("app"));
