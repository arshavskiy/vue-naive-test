import '@/assets/styles/main.scss'
import 'vfonts/Lato.css'
import 'uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useCountriesStore } from '@/store/contryStore.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)

if (typeof window !== 'undefined') {
  window.countriesStore = useCountriesStore()
}

app.mount('#app')
