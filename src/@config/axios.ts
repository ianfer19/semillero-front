import axios from 'axios'
import { useLoaderStore } from '@/store/loader'

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

apiInstance.interceptors.request.use(
  async (config) => {
    const loaderStore = useLoaderStore()
    const loadingMessage = config.headers['X-Loading-Message']
    loaderStore.show(loadingMessage)
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    const loaderStore = useLoaderStore()
    loaderStore.hide()
    return Promise.reject(error)
  }
)

apiInstance.interceptors.response.use(
  (response) => {
    const loaderStore = useLoaderStore()
    loaderStore.hide()
    return response
  },
  (error) => {
    const loaderStore = useLoaderStore()
    loaderStore.hide()
    if (error.response) {
      console.error('Error response:', error.response.data)
    } else if (error.request) {
      console.error('Error request:', error.request)
    } else {
      console.error('Error message:', error.message)
    }
    return Promise.reject(error)
  }
)

apiInstance.defaults.withCredentials = true

export default apiInstance