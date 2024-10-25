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

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
