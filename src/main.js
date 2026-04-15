import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/style.css'
import ui from '@nuxt/ui/vue-plugin'
import router from './router'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(ui)
app.use(router)
app.mount('#app')
