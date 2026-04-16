<script setup>
import { useToDosStore } from '../stores/toDosStore.js'

const toDosStore = useToDosStore()
toDosStore.getToDos()

function deleteToDo(id) {
  toDosStore.deleteToDo(id)
}
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 p-3 max-w-6xl mx-auto">
    <UCard v-for="todo in toDosStore.filteredToDos" :key="todo.id">
      <div class="flex items-center gap-3">
        <UCheckbox
          :model-value="todo.completed"
          @update:model-value="(checked) => toDosStore.updateToDo(todo.id, { completed: checked })"
          :description="todo.description"
          class="flex-1"
          :class="{ 'opacity-50 line-through': todo.completed }"
        />
        <UButton
          icon="i-lucide-x"
          color="neutral"
          variant="ghost"
          size="sm"
          aria-label="Eliminar tarea"
          @click="deleteToDo(todo.id)"
        />
      </div>
    </UCard>

    <p v-if="toDosStore.toDos.length === 0" class="col-span-full p-6 text-center text-gray-400">
      No hay tareas pendientes 🎉
    </p>
  </div>
</template>
