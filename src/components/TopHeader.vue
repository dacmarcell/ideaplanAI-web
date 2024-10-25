<template>
  <h1>IdeaPlanAI</h1>
  <nav>
    <router-link to="/" class="link">Chat</router-link>
    <router-link to="/about" class="link">Sobre</router-link>
    <a v-bind:href="linkedinURL" target="_blank">Contato</a>
  </nav>
  <div></div>
</template>

<style scoped>
.link {
  margin: 10px;
  text-decoration: none;
}
</style>

<script lang="ts">
export default {
  data() {
    return { linkedinURL: 'https://www.linkedin.com/in/marcell-dactes/' }
  },
}
</script>
