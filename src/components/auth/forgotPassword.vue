<template>
  {{}}
  <div v-if="showAlert" class="w-full fixed top-0">
    <v-alert
      :type="authStore.status !== 200 ? 'error' : 'success'"
      closable
      class="m-2"
    >
      {{ authStore.message }}
    </v-alert>
  </div>
  <div class="h-screen">
    <div v-if="!tokenParams">
      <p class="text-center text-3xl py-8">Olvide mi contraseña</p>
      <div v-if="!sendLink" class="rounded-lg bg-secondary py-6 px-4 m-4">
        <p class="text-center py-2 mx-2">
          Pon la dirección de email que usaste para registrarte. Te enviaremos
          un mensaje con tu nombre de usuario y un enlace para restablecer tu
          contraseña.
        </p>
        <div>
          <v-form ref="form" v-model="valid">
            <div class="mx-2 py-2">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                :loading="loading"
                append-inner-icon="mdi-email-outline"
                placeholder="jonhDue@example.com"
                type="email"
                label="Correo"
                color="primary"
                variant="outlined"
              />
            </div>
            <div class="mx-2 my-2">
              <v-btn
                :disabled="!valid || loading"
                :loading="loading"
                color="primary"
                block
                rounded
                @click="validFormEmail"
              >
                Enviar correo
              </v-btn>
            </div>
          </v-form>
        </div>
      </div>
      <div v-if="sendLink" class="rounded-lg bg-secondary py-6 px-4 m-4">
        <p class="text-center py-2 mx-2">
          Te hemos enviado un mensaje. Solo tienes que seguir las instrucciones
          para restablecer tu contraseña.
        </p>
      </div>
    </div>
    <div v-else>
      <div class="container">
        <p class="text-center text-3xl py-10">
          Restablecer mi <br />
          contraseña
        </p>
      </div>
      <div
        v-if="!sendNewPassword"
        class="rounded-lg bg-secondary py-6 px-3 m-3"
      >
        <p class="text-center py-2 mx-2">Ingresa una nueva contraseña.</p>
        <div>
          <v-form ref="form" v-model="valid" lazy-validation>
            <div class="mx-4 py-2">
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
              <v-text-field
                v-model="rePassword"
                :append-inner-icon="
                  showRePass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                "
                :type="showRePass ? 'text' : 'password'"
                :rules="rePasswordRules"
                :loading="loading"
                label="Confirma contraseña"
                color="primary"
                variant="outlined"
                @click:append-inner="showRePass = !showRePass"
              />
            </div>
            <div class="mx-4 my-2">
              <v-btn
                :disabled="!valid || loading"
                :loading="loading"
                color="primary"
                block
                rounded
                @click="validFormPass"
              >
                Enviar
              </v-btn>
            </div>
          </v-form>
        </div>
      </div>
      <div v-if="sendNewPassword" class="rounded-lg bg-secondary py-6 px-4 m-4">
        <p class="text-center py-2 mx-2">
          Tu contraseña se ha actualizado, serás redirigid@ a iniciar sesión.
        </p>
        <p class="text-center text-xs pb-4">
          Si no te redirige, haz click en el botón.
        </p>

        <div class="mx-8 my-2">
          <v-btn
            color="primary"
            class="mr-4"
            block
            fill
            rounded
            @click="redirectToLogin"
          >
            Iniciar sesión
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js'

const router = useRouter()
const authStore = useAuthStore()
const tokenParams = ref('')
const sendLink = ref(false)
const sendNewPassword = ref(true)
const loading = ref(false)
const valid = ref(true)
const email = ref('')
const password = ref('')
const rePassword = ref('')
const showPass = ref(false)
const showRePass = ref(false)
const form = ref(null)
const showAlert = ref(false)

const emailRules = [
  (v) => !!v || 'Correo es requerido',
  (v) => /.+@.+\..+/.test(v) || 'Correo no válido'
]
const passwordRules = [
  (v) => !!v || 'Contraseña es requerida',
  (v) => /^.{8,}$/.test(v) || 'La contraseña debe tener al menos 8 caracteres'
]
const rePasswordRules = [
  (v) => !!v || 'Las contraseñas no coinciden',
  (v) => v === password.value || 'Las contraseñas no coinciden'
]

const validFormEmail = async () => {
  const validValue = await form.value.validate()
  if (validValue) return requestResetPassword()
}
const validFormPass = async () => {
  const validValue = await form.value.validate()
  if (validValue) return resetPassword()
}

const requestResetPassword = async () => {
  try {
    loading.value = true
    const body = {
      email: email.value
    }
    await authStore.requestResetPassword(body)
    alertNotify()
    if (authStore.status === 200) sendLink.value = true
  } catch (error) {
    console.error('error :>>', error)
  } finally {
    loading.value = false
  }
}

const resetPassword = async () => {
  try {
    loading.value = true
    const body = {
      token: tokenParams.value,
      password: password.value
    }
    await authStore.resetPassword(body)
    if (authStore.status === 200) sendNewPassword.value = true
    alertNotify()
  } catch (error) {
    console.error('error :>> ', error)
  } finally {
    loading.value = false
  }
}

const redirectToLogin = () => {
  router.push({ name: 'signin' })
}

const alertNotify = () => {
  showAlert.value = true
  setTimeout(() => {
    showAlert.value = false
  }, 3000)
}

const gerToken = () => {
  tokenParams.value = router.currentRoute.value.query.token
}

gerToken()
</script>

<style></style>
