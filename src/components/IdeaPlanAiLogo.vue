<template>
  <h1 class="logo">
    Idea<span class="accent">P</span>lan<span class="accent">AI</span>
    <span class="glow"></span>
  </h1>
</template>

<style scoped>
.logo {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 400;
  letter-spacing: 2px;
  color: var(--text-primary-color);
  position: relative;
  display: inline-block;
  animation: fadeInScale 0.8s ease-out;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.accent {
  color: var(--neon-green);
  text-shadow:
    0 0 10px var(--neon-green),
    0 0 20px var(--neon-green),
    0 0 30px var(--neon-green);
  animation: pulse 2s ease-in-out infinite;
  display: inline-block;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    filter: brightness(1);
  }
  50% {
    opacity: 0.8;
    filter: brightness(1.2);
  }
}

.glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, var(--neon-green) 0%, transparent 70%);
  opacity: 0.2;
  filter: blur(20px);
  z-index: -1;
  animation: glowPulse 3s ease-in-out infinite;
}

@keyframes glowPulse {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.1);
  }
}

@media (max-width: 768px) {
  .logo {
    font-size: 2rem;
    letter-spacing: 1px;
  }
}
</style>
