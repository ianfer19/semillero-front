<template>
  <aside 
    :class="[
      'bg-white transition-all duration-300 ease-in-out',
      layoutStore.isSidebarOpen ? 'w-64' : 'w-20',
      'z-40 shadow-lg border-r border-gray-200 sm:shadow-none pt-4'
    ]"
  >
    <div class="sm:p-4 p-2">
      <nav class="space-y-1 sm:space-y-2">
        <router-link
          v-for="item in items"
          :key="item.route"
          :to="item.route"
          class="btn-sidebar-item"
        >
          <component :is="item.icon" class="btn-sidebar-icon" />
          <span v-if="layoutStore.isSidebarOpen">{{ item.label }}</span>
        </router-link>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { AppRoutes } from '@/router/routes.enum'
import { FolderIcon, UserGroupIcon, CalendarIcon, AcademicCapIcon, ClipboardDocumentListIcon, ChartBarIcon, HomeIcon } from '@heroicons/vue/24/outline'
import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()

const items = [
  { route: AppRoutes.HOME, label: 'Inicio', icon: HomeIcon },
  { route: AppRoutes.PROJECTS, label: 'Proyectos', icon: FolderIcon },
  { route: AppRoutes.USERS, label: 'Usuarios', icon: UserGroupIcon },
  { route: AppRoutes.EVENTS, label: 'Eventos', icon: CalendarIcon },
  { route: AppRoutes.SEEDBEDS, label: 'Semilleros', icon: AcademicCapIcon },
  { route: AppRoutes.ACTIVITIES, label: 'Actividades', icon: ClipboardDocumentListIcon },
  { route: AppRoutes.REPORTS, label: 'Reportes', icon: ChartBarIcon }
]
</script> 