<script setup>
import { ref } from 'vue'
import SocialForm from './socialForm.vue'
import SwitchForm from './switchForm.vue'
import { useUserStore } from '@/stores/authStore.js'

const from = ref('register')
const valid = ref(true)
const loading = ref(false)
const showPass = ref(false)
const showRePass = ref(false)
const name = ref('')
const email = ref('')
const password = ref('')
const rePassword = ref('')
const form = ref(null)
const showAlert = ref(false)
const errorText = ref('')
const userStore = useUserStore()
const nameRules = [(v) => !!v || 'Nombre es requerido']
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

const validForm = async () => {
  const validValue = await form.value.validate()
  if (validValue) return register()
}

const register = async () => {
  try {
    loading.value = true
    const body = {
      name: name.value,
      email: email.value,
      password: password.value,
      repassword: rePassword.value
    }
    await userStore.register(body)
  } catch (error) {
    alerNotify(error.errors[0])
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
  form.value.reset()
}
</script>

<template>
  <div class="h-screen bg-background">
    <div v-if="showAlert" class="w-full fixed">
      <v-alert type="error" closable class="m-2">
        {{ errorText }}
      </v-alert>
    </div>
    <p class="text-center text-3xl py-8">Registro</p>
    <div class="fixed bottom-0 w-full h-[75%] rounded-t-[30px] bg-secondary">
      <div>
        <v-form ref="form" v-model="valid">
          <SwitchForm :from="from" />
          <div class="mx-4 py-2">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              :loading="loading"
              append-inner-icon="mdi-account-outline"
              type="text"
              label="Nombre"
              color="primary"
              variant="outlined"
            />
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
              Registrarme
            </v-btn>
          </div>
          <SocialForm class="mt-5" />
        </v-form>
      </div>
    </div>
  </div>
</template>
