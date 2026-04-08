<!-- Tutorial scrimba: https://scrimba.com/learn-vue-c0jrrpaasr (this is the yt video, tho scrimba is better: https://www.youtube.com/watch?v=Kt2E8nblvXU)-->

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
    import { ref } from 'vue'
    const name = ref("Rachel")
</script>

<template>
    <h1>Hello, {{name}}</h1>
</template>

<style scoped>
    h1 {
        color: red;
    }
</style>
```

### Importing Components

Import in `<script setup>` and use directly in the template:
```html
<!-- App.vue -->
<script setup>
  import Header from '@/components/Header.vue'
</script>

<template>
  <Header />
  <!-- Other components like <Main /> or <Footer /> -->
</template>
```

```html
<!-- Header.vue -->
<script setup>
  import { ref } from 'vue'
  const emoji = ref('✌🏻')
</script>

<template>
  <header>
    <span>Hello! {{emoji}}</span>
  </header>
</template>

<style scoped>
  header span {
    font-size:3rem;
  }
</style>
```

> `@` is an alias for `src/`

### Reactive variables in Vue
To create reactive variables we use `ref()`. Reactive variables mean that if you change the value of it, it will also change in the Interface dynamically. Code example:

```html
<script setup>
    import {ref} from 'vue';
    const quote = ref("First, solve the problem. Then write the code.")
    const author = ref("John Johnson")
</script>

<template>
    <main>
        <section>
            <p>{{ quote }}</p>
            <span>{{ author}}</span>
        </section>
        <button>Another!</button>
    </main>
</template>

<style scoped>
main {
    background: #CCD6D9;
}
</style>
```

### Attribute binding `v-bind`
This is wrong `<a href="{{ href }}">`, since it would literrally transform to the value `{{ href }}>` instead of `https://scrimba.com` which is the objective:
```html
<script setup>
  import {ref} from 'vue'
  const href = ref("https://scrimba.com")
  year.value = "2014"
</script>

<template>
  <footer>
      Created by <a href="{{ href }}"><span>Professor Pickle</span></a> &copy; {{year}}
  </footer>
</template>
```

In order to do it correctly we use the `v-bind`:
```html
<script setup>
  import {ref} from 'vue'
  const href = ref("https://scrimba.com")
  year.value = "2014" // change reactively
</script>

<template>
  <footer>
      Created by <a v-bind:href="href"><span>Professor Pickle</span></a> &copy; {{year}}
  </footer>
</template>
```

It also works for booleans:
```html
<script setup>
    import {ref} from 'vue';
    const isBtnDisabled = ref(true)
</script>

<template>
  <button v-bind:disabled="isBtnDisabled">Share</button>
</template>
```

### Vue Shorthands
**Shorthand 1:** you can use a shorthand to get rid of the first part, in this case from `v-bind:disabled` to just `:disabled`. Like this:
```html
<script setup>
    import {ref} from 'vue';
    const isBtnDisabled = ref(true)
</script>

<template>
  <button :disabled="isBtnDisabled">Share</button>
</template>
```

**Shortand 2:** if the attribute and the value is the same, you can get rid of the value too. From tihs `:href="href` to just `:href`.
```html
<!-- Longest option -->
<a v-bind:href=":href"></a

<!-- Shorthand v-bind -->
<a :href=":href"></a

<!-- Shortest way -->
<a :href></a
```