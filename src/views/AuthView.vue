<script setup>
import { reactive } from 'vue'
import EmailInput from '@/components/base/auth/EmailInput.vue'
import PasswordInput from '@/components/base/auth/PasswordInput.vue'

const state = reactive({
  email: '',
  password: '',
})

async function onSubmit() {
  console.log(state)
}
</script>

<template>
  <h1 class="text-2xl font-bold text-center mt-10">Iniciar sesión</h1>
  <div class="flex justify-center items-center mt-10">
    <UForm :state="state" class="space-y-4" @submit="onSubmit">
      <EmailInput v-model="state.email" />

      <PasswordInput v-model="state.password" />

      <ULink to="/forgot-password" class="text-sm text-neutral-400">
        ¿Has olvidado la contraseña?
      </ULink>

      <UButton
        type="submit"
        label="Ingresar"
        color="secondary"
        variant="solid"
        size="xl"
        class="rounded-full mt-4"
        block
      />

      <div class="flex items-center justify-between gap-4">
        <h2 class="text-sm text-neutral-400">¿No tenés una cuenta?</h2>
        <UButton
          to="/create-user"
          label="Registrarse"
          color="secondary"
          variant="soft"
          size="xl"
          class="rounded-full"
        />
      </div>
    </UForm>
  </div>
</template>
