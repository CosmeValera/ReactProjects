import React from 'react';
import ReactDOM from 'react-dom';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';

import "./index.scss";
import TabMenu from './components/draftlayout/TabMenu';
import MMsatStat from './components/draftlayout/MMsatStat';
import NAVPRS from './components/draftlayout/NAVPRS';
import STC from './components/draftlayout/STC';
import STM from './components/draftlayout/STM';
import GeneratePacket from './components/draftlayout/GeneratePacket';

const DraftLayout = () => (
  <PrimeReactProvider>
    <div className='container'>
      <TabMenu />

      {/* MMsatStat Configuration: lo pongo como tarjeta pq parece importante, q sea tarjeta significa que no se puede replegar */}
      <MMsatStat />  

      {/* Para los demás uso Fieldset que sí se puede replegar */}
      <NAVPRS /> {/*Dentro del NAVPRS estoy usando un Panel que sí se puede replegar también pero se ve diferente */}

      <STC />

      <STM />

      <GeneratePacket />
      
      {/* Splitter: Quizas podriamos usar el splitter tambien es una opcion para estas pantallas con tantas opciones y tantos botones */}
    </div>
  </PrimeReactProvider>
);
ReactDOM.render(<DraftLayout />, document.getElementById("app"));
