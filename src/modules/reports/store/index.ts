import { defineStore } from 'pinia'
import { reportsService } from '@/modules/reports/services/reportsService'

interface Activity {
  id: number
  nombre: string
  fecha: string
  // agrega más campos según la estructura real
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
