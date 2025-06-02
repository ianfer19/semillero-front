<template>
  <div class="rounded-xl border bg-white p-4 mb-3 shadow-sm flex flex-col gap-2 relative">
    <div class="flex items-center justify-between">
      <h4 class="font-semibold text-base">{{ title }}</h4>
      <span v-if="status" class="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">{{ status }}</span>
    </div>
    <div class="flex items-center text-gray-500 text-sm gap-4 flex-wrap">
      <div class="flex items-center gap-1"><span class="i-mdi-account-group"></span>Semillero ID: {{ seedbedId }}</div>
      <div class="flex items-center gap-1"><span class="i-mdi-account"></span>Líder ID: {{ leaderId }}</div>
    </div>
    <div class="flex gap-2 mt-2">
      <button class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded font-medium text-sm" @click="$emit('approve')">Aprobar</button>
      <button class="border border-gray-300 hover:bg-gray-100 text-gray-700 px-3 py-1 rounded font-medium text-sm" @click="$emit('details')">Ver detalles</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  seedbedId: string | number
  leaderId: string | number
  status?: string
}>()
</script> 