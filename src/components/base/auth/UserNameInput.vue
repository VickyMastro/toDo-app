<script setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: 'Nombre de usuario',
  },
})

const username = defineModel({ default: '' })
</script>

<template>
  <UFormField name="username" class="w-full" :label="props.label" :required="props.required">
    <UInput
      v-model="username"
      :placeholder="props.placeholder"
      class="w-full"
      :ui="{ base: 'focus-visible:ring focus-visible:ring-accented text-gray-500' }"
    />
  </UFormField>
</template>
