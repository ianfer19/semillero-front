import apiInstance from '@/@config/axios'

export interface LoginPayload {
  email: string;
  contraseña: string;
}

export const login = async (payload: LoginPayload, loadingMessage?: string) => {
  const config = loadingMessage ? { headers: { 'X-Loading-Message': loadingMessage } } : {}
  const response = await apiInstance.post('/api/auth/login', payload, config)
  return response.data
}

export const validateToken = async () => {
  const response = await apiInstance.get('/api/auth/me')
  return response.data
} 