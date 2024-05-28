import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <h1>Remote A</h1>
        <button onClick={() => setCount((count) => count + 1)}>
          Muestra el cambio {count}
        </button>
    </>
  )
}

export default App
