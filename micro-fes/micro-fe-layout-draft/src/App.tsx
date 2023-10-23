import React from 'react';
import ReactDOM from 'react-dom';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';

import "./index.scss";
import OverlayConfirmDialog from "./components/OverlayConfirmDialog";
import PanelPassThrough from './components/PanelPassThrough';
import FormAutoComplete from './components/FormAutoComplete';
import FormCalendar from './components/FormCalendar';


const App = () => (
  <PrimeReactProvider>
    <div className='pb-2'>

      {/* FORM */}
      <FormAutoComplete/>
      <FormCalendar />

      {/* <OverlayConfirmDialog />
      <PanelPassThrough /> */}
    </div>
    
    <FormCalendar />
  </PrimeReactProvider>
);
ReactDOM.render(<App />, document.getElementById("app"));
