<template>
  <div class="bg-white rounded-lg shadow-sm p-6 my-4">
    <div class="flex justify-between items-center mb-6">
      <h2 v-if="title" class="text-xl font-semibold text-gray-800">{{ title }}</h2>
      <div class="flex gap-4">
        <slot name="actions"></slot>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-gray-50">
            <th v-for="column in columns" 
                :key="column.key"
                @click="sortBy(column.key)"
                :class="[
                  'px-4 py-3 text-left text-gray-600 font-medium cursor-pointer select-none',
                  { 'hover:bg-gray-100': column.sortable }
                ]">
              <div class="flex items-center gap-2">
                {{ column.label }}
                <span v-if="column.sortable" class="text-gray-400">
                  {{ getSortIcon(column.key) }}
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedData" 
              :key="index"
              class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td v-for="column in columns" 
                :key="column.key"
                class="px-4 py-3">
              <slot :name="column.key" :item="item">
                {{ item[column.key] }}
              </slot>
            </td>
          </tr>
          <tr v-if="paginatedData.length === 0">
            <td :colspan="columns.length" class="px-4 py-8 text-center text-gray-500">
              No hay datos disponibles
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
      <div class="text-sm text-gray-500">
        Mostrando {{ paginationStart }} - {{ paginationEnd }} de {{ totalItems }} registros
      </div>
      <div class="flex items-center gap-4">
        <button 
          @click="currentPage--" 
          :disabled="currentPage === 1"
          class="px-4 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          Anterior
        </button>
        <span class="text-sm text-gray-600">Página {{ currentPage }} de {{ totalPages }}</span>
        <button 
          @click="currentPage++" 
          :disabled="currentPage === totalPages"
          class="px-4 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  itemsPerPage: {
    type: Number,
    default: 10
  }
})

const currentPage = ref(1)
const sortKey = ref('')
const sortOrder = ref('asc')

const sortedData = computed(() => {
  if (!sortKey.value) return props.data

  return [...props.data].sort((a, b) => {
    const aValue = a[sortKey.value]
    const bValue = b[sortKey.value]

    if (sortOrder.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
})

const totalItems = computed(() => props.data.length)

const totalPages = computed(() => Math.ceil(totalItems.value / props.itemsPerPage))

const paginationStart = computed(() => (currentPage.value - 1) * props.itemsPerPage + 1)

const paginationEnd = computed(() => Math.min(currentPage.value * props.itemsPerPage, totalItems.value))

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage
  const end = start + props.itemsPerPage
  return sortedData.value.slice(start, end)
})

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

const getSortIcon = (key) => {
  if (sortKey.value !== key) return '↕'
  return sortOrder.value === 'asc' ? '↑' : '↓'
}

watch(() => props.data, () => {
  currentPage.value = 1
})
</script>
