import React from "react";
import ReactDOM  from "react-dom";

function App() {
    const firstname = "Joe"
    const lastName = "Schmoe"

    let hours = 12;
    let timeOfDay;
    if (hours === 12) {
        timeOfDay = "afternoon";
    } 
    
    return (
        // <h1>Hello {firstname} {lastName}!</h1>
        <h1>Good {timeOfDay}!</h1>
    )
}

ReactDOM.render(<App/>, document.getElementById("root"))