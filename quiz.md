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