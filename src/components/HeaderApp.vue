<script setup>
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const items = [
  {
    label: 'Mi perfil',
    icon: 'i-lucide-user',
    to: '/user-profile',
  },
  {
    label: 'Cerrar sesión',
    color: 'error',
    onSelect: async () => {
      await userStore.logOut()
      router.push('/auth')
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
