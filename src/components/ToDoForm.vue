<script setup>
import { ref } from 'vue'
import { useToDosStore } from '../stores/toDosStore.js'

const toDosStore = useToDosStore()
const description = ref('')

function handleSubmit() {
  toDosStore.addToDo(description.value)
  console.log(toDosStore.toDos.length)
  description.value = ''
}
</script>

<template>
  <UForm>
    <UInput
      v-model="description"
      type="text"
      placeholder="Escribe aqui la tarea"
      :autofocus="false"
      color="secondary"
      variant="soft"
    />
    <UButton type="submit" label="Agregar" color="secondary" variant="soft" @click="handleSubmit" />
  </UForm>
</template>

<style scoped>
form {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  margin: 2rem 0 1rem 0;
}

button {
  color: var(--color-warning);
}
</style>
