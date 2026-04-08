<script setup>
  import catmeme3_a from '@/assets/images/catmeme3_a.png'
  import src from '@/assets/images/catmeme3_b.png'
</script>

<template>
  <section>
    <!-- Absolute path to /public folder -->
    <img src="/images/catmeme1_a.png" alt=""/>
    <img src="/images/catmeme1_b.png" alt=""/>
  </section>
  
  <section>
    <!-- Relative path to /public folder -->
    <img src="@/assets/images/catmeme2_a.png" alt=""/>
    <img src="@/assets/images/catmeme2_b.png" alt=""/>
  </section>
  
  <section>
    <!-- Import path to /public folder -->
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
