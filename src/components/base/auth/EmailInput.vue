<script setup>
const email = defineModel({ default: '' })
</script>

<template>
  <UFormField name="email" class="w-full">
    <UInput
      v-model="email"
      placeholder="Correo electrónico"
      class="w-full"
      :ui="{ base: 'focus-visible:ring focus-visible:ring-accented text-gray-500' }"
    />
  </UFormField>
</template>
