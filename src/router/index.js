import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tailwind',
      name: 'tailwind',
      component: () => import('../views/TailwindView.vue')
    },
    {
      path: '/vuetify',
      name: 'vuetify',
      // división de código a nivel de ruta
      // esto genera un fragmento separado (About.[hash].js) para esta ruta
      // que se carga de forma diferida cuando se visita la ruta.
      component: () => import('../views/VuetifyView.vue')
    }
  ]
})

export default router
