<script setup>
const props = defineProps({
  icon: {
    type: String,
  },
  color: {
    type: String,
    default: 'neutral',
  },
  variant: {
    type: String,
    default: 'ghost',
  },
  ariaLabel: {
    type: String,
    default: 'Boton',
  },
})

const emit = defineEmits(['click'])
</script>

<template>
  <UButton
    :icon="props.icon"
    :color="props.color"
    :variant="props.variant"
    size="sm"
    :aria-label="props.ariaLabel"
    @click="emit('click')"
  />
</template>
