<template>
  <div class="rounded-xl border bg-white p-4 mb-3 shadow-sm flex flex-col gap-2 relative">
    <div class="flex items-center justify-between">
      <h4 class="font-semibold text-lg">{{ title }}</h4>
      <span v-if="status" :class="statusClass">{{ status }}</span>
    </div>
    <div class="flex items-center text-gray-500 text-sm gap-4 flex-wrap">
      <div class="flex items-center gap-1"><span class="i-mdi-calendar"></span>{{ date }}</div>
      <div class="flex items-center gap-1"><span class="i-mdi-map-marker"></span>{{ location }}</div>
      <div class="flex items-center gap-1"><span class="i-mdi-account"></span>Coord. ID: {{ coordinatorId }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  title: string
  date: string
  location: string
  coordinatorId: string | number
  status?: string
}>()

const statusClass = computed(() => {
  if (props.status === 'Activo') return 'bg-black text-white text-xs px-2 py-1 rounded-full';
  if (props.status === 'Próximo') return 'bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full';
  return 'bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full';
});
</script> 