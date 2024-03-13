import Provider from './application/provider'
import LogIn from './components/login/index'
import ShowState from './components/showState/index'

import './App.css'

function App() {
  return (
    <Provider>
      <LogIn />
      <ShowState />
    </Provider>
  )
}

export default App
