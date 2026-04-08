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
    import { ref } from 'vue';
    const quote = ref("First, solve the problem. Then write the code.")
    const author = ref("John Johnson")
    
    author.value = "J.K. Rowling" // change reactively
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
You cannot parse a value directly inside an attribute like this `<a href="{{ href }}">`, since then it would literally have the value `{{ href }}>`, but we want to have the value `https://scrimba.com`. In order to do it correctly we use the `v-bind`:
```html
<script setup>
  import { ref } from 'vue'
  const href = ref("https://scrimba.com")
</script>

<template>
  <footer>
      <!-- Wrong!! -->
      Created by <a href="{{ href }}"><span>Professor Pickle</span></a> &copy; {{year}} 

      <!-- Correct -->
      Created by <a v-bind:href="href"><span>Professor Pickle</span></a> &copy; {{year}}
  </footer>
</template>
```

It also works for booleans:
```html
<script setup>
    import { ref } from 'vue';
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
    import { ref } from 'vue';
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

### Images
Three options: *1- Absolute path to /public folder, 2- Relative path to /assets folder, 3- Import asset into component.* Examples:

```html
<script setup>
  import catmeme3_a from '@/assets/images/catmeme3_a.png'
  import src from '@/assets/images/catmeme3_b.png'
</script>

<template>
  <section>
    <!-- 1-Absolute path to /public folder -->
    <img src="/images/catmeme1_a.png" alt=""/>
    <img src="/images/catmeme1_b.png" alt=""/>
  </section>
  
  <section>
    <!-- 2-Relative path to /public folder -->
    <img src="@/assets/images/catmeme2_a.png" alt=""/>
    <img src="@/assets/images/catmeme2_b.png" alt=""/>
  </section>
  
  <section>
    <!-- 3-Import path to /public folder -->
    <img v-bind:src="catmeme3_a" alt=""/>    
    <img :src alt=""/>  <!-- Applying both shorthands for catmeme3_b-->
  </section>
</template>

<style scoped>
  section {
    display:grid;
    grid-template-columns:1fr 1fr;
    padding:10px;
    background:white;
    border-radius:10px;
  }
  img{
    width:100%;
  }
</style>
```

<img src="./5-vue-app-images-and-assets/src/assets/images/result.png" width="400"/>

> **Pros and cons:**
>  - **1- Absolute path to /public folder**: No vite optimization, harder to organise, useful for large or static assets that don't need optimization.
>  - **2- Relative path to /assets folder**: No vite optimization, useful for small or static assets (like a logo).
>  - **3- Import asset into component**: More verbose, but optimized by vite, conditional loading, useful for dynamic images (like product photos).

> [!NOTE]
>
> The tutorial I followed has been completed. From here until the end the extra information has been added by Claude

## Computed Properties
`computed()` creates derived reactive values. It's cached and only recalculates when its dependencies change. Equivalent to Angular's `computed()` or React's `useMemo`:

```html
<script setup>
import { ref, computed } from 'vue'

const price = ref(100)
const tax = ref(0.21)
const total = computed(() => price.value * (1 + tax.value))
</script>

<template>
  <p>Total: {{ total }}</p>
</template>
``` 

> Unlike `ref()`, you don't use `.value` in the template for computed properties, same as regular refs actually, but worth noting that computed values are **read-only** by default.

## Watch

### `watch()`
Explicitly watches one or more reactive sources and runs a callback when they change. You get the old and new values:
```html
<script setup>
import { ref, watch } from 'vue'

const username = ref('Rachel')

watch(username, (newVal, oldVal) => {
  console.log(`Changed from ${oldVal} to ${newVal}`)
})
</script>
```

Watch multiple sources at once:
```js
watch([price, tax], ([newPrice, newTax], [oldPrice, oldTax]) => {
  console.log('price or tax changed')
})
```

### `watchEffect()`
Auto-tracks whatever reactive values are read inside the callback — no need to specify dependencies explicitly. Equivalent to Angular's `effect()`:
```js
import { watchEffect } from 'vue'

watchEffect(() => {
  console.log('username is now:', username.value) // auto-tracked
})
```

**`watch` vs `watchEffect`:**
| | `watch` | `watchEffect` |
|---|---|---|
| Dependencies | Explicit | Auto-tracked |
| Old value access | ✅ Yes | ❌ No |
| Runs immediately | ❌ No (by default) | ✅ Yes |
| Good for | Reacting to specific changes | Syncing side effects |

## reactive()
An alternative to `ref()` for objects. No `.value` needed, but the whole object is reactive:
```js
import { reactive } from 'vue'

const user = reactive({ name: 'Rachel', age: 25 })
user.name = 'John' // no .value needed
```

**`ref()` vs `reactive()`:**
| | `ref()` | `reactive()` |
|---|---|---|
| Works with | Any type | Objects/arrays only |
| Access | `.value` in JS, not in template | Direct access always |
| Reassignable | ✅ Yes | ❌ No |
| Recommended | ✅ Generally preferred | For complex objects |

> `ref()` is generally preferred now since it works with any type and is more consistent. Use `reactive()` when you have a group of related state that always changes together.

## Template Directives

### `v-model` (two-way binding)
Equivalent to Angular's `[(ngModel)]`. Syncs an input with a reactive variable in both directions:
```html
<script setup>
import { ref } from 'vue'
const username = ref('')
</script>

<template>
  <input v-model="username" placeholder="Enter username" />
  <p>Hello, {{ username }}</p>
</template>
```

### `v-if`, `v-else-if`, `v-else` and `v-show`
```html
<p v-if="isLoggedIn">Welcome, {{ username }}</p>
<p v-else>Please log in</p>
```

Important distinction:
- `v-if`: destroys and recreates the DOM node. Use when the condition rarely changes.
- `v-show`: toggles `display: none`. Use when toggling frequently.

### `v-for`
List rendering. Always use `:key` — same concept as React's `key` prop:
```html
<ul>
  <li v-for="game in games" :key="game.id">{{ game.name }}</li>
</ul>
```

> Avoid using `v-if` and `v-for` on the same element. `v-if` takes priority in Vue 3, which can lead to unexpected behavior. Wrap with a `<template>` tag instead:
> ```html
> <template v-for="game in games" :key="game.id">
>   <li v-if="game.active">{{ game.name }}</li>
> </template>
> ```

### Event modifiers
Vue's quality-of-life feature — neither React nor Angular has this. Append modifiers directly to event handlers instead of writing boilerplate inside the handler:
```html
<form @submit.prevent="onSubmit">     <!-- e.preventDefault() -->
<button @click.stop="doThis">         <!-- e.stopPropagation() -->
<button @click.once="doThis">         <!-- fires only once -->
<input @keyup.enter="submit">         <!-- key filtering -->
<button @click.self="doThis">         <!-- only if target is the element itself -->
```

## Component Communication

### Props (`defineProps`)
Equivalent to Angular's `@Input()`. Pass data down from parent to child:
```html
<!-- Parent -->
<script setup>
import GameList from '@/components/GameList.vue'
const username = ref('Rachel')
</script>

<template>
  <GameList :username="username" />
</template>
```

```html
<!-- GameList.vue (child) -->
<script setup>
const props = defineProps({
  username: String
})
</script>

<template>
  <h3>{{ props.username }}'s games</h3>
</template>
```

With TypeScript you can use the generic syntax instead: `defineProps<{ username: string }>()`.

### Emits (`defineEmits`)
Equivalent to Angular's `@Output()`. Send events up from child to parent:
```html
<!-- Child -->
<script setup>
const emit = defineEmits(['gamePicked'])

function pick(name) {
  emit('gamePicked', name)
}
</script>

<template>
  <li @click="pick(game.name)">{{ game.name }}</li>
</template>
```

```html
<!-- Parent -->
<template>
  <p>Picked: {{ pickedGame }}</p>
  <GameList :username @gamePicked="onGamePicked" />
</template>

<script setup>
const pickedGame = ref('')
function onGamePicked(name) {
  pickedGame.value = name
}
</script>
```

### `provide` / `inject`
Equivalent to Angular's dependency injection — pass data deep down the component tree without prop drilling:
```html
<!-- Ancestor component -->
<script setup>
import { provide, ref } from 'vue'
const theme = ref('dark')
provide('theme', theme)
</script>
```

```html
<!-- Any deeply nested descendant -->
<script setup>
import { inject } from 'vue'
const theme = inject('theme')
</script>

<template>
  <p>Current theme: {{ theme }}</p>
</template>
```

> `provide`/`inject` is great for things like themes, auth state, or app-wide config. For full-scale state management, use **Pinia** (Vue's equivalent of Redux/NgRx).

## Lifecycle Hooks
Equivalent to Angular's lifecycle hooks. Import and call them inside `<script setup>`:

| Vue | Angular equivalent | When it runs |
|---|---|---|
| `onMounted` | `ngAfterViewInit` | After the component's DOM is inserted |
| `onUpdated` | — | After a reactive change causes a DOM update |
| `onUnmounted` | `ngOnDestroy` | Just before the component is destroyed |
| `onBeforeMount` | — | Just before the DOM is inserted |
| `onBeforeUpdate` | — | Just before a DOM update |

```html
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const timer = ref(null)

onMounted(() => {
  console.log('DOM is ready')
  timer.value = setInterval(() => console.log('tick'), 1000)
})

onUnmounted(() => {
  clearInterval(timer.value) // clean up to avoid memory leaks
})
</script>
```

> Unlike Angular, there's no `ngOnChanges` equivalent for watching prop changes. Use `watch(() => props.username, callback)` instead.

## Slots
Vue's equivalent of React's `children` prop or Angular's `ng-content`. Lets a parent inject content into a child component.

### Default slot
```html
<!-- Card.vue (child) -->
<template>
  <div class="card">
    <slot />   <!-- parent content renders here -->
  </div>
</template>
```

```html
<!-- Parent -->
<Card>
  <p>This content goes inside the card</p>
</Card>
```

### Named slots
For multiple injection points:
```html
<!-- Card.vue -->
<template>
  <div class="card">
    <header><slot name="header" /></header>
    <main><slot /></main>         <!-- default slot -->
    <footer><slot name="footer" /></footer>
  </div>
</template>
```

```html
<!-- Parent -->
<Card>
  <template #header><h2>Title</h2></template>
  <p>Main body content</p>
  <template #footer><p>Footer text</p></template>
</Card>
```

> `#header` is shorthand for `v-slot:header`, same shorthand pattern as `:` for `v-bind` and `@` for `v-on`.