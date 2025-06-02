<script setup lang="ts">
import { useLoaderStore } from '@/store/loader'
import Loader from '@/components/Loader.vue'

const loaderStore = useLoaderStore()
</script>

<template>
  <router-view />
  <Loader :show="loaderStore.isLoading" :message="loaderStore.message" />
</template>
