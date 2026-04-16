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
  </div>
</template>
