<script setup>
import { computed } from 'vue'
import LogoPrincipal from '../assets/logos/LogoPrincipal.vue'
const currentFill = computed(() => {
  //  return darkMode === true ? '#FF4081' : '#F48FB1'
  return '#FF4081'
})
</script>

<template>
  <div class="about">
    <h2 class="text-4xl text-center my-6">Hola desde Vue</h2>
    <LogoPrincipal :currentFill="currentFill" class="w-1/2 mx-auto" />
  </div>
</template>
