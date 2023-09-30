import React from "react";
import he from "he";

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

    const questionsToAnswer = data.map((questionInstance, index) => {
        const { question, correct_answer, incorrect_answers } = questionInstance;
        
        return <div className="question-container" key={index}>
            <h3>{he.decode(question)}</h3>
            <p>{he.decode(correct_answer)}</p>
            {incorrect_answers.map( (incorrectAnswer, i) => (
                <p key={`${index}-${i}`}>{ he.decode(incorrectAnswer) }</p>
            ))}
        </div>
    });

    return (
        <main>
            <div className="questions-container">
                {questionsToAnswer}
            </div>
            <button className="btn-primary" onClick={props.toggleQuizState}>Back</button>
        </main>
    )
}