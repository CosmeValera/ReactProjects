import React, {useEffect, useState} from 'react'
import viteLogo from '/vite.svg'
import './App.css'

// import WebpackRemote from 'webpack_remote/WebpackApp'
// console.log(WebpackRemote)

function App() {
  const [RemoteComponent, setRemoteComponent] = useState(null);

  useEffect(() => {
    const loadComponent = async () => {
      const remoteModule = await import('webpack_remote/WebpackApp');
      setRemoteComponent(() => remoteModule.default);
    };
    loadComponent();
  }, []);

  useEffect(() => {
    console.log(RemoteComponent)
  }, [RemoteComponent])

  return (
    <>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <h1>VITE HOST</h1>
      {RemoteComponent ? <RemoteComponent /> : <p>Loading remote component...</p>}
    </>
  )
}

export default App
