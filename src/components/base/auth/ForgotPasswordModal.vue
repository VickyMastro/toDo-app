<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/userStore'
import EmailInput from './EmailInput.vue'
import * as v from 'valibot'
import { emailField } from '@/utils/schemas'

const userStore = useUserStore()
const state = reactive({ email: '' })
const open = ref(false)
const isLoading = ref(false)

const schema = v.object({ email: emailField })

// eslint-disable-next-line no-undef
const toast = useToast()

async function recoverPasswordButton() {
  try {
    isLoading.value = true
    await userStore.emailToRecoverPassword(state.email)

    open.value = false

    toast.add({
      title: 'Se envio el pedido correctamente',
      description: `Revisa tu correo electrónico`,
      color: 'success',
    })
  } catch (error) {
    toast.add({
      title: error.message,
      description: `El mail es incorrecto`,
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
  <UModal title="Recuperar contraseña" v-model:open="open">
    <UButton
      :transition="true"
      @click="open = true"
      label="¿Has olvidado la contraseña?"
      color="neutral"
      variant="link"
    />

    <template #body>
      <UForm :state="state" :schema="schema" @submit="recoverPasswordButton">
        <p class="font-semibold text-sm pb-3">Escribe tu mail para reestablecer tu contraseña</p>
        <EmailInput v-model="state.email" />
        <div class="flex justify-end w-full pt-5">
          <UButton type="submit" label="Recuperar" color="secondary" variant="soft" />
        </div>
      </UForm>
    </template>
  </UModal>
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
