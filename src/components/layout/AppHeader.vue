<template>
  <header class="header">
    <nav class="container mx-auto">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-2 sm:space-x-4">
          <button @click="$emit('toggle-sidebar')" class="btn-header-menu">
            <Bars3Icon class="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <router-link :to="AppRoutes.HOME" class="text-lg sm:text-xl font-bold hidden sm:block">
            Diplomado en Desarrollo Web
            <span v-if="route.name" class="font-normal"> | {{ route.name }}</span>
          </router-link>
          <router-link :to="AppRoutes.HOME" class="text-lg sm:text-xl font-bold sm:hidden">
            DIP-DW
            <span v-if="route.name" class="font-normal"> | {{ route.name }}</span>
          </router-link>
        </div>
        <div class="w-fit flex justify-end items-center space-x-2 sm:space-x-4">
          <button @click="$emit('settings')" class="btn-header-item">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <button @click="$emit('profile')" class="btn-header-item gap-2">
            <div class="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-600 text-white flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span class="hidden sm:block">{{ usersStore.user?.name.split(' ')[0] || 'Usuario' }}</span>
          </button>
          <button @click="$emit('logout')" class="btn-header-item">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { AppRoutes } from '@/router/routes.enum'
import { useRoute } from 'vue-router'
import { Bars3Icon } from '@heroicons/vue/24/outline'
import { useUsersStore } from '@/modules/users/store'

defineEmits<{
  (e: 'toggle-sidebar'): void
  (e: 'settings'): void
  (e: 'profile'): void
  (e: 'logout'): void
}>()

const route = useRoute()
const usersStore = useUsersStore()
</script> 