<template>
  <div>
    <label v-if="label" :for="id" class="block mb-1 font-medium text-gray-700">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
      :class="[
        'input-base',
        error
          ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500'
          : isFocused
            ? 'border-blue-500'
            : 'border-gray-300',
        error ? 'bg-red-50' : 'bg-white'
      ]"
      @focus="isFocused = true"
      @blur="isFocused = false"
      autocomplete="off"
    />
    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  modelValue: string
  label?: string
  placeholder?: string
  type?: string
  error?: string
  id?: string
}>()

const isFocused = ref(false)
</script> 