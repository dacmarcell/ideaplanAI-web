<template>
  <div class="container">
    <p v-html="mdText" class="text"></p>
  </div>
</template>

<style scoped>
.text {
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
  word-break: break-all;
}
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import MarkdownIt from 'markdown-it'

export default defineComponent({
  data() {
    return {
      text: '## Transforme suas ideias em projetos com IA\n ### Uma ferramenta de IA que auxilia na transformação de ideias em projetos reais, fornecendo análises detalhadas e precisas. \n ### Funcionalidades\n\n - **Análise de requisitos**: Identifica requisitos funcionais e não funcionais. \n - **Estimativa de tempo**: Fornece uma estimativa de tempo para cada etapa do projeto. \n - **Recomendação de tecnologias**: Sugere as melhores tecnologias para a implementação. \n\n ### Exemplo de Fluxo Operacional \n 1. **Input do usuário:** \n O usuário descreve seu projeto, por exemplo: \n\n > "Quero um sistema de gerenciamento de tarefas para equipes, onde os usuários podem criar, editar e excluir tarefas, definir prazos, atribuir membros e ter uma visão do progresso geral com gráficos. Ele precisa ser seguro e capaz de suportar muitos usuários simultâneos." \n 2. **Processamento do input:** \n O modelo processa a entrada fornecida. \n 3. **Resposta:** \n A aplicação retorna uma resposta em Markdown, contendo os detalhes solicitados (requisitos, estimativas, tecnologias). \n\n ### Modelo Utilizado \n - **Nvidia LLaMA Nemotron 70B Instruct**',
      md: new MarkdownIt(),
      mdText: '',
    }
  },
  mounted() {
    this.mdText = this.md.render(this.text)
  },
})
</script>
