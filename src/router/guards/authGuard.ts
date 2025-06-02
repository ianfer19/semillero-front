import { useAuthStore } from '@/modules/auth/store'
import { useUsersStore } from '@/modules/users/store'
import { mapUserToEnglish } from '@/modules/users/helpers/userMapper'
import { AppRoutes } from '@/router/routes.enum'

export const authGuard = async (to: any, from: any, next: any) => {
  const authStore = useAuthStore()
  const userStore = useUsersStore()
  const token = localStorage.getItem('token')

  if (!token) {
    next(AppRoutes.LOGIN)
    return
  }

  try {
    const response = await authStore.validateToken()
    if (!response?.data?.id) {
      localStorage.removeItem('token')
      next(AppRoutes.LOGIN)
      return
    }
    const user = mapUserToEnglish(response.data.user || response.data)
    userStore.setUser(user)
    next()
  } catch (error) {
    localStorage.removeItem('token')
    next(AppRoutes.LOGIN)
  }
} 