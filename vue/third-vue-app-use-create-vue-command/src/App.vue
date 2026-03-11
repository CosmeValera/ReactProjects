<script setup>
/*
CHALLENGE: Make the copyright year dynamic and blue
IN SCRIPT: Create a new ref to house a different year
IN TEMPLATE: Change the static "2025" to render the new ref
IN STYLE: Target the paragraph tag in the footer and make it blue 
*/
  import {ref} from 'vue'
  const name = ref('Rachel')
  const emoji = ref('✌🏻')
  const year = ref('2026')
</script>

<template>
  <header>
    <span>{{emoji}}</span>
  </header>

  <main>
    <h1>Hello, {{name}}!</h1>
    <p>I'm about to learn <a href="https://vuejs.org/" target="_blank">Vue.js</a>!</p>
  </main>

  <footer>
    <p>&copy; {{year}}</p>
  </footer>
</template>

<style scoped>
  header span{
    font-size:3rem;
  }
  main h1{
      display:block;
  }
  main a{
      color: #42B883;
  }
  footer {
      position:fixed;
      bottom:0;
      padding-bottom:20px;
  }
  footer p {
      color: blue;
  }
</style>
