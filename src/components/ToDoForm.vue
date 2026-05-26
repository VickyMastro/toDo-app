<script setup>
import { ref } from 'vue'
import { useToDosStore } from '../stores/toDosStore.js'
import { useToast } from '@nuxt/ui/composables'

const toDosStore = useToDosStore()
const description = ref('')
const maxLength = 50

const toast = useToast()

async function handleSubmit() {
  try {
    await toDosStore.addToDo(description.value)
    description.value = ''
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    toast.add({
      title: 'Ocurrio un problema',
      description: `Error al intentar crear la tarea`,
      color: 'error',
    })
  }
}
</script>

<template>
  <UForm>
    <UInput
      v-model="description"
      type="text"
      placeholder="Escribe aqui la tarea"
      :maxlength="maxLength"
      :autofocus="false"
      color="secondary"
      variant="soft"
    >
      <template #trailing>
        <div
          id="character-count"
          class="text-xs text-muted tabular-nums"
          aria-live="polite"
          role="status"
        >
          {{ description?.length }}/{{ maxLength }}
        </div>
      </template>
    </UInput>
    <UButton
      type="submit"
      label="Agregar"
      color="secondary"
      variant="soft"
      :disabled="!description"
      @click="handleSubmit"
    />
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
