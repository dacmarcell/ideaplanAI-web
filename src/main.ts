import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

// Check API health as soon as the app starts (non-blocking)
async function checkApiHealth() {
  try {
    const { ok, json, status, statusText } = await fetch('/health')

    if (!ok) {
      console.warn(`API health check failed: ${status} ${statusText}`)
      return
    }

    let data = null
    try {
      data = await json()
    } catch {
      data = 'ok'
    }

    console.info('API /health:', data)
  } catch (err) {
    console.error('Failed to fetch /health', err)
  }
}

// fire-and-forget health check — does not block mounting
checkApiHealth()

app.mount('#app')
