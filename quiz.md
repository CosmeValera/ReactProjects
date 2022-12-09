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