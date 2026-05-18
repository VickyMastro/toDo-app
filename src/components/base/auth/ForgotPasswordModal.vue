<script setup>
import { ref, reactive } from 'vue'
/* import { useUserStore } from '@/stores/userStore' */
import EmailInput from './EmailInput.vue'
import * as v from 'valibot'
import { emailField } from '@/utils/schemas'

/* const userStore = useUserStore() */
const state = reactive({ email: '' })
const open = ref(false)

const schema = v.object({ email: emailField })

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
      <UForm :state="state" :schema="schema" @submit="recoveryPasswordButton">
        <p class="font-semibold text-sm pb-3">Escribe tu mail para reestablecer tu contraseña</p>
        <EmailInput v-model="state.email" />
        <div class="flex justify-end w-full pt-5">
          <UButton type="submit" label="Recuperar" color="secondary" variant="soft" />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
