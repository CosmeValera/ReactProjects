import React from 'react'
import ReactDOM from 'react-dom/client'
import SnmpTree from './SnmpTree.jsx'
import "primereact/resources/themes/mdc-dark-deeppurple/theme.css";
import './index.css'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnmpTree />
  </React.StrictMode>,
)
