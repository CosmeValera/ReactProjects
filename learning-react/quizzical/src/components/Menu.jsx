import React from "react";

import "./Menu.css";

export default function Menu(props) {

    return (
        <div className="menu-container">
            <h1 className="menu-title">Quizzical</h1>
            <p className="menu-description">Will you be able to answer all the questions? 😳😈</p>
            <button className="btn-primary" onClick={props.toggleQuizState}>Start Quiz</button>
        </div>
    )
}