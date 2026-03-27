<script setup>
  import {ref} from 'vue'
  const year = ref('2026')
</script>

<template>
  <footer>
    <p>&copy; {{year}}</p>
  </footer>
</template>

<style scoped>
  footer {
      position:fixed;
      bottom:0;
      padding-bottom:20px;
  }
  footer p {
      color: blue;
  }
</style>