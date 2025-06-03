<template>
    <BaseLayout>
      <section class="project-list">
        <h2>Listado de Proyectos con Autores</h2>
  
        <div v-if="projects.length === 0" class="empty">
          No hay proyectos registrados.
        </div>
  
        <div v-else class="project-card" v-for="project in projects" :key="project.id">
          <h3>{{ project.titulo }}</h3>
          <p class="description">{{ project.descripcion }}</p>
  
          <div class="info">
            <p><strong>Líder:</strong> {{ project.lider?.nombre || 'No asignado' }}</p>
            <p><strong>Coordinador:</strong> {{ project.coordinador?.nombre || 'No asignado' }}</p>
          </div>
  
          <div class="authors">
            <strong>Autores:</strong>
            <ul v-if="project.autores.length > 0">
              <li v-for="autor in project.autores" :key="autor.id">
                {{ autor.nombre }} - {{ autor.email }}
              </li>
            </ul>
            <p v-else>No hay autores registrados.</p>
          </div>
        </div>
      </section>
    </BaseLayout>
  </template>
  
  <script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import BaseLayout from '@/layouts/BaseLayout.vue'
    import { reportsService } from '@/modules/reports/services/reportsService'  // Ajusta la ruta según tu estructura

    interface Usuario {
    id: number
    nombre: string
    email: string
    tipo: string
    }

    interface Proyecto {
    id: number
    titulo: string
    descripcion: string
    lider: Usuario | null
    coordinador: Usuario | null
    autores: Usuario[]
    }

    const projects = ref<Proyecto[]>([])

    onMounted(async () => {
    try {
        projects.value = await reportsService.getProjectsWithAuthors()
    } catch (error) {
        console.error('Error cargando proyectos con autores:', error)
    }
    })

  </script>
  
  <style scoped>
  .project-list {
    max-width: 900px;
    margin: auto;
    padding: 30px 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .project-list h2 {
    text-align: center;
    margin-bottom: 30px;
    color: #2c3e50;
  }
  
  .project-card {
    background: #fff;
    padding: 20px;
    margin-bottom: 25px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    border-left: 6px solid #3498db;
  }
  
  .project-card h3 {
    margin: 0 0 10px;
    color: #2980b9;
  }
  
  .project-card .description {
    font-style: italic;
    color: #555;
    margin-bottom: 10px;
  }
  
  .info p {
    margin: 4px 0;
  }
  
  .authors {
    margin-top: 10px;
  }
  
  .authors ul {
    padding-left: 20px;
    margin: 6px 0;
  }
  
  .empty {
    text-align: center;
    color: #888;
    font-style: italic;
  }
  </style>
  