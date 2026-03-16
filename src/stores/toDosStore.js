import { defineStore } from 'pinia'

export const useToDosStore = defineStore('toDos', {
  state: () => ({
    toDos: [],
  }),
  actions: {
    async getToDos(api_url) {
      const response = await fetch(api_url)
      this.toDos = await response.json()
    },
  },
})

/*
import { storeToRefs } from 'pinia'
import { useToDosStore } from '../stores/toDosStore.js'

const api_url = 'https://jsonplaceholder.typicode.com/todos/'

const toDosStore = useToDosStore()
toDosStore.getToDos(api_url)

const { toDos } = storeToRefs(toDosStore)
</script>

<template>
  <div v-for="toDo in toDos" :key="toDo.id">
    <h2>{{ toDo.title }}</h2>
    <p>{{ toDo.completed }}</p>
    <p>{{ toDo.userId }}</p>
  </div>
</template>
 */
