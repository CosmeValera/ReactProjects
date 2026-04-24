1. How would you describe the concept of "state"?
State is used for changing the value of the variable inside a component.


2. When would you want to use props instead of state?
Props is used when you want to pass a variable from the parent Component to the child, and you don't want it to change.


3. When would you want to use state instead of props?
State is used when you want to have a variable inside the component that can change value.


4. What does "immutable" mean? Are props immutable? Is state immutable?
Immutable means that doesn't change of value.
Props should be immutable (good practices), and state is not immutable.


<!-- QUIZ 2, setCount -->

1. You have 2 options for what you can pass in to a
   state setter function (e.g. `setCount`). What are they?
   
a. New value of state (setCount(42))
b. Callback function - whatever the callback function 
   returns === new value of state


2. When would you want to pass the first option (from answer
   above) to the state setter function?
Whenever you don't need the previous value of state to determine
what the new value of state should be.


3. When would you want to pass the second option (from answer
   above) to the state setter function?
Whenever you DO need the previous value to determine the new value
