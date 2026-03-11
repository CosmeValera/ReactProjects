<!-- Tutorial: https://www.youtube.com/watch?v=Kt2E8nblvXU -->
<!-- Tutorial scrimba: https://scrimba.com/learn-vue-c0jrrpaasr/~05zy/s0sa5sde31/head -->

# 💚 VUE

Vue is a JS framework for building user interfaces. It's a progressive framework, adaptable incrementally, from small projects to large-scale applications. It was created by Evan You who was working for AngularJS (the old version of Angular) at that time. It's one of the most popular JS frontend frameworks alongside React and Angular.

## How to create a Vue project

### Option 1: Using NPM
```bash
# Create a new Vue project
npx -y create-vue@latest

# Install dependencies
npm install

# Run the development server
npm run dev
```

> ### Option 2: Using a CDN script
> For simple projects, you can use the CDN instead of npm. But most of the time you will use npm as shown above. This is the script you need to add to your HTML: 
> ```html
> <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
> ```
> Like here: 
> ```html
> <!DOCTYPE html>
> <html lang="en">
> <head>
>     <title>Vue.js Basics</title>
>     <link rel="stylesheet" href="styles.css"/>
>     <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
> </head>
> <body>
>     <div id="app">
>         <header>
>             <span>👋🏻</span>
>         </header>
>         <main>
>             <h1>Hello, {{name}}</h1>
>             <p>I'm about to learn <a href="https://vuejs.org/" target="_blank">Vue.js</a>!</p>
>         </main>
>         <footer>
>             <p>&copy; 2026</p>
>         </footer>
>     </div>
>     <script>
>         const { createApp, ref } = Vue;
>         createApp({
>             setup() {
>                 const name = ref("Rachel")
>                 return { name }
>             }
>         }).mount("#app")
>     </script>
> </body>
> </html>
> ```
> As you can see in the example, this way you don't need dependencies, but it's more verbose: you need to wrap your html in a `div#app` and in the js you need to mount the `createApp()` function to the `div#app`, and return each one of the refs.

## Vue Components

Components are reusable pieces of UI that can be used in different parts of the application. They are the building blocks of a Vue application.

In the `<script setup>` tag you write your JS code, in the `<template>` tag you write your HTML code, and in the `<style>` tag you write your CSS code. Example:

```html
<script setup>
    const name = ref("Rachel")
</script>

<template>
    <h1>Hello, {{name}}</h1>
</template>

<style>
    h1 {
        color: red;
    }
</style>
```