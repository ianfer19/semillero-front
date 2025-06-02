<template>
  <BaseLayout>
    <div>
      <h1 class="text-3xl font-bold mb-2">Bienvenido a la Gestión de Semilleros</h1>
      <p class="text-gray-600 mb-6">Administra eventos, proyectos y aprobaciones desde tu panel de control</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <DashboardCard
          title="Eventos Activos"
          :value="5"
          :icon="icons.calendar"
          bgColor="bg-blue-600"
          subtitle="+2 este mes"
        />
        <DashboardCard
          title="Total de Proyectos"
          :value="12"
          :icon="icons.folder"
          bgColor="bg-green-600"
          subtitle="8 activos"
        />
        <DashboardCard
          title="Aprobaciones Pendientes"
          :value="3"
          :icon="icons.alert"
          bgColor="bg-orange-500"
          extraInfo="Requieren atención"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Eventos Recientes -->
        <div>
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-xl font-bold">Eventos Recientes</h2>
            <a href="#" class="text-blue-600 font-medium flex items-center gap-1">Ver todos <span class="i-mdi-chevron-right"></span></a>
          </div>
          <EventCard
            title="Hackathon de Innovación"
            date="14 de octubre de 2023"
            location="Salón Principal"
            :coordinator-id="2"
            status="Activo"
          />
          <EventCard
            title="Taller de Metodologías Ágiles"
            date="19 de octubre de 2023"
            location="Aula 304"
            :coordinator-id="1"
            status="Próximo"
          />
          <EventCard
            title="Conferencia de Tecnologías Emergentes"
            date="25 de octubre de 2023"
            location="Auditorio Central"
            :coordinator-id="3"
            status="Próximo"
          />
        </div>
        <!-- Proyectos Pendientes de Aprobación -->
        <div>
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-xl font-bold">Proyectos Pendientes de Aprobación</h2>
            <a href="#" class="text-blue-600 font-medium flex items-center gap-1">Ver todos <span class="i-mdi-chevron-right"></span></a>
          </div>
          <ProjectApprovalCard
            title="Sistema de Monitoreo Ambiental"
            :seedbed-id="2"
            :leader-id="5"
            status="Pendiente"
            @approve="() => {}"
            @details="() => {}"
          />
          <ProjectApprovalCard
            title="Aplicación para Gestión de Residuos"
            :seedbed-id="1"
            :leader-id="8"
            status="Pendiente"
            @approve="() => {}"
            @details="() => {}"
          />
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
import DashboardCard from '@/components/DashboardCard.vue'
import EventCard from '@/components/EventCard.vue'
import ProjectApprovalCard from '@/components/ProjectApprovalCard.vue'
import { CalendarIcon, FolderIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline'

const icons = {
  calendar: CalendarIcon,
  folder: FolderIcon,
  alert: ExclamationCircleIcon
}
</script>