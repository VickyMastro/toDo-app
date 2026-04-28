import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'
import CreateUserView from '@/views/CreateUserView.vue'
import UserProfile from '@/components/UserProfile.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/auth', component: AuthView, meta: { hideHeader: true } },
  { path: '/create-user', component: CreateUserView, meta: { hideHeader: true } },
  { path: '/user-profile', component: UserProfile },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
