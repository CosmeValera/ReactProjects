import React from "react"

export default function App() {
    function handleClick() {
        console.log("I was clicked!")
    }
    
    function handleMouseOverImg() {
        console.log("Mouse over image!")
    }
    
    return (
        <div className="container"> 
            <img onMouseOver={handleMouseOverImg} src="https://picsum.photos/640/360" />
            <button onClick={handleClick}>Click me</button>
        </div>
    )
}
