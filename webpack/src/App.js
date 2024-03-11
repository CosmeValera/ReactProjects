import {useState} from 'react'

const App = () => {
    const [counter, setCounter] = useState(0);
    const [values, setValues] = useState([])

    const handleClick = () => {
        setCounter(counter + 1)
        setValues(values.push(counter))
    }

    return (
        <div className="container">
            <h1>Hello Midu!</h1>
            <button onClick={handleClick}> Press this </button>
            <div>{counter}</div>
        </div>
    )
}
export default App