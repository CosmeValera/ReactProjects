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

// Using Box, and style
export default function Box(props) {
    const styles = {
        backgroundColor: props.on ? "#222" : "none"
    }
    return <div style={styles} className="box"></div>
}



// PART 4 and 5

// APP
import React from "react"
import boxes from "./boxes"
import Box from "./Box"

export default function App() {
    const [squares, setSquares] = React.useState(boxes)
    
    function toggle(id) {
        setSquares(prevSquares => {
            const newSquares = [...prevSquares];
            const selectedSquare = newSquares.find(square => square.id === id);
            selectedSquare.on = !selectedSquare.on;
            return newSquares;
        })
    }

    // THIS IS A BETTTER WAY TO DO IT-> more declarative
    // function toggle(id) {
    //     setSquares(prevSquares => {
    //         return prevSquares.map((square) => {
    //             return square.id === id ? {...square, on: !square.on} : square
    //         })
    //     })
    // }
    
    const squareElements = squares.map(square => (
        <Box 
            key={square.id} 
            id={square.id}
            on={square.on} 
            toggle={toggle}
        />
    ))
    
    return (
        <main>
            {squareElements}
        </main>
    )
}

// BOX
import React from "react"

export default function Box(props) {
    const styles = {
        backgroundColor: props.on ? "#222222" : "transparent"
    }
    
    return (
        <div 
            style={styles} 
            className="box"
            onClick={()=>props.toggle(props.id)}
        >
        </div>
    )
}