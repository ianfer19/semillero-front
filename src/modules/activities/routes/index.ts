import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/activities',
    name: 'activities',
    component: () => import('@modules/activities/views/ActivitiesExampleView.vue')
  }
]

export default routes 