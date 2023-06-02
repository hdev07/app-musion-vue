<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="mx-auto max-w-screen-xl px-4 py- sm:px-6 lg:px-8">
      <nav class="flex justify-center gap-4 my-4 text-2xl underline">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/tailwind">Tailwind</RouterLink>
        <RouterLink to="/vuetify">Vuetify</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
