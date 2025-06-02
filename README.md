# 🚀 Proyecto Vue 3 + TypeScript + Vite

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:
- Node.js (versión 16.x o superior) 📦
- npm (viene con Node.js) o yarn 🧶
- Git 🐙

## 🛠️ Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/Universidad-de-Cordoba-Colombia/dip-dw-2025-1.git
cd dip-dw-2025-1
```

2. Instalar dependencias
```bash
npm install
# o
yarn install
```

3. Configuración del Entorno 🔐
   - Copia el archivo `.env.example` para crear tu propio archivo `.env`:
   ```bash
   cp .env.example .env
   ```
   - Abre el archivo `.env` y completa los valores requeridos para cada variable de entorno
   - ⚠️ Nunca subas tu archivo `.env` al control de versiones

4. Iniciar el servidor de desarrollo
```bash
npm run dev
# o
yarn dev
```

## 🔄 Flujo de Trabajo con Git

### Clonación y Configuración Inicial

1. Al clonar el repositorio por primera vez:
```bash
git clone https://github.com/Universidad-de-Cordoba-Colombia/dip-dw-2025-1.git
cd dip-dw-2025-1
```

2. Cambiar a la rama develop y actualizarla:
```bash
git checkout develop
git pull origin develop
```

3. Crear y cambiar a tu rama de módulo:
```bash
git checkout -b nombre-de-tu-modulo
```

### Flujo de Trabajo Diario

1. **SIEMPRE** antes de comenzar a trabajar:
```bash
git checkout develop
git pull origin develop
git checkout nombre-de-tu-modulo
git merge develop
```

2. Realizar tus cambios y commits:
```bash
git add .
git commit -m ":GITMOJI: [nombre-de-tu-rama]: descripción de tus cambios"
```

3. Antes de hacer push:
```bash
git checkout develop
git pull origin develop
git checkout nombre-de-tu-modulo
git merge develop
git push origin nombre-de-tu-modulo
```

⚠️ **IMPORTANTE**: 
- NUNCA subas cambios sin antes hacer pull desde develop
- Mantén tu rama de módulo actualizada con develop
- Resuelve los conflictos en tu rama local antes de hacer push

## 🏗️ Estructura del Proyecto

```
├── src/               # Archivos fuente
├── public/           # Archivos estáticos
├── .env.example      # Ejemplo de variables de entorno
└── package.json      # Dependencias y scripts del proyecto
```

## 📁 Arquitectura Detallada del Proyecto

### 🎯 Estructura de Módulos
Cada módulo en la aplicación sigue una estructura consistente:

```
src/
├── modules/
│   ├── auth/                 # Ejemplo de módulo de autenticación
│   │   ├── components/      # Componentes específicos del módulo
│   │   ├── views/          # Vistas/páginas del módulo
│   │   ├── store/          # Store específico del módulo
│   │   │   ├── index.ts    # Definición del módulo store
│   │   │   └── types.ts    # Tipos del store
│   │   ├── router/         # Rutas específicas del módulo
│   │   │   └── index.ts    # Definiciones de rutas
│   │   ├── services/       # Servicios API
│   │   │   └── index.ts    # Llamadas API
│   │   └── types/          # Tipos específicos del módulo
│   └── [otros-modulos]/    # Otros módulos siguen la misma estructura
├── router/                  # Configuración del router principal
│   └── index.ts            # Registro de rutas
└── store/                   # Configuración del store principal
    └── index.ts            # Registro del store
```

### 🔄 Integración de Módulos

#### Integración del Router
Cada módulo debe definir sus propias rutas y luego registrarlas en el router principal:

```typescript
// modules/auth/router/index.ts
export const authRoutes = {
  path: '/auth',
  children: [
    {
      path: 'login',
      component: () => import('@modules/auth/views/LoginView.vue')
    },
    {
      path: 'register',
      component: () => import('@modules/auth/views/RegisterView.vue')
    },
    {
      path: 'profile',
      component: () => import('@modules/auth/views/ProfileView.vue')
    }
  ]
}

// router/index.ts
import { authRoutes } from '@modules/auth/router'

const routes = [
  authRoutes,
  // otras rutas de módulos...
]
```

#### Integración del Store
Los módulos deben tener sus propios slices del store que se registran en el store principal:

```typescript
// modules/auth/store/index.ts
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  actions: {
    async login(credentials) {
      // lógica de login
    }
  }
})

// store/index.ts
import { useAuthStore } from '@modules/auth/store'
// Registrar otros módulos del store...
```

### 🛠️ Capas del Módulo

Cada módulo debe implementar las siguientes capas:

1. **Capa de Vistas** (`views/`)
   - Componentes de página
   - Componentes de diseño
   - Maneja la interacción del usuario
   - Utiliza componentes y store

2. **Capa de Componentes** (`components/`)
   - Componentes UI reutilizables
   - Componentes específicos del módulo
   - Deben ser presentacionales cuando sea posible

3. **Capa de Store** (`store/`)
   - Gestión de estado
   - Acciones y mutaciones
   - Lógica de estado específica del módulo

4. **Capa de Servicios** (`services/`)
   - Llamadas API
   - Integración con servicios externos
   - Obtención y manipulación de datos
   - Debe ser utilizada por la capa de store

5. **Capa de Router** (`router/`)
   - Definiciones de rutas
   - Guardias de navegación
   - Lógica específica de rutas

### 📝 Mejores Prácticas

- Cada módulo debe ser autocontenido
- Usar interfaces TypeScript para seguridad de tipos
- Implementar manejo adecuado de errores en servicios
- Mantener los componentes pequeños y enfocados
- Usar Composition API con `<script setup>`
- Seguir el principio de responsabilidad única

## 🚀 Scripts Disponibles

- `npm run dev` - Iniciar servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Vista previa de la construcción de producción localmente

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.