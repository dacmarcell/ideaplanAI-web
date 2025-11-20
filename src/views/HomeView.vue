<script setup lang="ts">
import MarkdownRenderer from '../components/MarkdownRenderer.vue'
import { onMounted, ref } from 'vue'

const cardsVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    cardsVisible.value = true
  }, 300)
})
</script>

<template>
  <div class="home-view">
    <div class="hero-section">
      <div class="hero-content" :class="{ visible: cardsVisible }">
        <h2 class="hero-title">
          <span class="title-line">Transforme suas</span>
          <span class="title-line accent">ideias em realidade</span>
        </h2>
        <p class="hero-subtitle">
          Utilize inteligência artificial para transformar suas ideias em
          projetos concretos, com análises precisas e estimativas detalhadas de
          tempo.
        </p>
      </div>

      <div class="features-grid" :class="{ visible: cardsVisible }">
        <div class="feature-card" :style="{ '--delay': '0.1s' }">
          <div class="card-icon">🤖</div>
          <h3 class="card-title">IA Avançada</h3>
          <p class="card-description">
            Tecnologia de ponta para análise inteligente de projetos
          </p>
        </div>

        <div class="feature-card" :style="{ '--delay': '0.2s' }">
          <div class="card-icon">⚡</div>
          <h3 class="card-title">Análise Rápida</h3>
          <p class="card-description">
            Receba recomendações instantâneas sobre requisitos e tecnologias
          </p>
        </div>

        <div class="feature-card" :style="{ '--delay': '0.3s' }">
          <div class="card-icon">📊</div>
          <h3 class="card-title">Estimativas Precisas</h3>
          <p class="card-description">
            Planejamento detalhado com estimativas de tempo por etapa
          </p>
        </div>
      </div>
    </div>

    <div class="md-container" :class="{ visible: cardsVisible }">
      <MarkdownRenderer />
    </div>
  </div>
</template>

<style scoped>
.home-view {
  min-height: calc(100vh - 200px);
  padding: 2rem 0;
}

.hero-section {
  margin-bottom: 4rem;
}

.hero-content {
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-title {
  font-family: var(--font-display);
  font-size: 4rem;
  font-weight: 400;
  letter-spacing: 3px;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.title-line {
  display: block;
  animation: slideInLeft 0.8s ease-out;
}

.title-line.accent {
  color: var(--neon-green);
  text-shadow:
    0 0 20px rgba(0, 255, 136, 0.5),
    0 0 40px rgba(0, 255, 136, 0.3);
  animation: slideInRight 0.8s ease-out;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary-color);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
  font-weight: 300;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.feature-card {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  padding: 2.5rem 2rem;
  border-radius: var(--border-radius-lg);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: var(--delay);
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 255, 136, 0.1),
    transparent
  );
  transition: left 0.5s;
}

.feature-card:hover::before {
  left: 100%;
}

.feature-card:hover {
  transform: translateY(-10px);
  border-color: var(--neon-green);
  box-shadow: var(--shadow-neon), var(--shadow-glow);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 10px rgba(0, 255, 136, 0.3));
  animation: floatIcon 3s ease-in-out infinite;
}

@keyframes floatIcon {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary-color);
}

.card-description {
  color: var(--text-secondary-color);
  line-height: 1.6;
  font-size: 1rem;
}

.md-container {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
  transition-delay: 0.4s;
}

.md-container.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
    letter-spacing: 2px;
  }

  .hero-subtitle {
    font-size: 1.1rem;
    padding: 0 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-card {
    padding: 2rem 1.5rem;
  }
}
</style>
