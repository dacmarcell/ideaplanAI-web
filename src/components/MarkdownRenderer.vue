<script setup lang="ts">
import LoadingData from './LoadingData.vue'
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input
      type="text"
      v-model="text"
      placeholder="Descreva o projeto..."
      class="form-input"
    />
    <button type="submit" class="form-button">Enviar</button>
    <div v-if="loading" class="loading">
      <p>Carregando...</p>
      <p><LoadingData /></p>
    </div>
    <div v-else-if="error" class="error" v-html="error"></div>
    <div v-else-if="markdown" class="markdown-content">
      <div v-html="renderedMarkdown"></div>
    </div>
  </form>
</template>

<style scoped>
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

.loading,
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
        .then(response => {
          this.markdown = response.data
          this.renderedMarkdown = this.md.render(this.markdown)
        })
        .catch(error => {
          this.error = error
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
