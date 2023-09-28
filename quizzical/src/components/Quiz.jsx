import React from "react";
import he from "he";

export default function Quiz(props) {
    const [data, setData] = React.useState({
        "category": "Celebrities",
        "type": "boolean",
        "difficulty": "easy",
        "question": "What is the real name of the Scout in &quot;Team Fortress 2&quot;?",
        "correct_answer": "False",
        "incorrect_answers": [
          "True"
        ]
    })

    React.useEffect(() => {
        console.log("1");
        fetch('https://opentdb.com/api.php?amount=1')
        .then(result=> result.json())
        .then(resultJson => {
            setData(resultJson.results[0])
        })
        console.log("2");
    }, []);
    
    React.useEffect(()=> console.log(data), [data])

    return (
        <>
            <h1>Quiz</h1>
            <h2>Question: </h2>
            <p>{he.decode(data.question)}</p>
            <h2>Answers: </h2>
            <p>{he.decode(data.correct_answer)}</p>
            <p>{he.decode(data.incorrect_answers[0])}</p>

            <button className="btn-primary" onClick={props.toggleQuizState}>Back</button>
        </>
    )
}