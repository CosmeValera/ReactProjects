import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

async function deferRender() {
  // if (process.env.NODE_ENV !== 'development') {
  //   return
  // }
  const { worker } = await import('./mocks/browser.js');
  return worker.start();
}

deferRender().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})

