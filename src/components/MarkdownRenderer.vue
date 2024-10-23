<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input
        type="text"
        v-model="projeto"
        placeholder="Descreva o projeto..."
        class="form-input"
      />
      <button type="submit" class="form-button">Enviar</button>
      <div v-if="loading" class="loading">Carregando...</div>
      <div v-else-if="error" class="error">Erro ao carregar o markdown</div>
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
      projeto: '',
      loading: false,
      error: null,
      markdown: null,
      renderedMarkdown: null,
      md: new MarkdownIt(),
    }
  },
  methods: {
    onSubmit() {
      this.loading = true
      this.error = null
      this.markdown = null

      axios
        .post('http://localhost:3000/', { project: this.projeto })
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
  border-radius: 4px;
  margin-bottom: 10px;
}

.form-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
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
