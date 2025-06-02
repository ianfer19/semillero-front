import type { RouteRecordRaw } from 'vue-router'
import { authGuard } from '@/router/guards/authGuard'
const routes: RouteRecordRaw[] = [
  {
    path: '/events',
    name: 'eventos',
    component: () => import('@modules/events/views/EventsExampleView.vue'),
    beforeEnter: authGuard
  }
]

export default routes 