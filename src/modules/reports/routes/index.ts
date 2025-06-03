import { authGuard } from '@/router/guards/authGuard'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/reports',
    name: 'reports',
    component: () => import('@/modules/reports/views/index.vue'),
  },
  {
    path: '/reports/activities',
    name: 'reports-activities',
    component: () => import('@/modules/reports/views/ActivitiesReport.vue'),
  },
  {
    path: '/reports/attendees',
    name: 'reports-attendees',
    component: () => import('@/modules/reports/views/AttendeesReport.vue'),
  },
  {
    path: '/reports/projects',
    name: 'reports-projects',
    component: () => import('@/modules/reports/views/ProjectsReport.vue'),
  },
  {
    path: '/reports/projects/list',
    name: 'reports-projects-list',
    component: () => import('@/modules/reports/views/ProjectListView.vue'),
  },
  {
    path: '/reports/projects/grades',
    name: 'reports-projects-grades',
    component: () => import('@/modules/reports/views/ProjectGradesView.vue'),
  },
  {
    path: '/reports/certificates',
    name: 'reports-certificates',
    component: () => import('@/modules/reports/views/CertificatesReport.vue'),
  },
  {
    path: '/reports/institutions',
    name: 'reports-institutions',
    component: () => import('@/modules/reports/views/InstitutionsReport.vue'),
  }
]

export default routes
