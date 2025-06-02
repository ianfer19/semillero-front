<template>
  <AuthLayout>
    <div>
    <h2 class="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Iniciar Sesión
      </button>
    </form>
    <p class="mt-4 text-center text-sm text-gray-600">
      ¿No tienes una cuenta?
      <router-link :to="AppRoutes.REGISTER" class="text-indigo-600 hover:text-indigo-500">
        Regístrate
      </router-link>
    </p>
  </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { AppRoutes } from '@/router/routes.enum'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    await router.push('/home')
  } catch (error) {
    console.error(error)
  }
}
</script> 