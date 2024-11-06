<script setup lang="ts">
import LoadingData from './LoadingData.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="row">
      <input
        type="text"
        v-model="text"
        placeholder="Descreva o projeto..."
        class="form-input"
      />
      <button @ckick="onMicrophoneClick" class="form-btn">
        <FontAwesomeIcon :icon="faMicrophone" class="icon microphone-icon" />
      </button>
    </div>
    <button type="submit" class="form-button">Enviar</button>
    <div v-if="loading" class="loading">
      <p>Carregando...</p>
      <LoadingData />
    </div>
    <div v-else-if="error" class="error" v-html="error"></div>
    <div v-if="renderedMarkdown" class="markdown-content">
      <div v-html="renderedMarkdown"></div>
    </div>
  </form>
</template>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.form-input {
  outline: none;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  font-size: 20px;
  font-family: var(--font-primary);
  resize: none;
  overflow: hidden;
  transition: border 0.3s;
}
.form-input:focus {
  border: 1px solid var(--background-secoundary-color);
}
.form-btn {
  background-color: transparent;
  border: none;
}
.microphone-icon {
  cursor: pointer;
  color: var(--background-secoundary-color);
  font-size: 24px;
}
.form-button {
  font-family: var(--font-primary);
  font-size: 18px;
  font-weight: 100;
  letter-spacing: 1.5px;
  padding: 10px 20px;
  background-color: var(--background-secoundary-color);
  color: white;
  border: none;
  cursor: pointer;
  width: 100%;
}

.loading {
  text-align: center;
  font-size: 18px;
}

.error {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
}

.markdown-content {
  margin-top: 20px;
  font-family: 'Georgia', serif;
  line-height: 1.6;
  code {
    background-color: #f0f0f0;
    padding: 2px 5px;
  }
}
</style>

<script lang="ts">
import axios from 'axios'
import MarkdownIt from 'markdown-it'

export default {
  data() {
    return {
      text: '',
      loading: false,
      error: '',
      markdown: '',
      renderedMarkdown: '',
      md: new MarkdownIt(),
    }
  },
  mounted() {
    const localMarkdown = localStorage.getItem('markdown')
    if (localMarkdown) {
      this.renderedMarkdown = this.md.render(localMarkdown)
    }
  },
  methods: {
    onSubmit() {
      this.loading = true
      this.error = ''
      this.markdown = ''

      const apiUrl = import.meta.env.VITE_API_URL
      if (!apiUrl) {
        this.error = 'URL da API ausente no env.'
        this.loading = false
        return
      }

      axios
        .post(apiUrl, { text: this.text })
        .then(res => {
          const { category, plan } = res.data
          this.markdown = plan
          console.log({ category })
          this.renderedMarkdown = this.md.render(this.markdown)
          localStorage.setItem('markdown', this.markdown)
        })
        .catch(error => {
          this.error = error
        })
        .finally(() => {
          this.loading = false
        })
    },
    onMicrophoneClick() {
      console.log('Microphone clicked')
    },
  },
}
</script>
