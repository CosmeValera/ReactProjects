1. What is a "side effect" in React? What are some examples?
A side effect is something that happens outside the control of React.
An example of a side effect is useEffect.

<!-- ANSWER -->
- Any code that affects an outside system.
- local storage, API, websockets, two states to keep in sync

2. What is NOT a "side effect" in React? Examples?
When you make a fetch in the root of the component and it creates a loop of fetching the data all the time, that's not a side effect.

<!-- ANSWER -->
- Anything that React is in charge of.
- Maintaining state, keeping the UI in sync with the data, 
  render DOM elements

3. When does React run your useEffect function? When does it NOT run
   the effect function?
IDK

<!-- ANSWER -->
- As soon as the component loads (first render)
- On every re-render of the component (assuming no dependencies array)
- Will NOT run the effect when the values of the dependencies in the
  array stay the same between renders


4. How would you explain what the "dependecies array" is?
The dependencies array, is an array that corresponds with the second parameter of the useEffect hook, and there the variables that you write, if changed, they will trigger the useEffect function.
Internally it works, because if the value is the same then it doesn't change-> [0] === [0], so it doesn't rerender. But if the value changes [0] !== [1] then it will rerender.

<!-- ANSWER -->
- Second paramter to the useEffect function
- A way for React to know whether it should re-run the effect function