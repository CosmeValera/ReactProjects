<script setup>
  import {ref} from 'vue'
  const year = ref("2025")
  const href = ref("https://scrimba.com")

  year.value = "2014"
  href.value = "mynewpage.com"
</script>

<template>
  <footer>
      Created by <a v-bind:href="href"><span>Professor Pickle</span></a> &copy; {{year}}
  </footer>
</template>

<style scoped>
  footer {
    position:fixed;
    margin: 0 auto;
    bottom:0;
    text-align:center;
    color:#CCD6D9;
    padding-bottom:20px;
  }

  span{
      font-family: cursive;
  }
</style>