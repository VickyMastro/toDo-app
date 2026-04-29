<script setup>
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const items = [
  {
    label: 'Mi perfil',
    icon: 'i-lucide-user',
    to: '/user-profile',
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
    <template #title>
      <p>Las tareas de {{ userStore.user.username }}</p>
    </template>
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
