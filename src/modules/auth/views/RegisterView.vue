<template>
  <AuthLayout>
    <div>
      <h2 class="text-2xl font-bold mb-6 text-center">Registro</h2>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
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
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Registrarse
        </button>
      </form>
      <p class="mt-4 text-center text-sm text-gray-600">
        ¿Ya tienes una cuenta?
        <router-link :to="AppRoutes.LOGIN" class="text-indigo-600 hover:text-indigo-500">
          Inicia Sesión
        </router-link>
      </p>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AppRoutes } from '@/router/routes.enum'
import { useRouter } from 'vue-router'
import AuthLayout from "@/layouts/AuthLayout.vue";

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const router = useRouter()

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden')
    return
  }
  // Implement register logic here
  console.log('Register attempt:', {
    name: name.value,
    email: email.value,
    password: password.value
  })
}

const handleSubmit = async () => {
  try {
    await router.push('/auth/login')
  } catch (error) {
    console.error(error)
  }
}
</script> 