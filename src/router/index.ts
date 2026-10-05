import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: { title: 'timeledger | Login' },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { title: 'timeledger | Dashboard' },
    },
  ],
})

router.afterEach((to, _from, failure) => {
  if (!failure) {
    document.title = typeof to.meta.title === 'string' ? to.meta.title : 'timeledger'
  }
})

export default router
