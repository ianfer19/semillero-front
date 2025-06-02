import type { RouteRecordRaw } from 'vue-router'
import { authGuard } from '@/router/guards/authGuard'
const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@modules/home/views/HomeView.vue'),
    beforeEnter: authGuard
  }
]

export default routes 