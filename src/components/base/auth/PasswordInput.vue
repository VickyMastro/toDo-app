<script setup>
import { ref } from 'vue'

const password = defineModel({ default: '' })
const show = ref(false)
</script>

<template>
  <UFormField name="password" class="w-full">
    <UInput
      v-model="password"
      placeholder="Contraseña"
      class="w-full"
      :type="show ? 'text' : 'password'"
      :ui="{
        base: 'focus-visible:ring focus-visible:ring-accented text-gray-500 trailing: pe-1 ',
      }"
    >
      <template #trailing>
        <UButton
          color="neutral"
          variant="link"
          size="sm"
          :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
          :aria-label="show ? 'Hide password' : 'Show password'"
          :aria-pressed="show"
          aria-controls="password"
          @click="show = !show"
        />
      </template>
    </UInput>
  </UFormField>
</template>
