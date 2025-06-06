<template>
    <BaseLayout>
      <h2 class="mb-6 text-2xl font-bold text-gray-800">Reporte Detallado del Evento</h2>
  
      <!-- Filtro de evento -->
      <div class="mb-6 flex gap-4 items-end">
        <div>
          <label class="block text-sm font-semibold text-gray-600 mb-1">Selecciona un evento</label>
          <select
            v-model="selectedEventId"
            @change="fetchEventReport"
            class="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option disabled value="">-- Selecciona un evento --</option>
            <option v-for="evento in events" :key="evento.id" :value="evento.id">
              {{ evento.nombre }}
            </option>
          </select>
        </div>
      </div>
  
      <div v-if="loading" class="text-blue-600 text-center my-4">Cargando reporte del evento...</div>
      <div v-else-if="error" class="text-red-500 text-center my-4">{{ error }}</div>
  
      <div v-else-if="activities.length" class="overflow-x-auto">
        <table class="min-w-full bg-white rounded-xl shadow border border-gray-100">
          <thead class="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
            <tr>
              <th class="py-3 px-4 text-left font-semibold">Título Actividad</th>
              <th class="py-3 px-4 text-left font-semibold">Estado</th>
              <th class="py-3 px-4 text-left font-semibold">Fecha Inicio</th>
              <th class="py-3 px-4 text-left font-semibold">Fecha Fin</th>
              <th class="py-3 px-4 text-left font-semibold">Proyecto</th>
              <th class="py-3 px-4 text-left font-semibold">Semillero</th>
              <th class="py-3 px-4 text-left font-semibold">Evaluador</th>
              <th class="py-3 px-4 text-left font-semibold">Puntuación</th>
              <th class="py-3 px-4 text-left font-semibold">Evento</th>
              <th class="py-3 px-4 text-left font-semibold">Ubicación</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="actividad in activities"
              :key="actividad.actividad_id"
              class="border-t border-gray-100 hover:bg-gray-50 text-sm"
            >
              <td class="px-4 py-2">{{ actividad.actividad_titulo }}</td>
              <td class="px-4 py-2 capitalize">{{ actividad.actividad_estado || 'N/A' }}</td>
              <td class="px-4 py-2">{{ formatDate(actividad.fecha_inicio) }}</td>
              <td class="px-4 py-2">{{ formatDate(actividad.fecha_fin) }}</td>
              <td class="px-4 py-2">{{ actividad.proyecto_titulo || 'Sin proyecto' }}</td>
              <td class="px-4 py-2">{{ actividad.semillero_nombre || 'Sin semillero' }}</td>
              <td class="px-4 py-2">{{ actividad.evaluador_id ? `ID: ${actividad.evaluador_id}` : 'Sin evaluador' }}</td>
              <td class="px-4 py-2">{{ actividad.puntuacion ?? 'N/A' }} / {{ actividad.puntaje_total ?? 'N/A' }}</td>
              <td class="px-4 py-2">{{ actividad.evento_nombre }}</td>
              <td class="px-4 py-2">{{ actividad.ubicacion || 'No especificada' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div v-else class="text-gray-500 text-center my-6">No hay datos disponibles para este evento.</div>
    </BaseLayout>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import BaseLayout from '@/layouts/BaseLayout.vue'
  import { reportsService } from '@/modules/reports/services/reportsService'
  
  interface Activity {
    actividad_id: number
    actividad_titulo: string
    actividad_estado: string
    fecha_inicio: string
    fecha_fin: string
    proyecto_titulo: string | null
    semillero_nombre: string | null
    evaluador_id: number | null
    puntuacion: number | null
    puntaje_total: number | null
    evento_nombre: string
    ubicacion: string | null
  }
  
  interface Event {
    id: number
    nombre: string
  }
  
  const activities = ref<Activity[]>([])
  const events = ref<Event[]>([])
  const selectedEventId = ref<number | ''>('')
  
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  function formatDate(fecha: string) {
    const date = new Date(fecha)
    return date.toLocaleString('es-CO', {
      dateStyle: 'short',
      timeStyle: 'short'
    })
  }
  
  async function fetchEvents() {
    try {
      const data = await reportsService.getAllEvents()
      events.value = data
      if (data.length > 0) {
        selectedEventId.value = data[0].id
        fetchEventReport()
      }
    } catch (e) {
      error.value = 'Error al cargar los eventos.'
    }
  }
  
  async function fetchEventReport() {
  if (!selectedEventId.value) return
  loading.value = true
  error.value = null

  try {
    const response = await reportsService.getEventReport(Number(selectedEventId.value))

    if (Array.isArray(response)) {
      activities.value = response
    } else {
      // En caso de que venga con un status 404 o formato inesperado
      activities.value = []
      error.value = response.errors || 'No se encontraron datos para este evento.'
    }
  } catch (e: any) {
    activities.value = []

    // Si el backend lanza error con status 404 capturado como excepción
    if (e.response && e.response.data && e.response.data.errors) {
      error.value = e.response.data.errors
    } else {
      error.value = 'Error inesperado al cargar el reporte del evento.'
    }
  } finally {
    loading.value = false
  }
}

  
  onMounted(() => {
    fetchEvents()
  })
  </script>
  
  
  <style scoped>
  /* Puedes ajustar estilos aquí o usar Tailwind CSS como en el ejemplo */
  </style>
  