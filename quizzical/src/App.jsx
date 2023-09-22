import React from "react"

import Menu from './components/Menu'
import Quiz from './components/Quiz'

export default function App() {
  const [isQuiz, setIsQuiz] = React.useState(false);

  function toggleQuizState() {
    setIsQuiz(prevIsQuiz => !prevIsQuiz)
  }

  return (
    <>
      { 
        isQuiz 
        ? <Quiz toggleQuizState={toggleQuizState}/>
        : <Menu toggleQuizState={toggleQuizState}/>
      }
    </>
  )
}