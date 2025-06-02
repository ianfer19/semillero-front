<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader 
      @toggle-sidebar="toggleSidebar"
      @settings="handleSettings"
      @profile="handleProfile"
      @logout="handleLogout"
    />

    <div class="flex flex-grow">
      <AppSidebar :is-open="isSidebarOpen" />

      <main :class="[
        'flex-grow transition-all duration-300 ease-in-out',
        isSidebarOpen ? 'ml-0 sm:ml-64' : 'ml-0'
      ]" class="container mx-auto p-2 sm:p-4">
        <slot></slot>
      </main>
    </div>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AppRoutes } from '@/router/routes.enum'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const router = useRouter()
const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const handleSettings = () => {
  router.push(AppRoutes.SETTINGS)
}

const handleProfile = () => {
  router.push(AppRoutes.PROFILE)
}

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push(AppRoutes.LOGIN)
}
</script> 