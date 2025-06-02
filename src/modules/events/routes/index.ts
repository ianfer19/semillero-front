import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/events',
    name: 'events',
    component: () => import('@modules/events/views/EventsExampleView.vue')
  }
]

export default routes 