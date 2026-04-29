<script setup>
import { ref } from 'vue'
/* import { useUserStore } from '@/stores/userStore' */
import EmailInput from './EmailInput.vue'

/* const userStore = useUserStore() */
const email = ref()
const open = ref(false)

// eslint-disable-next-line no-undef
const toast = useToast()

async function recoveryPasswordButton() {
  try {
    console.log('Click olvide contraseña')

    /* await userStore.recoveryPassword(email.value)
    open.value = false */
  } catch (error) {
    toast.add({
      title: error.message,
      description: `El mail es incorrecto`,
      color: 'error',
    })
  }
}
</script>

<template>
  <UModal title="Recuperar contraseña" v-model:open="open">
    <UButton
      :transition="true"
      @click="open = true"
      label="¿Has olvidado la contraseña?"
      color="neutral"
      variant="link"
    />

    <template #body>
      <p class="font-semibold text-sm pb-3">Escribe tu mail para reestablecer tu contraseña</p>
      <EmailInput v-model="email" />
      <div class="flex justify-end w-full pt-5">
        <UButton
          label="Recuperar"
          color="secondary"
          variant="soft"
          @click="recoveryPasswordButton()"
        />
      </div>
    </template>
  </UModal>
</template>
