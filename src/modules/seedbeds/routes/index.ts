import type { RouteRecordRaw } from 'vue-router'
import { authGuard } from '@/router/guards/authGuard'
const routes: RouteRecordRaw[] = [
  {
    path: '/seedbeds',
    name: 'semilleros',
    component: () => import('@modules/seedbeds/views/SeedbedsExampleView.vue'),
    beforeEnter: authGuard
  }
]

export default routes 