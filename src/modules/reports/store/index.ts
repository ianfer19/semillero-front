import { defineStore } from 'pinia'
import { reportsService } from '@/modules/reports/services/reportsService'

interface Activity {
  id: number
  nombre: string
  fecha: string
}

interface Project {
  id: number
  titulo: string
  autores: string[]
}

interface Evaluator {
  evaluador: {
    id: number
    nombre: string
    email: string
  }
  proyectos: {
    id: number
    titulo: string
  }[]
}

interface EnrolledStudent {
  estudiante: {
    id: number
    nombre: string
    email: string
  }
  eventos: {
    id: number
    nombre: string
    fecha_inicio: string
    fecha_fin: string
    proyecto: {
      id: number
      titulo: string
    }
    fecha_inscripcion: string
  }[]
}

interface ReportsState {
  isLoading: boolean
  error: string | null
  activities: Activity[]
  projects: Project[]
  enrolledStudents: EnrolledStudent[]
  evaluators: Evaluator[]
  certificates: any[]
}

export const useReportsStore = defineStore('reports', {
  state: (): ReportsState => ({
    isLoading: false,
    error: null,
    activities: [],
    projects: [],
    enrolledStudents: [],
    evaluators: [],
    certificates: []
  }),

  actions: {
    async fetchActivities(eventId: number) {
      this.isLoading = true
      this.error = null
      try {
        this.activities = await reportsService.getAllActivities(eventId)
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

    async fetchEnrolledStudents() {
      this.isLoading = true
      this.error = null
      try {
        this.enrolledStudents = await reportsService.getEnrolledStudents()
      } catch (e: any) {
        this.error = e.message || 'Error al cargar estudiantes inscritos'
      } finally {
        this.isLoading = false
      }
    },

    async fetchEvaluators() {
      this.isLoading = true
      this.error = null
      try {
        this.evaluators = await reportsService.getEvaluatorsWithProjects()
      } catch (e: any) {
        this.error = e.message || 'Error al cargar evaluadores'
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
    }
  }
})
