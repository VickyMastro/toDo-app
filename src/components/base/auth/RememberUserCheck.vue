<script setup>
const rememberUser = defineModel({ default: false })
</script>

<template>
  <UCheckbox
    :model-value="rememberUser"
    @update:model-value="(checked) => (rememberUser = checked)"
    description="Mantener sesión iniciada"
  />
</template>
