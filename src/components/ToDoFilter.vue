<script setup>
import { useToDosStore } from '../stores/toDosStore.js'

const toDosStore = useToDosStore()

const items = [
  { label: 'Todas', value: 'all', icon: 'i-lucide-list' },
  { label: 'Pendientes', value: 'pending', icon: 'i-lucide-clock' },
  { label: 'Completadas', value: 'done', icon: 'i-lucide-check-circle' },
]
</script>

<template>
  <div class="flex flex-col gap-4 p-4 max-w-md mx-auto">
    <UTabs
      v-model="toDosStore.filter"
      :items="items"
      :content="false"
      color="secondary"
      variant="pill"
      class="w-full"
    />

    <p
      v-if="toDosStore.toDos.length === 0 && toDosStore.filter === 'all'"
      class="col-span-full p-6 text-center text-gray-400"
    >
      No creaste tareas hasta ahora
    </p>

    <p v-if="toDosStore.filter === 'pending'" class="col-span-full p-6 text-center text-gray-400">
      No tienes tareas pendientes
    </p>

    <p v-if="toDosStore.filter === 'done'" class="col-span-full p-6 text-center text-gray-400">
      No tienes tareas completadas
    </p>
  </div>
</template>
