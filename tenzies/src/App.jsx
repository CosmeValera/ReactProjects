import React from "react";

import Die from "./components/Die";

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())

  function allNewDice() {
    const numbers = []

    for (let i = 0; i < 10; i ++) {
      const randomNumber = Math.floor(Math.random() * 6) + 1
      numbers.push(randomNumber)
    }
    
    return numbers
  }

  const diceElements = dice.map((die, index) => {
    return <Die value={die} key={index}/>
  })
  
  return (
    <main>
      <div className="dice-container">
        {diceElements}
      </div>
    </main>
  );
}