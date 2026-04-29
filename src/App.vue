<script setup>
import { useRoute } from 'vue-router'
import { useUserStore } from './stores/userStore'
import { onMounted } from 'vue'
import HeaderApp from '@/components/HeaderApp.vue'

const route = useRoute()
const userStore = useUserStore()

onMounted(() => {
  userStore.restoreSession()
})
</script>

<template>
  <UApp>
    <UToast />
    <HeaderApp v-if="!route.meta.hideHeader" />
    <RouterView />
  </UApp>
</template>
