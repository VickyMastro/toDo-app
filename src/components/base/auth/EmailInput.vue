<script setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  hint: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: 'Correo electrónico',
  },
})

const email = defineModel({ default: '' })
</script>

<template>
  <UFormField name="email" :label="props.label" :hint="props.hint" class="w-full">
    <UInput
      v-model="email"
      :placeholder="props.placeholder"
      class="w-full"
      :disabled="props.disabled"
      :ui="{ base: 'focus-visible:ring focus-visible:ring-accented text-gray-500' }"
    />
  </UFormField>
</template>
