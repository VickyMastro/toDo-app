<script setup>
import { reactive } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import * as v from 'valibot'
import EmailInput from '@/components/base/auth/EmailInput.vue'
import PasswordInput from '@/components/base/auth/PasswordInput.vue'
import UserNameInput from '@/components/base/auth/UserNameInput.vue'

const userStore = useUserStore()
const router = useRouter()
// eslint-disable-next-line no-undef
const toast = useToast()

const schema = v.object({
  username: v.pipe(v.string(), v.minLength(2, 'El nombre debe tener al menos 3 caracteres')),
  email: v.pipe(v.string(), v.email('Ingresá un correo válido')),
  password: v.pipe(v.string(), v.minLength(8, 'La contraseña debe tener al menos 8 caracteres')),
})

const state = reactive({
  username: '',
  email: '',
  password: '',
})

async function onSubmit() {
  try {
    await userStore.createUser(state.username, state.email, state.password)
    router.push('/')
  } catch (error) {
    toast.add({
      title: error.message,
      description: `Uno de los campos no es válido`,
      color: 'error',
    })
  }
}
</script>

<template>
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
</style>
