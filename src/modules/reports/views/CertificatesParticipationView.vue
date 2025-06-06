<template>
  <BaseLayout>
    <h2 class="mb-6 text-2xl font-bold text-gray-800">Generar Certificados</h2>
    
    <!-- Filtros y selección -->
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Evento</label>
          <select v-model="eventoSeleccionado" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Todos los eventos</option>
            <option v-for="evento in eventos" :key="evento.id" :value="evento.id">{{ evento.nombre }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Semillero</label>
          <select v-model="semilleroSeleccionado" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Todos los semilleros</option>
            <option v-for="semillero in semilleros" :key="semillero.id" :value="semillero.id">{{ semillero.nombre }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Buscar participante</label>
          <input 
            v-model="busquedaParticipante" 
            type="text" 
            placeholder="Nombre o correo" 
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          >
        </div>
      </div>
      
      <!-- Tabla de participantes -->
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white rounded-lg overflow-hidden">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input 
                  type="checkbox" 
                  v-model="todosSeleccionados"
                  @change="seleccionarTodos"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                >
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participante</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evento</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semillero</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="participante in participantesFiltrados" :key="participante.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <input 
                  type="checkbox" 
                  v-model="participantesSeleccionados"
                  :value="participante.id"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                >
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="font-medium text-gray-900">{{ participante.nombre }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-500">{{ participante.correo }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-500">{{ participante.evento }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-500">{{ participante.semillero }}</td>
            </tr>
            <tr v-if="participantesFiltrados.length === 0">
              <td colspan="5" class="px-6 py-4 text-center text-gray-500">No se encontraron participantes</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Vista previa del certificado -->
    <div v-if="participantesSeleccionados.length > 0" class="bg-white p-6 rounded-xl shadow border border-gray-100">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Vista previa del certificado</h3>
      
      <div class="flex justify-between items-center mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Participante seleccionado</label>
          <select 
            v-model="participantePreview" 
            class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option 
              v-for="id in participantesSeleccionados" 
              :key="id" 
              :value="id"
            >
              {{ obtenerNombreParticipante(id) }}
            </option>
          </select>
        </div>
        <div class="flex gap-2">
          <button 
            @click="generarCertificadosSeleccionados" 
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Descargar selección
          </button>
          <button 
            @click="enviarCertificadosSeleccionados" 
            class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Enviar selección
          </button>
        </div>
      </div>
      
      <!-- Certificado Preview -->
      <div class="border-2 border-gray-200 p-8 rounded-lg">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-blue-800 mb-2">CERTIFICADO DE PARTICIPACIÓN</h1>
          <p class="text-gray-600">Se otorga el presente certificado a:</p>
        </div>
        
        <div class="text-center mb-8">
          <h2 class="text-4xl font-bold text-gray-800 mb-1">{{ obtenerParticipantePreview().nombre || 'Nombre del participante' }}</h2>
          <div class="h-1 bg-blue-200 w-1/3 mx-auto mb-4"></div>
          <p class="text-lg text-gray-700">Por su participación en el evento:</p>
          <p class="text-xl font-semibold text-blue-700">{{ obtenerParticipantePreview().evento || 'Nombre del evento' }}</p>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mb-8">
          <div>
            <p class="text-sm text-gray-500">Fecha de inicio:</p>
            <p class="font-medium">{{ formatDate(obtenerParticipantePreview().fecha_inicio) || '15/09/2025' }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Fecha de finalización:</p>
            <p class="font-medium">{{ formatDate(obtenerParticipantePreview().fecha_fin) || '16/09/2025' }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Ubicación:</p>
            <p class="font-medium">{{ obtenerParticipantePreview().ubicacion || 'Centro de Innovación' }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Semillero:</p>
            <p class="font-medium">{{ obtenerParticipantePreview().semillero || 'Inteligencia Artificial' }}</p>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <div class="inline-block border-t-2 border-gray-300 pt-4 px-8">
            <p class="text-gray-600">Fecha de emisión: {{ formatDate(new Date()) }}</p>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
import { ref, computed, onMounted } from 'vue'

// Datos de ejemplo (en una app real vendrían de una API)
const eventos = ref([
  { id: 1, nombre: 'Conferencia de Inteligencia Artificial' },
  { id: 2, nombre: 'Taller de Machine Learning' },
  { id: 3, nombre: 'Seminario de Deep Learning' }
])

const semilleros = ref([
  { id: 1, nombre: 'Inteligencia Artificial' },
  { id: 2, nombre: 'Ciencia de Datos' },
  { id: 3, nombre: 'Robótica' }
])

const participantes = ref([
  {
    id: 1,
    nombre: 'Enrique Martinez',
    correo: 'martinez@edu.co',
    evento: 'Conferencia de Inteligencia Artificial',
    semillero: 'Inteligencia Artificial',
    fecha_inicio: '2025-09-15 09:00:00',
    fecha_fin: '2025-09-16 18:00:00',
    ubicacion: 'Centro de Innovación'
  },
  {
    id: 2,
    nombre: 'Ana Rodríguez',
    correo: 'ana.rodriguez@edu.co',
    evento: 'Taller de Machine Learning',
    semillero: 'Ciencia de Datos',
    fecha_inicio: '2025-08-10 08:00:00',
    fecha_fin: '2025-08-12 17:00:00',
    ubicacion: 'Aula Magna'
  },
  {
    id: 3,
    nombre: 'Carlos Sánchez',
    correo: 'carlos.sanchez@edu.co',
    evento: 'Conferencia de Inteligencia Artificial',
    semillero: 'Inteligencia Artificial',
    fecha_inicio: '2025-09-15 09:00:00',
    fecha_fin: '2025-09-16 18:00:00',
    ubicacion: 'Centro de Innovación'
  }
])

// Estado del componente
const eventoSeleccionado = ref('')
const semilleroSeleccionado = ref('')
const busquedaParticipante = ref('')
const participantesSeleccionados = ref<number[]>([])
const todosSeleccionados = ref(false)
const participantePreview = ref<number | null>(null)
const isLoading = ref(false)

// Computed properties
const participantesFiltrados = computed(() => {
  return participantes.value.filter(p => {
    // Filtro por evento
    if (eventoSeleccionado.value && p.evento !== eventos.value.find(e => e.id === eventoSeleccionado.value)?.nombre) {
      return false
    }
    
    // Filtro por semillero
    if (semilleroSeleccionado.value && p.semillero !== semilleros.value.find(s => s.id === semilleroSeleccionado.value)?.nombre) {
      return false
    }
    
    // Filtro por búsqueda
    if (busquedaParticipante.value) {
      const searchTerm = busquedaParticipante.value.toLowerCase()
      return (
        p.nombre.toLowerCase().includes(searchTerm) || 
        p.correo.toLowerCase().includes(searchTerm)
      )
    }
    
    return true
  })
})

// Métodos
const formatDate = (dateString: string | Date) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const seleccionarTodos = () => {
  if (todosSeleccionados.value) {
    participantesSeleccionados.value = participantesFiltrados.value.map(p => p.id)
  } else {
    participantesSeleccionados.value = []
  }
}

const obtenerNombreParticipante = (id: number) => {
  const participante = participantes.value.find(p => p.id === id)
  return participante ? participante.nombre : ''
}

const obtenerParticipantePreview = () => {
  if (!participantePreview.value && participantesSeleccionados.value.length > 0) {
    participantePreview.value = participantesSeleccionados.value[0]
  }
  return participantes.value.find(p => p.id === participantePreview.value) || {}
}

const generarCertificadosSeleccionados = () => {
  if (participantesSeleccionados.value.length === 0) return
  
  // Aquí iría la lógica para generar los certificados
  alert(`Generando certificados para ${participantesSeleccionados.value.length} participantes...`)
  
  // En una implementación real, podrías:
  // 1. Llamar a un endpoint del backend que genere los PDFs
  // 2. Crear un ZIP con todos los certificados
  // 3. Descargar el ZIP o los PDFs individuales
}

const enviarCertificadosSeleccionados = () => {
  if (participantesSeleccionados.value.length === 0) return
  
  // Aquí iría la lógica para enviar los certificados por correo
  alert(`Enviando certificados a ${participantesSeleccionados.value.length} participantes...`)
  
  // En una implementación real, podrías:
  // 1. Llamar a un endpoint del backend que envíe los correos
  // 2. Mostrar un modal de confirmación
}

// Watchers
onMounted(() => {
  // En una implementación real, aquí cargarías los datos de la API
})
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>