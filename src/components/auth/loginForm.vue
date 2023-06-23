<script setup>
import { ref } from 'vue'
import SocialForm from './socialForm.vue'
import SwitchForm from './switchForm.vue'

const from = ref('login')
const valid = ref(true)
const loading = ref(false)
const showPass = ref(false)
const email = ref('')
const emailRules = [
  (v) => !!v || 'Correo es requerido',
  (v) => /.+@.+\..+/.test(v) || 'Correo no válido'
]
const password = ref('')
const passwordRules = [(v) => !!v || 'Contraseña es requerida']
const form = ref(null)

const validForm = async () => {
  const validValue = await form.value.validate()
  if (validValue) return login()
}

const login = async () => {
  try {
    loading.value = true
    const body = {
      email: email.value,
      password: password.value
    }
    console.log('body :>> ', body)
  } catch (error) {
    console.error(error)
  } finally {
    resetForm()
    loading.value = false
  }
}

const resetForm = () => {
  form.value.reset()
}
</script>

<template>
  <div class="h-screen bg-background">
    <p class="text-center text-3xl py-8">Iniciar sesión</p>
    <div class="fixed bottom-0 w-full h-[60%] rounded-t-[30px] bg-secondary">
      <div>
        <v-form ref="form" v-model="valid">
          <SwitchForm :from="from" />
          <div class="mx-4 py-2">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              :loading="loading"
              append-inner-icon="mdi-email-outline"
              type="email"
              label="Correo"
              color="primary"
              variant="outlined"
            />
            <v-text-field
              v-model="password"
              :append-inner-icon="
                showPass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
              "
              :type="showPass ? 'text' : 'password'"
              :rules="passwordRules"
              :loading="loading"
              label="Contraseña"
              color="primary"
              variant="outlined"
              @click:append-inner="showPass = !showPass"
            />
          </div>
          <div class="mx-8 my-2">
            <v-btn
              :disabled="!valid || loading"
              :loading="loading"
              color="primary"
              class="mr-4"
              block
              rounded
              @click="validForm()"
            >
              Iniciar sesión
            </v-btn>
          </div>
          <div class="flex justify-center mt-3">
            <p class="text-sm">¿Olvidaste tu contraseña?</p>
            <RouterLink
              to="/reset-password"
              class="text-sm text-primary underline pl-1"
            >
              Restablecer la contraseña
            </RouterLink>
          </div>
          <SocialForm class="mt-10" />
        </v-form>
      </div>
    </div>
  </div>
</template>