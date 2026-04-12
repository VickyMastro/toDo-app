<script setup>
/* import { storeToRefs } from 'pinia' */
import { useToDosStore } from '../stores/toDosStore.js'
import ToDoForm from '@/components/ToDoForm.vue'

/* const api_url = 'https://jsonplaceholder.typicode.com/todos/'
 */
const toDosStore = useToDosStore()
console.log(toDosStore.toDos.length)
</script>

<template>
  <ToDoForm />
  <div v-if="toDosStore.toDos.length === 0">Aun no has agregado ninguna tarea</div>
</template>
