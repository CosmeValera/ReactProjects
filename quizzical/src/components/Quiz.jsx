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

    const questionsToAnswer = data.map(questionInstance => {
        const incorrectAnswers = questionInstance.incorrect_answers.map((incorrectAnswer) => {
            return <p>{he.decode(incorrectAnswer)}</p>
        }) 
        return <>
            <h3>{he.decode(questionInstance.question)}</h3>
            <p>{he.decode(questionInstance.correct_answer)}</p>
            { incorrectAnswers }
        </>
    });

    return (
        <>
            {questionsToAnswer}
            <button className="btn-primary" onClick={props.toggleQuizState}>Back</button>
        </>
    )
}