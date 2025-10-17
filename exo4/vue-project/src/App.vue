<script setup lang="ts">
import Header from '@/components/header.vue'
</script>

<template>
  <div class="app">
    <Header />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.app {
  min-height: 100vh;
}

main {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>