import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundLayout from '../layouts/NotFoundLayout.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/walkthrough',
    name: 'walkthrough',
    component: () => import('../views/WalkthroughView.vue')
  },
  // Ruta comodín para capturar todas las URLs no encontradas
  {
    path: '/:catchAll(.*)',
    component: NotFoundLayout
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
