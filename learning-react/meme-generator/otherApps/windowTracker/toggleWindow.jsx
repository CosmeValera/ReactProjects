import React from "react"
import WindowTracker from "./WindowTracker.jsx"

export default function App() {
    
    const [isShow, setIsShow] = React.useState(true);
    
    function handleClick() {
        setIsShow(prevIsShow => !prevIsShow)
    }
    
    return (
        <div className="container">
            <button onClick={handleClick}>
                Toggle WindowTracker
            </button>
            {isShow && <WindowTracker />}
        </div>
    )
}
