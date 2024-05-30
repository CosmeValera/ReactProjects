import React from 'react'
import viteLogo from '/vite.svg'
import './App.css'

import WebpackRemote from 'webpack_remote/WebpackApp'

function App() {
  return (
    <>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <h1>VITE HOST</h1>
      <WebpackRemote />
    </>
  )
}

export default App
