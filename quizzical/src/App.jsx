import React from "react"

import "./App.css"
import Menu from './components/Menu'
import Quiz from './components/Quiz'

export default function App() {
  const [isQuiz, setIsQuiz] = React.useState(false);

  function toggleQuizState() {
    setIsQuiz(prevIsQuiz => !prevIsQuiz)
  }

  return (
    <main>
      { 
        isQuiz 
        ? <Quiz toggleQuizState={toggleQuizState}/>
        : <div>
          <Menu toggleQuizState={toggleQuizState}/>
          <img src="./../../public/img/blue-blob.svg" className="blue-dot" alt="blue dot"/>
          <img src="./../../public/img/yellow-blob.svg" className="yellow-dot" alt="yellow dot"/>
        </div>
      }
      
    </main>
  )
}