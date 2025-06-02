import { defineStore } from 'pinia'
import axios from '@/@config/axios'

interface User {
  id: number
  name: string
  email: string
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    user: null as User | null,
    loading: false,
    error: null as string | null
  }),
  
  getters: {
    getUsers: (state) => state.users,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  },

  actions: {
    setUser(user: User) {
      this.user = user
    },
    async fetchUsers() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get<User[]>('/users')
        this.users = response.data
      } catch (error) {
        this.error = 'Error al cargar usuarios'
      } finally {
        this.loading = false
      }
    }
  }
}) 