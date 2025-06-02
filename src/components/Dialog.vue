<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
      <h2 class="text-lg font-semibold mb-2">
        {{ title }}
      </h2>
      <p class="text-gray-500 mb-6">
        {{ message }}
      </p>
      <div class="flex justify-end gap-2">
        <button v-if="showCancel" @click="onCancel" class="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">{{ cancelText }}</button>
        <button @click="onConfirm" :class="confirmButtonClass">{{ confirmText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  show: boolean,
  title: string,
  message: string,
  confirmText?: string,
  cancelText?: string,
  showCancel?: boolean,
  variant?: 'danger' | 'primary' | 'default' | 'info'
}>()

const emit = defineEmits(['update:show', 'confirm', 'cancel'])

const confirmButtonClass = computed(() => {
  switch (props.variant) {
    case 'danger':
      return 'px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600'
    case 'info':
      return 'px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600'
    default:
      return 'px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200'
  }
})

function onConfirm() {
  emit('confirm')
  emit('update:show', false)
}

function onCancel() {
  emit('cancel')
  emit('update:show', false)
}
</script> 