<script setup></script>

<template>
  <section>
    <!-- Absolute path to /public folder -->
    <p>Absolute path to /public folder</p>
  </section>
  
  <section>
    <!-- Relative path to /public folder -->
    <p>Relative path to /public folder</p>
  </section>
  
  <section>
    <!-- Import path to /public folder -->
    <p>Import path to /public folder</p>
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
