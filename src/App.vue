<script setup>
import { useRoute } from 'vue-router'
import HeaderApp from '@/components/HeaderApp.vue'

const route = useRoute()
</script>

<template>
  <UApp>
    <UToast />
    <HeaderApp v-if="!route.meta.hideHeader" />
    <RouterView />
  </UApp>
</template>
