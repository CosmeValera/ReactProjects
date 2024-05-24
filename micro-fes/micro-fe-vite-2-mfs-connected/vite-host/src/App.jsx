import React, { Suspense } from 'react'

import './App.css'

//** VITE REMOTE APP **//
const MicrofrontendViteRemoteApp = React.lazy(() =>
  import('vite_remote_app/RemoteApp')
)
// import ViteRemoteApp from "vite_remote_app/ViteRemoteApp"

//** WEBPACK REMOTE APP **//
// import WebpackRemoteApp from "webpack_remote_app/WebpackRemoteApp"

function App() {
  return (
    <>
      <h1>HOST</h1>
      <Suspense fallback={<p> Loading remote... </p>}>
        <MicrofrontendViteRemoteApp />
      </Suspense>
      {/* <ViteRemoteApp /> */}

      {/* <WebpackRemoteApp /> */}
    </>
  )
}

export default App
