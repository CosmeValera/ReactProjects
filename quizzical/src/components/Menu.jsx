import React from "react";

export default function Menu(props) {
    return (
        <div className="menu-container">
            <h1>Quizzical</h1>
            <p>Will you be able to answer all the questions? 😳😈</p>
            <button onClick={props.toggleQuizState}>Start Quiz</button>
        </div>
    )
}