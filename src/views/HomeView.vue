<script setup lang="ts">
import MarkdownRenderer from '../components/MarkdownRenderer.vue'
</script>

<template>
  <div class="text-container">
    <h3 class="text">
      Bem-vindo ao IdeaPlanAI, um estimador de tempo para a criação de software.
      Você insere sua ideia e ele fornece diversas informações úteis para você.
    </h3>
    <p class="text">
      Nossa ferramenta utiliza inteligência artificial para transformar suas
      ideias em projetos concretos, oferecendo análises precisas e detalhadas
      que facilitam todo o processo de desenvolvimento. Ao descrever seu
      projeto, você receberá recomendações sobre requisitos funcionais e não
      funcionais, além de estimativas de tempo para cada etapa do seu projeto.
    </p>
    <p class="text">
      Experimente agora e descubra como o IdeaPlanAI pode ajudar você a planejar
      seu próximo software com eficiência!
    </p>
  </div>
  <MarkdownRenderer />
</template>

<style scoped>
.text-container {
  margin: 5%;
}
.text {
  font-size: 20px;
  margin: 20px;
}
</style>
