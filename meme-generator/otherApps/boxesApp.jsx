//App
import React from "react"
import boxes from "./boxes"

export default function App() {
    /**
     * Challenge part 1:
     * 1. Initialize state with the default value of the
     *    array pulled in from boxes.js
     * 2. Map over that state array and display each one
     *    as an empty square (black border, transparent bg color)
     *    (Don't worry about using the "on" property yet)
     */
    const boxesMapped = boxes.map(box => {
        
        return <div className={`square ${box.on ? "filled" : ""}`} key={box.id}></div>
    })
    return (
        <main>
            <h1>Boxes will go here</h1>
            {boxesMapped}
        </main>
    )
}

// Boxes
export default [
    {
        id: 1,
        on: true
    },   
    {
        id: 2,
        on: false
    },   
    {
        id: 3,
        on: true
    },   
    {
        id: 4,
        on: true
    },   
    {
        id: 5,
        on: false
    },   
    {
        id: 6,
        on: false
    },   
]

// css
* {
    box-sizing: border-box;
}

.square {
    height: 100px;
    width: 100px;
    border: solid 1px black;
}

.filled {
    background: greenyellow;
}