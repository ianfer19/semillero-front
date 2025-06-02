<template>
  <div class="min-h-screen max-h-screen flex items-center justify-center bg-gray-100">
    <slot></slot>
    <Loader :show="loaderStore.isLoading" :message="loaderStore.message" />
  </div>
</template>

<script setup lang="ts">
import Loader from '@/components/Loader.vue'
import { useLoaderStore } from '@/store/loader'

const loaderStore = useLoaderStore()
</script> 