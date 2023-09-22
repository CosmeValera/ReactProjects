import React from "react";

export default function Quiz(props) {
    return (
        <>
            <h1>Quiz</h1>
            <button onClick={props.toggleQuizState}>Back</button>
        </>
    )
}