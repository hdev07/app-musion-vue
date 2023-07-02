import { createRouter, createWebHistory } from 'vue-router'
import NotFoundLayout from '@/layouts/NotFoundLayout.vue'
import { useAuthStore } from '@/stores/authStore'

const routes = [
  {
    path: '/',
    component: () => import('@/views/IndexView.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('@/views/auth/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/auth/RegisterView.vue')
  },
  {
    path: '/walkthrough',
    name: 'walkthrough',
    component: () => import('@/views/auth/WalkthroughView.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/auth/ForgotPasswordView.vue')
  },
  {
    path: '/',
    component: () => import('@/layouts/NavbarLayout.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/HomeView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/museums',
        name: 'museums',
        component: () => import('@/views/home/MuseumsView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/map',
        name: 'map',
        component: () => import('@/views/home/MapView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/favorites',
        name: 'favorites',
        component: () => import('@/views/home/FavoritesView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/home/ProfileView.vue'),
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
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Guarda de navegación para verificar la autenticación
router.beforeEach(async (to, from, next) => {
  const requiredAuth = to.meta.requiresAuth
  const authStore = useAuthStore()

  // si existe el token en memoria
  if (authStore.token) {
    return next()
  }

  // si no existe el token (se refrescó el sitio web) v2
  if (requiredAuth || localStorage.getItem('user')) {
    await authStore.refreshToken()
    if (authStore.token) {
      return next()
    }
    return next('/signin')
  }
  return next()
})

export default router
