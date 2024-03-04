import React from "react"

export default function Joke(props) {
    const [isShown, setIsShown] = React.useState(false);
    /**
     * Challenge:
     * - Create state `isShown` (boolean, default to `false`)
     * - Add a button that toggles the value back and forth
     */
    function handleClick() {
        setIsShown(isShown => !isShown);
    }
    return (
        <div> 
            {props.setup && <h3>{props.setup}</h3>}
            {isShown && <p>{props.punchline}</p>}
            <button onClick={handleClick}>Show pun</button>     
            <hr />
        </div>
    )
}