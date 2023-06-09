<script setup>
import { ref } from 'vue'
import SocialForm from './socialForm.vue'
import SwitchForm from './switchForm.vue'
import { useAuthStore } from '@/stores/authStore.js'

const from = ref('login')
const valid = ref(true)
const loading = ref(false)
const showPass = ref(false)
const email = ref('')
const password = ref('')
const form = ref(null)
const showAlert = ref(false)
const errorText = ref('')
const authStore = useAuthStore()

const emailRules = [
  (v) => !!v || 'Correo es requerido',
  (v) => /.+@.+\..+/.test(v) || 'Correo no válido'
]
const passwordRules = [
  (v) => !!v || 'Contraseña es requerida',
  (v) => /^.{4,}$/.test(v) || 'Contraseña es requerida '
]

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
    await authStore.login(body)
  } catch (error) {
    alerNotify(error)
  } finally {
    resetForm()
    loading.value = false
  }
}
const alerNotify = (error) => {
  showAlert.value = true
  errorText.value = error.msg
  setTimeout(() => {
    showAlert.value = false
  }, 2500)
}

const resetForm = () => {
  password.value = ''
}
</script>

<template>
  <div class="h-screen bg-background">
    <div v-if="showAlert" class="w-full fixed">
      <v-alert type="error" closable class="m-2">
        {{ errorText }}
      </v-alert>
    </div>
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
              placeholder="jonhDue@example.com"
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
              to="/forgot-password"
              class="text-sm text-primary underline pl-1"
            >
              Restablecer la contraseña
            </RouterLink>
          </div>
          <SocialForm class="mt-5" />
        </v-form>
      </div>
    </div>
  </div>
</template>
