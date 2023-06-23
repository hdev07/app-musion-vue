<script setup>
import { ref } from 'vue'
import GoogleImage from '@/assets/icons/Google.svg'
import FacebookImage from '@/assets/icons/Facebook.svg'
import AppleImage from '@/assets/icons/Apple.svg'

const showAlert = ref(false)

function googleLogin() {
  showAlert.value = true
}
function fbLogin() {
  showAlert.value = true
}
function appleLogin() {
  showAlert.value = true
}
</script>
<template>
  <div class="flex justify-around m-4 px-12">
    <v-btn @click="googleLogin" icon class="border" size="large">
      <img :src="GoogleImage" alt="Logo-Google" class="w-8" />
    </v-btn>
    <v-btn @click="fbLogin" icon class="border" size="large">
      <img :src="FacebookImage" alt="Logo-Facebook" class="w-8" />
    </v-btn>
    <v-btn @click="appleLogin" icon class="border" size="large">
      <img :src="AppleImage" alt="Logo-Apple" class="w-8" />
    </v-btn>
  </div>
</template>

<style></style>
