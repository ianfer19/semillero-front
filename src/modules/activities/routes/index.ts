import { authGuard } from '@/router/guards/authGuard'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/activities',
    name: 'actividades',
    component: () => import('@modules/activities/views/ActivitiesExampleView.vue'),
    beforeEnter: authGuard
  }
]

export default routes 