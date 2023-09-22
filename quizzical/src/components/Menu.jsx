import React from "react";

export default function Menu(props) {
    return (
        <>
            <h1>Menu</h1>
            <button onClick={props.toggleQuizState}>Start Quiz</button>
        </>
    )
}