<template>
  <button
    :type="type"
    :disabled="disabled"
    class="btn-primary"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}>()
</script> 