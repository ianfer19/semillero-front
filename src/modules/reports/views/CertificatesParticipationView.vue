<template>
  <BaseLayout>
    <h2 class="mb-6 text-2xl font-bold text-gray-800">Generación de Certificados</h2>

    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Evento</label>
          <select 
            v-model="selectedEventId" 
            @change="loadParticipants"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">Seleccione un evento</option>
            <option v-for="event in events" :key="event.id" :value="event.id">
              {{ event.name }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Participante</label>
          <select 
            v-model="selectedParticipantId" 
            :disabled="!selectedEventId || participantsLoading"
            @change="loadCertificate"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">Seleccione un participante</option>
            <option v-for="participant in participants" :key="participant.id" :value="participant.id">
              {{ participant.name }} ({{ participant.email }})
            </option>
          </select>
        </div>

        <div class="flex items-end">
          <button 
            @click="generateAllCertificates" 
            :disabled="!selectedEventId"
            class="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md disabled:bg-gray-300"
          >
            Generar todos
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto mb-2"></div>
      <p class="text-gray-600">Cargando información...</p>
    </div>

    <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
      <p>{{ error }}</p>
    </div>

    <div v-if="certificate && !loading" class="bg-white p-6 rounded-xl shadow border border-gray-100 max-w-4xl mx-auto">
      <div class="border-2 border-gray-200 p-8 rounded-lg mb-6">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-blue-800 mb-2">CERTIFICADO DE PARTICIPACIÓN</h1>
          <p class="text-gray-600">Se otorga el presente certificado a:</p>
        </div>

        <div class="text-center mb-8">
          <h2 class="text-4xl font-bold text-gray-800 mb-1">{{ certificate.nombre_participante }}</h2>
          <div class="h-1 bg-blue-200 w-1/3 mx-auto mb-4"></div>
          <p class="text-lg text-gray-700">Por su participación en el evento:</p>
          <p class="text-xl font-semibold text-blue-700">{{ certificate.nombre_evento }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-8">
          <div>
            <p class="text-sm text-gray-500">Fecha de inicio:</p>
            <p class="font-medium">{{ formatDate(certificate.fecha_inicio_evento) }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Fecha de finalización:</p>
            <p class="font-medium">{{ formatDate(certificate.fecha_fin_evento) }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Ubicación:</p>
            <p class="font-medium">{{ certificate.ubicacion_evento }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Semillero:</p>
            <p class="font-medium">{{ certificate.semillero }}</p>
          </div>
        </div>

        <div class="text-center mt-12">
          <div class="inline-block border-t-2 border-gray-300 pt-4 px-8">
            <p class="text-gray-600">Fecha de emisión: {{ formatDate(certificate.fecha_inscripcion) }}</p>
          </div>
        </div>
      </div>

      <div class="flex justify-center gap-4">
        <button @click="downloadCertificate" class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition flex items-center gap-2">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          Descargar PDF
        </button>
        <button @click="sendCertificateByEmail" class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow transition flex items-center gap-2">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          Enviar por correo
        </button>
      </div>
    </div>

    <div v-if="!certificate && !loading" class="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
      <p>Seleccione un evento y un participante para generar el certificado.</p>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseLayout from '@/layouts/BaseLayout.vue'
import { reportsService } from '@/modules/reports/services/reportsService'

// Estados
const loading = ref(false)
const participantsLoading = ref(false)
const error = ref('')
const events = ref<Array<{id: number, name: string}>>([])
const participants = ref<Array<{id: number, name: string, email: string}>>([])
const certificate = ref<any>(null)
const selectedEventId = ref<number | null>(null)
const selectedParticipantId = ref<number | null>(null)

// Cargar eventos
const loadEvents = async () => {
  try {
    loading.value = true
    const data = await reportsService.getEventReport(0) // Puedes reemplazar esto si tienes un servicio específico de eventos
    events.value = data?.events || []
  } catch (err) {
    error.value = 'Error al cargar eventos.'
  } finally {
    loading.value = false
  }
}

// Cargar participantes del evento
const loadParticipants = async () => {
  if (!selectedEventId.value) return
  try {
    participantsLoading.value = true
    const data = await reportsService.getAllActivities(selectedEventId.value)
    participants.value = data?.participants || []
  } catch (err) {
    error.value = 'Error al cargar participantes.'
  } finally {
    participantsLoading.value = false
  }
}

// Cargar certificado de un participante
const loadCertificate = async () => {
  if (!selectedEventId.value || !selectedParticipantId.value) return
  try {
    loading.value = true
    const payload = {
      event_id: selectedEventId.value,
      participant_id: selectedParticipantId.value
    }
    certificate.value = await reportsService.generateCertificate(payload)
  } catch (err) {
    error.value = 'Error al generar el certificado.'
  } finally {
    loading.value = false
  }
}

// Generar todos los certificados
const generateAllCertificates = async () => {
  if (!selectedEventId.value) return
  try {
    loading.value = true
    await reportsService.generateCertificatesForEvent(selectedEventId.value)
    alert('Certificados generados correctamente.')
  } catch (err) {
    error.value = 'Error al generar los certificados del evento.'
  } finally {
    loading.value = false
  }
}

// Descargar el certificado (PDF base64 simulado)
const downloadCertificate = () => {
  if (!certificate.value || !certificate.value.pdf_base64) return
  const link = document.createElement('a')
  link.href = `data:application/pdf;base64,${certificate.value.pdf_base64}`
  link.download = `certificado_${certificate.value.nombre_participante}.pdf`
  link.click()
}

// Simular envío por correo
const sendCertificateByEmail = async () => {
  try {
    alert(`Correo enviado a ${certificate.value?.email || 'el participante'}`)
  } catch (err) {
    error.value = 'Error al enviar el correo.'
  }
}

// Formatear fecha
const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('es-ES', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

// Inicialización
onMounted(() => {
  loadEvents()
})
</script>
