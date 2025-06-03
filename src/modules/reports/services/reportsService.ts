import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const reportsService = {
  /**
   * Obtener todas las actividades
   */
  async getAllActivities() {
    const response = await axios.get(`${API_URL}reports/activity`)
    return response.data.actividades
  },

  /**
   * Obtener proyectos con sus autores
   */
  async getProjectsWithAuthors() {
    const response = await axios.get(`${API_URL}reports/proyectos/autores`)
    return response.data.data
  },

  /**
   * Obtener inscritos
   */
  async getAttendees() {
    const response = await axios.get(`${API_URL}reports/attendees`)
    return response.data.data
  },

  /**
   * Obtener certificados emitidos
   */
  async getCertificates() {
    const response = await axios.get(`${API_URL}reports/certificates`)
    return response.data.data
  },

  /**
   * Obtener instituciones, facultades y programas
   */
  async getInstitutions() {
    const response = await axios.get(`${API_URL}reports/institutions`)
    return response.data.data
  }
}
