<template>
  <aside 
    :class="[
      'bg-gray-100 w-64 transition-all duration-300 ease-in-out',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
    class="fixed h-[calc(100vh-4rem)] top-16 left-0 z-40 shadow-lg sm:shadow-none"
  >
    <div class="p-2 sm:p-4">
      <nav class="space-y-1 sm:space-y-2">
        <router-link :to="AppRoutes.PROJECTS" class="block p-2 hover:bg-gray-200 rounded text-sm sm:text-base">Proyectos</router-link>
        <router-link :to="AppRoutes.USERS" class="block p-2 hover:bg-gray-200 rounded text-sm sm:text-base">Usuarios</router-link>
        <router-link :to="AppRoutes.EVENTS" class="block p-2 hover:bg-gray-200 rounded text-sm sm:text-base">Eventos</router-link>
        <router-link :to="AppRoutes.SEEDBEDS" class="block p-2 hover:bg-gray-200 rounded text-sm sm:text-base">Semilleros</router-link>
        <router-link :to="AppRoutes.ACTIVITIES" class="block p-2 hover:bg-gray-200 rounded text-sm sm:text-base">Actividades</router-link>
        <router-link :to="AppRoutes.REPORTS" class="block p-2 hover:bg-gray-200 rounded text-sm sm:text-base">Reportes</router-link>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { AppRoutes } from '@/router/routes.enum'

defineProps<{
  isOpen: boolean
}>()
</script> 