<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function back() {
  router.back()
}
</script>

<template>
  <section
    class="flex items-center sm:p-16 dark:bg-[#1A1A1A] dark:text-gray-200 justify-center w-screen h-screen"
  >
    <div
      class="container flex flex-col items-center justify-center px-5 mx-auto my-8"
    >
      <div class="max-w-md text-center">
        <h2 class="mb-8 font-extrabold text-9xl dark:text-gray-200">
          <span class="sr-only">Error</span>404
        </h2>
        <p class="text-2xl font-semibold md:text-3xl">
          Sorry, we couldn't find this page.
        </p>
        <p class="mt-4 mb-8 dark:text-gray-200">
          But don't worry, you can find plenty of other things on our homepage.
        </p>
        <span
          rel="noopener noreferrer"
          class="px-8 py-3 font-semibold rounded-full dark:bg-[#ff4081] dark:text-white"
          @click.prevent="back"
        >
          Back to homepage
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
