import React from 'react';
import ReactDOM from 'react-dom';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';

import "./index.scss";
import FormAutoComplete from './components/Form/FormAutoComplete';
import FormCalendar from './components/Form/FormCalendar';
import FormCascadeSelect from './components/Form/FormCascadeSelect';


const App = () => (
  <PrimeReactProvider>
    {/* FORM */}
    <div className='container'>
      <FormAutoComplete/>
      <FormCalendar />
      <FormCascadeSelect />
    </div>
  </PrimeReactProvider>
);
ReactDOM.render(<App />, document.getElementById("app"));
