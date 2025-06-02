<template>
  <BaseLayout>
    <h1 class="text-2xl font-bold mb-4">Usuarios</h1>
    
    <div v-if="usersStore.isLoading" class="text-center py-4">
      Cargando usuarios...
    </div>
    
    <div v-else-if="usersStore.getError" class="text-red-500 py-4">
      {{ usersStore.getError }}
    </div>
    
    <div v-else class="space-y-4">
      <div v-for="user in usersStore.getUsers" :key="user.id" 
           class="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <h3 class="font-semibold">{{ user.name }}</h3>
        <p class="text-gray-600">{{ user.email }}</p>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import BaseLayout from '@/layouts/BaseLayout.vue'
import { useUsersStore } from '../store'

const usersStore = useUsersStore()

onMounted(() => {
  usersStore.fetchUsers()
})
</script> 