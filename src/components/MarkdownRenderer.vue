<script setup lang="ts">
import LoadingData from './LoadingData.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import MarkdownIt from 'markdown-it'

const text = ref('')
const error = ref('')
const markdown = ref('')
const renderedMarkdown = ref('')
const loading = ref(false)
const md = new MarkdownIt()

onMounted(() => {
  const localMarkdown = localStorage.getItem('markdown')
  if (localMarkdown) {
    renderedMarkdown.value = md.render(localMarkdown)
  }
})

const onSubmit = () => {
  if (!text.value.trim()) {
    return
  }

  loading.value = true
  error.value = ''
  renderedMarkdown.value = ''

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  axios
    .post(`${apiUrl}/`, { text: text.value })
    .then(res => {
      console.log('Resposta completa da API:', res.data)

      // Tenta diferentes formatos de resposta
      let planContent = ''

      if (res.data.plan) {
        planContent = res.data.plan
      } else if (res.data.data && res.data.data.plan) {
        planContent = res.data.data.plan
      } else if (typeof res.data === 'string') {
        planContent = res.data
      } else {
        // Se não encontrar 'plan', tenta usar a resposta inteira
        planContent = JSON.stringify(res.data, null, 2)
      }

      if (!planContent) {
        throw new Error('Resposta da API não contém dados válidos')
      }

      markdown.value = planContent
      renderedMarkdown.value = md.render(markdown.value)

      localStorage.setItem('markdown', markdown.value)

      // Scroll para a resposta após renderizar
      setTimeout(() => {
        const markdownElement = document.querySelector('.markdown-content')
        if (markdownElement) {
          markdownElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    })
    .catch(err => {
      console.error('Erro na requisição:', err)
      console.error('Detalhes do erro:', err.response?.data || err.message)

      if (err.response) {
        // Erro com resposta do servidor
        error.value =
          err.response.data?.message ||
          err.response.data?.error ||
          `Erro ${err.response.status}: ${err.response.statusText}`
      } else if (err.request) {
        // Erro de rede
        error.value = 'Erro de conexão. Verifique se o servidor está rodando.'
      } else {
        // Outro erro
        error.value = err.message || 'Erro ao processar solicitação'
      }
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="markdown-renderer">
    <form @submit.prevent="onSubmit" class="form-container">
      <div class="input-wrapper">
        <div class="input-container">
          <textarea
            v-model="text"
            class="form-input"
            placeholder="Descreva seu projeto aqui... Ex: Quero criar um sistema de gerenciamento de tarefas..."
            rows="4"
          ></textarea>
          <div class="input-glow"></div>
        </div>
      </div>

      <button
        type="submit"
        class="form-button"
        :disabled="loading || !text.trim()"
      >
        <span class="button-content">
          <span v-if="loading" class="button-spinner"></span>
          <span class="button-text">
            <span v-if="!loading">Enviar</span>
            <span v-else>Processando...</span>
          </span>
        </span>
        <span class="button-glow"></span>
        <span class="button-shine"></span>
      </button>

      <div v-if="loading" class="loading-container">
        <p class="loading-text">Analisando seu projeto com IA...</p>
        <LoadingData />
      </div>

      <div v-else-if="error" class="error-container">
        <div class="error-content">
          <span class="error-icon">⚠️</span>
          <div class="error-message" v-html="error"></div>
        </div>
      </div>

      <div
        v-if="renderedMarkdown && !loading"
        class="markdown-content"
        :class="{ visible: renderedMarkdown }"
      >
        <div class="markdown-wrapper" v-html="renderedMarkdown"></div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.markdown-renderer {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-wrapper {
  position: relative;
}

.input-container {
  position: relative;
  width: 100%;
}

.form-input {
  width: 100%;
  padding: 1.25rem 1.5rem;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg);
  font-size: 1rem;
  font-family: var(--font-primary);
  color: var(--text-primary-color);
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  line-height: 1.6;
}

.form-input::placeholder {
  color: var(--text-muted);
}

.form-input:focus {
  border-color: var(--neon-green);
  box-shadow:
    0 0 0 3px rgba(0, 255, 136, 0.1),
    var(--shadow-neon);
  background: rgba(255, 255, 255, 0.08);
}

.input-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: var(--border-radius-lg);
  background: linear-gradient(135deg, var(--neon-green), var(--neon-blue));
  opacity: 0;
  filter: blur(20px);
  transition: opacity 0.3s;
  z-index: -1;
}

.form-input:focus ~ .input-glow {
  opacity: 0.3;
}

.form-button {
  position: relative;
  padding: 1.25rem 2.5rem;
  background: linear-gradient(135deg, var(--neon-green), var(--neon-blue));
  color: var(--text-primary-color);
  border: none;
  border-radius: var(--border-radius-lg);
  font-size: 1.1rem;
  font-weight: 600;
  font-family: var(--font-primary);
  letter-spacing: 1px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-neon);
  text-transform: uppercase;
}

.form-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow:
    0 0 30px rgba(0, 255, 136, 0.5),
    0 10px 40px rgba(0, 0, 0, 0.3);
}

.form-button:active:not(:disabled) {
  transform: translateY(0);
}

.form-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}

.form-button:disabled:hover {
  box-shadow: var(--shadow-neon);
}

.button-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.button-text {
  position: relative;
}

.button-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.button-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
  border-radius: 50%;
  transition:
    width 0.6s,
    height 0.6s;
}

.form-button:hover:not(:disabled) .button-glow {
  width: 300px;
  height: 300px;
}

.button-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transform: rotate(45deg);
  transition: left 0.6s;
}

.form-button:hover:not(:disabled) .button-shine {
  left: 100%;
}

.loading-container {
  text-align: center;
  padding: 2rem;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg);
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.loading-text {
  font-size: 1.1rem;
  color: var(--text-secondary-color);
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.error-container {
  padding: 1.5rem;
  background: rgba(255, 107, 157, 0.1);
  border: 1px solid rgba(255, 107, 157, 0.3);
  border-radius: var(--border-radius-lg);
  animation: shake 0.5s ease-out;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
}

.error-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--neon-pink);
}

.error-icon {
  font-size: 1.5rem;
}

.error-message {
  flex: 1;
  font-size: 1rem;
  line-height: 1.6;
}

.markdown-content {
  margin-top: 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.markdown-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.markdown-wrapper {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg);
  padding: 2.5rem;
  box-shadow: var(--shadow-glow);
  line-height: 1.8;
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.markdown-wrapper :deep(h1),
.markdown-wrapper :deep(h2),
.markdown-wrapper :deep(h3) {
  color: var(--neon-green);
  margin: 2rem 0 1rem;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
}

.markdown-wrapper :deep(h1) {
  font-size: 2rem;
  border-bottom: 2px solid var(--neon-green);
  padding-bottom: 0.5rem;
}

.markdown-wrapper :deep(h2) {
  font-size: 1.75rem;
}

.markdown-wrapper :deep(h3) {
  font-size: 1.5rem;
  color: var(--neon-blue);
}

.markdown-wrapper :deep(p) {
  margin: 1rem 0;
  color: var(--text-secondary-color);
  line-height: 1.8;
}

.markdown-wrapper :deep(ul),
.markdown-wrapper :deep(ol) {
  margin: 1.5rem 0;
  padding-left: 2rem;
}

.markdown-wrapper :deep(li) {
  margin: 0.75rem 0;
  color: var(--text-secondary-color);
  line-height: 1.8;
}

.markdown-wrapper :deep(strong) {
  color: var(--neon-green);
  font-weight: 600;
}

.markdown-wrapper :deep(code) {
  background: rgba(0, 255, 136, 0.1);
  color: var(--neon-green);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  border: 1px solid rgba(0, 255, 136, 0.2);
}

.markdown-wrapper :deep(pre) {
  background: rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  overflow-x: auto;
  border: 1px solid var(--glass-border);
  margin: 1.5rem 0;
}

.markdown-wrapper :deep(pre code) {
  background: transparent;
  border: none;
  padding: 0;
}

.markdown-wrapper :deep(blockquote) {
  border-left: 4px solid var(--neon-green);
  padding-left: 1.5rem;
  margin: 1.5rem 0;
  color: var(--text-secondary-color);
  font-style: italic;
  background: rgba(0, 255, 136, 0.05);
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius);
}

@media (max-width: 768px) {
  .form-input {
    padding: 1rem;
    font-size: 0.95rem;
  }

  .form-button {
    padding: 1rem 2rem;
    font-size: 1rem;
  }

  .markdown-wrapper {
    padding: 1.5rem;
  }

  .markdown-wrapper :deep(h1) {
    font-size: 1.75rem;
  }

  .markdown-wrapper :deep(h2) {
    font-size: 1.5rem;
  }

  .markdown-wrapper :deep(h3) {
    font-size: 1.25rem;
  }
}
</style>
