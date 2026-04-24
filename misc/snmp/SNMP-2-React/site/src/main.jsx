import React from 'react'
import ReactDOM from 'react-dom/client'
import SnmpList from './SnmpList.jsx'
import "primereact/resources/themes/mdc-dark-deeppurple/theme.css";
import './index.css'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnmpList />
  </React.StrictMode>,
)
