<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { useRoute } from 'vue-router'
import IdeaPlanAiLogo from './IdeaPlanAiLogo.vue'

const currentRoute = useRoute()
const linkedinURL = 'https://www.linkedin.com/in/marcell-dactes/'

const routes = [{ name: 'Chat', path: '/' }]

const getBtnClass = (btnPath: string) =>
  currentRoute.path === btnPath ? 'active-btn' : 'inactive-btn'
</script>

<template>
  <header class="header">
    <IdeaPlanAiLogo />
    <nav class="nav">
      <router-link
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        :class="getBtnClass(route.path)"
        class="nav-link"
      >
        <span class="nav-text">{{ route.name }}</span>
        <span class="nav-indicator"></span>
      </router-link>
      <a :href="linkedinURL" target="_blank" class="nav-link contact">
        <span class="nav-text">Contato</span>
        <FontAwesomeIcon :icon="faExternalLinkAlt" class="icon" />
        <span class="nav-indicator"></span>
      </a>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.5rem 2rem;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-glow);
  position: relative;
  z-index: 100;
  animation: slideDown 0.6s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  position: relative;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  color: var(--text-secondary-color);
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link::before {
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

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  color: var(--text-primary-color);
  transform: translateY(-2px);
}

.nav-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 80%;
  height: 2px;
  background: var(--neon-green);
  box-shadow: 0 0 10px var(--neon-green);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 2px;
}

.nav-link.active-btn .nav-indicator,
.nav-link:hover .nav-indicator {
  transform: translateX(-50%) scaleX(1);
}

.active-btn {
  color: var(--neon-green) !important;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}

.inactive-btn {
  color: var(--text-secondary-color);
}

.contact {
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
}

.contact:hover {
  background: rgba(0, 255, 136, 0.2);
  box-shadow: var(--shadow-neon);
  border-color: var(--neon-green);
}

.icon {
  width: 12px;
  height: 12px;
  transition: transform 0.3s;
}

.contact:hover .icon {
  transform: translate(2px, -2px);
}

.nav-text {
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  .nav {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .nav-link {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
