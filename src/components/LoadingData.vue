<template>
  <div class="loading">
    <div class="spinner"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.8);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
}

.spinner {
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left-color: var(--background-secoundary-color);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
