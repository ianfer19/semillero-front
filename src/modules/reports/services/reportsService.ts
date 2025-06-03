import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const reportsService = {
  /**
   * Obtener todas las actividades de un evento (ajusté la ruta según backend)
   */
  async getAllActivities(eventId) {
    const response = await axios.get(`${API_URL}reports/events/${eventId}/activities`)
    return response.data.actividades
  },

  /**
   * Obtener proyectos con sus autores
   */
  async getProjectsWithAuthors() {
    const response = await axios.get(`${API_URL}reports/projects/with-authors`)
    return response.data.data
  },

  /**
   * Obtener certificados emitidos (puedes añadir parámetros si quieres filtrar)
   */
  async getCertificates() {
    const response = await axios.get(`${API_URL}reports/certificates`)
    return response.data.data
  },

  /**
   * Generar certificado (POST) - requiere payload
   */
  async generateCertificate(payload) {
    const response = await axios.post(`${API_URL}reports/certificates/generate`, payload)
    return response.data
  },

  /**
   * Generar todos los certificados de un evento
   */
  async generateCertificatesForEvent(eventId) {
    const response = await axios.get(`${API_URL}reports/certificates/event/${eventId}/generate-all`)
    return response.data
  },

  /**
   * Obtener reporte de un evento
   */
  async getEventReport(eventId) {
    const response = await axios.get(`${API_URL}reports/events/${eventId}/report`)
    return response.data
  },

  /**
   * Obtener puntajes de proyectos
   */
  async getProjectScores() {
    const response = await axios.get(`${API_URL}reports/projects/scores`)
    return response.data.data
  }
}
