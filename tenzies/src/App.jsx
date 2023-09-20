import React from "react";

import Die from "./components/Die";

export default function App() {
  /**
   * Challenge: Create a `Roll Dice` button that will re-roll
   * all 10 dice
   * 
   * Clicking the button should generate a new array of numbers
   * and set the `dice` state to that new array (thus re-rendering
   * the array to the page)
   */

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

  function rollDice() {
    setDice(allNewDice())
  }
  
  return (
    <main>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>Roll</button>
    </main>
  );
}