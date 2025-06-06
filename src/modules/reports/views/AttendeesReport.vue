<template>
  <BaseLayout>
    <Tabs :tabs="tabs">
      <template #inscritos>
        <div class="tab-content">
          <!-- Filtros para inscritos -->
          <div class="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <h3 class="text-lg font-medium text-gray-700 mb-4">Filtros</h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del Estudiante</label>
                <input
                  v-model="filtersInscritos.nombre"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Buscar por nombre..."
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  v-model="filtersInscritos.email"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Buscar por email..."
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Evento</label>
                <input
                  v-model="filtersInscritos.evento"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Buscar por evento..."
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Fecha de Inscripción</label>
                <input
                  v-model="filtersInscritos.fechaInscripcion"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <DynamicTable
            :data="filteredInscritos"
            :columns="columnsInscritos"
            :itemsPerPage="5"
          >
            <template #nombre="{ item }">
              <div class="flex flex-col gap-1">
                <span class="font-medium">{{ item.estudiante.nombre }}</span>
                <span class="text-sm text-gray-500">
                  Inscrito el {{ formatDate(item.eventos[0].fecha_inscripcion) }}
                </span>
              </div>
            </template>
            <template #email="{ item }">
              {{ item.estudiante.email }}
            </template>
            <template #evento="{ item }">
              <div class="flex flex-col gap-1">
                <span class="font-medium">{{ item.eventos[0].nombre }}</span>
                <span class="text-sm text-gray-500">
                  {{ formatDate(item.eventos[0].fecha_inicio) }} - {{ formatDate(item.eventos[0].fecha_fin) }}
                </span>
              </div>
            </template>
            <template #proyecto="{ item }">
              <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                {{ item.eventos[0].proyecto.titulo }}
              </span>
            </template>
          </DynamicTable>
        </div>
      </template>
      
      <template #evaluadores>
        <div class="tab-content">
          <!-- Filtros para evaluadores -->
          <div class="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <h3 class="text-lg font-medium text-gray-700 mb-4">Filtros</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del Evaluador</label>
                <input
                  v-model="filtersEvaluadores.nombre"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Buscar por nombre..."
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  v-model="filtersEvaluadores.email"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Buscar por email..."
                />
              </div>
            </div>
          </div>

          <DynamicTable
            :data="filteredEvaluadores"
            :columns="columnsEvaluadores"
            :itemsPerPage="5"
          >
            <template #nombre="{ item }">
              {{ item.evaluador.nombre }}
            </template>
            <template #email="{ item }">
              {{ item.evaluador.email }}
            </template>
            <template #proyectos="{ item }">
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="proyecto in item.proyectos" 
                  :key="proyecto.id"
                  class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                >
                  {{ proyecto.titulo }}
                </span>
              </div>
            </template>
          </DynamicTable>
        </div>
      </template>
    </Tabs>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
import Tabs from '@/components/Tabs.vue'
import DynamicTable from '@/components/Table.vue'
import { onMounted, ref, computed } from 'vue'
import { useReportsStore } from '../store'

const store = useReportsStore()

const tabs = [
  { id: 'inscritos', title: 'Inscritos' },
  { id: 'evaluadores', title: 'Evaluadores' }
]

// Filtros para inscritos
const filtersInscritos = ref({
  nombre: '',
  email: '',
  evento: '',
  fechaInscripcion: ''
})

// Filtros para evaluadores
const filtersEvaluadores = ref({
  nombre: '',
  email: ''
})

// Datos filtrados para inscritos
const filteredInscritos = computed(() => {
  return store.enrolledStudents.filter(inscrito => {
    const nombreMatch = inscrito.estudiante.nombre.toLowerCase().includes(filtersInscritos.value.nombre.toLowerCase())
    const emailMatch = inscrito.estudiante.email.toLowerCase().includes(filtersInscritos.value.email.toLowerCase())
    const eventoMatch = inscrito.eventos[0].nombre.toLowerCase().includes(filtersInscritos.value.evento.toLowerCase())
    
    let fechaMatch = true
    if (filtersInscritos.value.fechaInscripcion) {
      // Convertir la fecha de inscripción del API a objeto Date
      const fechaInscripcion = new Date(inscrito.eventos[0].fecha_inscripcion)
      
      // Convertir la fecha del filtro a objeto Date y ajustar por zona horaria
      const fechaFiltro = new Date(filtersInscritos.value.fechaInscripcion)
      fechaFiltro.setDate(fechaFiltro.getDate() + 1) // Compensar el ajuste de zona horaria
      
      // Ajustar las fechas a medianoche para comparar solo el día
      fechaInscripcion.setHours(0, 0, 0, 0)
      fechaFiltro.setHours(0, 0, 0, 0)
      
      // Obtener solo la fecha en formato YYYY-MM-DD para comparar
      const fechaInscripcionStr = fechaInscripcion.toISOString().split('T')[0]
      const fechaFiltroStr = fechaFiltro.toISOString().split('T')[0]
      
      console.log('Fecha inscripción:', fechaInscripcionStr)
      console.log('Fecha filtro:', fechaFiltroStr)
      
      fechaMatch = fechaInscripcionStr === fechaFiltroStr
    }
    
    return nombreMatch && emailMatch && eventoMatch && fechaMatch
  })
})

// Datos filtrados para evaluadores
const filteredEvaluadores = computed(() => {
  return store.evaluators.filter(evaluador => {
    const nombreMatch = evaluador.evaluador.nombre.toLowerCase().includes(filtersEvaluadores.value.nombre.toLowerCase())
    const emailMatch = evaluador.evaluador.email.toLowerCase().includes(filtersEvaluadores.value.email.toLowerCase())
    
    return nombreMatch && emailMatch
  })
})

const columnsInscritos = [
  { key: 'nombre', label: 'Nombre del Estudiante', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'evento', label: 'Evento', sortable: true },
  { key: 'proyecto', label: 'Proyecto', sortable: true }
]

const columnsEvaluadores = [
  { key: 'nombre', label: 'Nombre del Evaluador', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'proyectos', label: 'Proyectos Asignados', sortable: false }
]

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(async () => {
  await Promise.all([
    store.fetchEnrolledStudents(),
    store.fetchEvaluators()
  ])
})
</script>

<style scoped>
.tab-content {
  padding: 1rem;
}
</style>
