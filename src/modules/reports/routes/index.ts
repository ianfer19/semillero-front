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
    name: 'inscritos-eventos y evaluadores',
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
  // Nuevas rutas para los certificados
  {
    path: '/reports/certificates/participation',
    name: 'reports-certificates-participation',
    component: () => import('@/modules/reports/views/CertificatesParticipationView.vue'),
  },
  {
    path: '/reports/certificates/by-member',
    name: 'reports-certificates-by-member',
    component: () => import('@/modules/reports/views/CertificatesByMemberView.vue'),
  },
  {
    path: '/reports/certificates/event-reports',
    name: 'reports-certificates-event-reports',
    component: () => import('@/modules/reports/views/CertificatesEventReportsView.vue'),
  },
  {
    path: '/reports/certificates/project-grades',
    name: 'reports-certificates-project-grades',
    component: () => import('@/modules/reports/views/CertificatesProjectGradesView.vue'),
  },
  {
    path: '/reports/institutions',
    name: 'reports-institutions',
    component: () => import('@/modules/reports/views/InstitutionsReport.vue'),
  },
  {
    path: '/reports/projects/attendees',
    name: 'inscritos-eventos y evaluadores',
    component: () => import('@/modules/reports/views/AttendeesReport.vue'),
  },
]

export default routes

