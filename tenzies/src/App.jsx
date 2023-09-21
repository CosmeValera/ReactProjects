import React from "react";

import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}

  function allNewDice() {
    const numbers = []

    for (let i = 0; i < 10; i ++) {
      const randomNumber = Math.floor(Math.random() * 6) + 1
      numbers.push(generateNewDie())
    }
    
    return numbers
  }

  const diceElements = dice.map((die) => {
    return <Die value={die.value} key={die.id} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>
  })

  function rollDice() {
    setDice(prevDice => {
      return prevDice.map((die)=> {
        return die.isHeld ? 
          die :
          generateNewDie()
      })
    })
  }

  function holdDice(id) {
    const die = dice.find(value => value.id === id);
    setDice(prevDice => {
      return prevDice.map((die)=> {
        if (die.id === id) {
          return { ...die, isHeld: !die.isHeld}
        }
        return die;
      })
    })
    console.log(dice)
  }

  /* OTHER OPTION */
  // function holdDice(id) {
  //   setDice(oldDice => oldDice.map(die => {
  //       return die.id === id ? 
  //           {...die, isHeld: !die.isHeld} :
  //           die
  //   }))
  // }
  
  return (
    <main>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>Roll</button>
    </main>
  );
}