import type { RouteRecordRaw } from 'vue-router'
import { authGuard } from '@/router/guards/authGuard'
const routes: RouteRecordRaw[] = [
  {
    path: '/projects',
    name: 'proyectos',
    component: () => import('@modules/projects/views/ProjectsExampleView.vue'),
    beforeEnter: authGuard
  }
]

export default routes 