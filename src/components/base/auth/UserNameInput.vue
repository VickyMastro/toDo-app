<script setup>
const username = defineModel({ default: '' })
</script>

<template>
  <UFormField name="username" class="w-full">
    <UInput
      v-model="username"
      placeholder="Nombre de usuario"
      class="w-full"
      :ui="{ base: 'focus-visible:ring focus-visible:ring-accented text-gray-500' }"
    />
  </UFormField>
</template>
