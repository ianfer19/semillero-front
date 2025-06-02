import { createPinia } from 'pinia'
import { useProjectsStore } from '@/modules/projects/store'
import { useUsersStore } from '@/modules/users/store'
import { useEventsStore } from '@/modules/events/store'
import { useSemillerosStore } from '@/modules/seedbeds/store'
import { useActivitiesStore } from '@/modules/activities/store'
import { useReportsStore } from '@/modules/reports/store'
import { useAuthStore } from '@/modules/auth/store'
const pinia = createPinia()

export {
  useAuthStore,
  useProjectsStore,
  useUsersStore,
  useEventsStore,
  useSemillerosStore,
  useActivitiesStore,
  useReportsStore
}

export default pinia 