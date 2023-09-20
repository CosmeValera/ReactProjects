import React from "react";

import Die from "./components/Die";

export default function App() {

  function allNewDice() {
    const numbers = [];

    for (let i = 0; i < 10; i ++) {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      numbers.push(<Die value={randomNumber} key={i}/>)
    }
    
    return numbers;
  }
  
  return (
    <main>
      <div className="dice-container">
        {allNewDice()}
      </div>
    </main>
  );
}