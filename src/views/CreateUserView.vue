<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import * as v from 'valibot'
import { emailField, passwordField, usernameField } from '@/utils/schemas'
import EmailInput from '@/components/base/auth/EmailInput.vue'
import PasswordInput from '@/components/base/auth/PasswordInput.vue'
import UserNameInput from '@/components/base/auth/UserNameInput.vue'

const userStore = useUserStore()
const router = useRouter()
// eslint-disable-next-line no-undef
const toast = useToast()
const isLoading = ref(false)

const schema = v.object({
  username: usernameField,
  email: emailField,
  password: passwordField,
})

const state = reactive({
  username: '',
  email: '',
  password: '',
})

async function onSubmit() {
  try {
    isLoading.value = true
    await userStore.createUser(state.username, state.email, state.password)
    router.push('/')
  } catch (error) {
    toast.add({
      title: error.message,
      description: `Uno de los campos no es válido`,
      color: 'error',
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <UIcon name="i-lucide-loader-circle" class="size-16 text-white animate-spin" />
    </div>
  </Transition>
  <h1 class="text-2xl font-bold text-center mt-10">Crear usuario</h1>
  <div class="flex justify-center items-center mt-10">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UserNameInput v-model="state.username" />

      <EmailInput v-model="state.email" />

      <PasswordInput v-model="state.password" />

      <UButton
        type="submit"
        label="Crear usuario"
        color="secondary"
        variant="solid"
        size="xl"
        class="rounded-full mt-4"
        block
      />

      <div class="flex items-center justify-between gap-4">
        <h2 class="text-sm text-neutral-400">¿Ya tenés una cuenta?</h2>
        <UButton
          to="/auth"
          label="Inicia sesión"
          color="secondary"
          variant="soft"
          size="xl"
          class="rounded-full"
        />
      </div>
    </UForm>
  </div>
</template>

<style>
::-ms-reveal {
  display: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
