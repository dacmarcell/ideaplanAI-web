<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { useRoute } from 'vue-router'

const currentRoute = useRoute()
const linkedinURL = 'https://www.linkedin.com/in/marcell-dactes/'

const routes = [
  { name: 'Chat', path: '/' },
  { name: 'Sobre', path: '/about' },
]

const getBtnClass = (btnPath: string) =>
  currentRoute.path === btnPath ? 'green' : 'inactive-btn'
</script>

<template>
  <h1>IdeaPlan<span class="green">AI</span></h1>
  <nav>
    <router-link
      v-for="route in routes"
      :key="route.path"
      :to="route.path"
      :class="getBtnClass(route.path)"
      class="link"
      >{{ route.name }}</router-link
    >
    <a :href="linkedinURL" target="_blank" class="link contact">
      <span>Contato</span>
      <FontAwesomeIcon :icon="faExternalLinkAlt" class="icon" />
    </a>
  </nav>
  <div></div>
</template>

<style scoped>
.green {
  color: green;
}
.inactive-btn {
  color: rgb(169, 169, 169);
}
nav {
  display: flex;
  justify-content: center;
  align-items: center;
}
.link {
  margin: 10px;
  text-decoration: none;
}
.contact {
  display: flex;
  align-items: center;
  text-decoration: underline;
}
.icon {
  margin: 0px 0px 5px 5px;
  width: 10px;
  height: 10px;
}
</style>
