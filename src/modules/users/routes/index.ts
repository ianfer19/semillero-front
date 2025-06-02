import { authGuard } from '@/router/guards/authGuard'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/users',
    name: 'usuarios',
    component: () => import('@modules/users/views/UsersExampleView.vue'),
    beforeEnter: authGuard
  }
]

export default routes 