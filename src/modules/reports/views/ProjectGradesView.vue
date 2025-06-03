<template>
    <BaseLayout>
      <section class="grades-report">
        <h2>Calificación de Proyectos</h2>
  
        <div v-if="grades.length === 0" class="empty">
          No hay calificaciones registradas.
        </div>
  
        <table v-else class="grades-table">
          <thead>
            <tr>
              <th>Proyecto</th>
              <th>Total Evaluaciones</th>
              <th>Suma Puntaje</th>
              <th>Promedio</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="grade in grades" :key="grade.proyecto_id">
              <td>{{ grade.proyecto_titulo }}</td>
              <td>{{ grade.total_evaluaciones }}</td>
              <td>{{ grade.suma_puntaje_total }}</td>
              <td>{{ grade.promedio_puntuacion }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </BaseLayout>
  </template>
  
  <script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import BaseLayout from '@/layouts/BaseLayout.vue'
    import { reportsService } from '@/modules/reports/services/reportsService'

    interface Grade {
    proyecto_id: number
    proyecto_titulo: string
    total_evaluaciones: number
    promedio_puntuacion: string
    suma_puntaje_total: string
    }

    const grades = ref<Grade[]>([])

    onMounted(async () => {
    try {
        grades.value = await reportsService.getProjectScores()
    } catch (error) {
        console.error('Error al cargar las calificaciones de proyectos:', error)
    }
    })

  </script>
  
  <style scoped>
  .grades-report {
    max-width: 900px;
    margin: auto;
    padding: 30px 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .grades-report h2 {
    text-align: center;
    margin-bottom: 30px;
    color: #2c3e50;
  }
  
  .grades-table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }
  
  .grades-table th,
  .grades-table td {
    padding: 12px 16px;
    text-align: center;
    border-bottom: 1px solid #eee;
  }
  
  .grades-table th {
    background-color: #f5f7fa;
    color: #34495e;
    font-weight: 600;
  }
  
  .grades-table tr:hover {
    background-color: #f0f8ff;
  }
  
  .empty {
    text-align: center;
    color: #888;
    font-style: italic;
  }
  </style>
  