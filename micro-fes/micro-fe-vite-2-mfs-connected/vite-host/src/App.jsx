import React, { Suspense } from 'react'

const MicrofrontendRemoteApp = React.lazy(() =>
  import('remote_app/RemoteApp')
)
// import RemoteApp from "remote_app/RemoteApp"

import './App.css'

function App() {
  return (
    <>
      <h1>HOST</h1>
      <Suspense fallback={<p> Loading remote... </p>}>
        <MicrofrontendRemoteApp />
      </Suspense>
      {/* <RemoteApp /> */}
    </>
  )
}

export default App
