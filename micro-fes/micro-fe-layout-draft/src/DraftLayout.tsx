import React from 'react';
import ReactDOM from 'react-dom';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';

import "./index.scss";
import TabMenu from './components/draftlayout/TabMenu';

const DraftLayout = () => (
  <PrimeReactProvider>
    <div className='container'>
      <TabMenu />
    </div>
  </PrimeReactProvider>
);
ReactDOM.render(<DraftLayout />, document.getElementById("app"));
