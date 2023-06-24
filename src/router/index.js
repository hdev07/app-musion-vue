import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundLayout from '../layouts/NotFoundLayout.vue'
import { useUserStore } from '../stores/authStore'

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
  {
    path: '/',
    component: () => import('../layouts/NavbarLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: '/news',
        name: 'news',
        component: () => import('../views/NewsView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/museums',
        name: 'museums',
        component: () => import('../views/MuseumsView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/favorites',
        name: 'favorites',
        component: () => import('../views/FavoritesView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/ProfileView.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  // Ruta comodín para capturar todas las URLs no encontradas
  {
    path: '/:catchAll(.*)',
    component: NotFoundLayout
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL_APP),
  routes
})

// Guarda de navegación para verificar la autenticación
router.beforeEach(async (to, from, next) => {
  const requiredAuth = to.meta.requiresAuth
  const userStore = useUserStore()

  // si existe el token en memoria
  if (userStore.token) {
    return next()
  }

  // si no existe el token (se refrescó el sitio web) v2
  if (requiredAuth || sessionStorage.getItem('user')) {
    await userStore.refreshToken()
    if (userStore.token) {
      return next()
    }
    return next('/signin')
  }
  return next()
})

export default router
