import { createRouter, createWebHistory } from 'vue-router'
import { AuditListView, DashboardView, LoginView } from '@/views'
import { useDemoSession } from '@/composables/useDemoSession'
import { getAccessRedirect } from './access'

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
      meta: { title: 'timeledger | Dashboard', requiresAuth: true },
    },
    {
      path: '/audit-list',
      name: 'audit-list',
      component: AuditListView,
      meta: { title: 'timeledger | Audit List', requiresAuth: true, adminOnly: true },
    },
    { path: '/:pathMatch(.*)*', redirect: { name: 'dashboard' } },
  ],
})

const { currentProfile } = useDemoSession()
router.beforeEach((to) => getAccessRedirect(to.name, to.meta, currentProfile.value?.role))

router.afterEach((to, _from, failure) => {
  if (!failure) {
    document.title = typeof to.meta.title === 'string' ? to.meta.title : 'timeledger'
  }
})

export default router
