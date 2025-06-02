import { defineStore } from 'pinia'
import type { Project } from '../types'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [] as Project[],
    loading: false,
    error: null as string | null
  }),
  
  getters: {
    getProjectById: (state) => (id: number) => {
      return state.projects.find(project => project.id === id)
    },
    getActiveProjects: (state) => {
      return state.projects.filter(project => project.status === 'active')
    }
  },
  
  actions: {
    async fetchProjects() {
      this.loading = true
      try {
        this.error = null
      } catch (error) {
        this.error = 'Error al cargar los proyectos'
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    
    async createProject(project: Omit<Project, 'id'>) {
      try {
        this.error = null
      } catch (error) {
        this.error = 'Error al crear el proyecto'
        console.error(error)
      }
    }
  }
}) 