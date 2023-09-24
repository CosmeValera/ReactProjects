import React from "react";

export default function Quiz(props) {
    return (
        <>
            <h1>Quiz</h1>
            <button className="btn-primary" onClick={props.toggleQuizState}>Back</button>
        </>
    )
}