<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { useColorMode } from '@vueuse/core'

// eslint-disable-next-line no-undef
const toast = useToast()
const isLoading = ref(false)
const colorMode = useColorMode({ initialValue: 'auto' })

function toggleDark() {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
}

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
    onSelect: closeSession,
    ui: {
      item: 'justify-center',
      itemLabel: 'text-center',
    },
  },
]

async function closeSession() {
  try {
    isLoading.value = true
    await userStore.logOut()
    router.push('/auth')
  } catch (error) {
    toast.add({
      title: error.message,
      description: `No pudimos cerrar sesión`,
      color: 'error',
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isLoading"
        class="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <UIcon name="i-lucide-loader-circle" class="size-16 text-white animate-spin" />
      </div>
    </Transition>
  </Teleport>

  <UHeader title="Mis tareas" :toggle="false" :ui="{ right: 'pr-2' }">
    <template #title>
      <p>Las tareas de {{ userStore.user.username }}</p>
    </template>
    <template #right>
      <UButton
        :icon="colorMode === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
        color="neutral"
        variant="ghost"
        @click="toggleDark"
      />
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
