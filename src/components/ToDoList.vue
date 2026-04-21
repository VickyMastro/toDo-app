<script setup>
import { ref } from 'vue'
import { useToast } from '@nuxt/ui/composables'
import { useToDosStore } from '../stores/toDosStore.js'

const toDosStore = useToDosStore()
/* preguntar a la IA como hacer un loading con esto */
toDosStore.getToDos()

const editingId = ref(null)
const toast = useToast()

function deleteToDo(id) {
  toDosStore.deleteToDo(id)
}

function confirmEditToDo(id, description) {
  const text = typeof description === 'string' ? description.trim() : ''
  if (!text) {
    toast.add({
      title: 'Descripción vacía',
      description: 'No puedes guardar una tarea sin texto.',
      color: 'error',
    })
    return
  }
  toDosStore.updateToDo(id, { description: text })
  editingId.value = null
}

function editToDo(id) {
  editingId.value = id
}
</script>

<template>
  <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3 max-w-6xl mx-auto">
    <UCard
      v-for="todo in toDosStore.filteredToDos"
      :key="todo.id"
      :ui="{ body: '!p-5' }"
      class="min-w-0"
    >
      <div class="text-sm text-gray-500 mb-1 font-bold">
        {{ new Date(todo.created_at).toLocaleDateString('es-AR') }}
      </div>
      <div class="flex items-center gap-3">
        <UCheckbox
          :model-value="todo.completed"
          @update:model-value="(checked) => toDosStore.updateToDo(todo.id, { completed: checked })"
          :description="editingId === todo.id ? undefined : todo.description"
          :class="[
            editingId !== todo.id ? 'flex-1 min-w-0' : 'shrink-0',
            { 'opacity-50 line-through': todo.completed },
          ]"
          :ui="{ wrapper: 'min-w-0', description: 'break-words' }"
        />
        <UInput v-model="todo.description" v-if="editingId === todo.id" class="w-full" />
        <UButton
          v-if="editingId !== todo.id"
          icon="i-lucide-pencil"
          color="neutral"
          variant="ghost"
          size="sm"
          aria-label="Editar tarea"
          @click="editToDo(todo.id)"
        />
        <UButton
          v-if="editingId !== todo.id"
          icon="i-lucide-x"
          color="error"
          variant="ghost"
          size="sm"
          aria-label="Eliminar tarea"
          @click="deleteToDo(todo.id)"
        />
        <UButton
          v-if="editingId === todo.id"
          icon="i-lucide-check"
          color="success"
          variant="ghost"
          size="sm"
          aria-label="Confirmar edición"
          @click="confirmEditToDo(todo.id, todo.description)"
        />
      </div>
    </UCard>

    <p v-if="toDosStore.toDos.length === 0" class="col-span-full p-6 text-center text-gray-400">
      No hay tareas pendientes 🎉
    </p>
  </div>
</template>
