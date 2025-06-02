import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@modules/projects/views/ProjectsExampleView.vue')
  }
]

export default routes 