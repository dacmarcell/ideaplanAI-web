<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopHeader from './components/TopHeader.vue'
</script>

<template>
  <div class="container">
    <TopHeader />
  </div>
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

* {
  border-radius: var(--border-radius);
  color: var(--text-primary-color);
}
body {
  font-family: 'Bebas Neue', sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--background-primary-color);
}
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
