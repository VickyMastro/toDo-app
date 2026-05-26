<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import EmailInput from '@/components/base/auth/EmailInput.vue'
import PasswordInput from '@/components/base/auth/PasswordInput.vue'
import RememberUserCheck from '@/components/base/auth/RememberUserCheck.vue'
import * as v from 'valibot'
import { emailField, passwordField } from '@/utils/schemas'

const userStore = useUserStore()
const router = useRouter()
// eslint-disable-next-line no-undef
const toast = useToast()
const isLoading = ref(false)

const state = reactive({
  email: '',
  password: '',
  rememberUser: '',
})

const schema = v.object({
  email: emailField,
  password: passwordField,
})

async function onSubmit() {
  try {
    isLoading.value = true
    await userStore.logIn(state.email, state.password, state.rememberUser)
    router.push('/')
  } catch (error) {
    toast.add({
      title: error.message,
      description: `El usuario o contraseña es incorrecto`,
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
  <h1 class="text-2xl font-bold text-center mt-10">Iniciar sesión</h1>
  <div class="flex justify-center items-center mt-10">
    <UForm :state="state" :schema="schema" class="space-y-4" @submit="onSubmit">
      <EmailInput v-model="state.email" />

      <PasswordInput v-model="state.password" />

      <RememberUserCheck v-model="state.rememberUser" />

      <ForgotPasswordModal />

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
