import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/reports',
    name: 'reports',
    component: () => import('@modules/reports/views/ReportsExampleView.vue')
  }
]

export default routes 