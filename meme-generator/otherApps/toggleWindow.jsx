import React from "react"
import WindowTracker from "./WindowTracker"

export default function App() {
    
    const [isShow, setIsShow] = React.useState(false);
    
    /**
     * Challenge:
     * 1. Create state called `show`, default to `true`
     * 2. When the button is clicked, toggle `show`
     * 3. Only display `<WindowTracker>` if `show` is `true`
     */
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
