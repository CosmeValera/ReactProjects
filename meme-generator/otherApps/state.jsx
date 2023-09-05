// PAGE: Is state important to know?
import React from "react"

export default function App() {
    const [isImportant, setIsImportant] = React.useState("Yes")
    
    function handleClick() {
        console.log(isImportant, setIsImportant)
        if (isImportant === "Yes") {
            setIsImportant("No")
        } else if (isImportant === "No") {
            setIsImportant("Yes")
        }
    }
    
    return (
        <div className="state">
            <h1 className="state--title">Is state important to know?</h1>
            <div className="state--value">
                <h1 onClick={handleClick}>{isImportant}</h1>
            </div>
        </div>
    )
}

// PAGE: COUNTER

import React from "react"

export default function App() {
    const [number, setNumber] = React.useState(0);
    
    function reduceValue() {
        setNumber(number-1);   
    }
    function increaseValue() {
        setNumber(number+1);   
    }
    
    return (
        <div className="counter">
            <button className="counter--minus" onClick={reduceValue}>–</button>
            <div className="counter--count">
                <h1>{number}</h1>
            </div>
            <button className="counter--plus" onClick={increaseValue}>+</button>
        </div>
    )
}
