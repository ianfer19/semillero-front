// Auth store will be implemented later
import { defineStore } from 'pinia'
import { login as loginService, validateToken as validateTokenService } from '../services/authService'
import type { LoginPayload } from '../services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null
  }),
  actions: {
    async login(payload: LoginPayload) {
      const response = await loginService(payload)
      if (response?.data?.token) {
        this.token = response.data.token
        localStorage.setItem('token', response.data.token)
        this.user = response.data.user
      }
      return response
    },
    async validateToken() {
      const response = await validateTokenService()
      if (response?.data?.user) {
        this.user = response.data.user
      }
      return response
    }
  }
})

export {} 