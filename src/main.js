import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vuetify } from './plugins/vuetify.js'

import App from './App.vue'
import router from './router'
import VueFeather from 'vue-feather'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component(VueFeather.name, VueFeather)
app.use(vuetify)
app.mount('#app')
