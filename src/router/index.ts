import { createRouter, createWebHistory } from 'vue-router'
import homeRoutes from '@/modules/home/routes'
import authRoutes from '@/modules/auth/routes'
import projectsRoutes from '@/modules/projects/routes'
import usersRoutes from '@/modules/users/routes'
import eventsRoutes from '@/modules/events/routes'
import seedbedsRoutes from '@/modules/seedbeds/routes'
import activitiesRoutes from '@/modules/activities/routes'
import reportsRoutes from '@/modules/reports/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...homeRoutes,
    ...authRoutes,
    ...projectsRoutes,
    ...usersRoutes,
    ...eventsRoutes,
    ...seedbedsRoutes,
    ...activitiesRoutes,
    ...reportsRoutes,
    {
      path: '/:pathMatch(.*)*',
      redirect: '/home'
    }
  ]
})

export default router 