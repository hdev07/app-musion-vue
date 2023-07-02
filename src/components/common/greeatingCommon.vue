<template>
  <div class="flex justify-between items-center">
    <p class="text-xl mb-0 font-bold">¡{{ greeting }}!</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore.js'

const userStore = useUserStore()

userStore.getUser()

const greeting = computed(() => {
  const currentHour = new Date().getHours()

  if (currentHour >= 6 && currentHour < 12) {
    return `Buenos días ${userStore.user.name}`
  } else if (currentHour >= 12 && currentHour < 20) {
    return `Buenas tardes ${userStore.user?.name}`
  } else {
    return `Buenas noches ${userStore.user?.name}`
  }
})
</script>

<style></style>
