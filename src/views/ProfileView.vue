<template>
  <div>
    <div class="mt-8">
      <img
        src="https://i.pravatar.cc/300"
        alt="img_avatar"
        class="rounded-full flex mx-auto w-1/2"
      />
    </div>
    <div>
      <p class="text-center text-3xl mb-1 mt-6">
        {{ userStore?.user?.name }}
      </p>
      <p class="text-center">{{ userStore?.user?.email }}</p>
    </div>
    <v-card class="mx-3 rounded-lg mt-6" @click="logout">
      <div class="flex justify-between rounded-lg">
        <div class="flex items-center my-4 px-3">
          <vue-feather type="log-out" class="mr-2" />
          <p class="mb-0">Logout</p>
        </div>
        <div class="flex items-center">
          <vue-feather type="chevron-right" class="mx-3" />
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore.js'
import { useAuthStore } from '@/stores/authStore.js'
import router from '../router'

const userStore = useUserStore()
const authStore = useAuthStore()

const logout = async () => {
  try {
    await authStore.logout()
    router.push({ name: 'signin' })
  } catch (error) {
    console.error('error :>> ', error)
  }
}
</script>
