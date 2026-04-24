import { useRef } from 'react'
import './App.css'

function App() {
  const inputRef = useRef<HTMLInputElement>(null)
  const resultRef = useRef<HTMLInputElement>(null)
  function changeRefValue() {
    resultRef.current!.innerHTML = inputRef.current!.value;
  }

  return (
    <>
      <section>
        <input type="text" ref={inputRef} />
        <button onClick={changeRefValue}>Set Ref Value to Div</button>
        <div ref={resultRef}></div>
      </section>
    </>
  )
}

export default App
