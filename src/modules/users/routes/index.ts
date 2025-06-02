import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/users',
    name: 'users',
    component: () => import('@modules/users/views/UsersExampleView.vue')
  }
]

export default routes 