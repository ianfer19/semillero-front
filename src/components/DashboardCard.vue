<template>
  <div :class="['rounded-xl p-6 shadow-lg flex flex-col justify-between relative overflow-hidden', bgColor]">
    <div class="flex justify-between items-center mb-2">
      <div>
        <h3 class="text-white text-base font-medium mb-1">{{ title }}</h3>
        <div class="text-3xl font-bold text-white">{{ value }}</div>
        <div v-if="subtitle" class="text-white/80 text-sm mt-1">{{ subtitle }}</div>
        <div v-if="extraInfo" class="text-white/70 text-xs mt-1 flex items-center gap-1">
          <slot name="extraInfo">{{ extraInfo }}</slot>
        </div>
      </div>
      <div class="absolute right-4 top-4 opacity-30">
        <slot name="icon">
          <component :is="icon" class="w-12 h-12 text-white" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
  icon?: any
  bgColor?: string
  subtitle?: string
  extraInfo?: string
}>()
</script> 