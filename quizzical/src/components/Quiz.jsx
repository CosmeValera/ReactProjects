import React from "react";
import he from "he";

import "./Quiz.css";

export default function Quiz(props) {
    const [data, setData] = React.useState([{
        "category": "",
        "type": "",
        "difficulty": "",
        "question": "",
        "correct_answer": "",
        "incorrect_answers": ["", "", ""]
    }])

    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
        .then(result=> result.json())
        .then(resultJson => {
            setData(resultJson.results)
        })
    }, []);

    /**
     * Next things to do:
     * 1. change p for correct and incorrect answers to button
     * 2. add styles to the buttons (same ::active effect)
     * 3. randomize order, shouldn't always be the correct answer first
     */

    const questionsToAnswer = data.map((questionInstance, index) => {
        const { question, correct_answer, incorrect_answers } = questionInstance;
        
        return <div className="question-container" key={index}>
            <h3>{he.decode(question)}</h3>
            <button className="btn-option btn-selected">{he.decode(correct_answer)}</button>
            {incorrect_answers.map( (incorrectAnswer, i) => (
                <button className="btn-option" key={`${index}-${i}`}>{ he.decode(incorrectAnswer) }</button>
            ))}
            <hr/>
        </div>
    });

    return (
        <>
            <div className="questions-container">
                {questionsToAnswer}
            </div>
            <button className="btn-primary btn-back" onClick={props.toggleQuizState}>Back</button>
        </>
    )
}