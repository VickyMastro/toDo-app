import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/style.css'
import ui from '@nuxt/ui/vue-plugin'
import router from './router'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(ui)
app.use(router)
app.mount('#app')
