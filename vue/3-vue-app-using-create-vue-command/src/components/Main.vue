<script setup>
  import {ref} from 'vue';
  const name = ref("Rachel")
</script>

<template>
  <main>
    <h1>Hello, {{name}}!</h1>
    <p>I'm about to learn <a href="https://vuejs.org/" target="_blank">Vue.js</a>!</p>
  </main>
</template>

<style scoped>
  main h1{
      display:block;
  }
  main a{
      color: #42B883;
  }
</style>