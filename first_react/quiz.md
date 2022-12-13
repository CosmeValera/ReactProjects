<<<<<<< HEAD
1. Why do we need to `import React from "react"` in our files?
To be able to use the syntax of jsx, where we combine HTML and JS.

2. If I were to console.log(page) in index.js, what would show up?
It shows an object with several attributes where the content itself of the elements inside page, would be shown in a variable called children.

3. What's wrong with this code:
```
const page (
    <h1>Hello</h1>
    <p>This is my website!</p>
)
```

It needs to have only one root element. In this case we could simply join h1 and p, and put them both inside a div.


4. What does it mean for something to be "declarative" instead of "imperative"?
The code is imperative when you tell the computer one order at a time what it has to do.
e.g. for( int i = 0; i < 10; i++){}
The code is declarative when you declare to the computer what it has to do, and it's its job to figure out how.
e.g. array.forEach(obj => { ... });

5. What does it mean for something to be "composable"?
I think it refers to be able to replicate the same component in several places.
=======
<!-- To have a merge done with squash commits you switch to master and type ```git merge --squash <feature_branch>``` -->

Quiz!

1. What is a React component?
A React component is a function that returns some jsx that React is able to translate to put it in the DOM of HTML.

2. What's wrong with this code?
```
function myComponent() {
return (
<small>I'm tiny text!</small>
)
}
```
MyComponent should be pascal. So it shold start with capital M.

3. What's wrong with this code?
```
function Header() {
return (
<header>
<nav>
<img src="./react-logo.png" width="40px" />
</nav>
</header>
}

ReactDOM.render (Header(), document.getElementById("root"))
```

Ok so in the render part, it should be <Header /> instead of Header(), because it is a component now.
>>>>>>> fun_fact
