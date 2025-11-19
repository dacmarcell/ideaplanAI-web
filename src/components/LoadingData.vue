<template>
  <div class="loading">
    <div class="spinner-container">
      <div class="spinner-ring ring-1"></div>
      <div class="spinner-ring ring-2"></div>
      <div class="spinner-ring ring-3"></div>
      <div class="spinner-core"></div>
    </div>
    <div class="loading-particles">
      <div
        class="particle"
        v-for="n in 12"
        :key="n"
        :style="{ '--delay': n * 0.1 + 's' }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
}

.spinner-container {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner-ring {
  position: absolute;
  border-radius: 50%;
  border: 3px solid transparent;
  animation: spin 2s linear infinite;
}

.ring-1 {
  width: 80px;
  height: 80px;
  border-top-color: var(--neon-green);
  border-right-color: var(--neon-green);
  animation-duration: 1.5s;
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
}

.ring-2 {
  width: 60px;
  height: 60px;
  border-top-color: var(--neon-blue);
  border-left-color: var(--neon-blue);
  animation-duration: 2s;
  animation-direction: reverse;
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.5);
}

.ring-3 {
  width: 40px;
  height: 40px;
  border-top-color: var(--neon-purple);
  border-bottom-color: var(--neon-purple);
  animation-duration: 1s;
  box-shadow: 0 0 10px rgba(183, 148, 246, 0.5);
}

.spinner-core {
  width: 20px;
  height: 20px;
  background: var(--neon-green);
  border-radius: 50%;
  box-shadow:
    0 0 10px var(--neon-green),
    0 0 20px var(--neon-green),
    0 0 30px var(--neon-green);
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

.loading-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--neon-green);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  box-shadow: 0 0 10px var(--neon-green);
  animation: particleFloat 2s ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes particleFloat {
  0%,
  100% {
    transform: translate(-50%, -50%) rotate(0deg) translateX(40px) rotate(0deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) translateX(40px)
      rotate(-360deg);
    opacity: 0;
  }
}
</style>
