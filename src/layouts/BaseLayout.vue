<template>
  <div class="min-h-screen flex flex-col overflow-hidden bg-gray-100">
    <AppHeader 
      @toggle-sidebar="layoutStore.toggleSidebar"
      @settings="handleSettings"
      @profile="handleProfile"
      @logout="showLogoutDialog"
      class="fixed top-0 left-0 right-0 z-50"
    />

    <div class="flex flex-grow">
      <AppSidebar class="fixed h-full left-0 top-[60px]"/>

      <main :class="[
        'flex-grow transition-all duration-300 ease-in-out p-8'
      ]" class="container mx-auto overflow-y-auto h-full mt-16" :style="{ marginLeft: layoutStore.isSidebarOpen ? '16rem' : '5rem' }" style="margin-top: 3rem !important;">
        <Loader :show="loaderStore.isLoading" :message="loaderStore.message" />
        <Dialog
          v-model:show="dialogStore.show"
          :title="dialogStore.title"
          :message="dialogStore.message"
          :confirmText="dialogStore.confirmText"
          :cancelText="dialogStore.cancelText"
          :showCancel="true"
          variant="danger"
          @confirm="dialogStore.confirm"
          @cancel="dialogStore.cancel"
        />
        <slot></slot>
      </main>
    </div>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { AppRoutes } from '@/router/routes.enum'
import { useLayoutStore } from '@/stores/layout'
import { useLoaderStore } from '@/store/loader'
import { useDialogStore } from '@/services/dialogService'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import Loader from '@/components/Loader.vue'
import Dialog from '@/components/Dialog.vue'

const router = useRouter()
const layoutStore = useLayoutStore()
const loaderStore = useLoaderStore()
const dialogStore = useDialogStore()

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

function showLogoutDialog() {
  dialogStore.open({
    title: 'Cerrar sesión',
    message: '¿Estás seguro que deseas cerrar sesión?',
    confirmText: 'Cerrar sesión',
    cancelText: 'Cancelar',
    onConfirm: handleLogout,
    onCancel: () => {}
  })
}
</script> 