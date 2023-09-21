import React from "react";

import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {
/**
 * Challenge: Create a function `holdDice` that takes
 * `id` as a parameter. For now, just have the function
 * console.log(id).
 * 
 * Then, figure out how to pass that function down to each
 * instance of the Die component so when each one is clicked,
 * it logs its own unique ID property. (Hint: there's more
 * than one way to make that work, so just choose whichever
 * you want)
 * 
 */

  const [dice, setDice] = React.useState(allNewDice())

  function allNewDice() {
    const numbers = []

    for (let i = 0; i < 10; i ++) {
      const randomNumber = Math.floor(Math.random() * 6) + 1
      numbers.push({
        value: randomNumber,
        isHeld: true,
        id: nanoid()
      })
    }
    
    return numbers
  }

  const diceElements = dice.map((die) => {
    return <Die value={die.value} isHeld={die.isHeld} key={die.id}/>
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