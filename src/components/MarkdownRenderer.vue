<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input
        type="text"
        v-model="text"
        placeholder="Descreva o projeto..."
        class="form-input"
      />
      <button type="submit" class="form-button">Enviar</button>
      <div v-if="loading" class="loading">Carregando...</div>
      <div v-else-if="error" class="error" v-html="error"></div>
      <div v-else-if="markdown" class="markdown-content">
        <div v-html="renderedMarkdown"></div>
      </div>
    </form>
  </div>
</template>

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

<style scoped>
.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.form-button {
  padding: 10px 20px;
  background-color: #4caf50;
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
  /* Adicione estilos para o conteúdo do markdown aqui */
  font-family: 'Georgia', serif;
  line-height: 1.6;
  code {
    background-color: #f0f0f0;
    padding: 2px 5px;
  }
  /* Adicione mais estilos para outros elementos do markdown (cabeçalhos, listas, etc.) */
}
</style>
