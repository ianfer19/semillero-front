import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/seedbeds',
    name: 'seedbeds',
    component: () => import('@modules/seedbeds/views/SeedbedsExampleView.vue')
  }
]

export default routes 