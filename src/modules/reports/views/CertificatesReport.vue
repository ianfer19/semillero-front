<template>
  <BaseLayout>
    <section class="certificates-menu">
      <h2>Reportes Relacionados con Certificados</h2>
      <div class="menu-grid">
        <router-link to="/reports/certificates/participation" class="menu-card">
          <h3>Consulta de Certificados de Participación en Evento</h3>
          <p>Consulta los certificados de participación en los diferentes eventos.</p>
        </router-link>

        <router-link to="/reports/certificates/by-member" class="menu-card">
          <h3>Certificados por Miembro de Semillero</h3>
          <p>Descarga certificados asociados a miembros de semilleros específicos.</p>
        </router-link>

        <router-link to="/reports/certificates/event-reports" class="menu-card">
          <h3>Informes por Eventos</h3>
          <p>Consulta informes y certificados relacionados con eventos realizados.</p>
        </router-link>

        <router-link to="/reports/certificates/project-grades" class="menu-card">
          <h3>Certificados de Calificación de Proyecto en Evento</h3>
          <p>Descarga certificados de calificación para proyectos en eventos específicos.</p>
        </router-link>
      </div>
    </section>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
</script>

<style scoped>
.certificates-menu {
  padding: 40px 20px;
  max-width: 1000px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.certificates-menu h2 {
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
