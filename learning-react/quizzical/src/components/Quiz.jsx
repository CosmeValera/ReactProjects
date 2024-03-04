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

    function shuffleArray(array) {
        const shuffledArray = [...array]
        for (let i = shuffledArray.length -1 ; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
        }
        return shuffledArray;
    }

    function buttonSelected(evt) {
        const button = evt.currentTarget;
        const questionContainer = button.parentNode;
        questionContainer.querySelectorAll("button").forEach((but) => {
            but.classList.remove("btn-selected")
        });
        button.classList.add("btn-selected");
    }

    const questionsToAnswer = data.map((questionInstance, index) => {
        const { question, correct_answer, incorrect_answers } = questionInstance;
        
        // Shuffle the incorrect answers and insert the correct answer at a random position
        const shuffledOptions = shuffleArray(incorrect_answers)
        const randomIndex = Math.floor(Math.random() * (shuffledOptions.length + 1))
        shuffledOptions.splice(randomIndex, 0, correct_answer)

        return <>
            <div className="question-container" key={index}>
                <h3>{he.decode(question)}</h3>
                {
                    shuffledOptions.map((answer, i) => {
                        return <button className="btn-option" key={`${index}-${i}`} onClick={buttonSelected}>{he.decode(answer)}</button>
                    })
                }
            </div>
            <hr/>
        </>
    });

    return (
        <>
            <section className="questions-container">
                {questionsToAnswer}
            </section>
            <div className="btn-container">
                <button className="btn-primary btn-check-answers" onClick={props.toggleQuizState}>Check answers</button>
            </div>
        </>
    )
}