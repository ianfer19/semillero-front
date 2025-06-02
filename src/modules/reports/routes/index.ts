import type { RouteRecordRaw } from 'vue-router'
import { authGuard } from '@/router/guards/authGuard'
const routes: RouteRecordRaw[] = [
  {
    path: '/reports',
    name: 'reportes',
    component: () => import('@modules/reports/views/ReportsExampleView.vue'),
    beforeEnter: authGuard
  }
]

export default routes 