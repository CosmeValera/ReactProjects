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

    const questionsToAnswer = data.map(question => {
        return <>
            <h3>{he.decode(data[0].question)}</h3>
            <p>{he.decode(data[0].correct_answer)}</p>
            <p>{he.decode(data[0].incorrect_answers[0])}</p>
        </>
    });

    return (
        <>
        {questionsToAnswer}

            <button className="btn-primary" onClick={props.toggleQuizState}>Back</button>
        </>
    )
}