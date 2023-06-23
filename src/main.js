import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vuetify } from './plugins/vuetify'

import App from './App.vue'
import router from './router'
import VueFeather from 'vue-feather'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true
})

app.component(VueFeather.name, VueFeather)
app.use(VueAxios, axiosInstance)
app.provide('axios', app.config.globalProperties.axios)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
