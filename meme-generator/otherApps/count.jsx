// App.js
import React from "react"

import Count from './components/Count.js'

export default function App() {
    
    const [count, setCount] = React.useState(0)
    
    function add() {
        setCount(prevCount => prevCount + 1)
    }
    
    function subtract() {
        setCount(prevCount => prevCount - 1)
    }
    
    return (
        <div className="counter">
            <button className="counter--minus" onClick={subtract}>–</button>
            <Count number={count}/>
            <button className="counter--plus" onClick={add}>+</button>
        </div>
    )
}

// Count.js
import React from 'react';

export default function Count(props) {
    return (
        <div className="counter--count">
            <h1>{props.number}</h1>
        </div>
    );
}