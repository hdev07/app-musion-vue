<script setup>
import { ref } from 'vue'
const show1 = ref(false)
const password = 'Password'
const rules = {
  required: (value) => !!value || 'Required.',
  min: (v) => v.length >= 8 || 'Min 8 characters',
  emailMatch: () => `The email and password you entered don't match`
}
</script>

<template>
  <div class="mx-4">
    <h2 class="text-4xl text-center my-6">Hola desde Vuetify</h2>
    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="show1 ? 'text' : 'password'"
      color="primary"
      name="input-10-1"
      label="Normal with hint text"
      hint="At least 8 characters"
      counter
      @click:append="show1 = !show1"
    />
  </div>
</template>

<style></style>
