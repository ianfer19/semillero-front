<template>
  <BaseLayout>
    <section class="dashboard">
      <h1>Panel de Reportes</h1>
      <div class="card-grid">
        <RouterLink
          v-for="report in reportLinks"
          :key="report.path"
          :to="report.path"
          class="card"
        >
          <h2>{{ report.title }}</h2>
          <p>{{ report.description }}</p>
        </RouterLink>
      </div>
    </section>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'

const reportLinks = [
  {
    title: 'Actividades',
    description: 'Consulta las actividades programadas',
    path: '/reports/activities',
  },
  {
    title: 'Inscritos',
    description: 'Revisa los participantes registrados',
    path: '/reports/attendees',
  },
  {
    title: 'Proyectos',
    description: 'Visualiza los proyectos y autores',
    path: '/reports/projects',
  },
  {
    title: 'Certificados',
    description: 'Gestiona los certificados emitidos',
    path: '/reports/certificates',
  },
  {
    title: 'Semilleros',
    description: 'Consulta universidades, facultades y programas',
    path: '/reports/institutions',
  },
]
</script>

<style scoped>
.dashboard {
  padding: 2rem;
}

.dashboard h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.card {
  display: block;
  background-color: #ffffff;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: #333;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.card h2 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.card p {
  font-size: 0.95rem;
  color: #666;
}
</style>
