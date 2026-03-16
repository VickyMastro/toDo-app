<script setup>
/* import { storeToRefs } from 'pinia' */
import { useToDosStore } from '../stores/toDosStore.js'
import ToDoList from '@/components/ToDoList.vue'
import ToDoForm from '@/components/ToDoForm.vue'

/* const api_url = 'https://jsonplaceholder.typicode.com/todos/'
 */
const toDosStore = useToDosStore()
console.log(toDosStore.toDos.length)
</script>

<template>
  <div class="home-title">Mis Tareas</div>
  <ToDoForm />
  <div v-if="toDosStore.toDos.length === 0">Aun no has agregado ninguna tarea</div>
</template>

<style scoped>
.home-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-top: 2rem;
}
</style>
