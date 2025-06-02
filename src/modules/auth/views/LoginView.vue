<template>
  <AuthLayout>
    <div class="flex w-full h-screen bg-white">
      <!-- Imagen -->
      <div class="hidden md:flex md:w-5/8 bg-gray-50 items-center justify-center h-full max-h-screen">
        <img src="@/assets/login.webp" alt="Login Illustration" class="w-full h-full max-h-screen object-cover" />
      </div>
      <!-- Formulario -->
      <div class="w-full md:w-3/8 flex flex-col justify-center p-16">
        <h2 class="text-3xl font-bold mb-2 text-center">Iniciar Sesión</h2>
        <p class="text-gray-500 text-center mb-6">Bienvenido a la plataforma de gestión de proyectos, semilleros, eventos y actividades de las Universidades. Inicia sesión para continuar.</p>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <BaseInput
              v-model="email"
              id="email"
              type="email"
              label="Email"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <BaseInput
              v-model="password"
              id="password"
              type="password"
              label="Contraseña"
              placeholder="Contraseña"
              required
            />
          </div>
          <div class="flex items-center">
            <input id="terms" type="checkbox" v-model="termsAccepted" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" required />
            <label for="terms" class="ml-2 block text-sm text-gray-900">
              Acepto los términos y condiciones
            </label>
          </div>
          <BaseButton type="submit" :disabled="!termsAccepted">
            Iniciar Sesión
          </BaseButton>
        </form>
        <p class="mt-4 text-center text-sm text-gray-600">
          ¿No tienes una cuenta? Contáctate con el administrador de la plataforma para que te asigne un usuario.
          <a href="mailto:administrador@univerdad.edu.co" class="text-indigo-600 hover:text-indigo-500">
            administrador@univerdad.edu.co
          </a>
        </p>
      </div>
    </div>
  </AuthLayout>
  
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AppRoutes } from '@/router/routes.enum'
import { useRouter } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useAuthStore } from '../store'

const email = ref('')
const password = ref('')
const termsAccepted = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  try {
    const response = await authStore.login({ email: email.value, contraseña: password.value })
    if (response?.data?.token) {
      await router.push('/home')
    }
  } catch (error) {
    console.error(error)
  }
}
</script> 