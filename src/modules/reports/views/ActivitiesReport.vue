<template>
  <BaseLayout>
    <h2 class="mb-6 text-2xl font-bold text-gray-800">Reporte de Actividades</h2>
    <div class="flex justify-between items-center mb-4">
      <div class="flex flex-wrap gap-4 items-end bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div>
          <label class="block text-xs font-semibold text-gray-500 mb-1">Nombre Actividades</label>
          <input v-model="filtroNombre" type="text" placeholder="Buscar por nombre" class="border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-200 rounded-lg px-3 py-2 w-48 text-sm outline-none transition" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-500 mb-1">Fecha desde</label>
          <input v-model="filtroFechaDesde" type="date" class="border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-200 rounded-lg px-3 py-2 text-sm outline-none transition" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-500 mb-1">Fecha hasta</label>
          <input v-model="filtroFechaHasta" type="date" class="border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-200 rounded-lg px-3 py-2 text-sm outline-none transition" />
        </div>
        <button @click="limpiarFiltros" class="ml-2 px-4 py-2 bg-gray-100 hover:bg-blue-50 text-gray-600 rounded-lg text-sm font-medium border border-gray-200 transition">Limpiar</button>
      </div>
      <div class="relative ml-4">
        <button @click="mostrarMenuExportar = !mostrarMenuExportar" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow transition">Exportar ▼</button>
        <div v-if="mostrarMenuExportar" class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <button @click="exportarExcel" class="block w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700">Exportar a Excel</button>
          <button @click="exportarPDF" class="block w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700">Exportar a PDF</button>
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="mb-4 text-blue-600 text-center">Cargando actividades...</div>
    <div v-else-if="error" class="mb-4 text-red-500 text-center">{{ error }}</div>
    <div v-else class="overflow-x-auto">
      <table class="min-w-full bg-white rounded-xl shadow border border-gray-100">
  <thead>
    <tr class="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
      <th
        class="py-3 px-4 text-left font-semibold cursor-pointer select-none"
        @click="ordenarPor('actividad_titulo')"
      >
        Título
        <span v-if="ordenCampo === 'actividad_titulo'">
          {{ ordenAscendente ? '▲' : '▼' }}
        </span>
      </th>
      <th
        class="py-3 px-4 text-left font-semibold cursor-pointer select-none"
        @click="ordenarPor('fecha_inicio')"
      >
        Fecha inicio
        <span v-if="ordenCampo === 'fecha_inicio'">
          {{ ordenAscendente ? '▲' : '▼' }}
        </span>
      </th>
      <th
        class="py-3 px-4 text-left font-semibold cursor-pointer select-none"
        @click="ordenarPor('fecha_fin')"
      >
        Fecha fin
        <span v-if="ordenCampo === 'fecha_fin'">
          {{ ordenAscendente ? '▲' : '▼' }}
        </span>
      </th>
      <th class="py-3 px-4 text-left font-semibold">Estado</th>
      <th class="py-3 px-4 text-left font-semibold">Responsables</th>
    </tr>
  </thead>
  <tbody>
    <tr
      v-for="actividad in actividadesFiltradasOrdenadas"
      :key="actividad.actividad_id"
      class="border-t border-gray-100 hover:bg-gray-50"
    >
      <td class="py-2 px-4 text-sm text-gray-800">{{ actividad.actividad_titulo }}</td>
      <td class="py-2 px-4 text-sm text-gray-600">{{ actividad.fecha_inicio }}</td>
      <td class="py-2 px-4 text-sm text-gray-600">{{ actividad.fecha_fin }}</td>
      <td class="py-2 px-4 text-sm">
        <span
          :class="{
            'text-yellow-500': actividad.estado === 'pendiente',
            'text-green-600': actividad.estado === 'completado',
            'text-blue-500': actividad.estado === 'en_progreso'
          }"
        >
          {{ actividad.estado }}
        </span>
      </td>
      <td class="py-2 px-4 text-sm text-gray-700">
        <div v-if="actividad.responsable_nombre">
          {{ actividad.responsable_nombre }}<br />
          <span class="text-xs text-gray-500">{{ actividad.responsable_correo }}</span>
        </div>
        <span v-else class="text-gray-400 text-sm">Sin responsable</span>
      </td>
    </tr>
  </tbody>
</table>

    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
import { onMounted, ref, computed } from 'vue'
import { useReportsStore } from '@/modules/reports/store'
import { storeToRefs } from 'pinia'
import * as XLSX from 'xlsx'

const reportsStore = useReportsStore()
const { activities, isLoading, error } = storeToRefs(reportsStore)

const filtroNombre = ref('')
const filtroFechaDesde = ref('')
const filtroFechaHasta = ref('')

const ordenCampo = ref('fecha_inicio')
const ordenAscendente = ref(false)
const mostrarMenuExportar = ref(false)

const limpiarFiltros = () => {
  filtroNombre.value = ''
  filtroFechaDesde.value = ''
  filtroFechaHasta.value = ''
}

const ordenarPor = (campo: string) => {
  if (ordenCampo.value === campo) {
    ordenAscendente.value = !ordenAscendente.value
  } else {
    ordenCampo.value = campo
    ordenAscendente.value = true
  }
}

// Aquí accedemos correctamente al array de actividades dentro de la respuesta
const actividades = computed(() => {
  console.log(actividades)
  return activities.value?.actividades || []
})

const actividadesFiltradas = computed(() => {
  let lista = actividades.value

  if (filtroNombre.value) {
    lista = lista.filter(a =>
      (a.actividad_titulo || '').toLowerCase().includes(filtroNombre.value.toLowerCase())
    )
  }

  if (filtroFechaDesde.value) {
    lista = lista.filter(a => {
      const fechaInicio = a.fecha_inicio.split(' ')[0]
      return fechaInicio >= filtroFechaDesde.value
    })
  }

  if (filtroFechaHasta.value) {
    lista = lista.filter(a => {
      const fechaFin = a.fecha_fin.split(' ')[0]
      return fechaFin <= filtroFechaHasta.value
    })
  }

  return lista
})

const actividadesFiltradasOrdenadas = computed(() => {
  const lista = [...actividadesFiltradas.value]
  lista.sort((a, b) => {
    let valA = a[ordenCampo.value]
    let valB = b[ordenCampo.value]

    if (typeof valA === 'string') valA = valA.toLowerCase()
    if (typeof valB === 'string') valB = valB.toLowerCase()

    if (valA < valB) return ordenAscendente.value ? -1 : 1
    if (valA > valB) return ordenAscendente.value ? 1 : -1
    return 0
  })
  return lista
})

const exportarExcel = () => {
  mostrarMenuExportar.value = false
  const data = actividadesFiltradasOrdenadas.value.map(a => ({
    'Título': a.actividad_titulo,
    'Fecha inicio': a.fecha_inicio,
    'Fecha fin': a.fecha_fin,
    'Estado': a.estado,
    'Responsable': a.responsable_nombre || 'Sin responsable',
    'Correo responsable': a.responsable_correo || ''
  }))
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Actividades')
  XLSX.writeFile(wb, 'reporte_actividades.xlsx')
}

const exportarPDF = () => {
  mostrarMenuExportar.value = false
  window.open(import.meta.env.VITE_API_URL + 'reports/activity/pdf', '_blank')
}

onMounted(() => {
  reportsStore.fetchActivities()

})
</script>

