import React, {Suspense} from 'react'
import viteLogo from '/vite.svg'
import './App.css'

const WebpackRemoteApp = React.lazy(() =>
  import('webpack_remote/WebpackApp')
)

function App() {
  return (
    <>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <h1>VITE HOST</h1>
      <Suspense fallback={<p>Loading Webpack App...</p>}>
        <WebpackRemoteApp />
      </Suspense>
    </>
  )
}

export default App
