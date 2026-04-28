<script setup>
import { reactive } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import EmailInput from '@/components/base/auth/EmailInput.vue'
import PasswordInput from '@/components/base/auth/PasswordInput.vue'
import UserNameInput from '@/components/base/auth/UserNameInput.vue'

const userStore = useUserStore()
const router = useRouter()
// eslint-disable-next-line no-undef
const toast = useToast()

const state = reactive({
  username: '',
  email: '',
  password: '',
})

async function onSubmit() {
  try {
    await userStore.createUser(state.username, state.email, state.password)
    router.push('/')
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    toast.add({
      title: 'Error al crear usuario',
      description: `Uno de los campos no es válido`,
      color: 'error',
    })
  }
}
</script>

<template>
  <h1 class="text-2xl font-bold text-center mt-10">Crear usuario</h1>
  <div class="flex justify-center items-center mt-10">
    <UForm :state="state" class="space-y-4" @submit="onSubmit">
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
/* Hide the password reveal button in Edge */
::-ms-reveal {
  display: none;
}
</style>
