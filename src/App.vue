<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopHeader from './components/TopHeader.vue'
</script>

<template>
  <div class="app-wrapper">
    <div class="animated-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>
    <div class="container">
      <TopHeader />
    </div>
    <div class="router-view-wrapper">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.app-wrapper {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: float 20s ease-in-out infinite;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: var(--neon-green);
  top: -200px;
  left: -200px;
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: var(--neon-blue);
  bottom: -150px;
  right: -150px;
  animation-delay: 7s;
}

.orb-3 {
  width: 350px;
  height: 350px;
  background: var(--neon-purple);
  top: 50%;
  right: 10%;
  animation-delay: 14s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(50px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-30px, 30px) scale(0.9);
  }
}

.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 10;
  padding: 2rem 3rem;
}

.router-view-wrapper {
  position: relative;
  z-index: 10;
  padding: 0 3rem 3rem;
}

@media (max-width: 768px) {
  .container {
    padding: 1.5rem;
  }

  .router-view-wrapper {
    padding: 0 1.5rem 2rem;
  }
}
</style>
