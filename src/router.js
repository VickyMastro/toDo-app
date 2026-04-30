import { createWebHistory, createRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

import HomeView from '@/views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'
import CreateUserView from '@/views/CreateUserView.vue'
import UserProfile from '@/components/UserProfile.vue'

const routes = [
  { path: '/', component: HomeView, meta: { requiresAuth: true } },
  { path: '/auth', component: AuthView, meta: { hideHeader: true } },
  { path: '/create-user', component: CreateUserView, meta: { hideHeader: true } },
  { path: '/user-profile', component: UserProfile, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  const userStore = useUserStore()
  // Solo llama a restoreSession si todavía no hay token en el store
  if (!userStore.accessToken) {
    try {
      await userStore.restoreSession()
    } catch {
      // Si falla (no hay token en localStorage o está vencido), lo ignoramos
    }
  }
  // Si la ruta requiere auth y no hay sesión, redirigir al login
  if (to.meta.requiresAuth && !userStore.accessToken) {
    return { path: '/auth' }
  }
  // Si ya está logueado e intenta ir al login/registro, redirigir al home
  if (!to.meta.requiresAuth && userStore.accessToken && to.path !== '/') {
    return { path: '/' }
  }
})
export default router
