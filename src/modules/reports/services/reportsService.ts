import apiInstance from '@/@config/axios'

export const reportsService = {
  /**
   * Obtener todas las actividades de un evento
   */
  async getAllActivities(eventId: number) {
    const response = await apiInstance.get(`/api/reports/activities`, {
      headers: {
        'X-Loading-Message': 'Cargando actividades del evento...'
      }
    })
    return response.data.data
  },

  /**
   * Obtener proyectos con sus autores
   */
  async getProjectsWithAuthors() {
    const response = await apiInstance.get('/api/reports/projects/with-authors', {
      headers: {
        'X-Loading-Message': 'Cargando proyectos con autores...'
      }
    })
    return response.data.data
  },

  /**
   * Obtener certificados emitidos
   */
  async getCertificates() {
    const response = await apiInstance.get('/api/reports/certificates', {
      headers: {
        'X-Loading-Message': 'Cargando certificados...'
      }
    })
    return response.data.data
  },

  /**
   * Generar certificado (requiere payload)
   */
  async generateCertificate(payload: any) {
    const response = await apiInstance.post('/api/reports/certificates/generate', payload, {
      headers: {
        'X-Loading-Message': 'Generando certificado...'
      }
    })
    return response.data
  },

  /**
   * Generar todos los certificados de un evento
   */
  async generateCertificatesForEvent(eventId: number) {
    const response = await apiInstance.get(`/api/reports/certificates/event/${eventId}/generate-all`, {
      headers: {
        'X-Loading-Message': 'Generando certificados del evento...'
      }
    })
    return response.data
  },

  /**
   * Obtener reporte de un evento
   */
  async getEventReport(eventId: number) {
    const response = await apiInstance.get(`/api/reports/events/${eventId}/report`, {
      headers: {
        'X-Loading-Message': 'Cargando reporte del evento...'
      }
    })
    return response.data
  },

  /**
   * Obtener puntajes de proyectos
   */
  async getProjectScores() {
    const response = await apiInstance.get('/api/reports/projects/scores', {
      headers: {
        'X-Loading-Message': 'Cargando puntajes de proyectos...'
      }
    })
    return response.data.data
  }
}
