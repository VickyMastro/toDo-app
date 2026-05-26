<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useUserStore } from '@/stores/userStore'
import * as v from 'valibot'
import { passwordField, usernameField } from '@/utils/schemas'
import EmailInput from './base/auth/EmailInput.vue'
import PasswordInput from './base/auth/PasswordInput.vue'
import UserNameInput from './base/auth/UserNameInput.vue'

const userStore = useUserStore()
const isLoading = ref(false)
// eslint-disable-next-line no-undef
const toast = useToast()

const schema = v.object({
  username: usernameField,
  password: v.union([
    v.literal(''), // acepta string vacío sin validar
    passwordField, // o acepta una contraseña válida (mínimo 8 chars)
  ]),
})

const state = reactive({
  email: '',
  username: '',
  password: '',
})

onMounted(() => {
  state.email = userStore.user.email
  state.username = userStore.user.username
})

async function onSubmit() {
  try {
    isLoading.value = true
    await userStore.updateUserData(state.username, state.password)

    state.password = ''
  } catch (error) {
    toast.add({
      title: error.message,
      description: `No pudimos editar tu perfil`,
      color: 'error',
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UCard class="max-w-md mx-auto mt-10">
    <UForm :schema="schema" :state="state" class="flex flex-col gap-4" @submit="onSubmit">
      <EmailInput
        :model-value="state.email"
        label="Correo electrónico"
        hint="No editable"
        :placeholder="state.email"
        disabled
      />

      <UserNameInput
        v-model="state.username"
        label="Nombre de usuario"
        placeholder="Editar nombre de usuario"
        required
      />

      <PasswordInput
        v-model="state.password"
        label="Contraseña"
        description="Dejá vacío si no querés cambiarla"
        placeholder="Nueva contraseña"
      />

      <UButton type="submit" label="Guardar cambios" class="self-end" :loading="isLoading" />
    </UForm>
  </UCard>
</template>
