import React from "react";

import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  
  React.useEffect(()=> {
    console.log("Dice state changed")
    const held = dice.every((die) => die.isHeld)
    const allSameValue = dice.every((die) => die.value === dice[0].value)

    if (held && allSameValue) {
      setTenzies(true)
    }
  }, [dice]);

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
    if (tenzies) {
      setDice(allNewDice())
      setTenzies(false)
    } else {
      setDice(prevDice => {
        return prevDice.map((die)=> {
          return die.isHeld ? 
          die :
          generateNewDie()
        })
      })
    }
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
      {tenzies && <Confetti />}
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>{tenzies ? 'New Game':'Roll'}</button>
    </main>
  );
}