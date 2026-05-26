<script setup>
import { ref, reactive } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import * as v from 'valibot'
import { passwordField } from '@/utils/schemas'

const userStore = useUserStore()
const router = useRouter()
// eslint-disable-next-line no-undef
const toast = useToast()
const isLoading = ref(false)

const state = reactive({
  password: '',
  repeatPassword: '',
})

const schema = v.object({
  password: passwordField,
  repeatPassword: v.pipe(
    v.string(),
    v.custom((val) => val === state.password, 'Las contraseñas no coinciden'),
  ),
})

onMounted(() => {
  const hash = window.location.hash.substring(1) // quita el '#'
  const params = new URLSearchParams(hash)
  const accessToken = params.get('access_token')
  const type = params.get('type')

  if (type === 'recovery' && accessToken) {
    // Guardas el token para usarlo en la llamada PUT /user
    userStore.accessToken = accessToken
  } else {
    // No vino por el link de recovery, redirigir
    router.push('/auth')
  }
})

async function recoverPassword() {
  try {
    isLoading.value = true
    await userStore.recoverPassword(state.password)

    toast.add({
      title: 'Cambio de contraseña exitoso',
      description: `Ya podes usar tu nueva contraseña `,
      color: 'success',
    })

    setTimeout(() => router.push('/auth'), 3000)
  } catch (error) {
    toast.add({
      title: error.message,
      description: `Ocurrio un error al intenar recuperar la contraseña`,
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
  <h1 class="text-2xl font-bold text-center mt-10">Recuperar contraseña</h1>
  <div class="flex justify-center items-center mt-10">
    <UForm :state="state" :schema="schema" class="space-y-4 w-70" @submit="recoverPassword">
      <PasswordInput v-model="state.password" label="Nueva contraseña" />

      <PasswordInput
        v-model="state.repeatPassword"
        name="repeatPassword"
        label="Repita nueva contraseña"
      />
      <div class="flex justify-center">
        <UButton
          type="submit"
          label="Recuperar contraseña"
          color="secondary"
          variant="solid"
          size="xl"
          class="rounded-full mt-3"
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
