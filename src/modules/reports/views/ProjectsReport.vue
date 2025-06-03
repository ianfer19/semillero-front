<template>
    <BaseLayout>
      <section class="project-menu">
        <h2>Reportes Relacionados con Proyectos</h2>
        <div class="menu-grid">
          <router-link to="/reports/projects/list" class="menu-card">
            <h3>Listado de Proyectos con Autores</h3>
            <p>Consulta los proyectos registrados y sus respectivos autores.</p>
          </router-link>
  
          <router-link to="/reports/projects/grades" class="menu-card">
            <h3>Calificación de Proyectos</h3>
            <p>Revisa las calificaciones asignadas a cada proyecto.</p>
          </router-link>
  
          <router-link to="/reports/projects/certificados-calificacion" class="menu-card">
            <h3>Certificados de Calificación</h3>
            <p>Descarga certificados de calificación de proyectos por evento.</p>
          </router-link>
        </div>
      </section>
    </BaseLayout>
  </template>
  
  <script setup lang="ts">
  import BaseLayout from '@/layouts/BaseLayout.vue'
  </script>
  
  <style scoped>
  .project-menu {
    padding: 40px 20px;
    max-width: 1000px;
    margin: 0 auto;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .project-menu h2 {
    text-align: center;
    margin-bottom: 30px;
    color: #2c3e50;
  }
  
  .menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }
  
  .menu-card {
    background: #ffffff;
    border-radius: 10px;
    padding: 20px;
    text-decoration: none;
    color: #2c3e50;
    border: 1px solid #e0e0e0;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }
  
  .menu-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
  
  .menu-card h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 18px;
    color: #34495e;
  }
  
  .menu-card p {
    margin: 0;
    color: #555;
    font-size: 14px;
  }
  </style>
  