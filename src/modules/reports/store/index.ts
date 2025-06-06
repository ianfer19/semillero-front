import { defineStore } from 'pinia'
import { reportsService } from '@/modules/reports/services/reportsService'

interface Activity {
  // Identificadores
  actividad_id: number
  actividad_titulo: string
  descripcion: string
  
  // Fechas
  fecha_inicio: string // ISO datetime string
  fecha_fin: string // ISO datetime string
  fecha_creacion: string // ISO datetime string
  fecha_actualizacion: string // ISO datetime string
  
  // Estado
  estado: 'en_progreso' | 'completada' | 'pendiente' | 'cancelada' // Enum de estados posibles
  
  // Relaciones (pueden ser null)
  semillero_id: number | null
  proyecto_id: number | null
  evento_id: number | null
  responsable_id: number
  
  // Información del responsable
  responsable_nombre: string
  responsable_correo: string
}
interface Project {
  id: number
  titulo: string
  autores: string[]
}

interface ReportsState {
  isLoading: boolean
  error: string | null
  activities: Activity[]
  projects: Project[]
  attendees: any[]
  certificates: any[]
  institutions: any[]
}

export const useReportsStore = defineStore('reports', {
  state: (): ReportsState => ({
    isLoading: false,
    error: null,
    activities: [],
    projects: [],
    attendees: [],
    certificates: [],
    institutions: []
  }),

  actions: {
    async fetchActivities() {
      this.isLoading = true
      this.error = null
      try {
        this.activities = await reportsService.getAllActivities()
      } catch (e: any) {
        this.error = e.message || 'Error al cargar actividades'
      } finally {
        this.isLoading = false
      }
    },

    async fetchProjects() {
      this.isLoading = true
      this.error = null
      try {
        this.projects = await reportsService.getProjectsWithAuthors()
      } catch (e: any) {
        this.error = e.message || 'Error al cargar proyectos'
      } finally {
        this.isLoading = false
      }
    },

    async fetchAttendees() {
      this.isLoading = true
      this.error = null
      try {
        this.attendees = await reportsService.getAttendees()
      } catch (e: any) {
        this.error = e.message || 'Error al cargar inscritos'
      } finally {
        this.isLoading = false
      }
    },

    async fetchCertificates() {
      this.isLoading = true
      this.error = null
      try {
        this.certificates = await reportsService.getCertificates()
      } catch (e: any) {
        this.error = e.message || 'Error al cargar certificados'
      } finally {
        this.isLoading = false
      }
    },

    async fetchInstitutions() {
      this.isLoading = true
      this.error = null
      try {
        this.institutions = await reportsService.getInstitutions()
      } catch (e: any) {
        this.error = e.message || 'Error al cargar instituciones'
      } finally {
        this.isLoading = false
      }
    }
  }
})
