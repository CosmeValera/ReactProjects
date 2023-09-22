import React from "react";

export default function Menu(props) {
    return (
        <div className="menu-container">
            <h1>Quizzical</h1>
            <p>Will you be able to answer all the questions? 😳😈</p>
            <button onClick={props.toggleQuizState}>Start Quiz</button>
            <img src="./../../public/img/blue-blob.svg" className="blue-dot" alt="blue dot"/>
            <img src="./../../public/img/yellow-blob.svg" className="yellow-dot" alt="yellow dot"/>
        </div>
    )
}