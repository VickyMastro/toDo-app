<script setup>
const items = [
  {
    label: 'Mi perfil',
    icon: 'i-lucide-user',
    onSelect: () => {
      console.log('Clickeaste Mi perfil')
    },
  },
  {
    label: 'Cerrar sesión',
    color: 'error',
    onSelect: () => {
      console.log('Clickeaste Cerrar sesión')
    },
    ui: {
      item: 'justify-center',
      itemLabel: 'text-center',
    },
  },
]
</script>

<template>
  <UHeader title="Mis tareas" :toggle="false" :ui="{ right: 'pr-2' }">
    <template #right>
      <UDropdownMenu
        :items="items"
        :content="{
          align: 'center',
          side: 'bottom',
          sideOffset: 10,
        }"
        :ui="{
          content: 'w-35',
        }"
      >
        <UButton label="Menú" icon="ic:round-home" color="neutral" variant="outline" size="lg" />
      </UDropdownMenu>
    </template>
  </UHeader>
</template>
