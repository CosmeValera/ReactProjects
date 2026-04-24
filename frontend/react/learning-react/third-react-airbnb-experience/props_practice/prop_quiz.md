1. What do props help us accomplish?
Props help us pass parameters to a React Component Class, so they can be recycable like in the card example.


2. How do you pass a prop into a component?
like this:

function App() {
    return (
        <Dog name="adolf" id="1234">
    );
}


1. Can I pass a custom prop (e.g. `blahblahblah={true}`) to a native
   DOM element? (e.g. <div blahblahblah={true}>) Why or why not?
No, it is only available for React componnents


4. How do I receive props in a component?
function Navbar() {
    return (
        <header>
            ...
        </header>
    )
}

You have to put props (or whatever) inside the parenthesis, like this: "function Navbar(props){ ... }".


5. What data type is `props` when the component receives it?
It's a json, it has inside every value you gave it, for instance regarding the dog example I previously wrote it would be-> {name: "adolf", id="1234"}