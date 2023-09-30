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
        const { question, correct_answer, incorrect_answers } = questionInstance;

        return <>
            <h3>{he.decode(question)}</h3>
            <p>{he.decode(correct_answer)}</p>
            {incorrect_answers.map((incorrectAnswer) => (
                <p>{he.decode(incorrectAnswer)}</p>
            ))}
        </>
    });

    return (
        <>
            {questionsToAnswer}
            <button className="btn-primary" onClick={props.toggleQuizState}>Back</button>
        </>
    )
}