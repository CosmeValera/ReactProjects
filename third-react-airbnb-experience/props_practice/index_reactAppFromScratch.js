/* Challenge:
One LAST time in this course, set up a React app from scratch
- Render an <App /> component
    - App should be in its own file
- App should render 4-5 <Joke /> components 
  (Joke component defined in its own file too)
    - Each Joke should receive a "setup" prop and a "punchline" prop
      and render those however you'd like
- Use your favorite 2-part jokes (setup & punchline), or check
  jokes.md file for some examples.



EXTRA CREDIT:
Some jokes are only a punchline with no setup:

E.g.: "It’s hard to explain puns to kleptomaniacs because 
they always take things literally."

If you don't pass in a "question" prop, how might you make it only 
show the punchline?
*/

// INDEX.js
import React from 'react';
import ReactDOM from 'react-dom';
import Joke from './Joke';
import App from './App';

ReactDOM.render(<App/ >, document.getElementById("root"));


// JOKE.js

import React from 'react';

export default function Joke({setup, punchline}) {
    return (
        <div>
            /* LO q yo tenia */
            <h1>{setup}</h1>
            <h2>{punchline}</h2>

            /* Magia de react para el caso de querer chequear q existe setup*/
            {setup && <h1>{setup}</h1>}
            <h1 style={{display: setup ? "block" : "none"}}> setup </h1></h1>
        </div>
    );
}

// App.js
import React from 'react';
import Joke from './Joke';

export default function App() {
    return (
        <>
            <Joke setup="Que le dice una gallina a otra" punchline="Por lo menos tengo apollo"/>
            <Joke setup="I got my daughter a fridge for her birthday." punchline="I can't wait to see her face light up when she opens it"/>
            <Joke setup="How did the hacker escape the police?" punchline="He just ransomware!"/>
            <Joke setup="What's the best thing about Switzerland?" punchline="I don't know, but the flag is a big plus!"/>
            <Joke punchline=" It’s hard to explain puns to kleptomaniacs because they always take things literally."/>
        </>
    );
}