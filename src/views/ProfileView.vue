<template>
  <v-container>
    <div class="mt-6">
      <img
        src="https://i.pravatar.cc/300"
        alt="img_avatar"
        class="rounded-full flex mx-auto w-1/2"
      />
    </div>
    <div>
      <p class="text-center text-3xl mb-1 mt-2">
        {{ userStore?.user?.name }}
      </p>
      <p class="flex justify-center text-sm items-center mr-2">
        {{ userStore?.user?.email }}
        <vue-feather
          v-if="userStore?.user?.emailVerified"
          type="check-circle"
          stroke="#ff4083"
          size="15"
          class="ml-1"
        />
      </p>
    </div>

    <v-card class="rounded-lg mt-16">
      <div class="flex justify-between rounded-lg">
        <div class="flex items-center my-4 px-3">
          <vue-feather type="user" class="mr-2" />
          <p class="mb-0">Información Personal</p>
        </div>
        <div class="flex items-center">
          <vue-feather type="chevron-right" class="mx-3" />
        </div>
      </div>
    </v-card>
    <v-card class="rounded-lg mt-3">
      <div class="flex justify-between rounded-lg">
        <div class="flex items-center my-4 px-3">
          <vue-feather type="map" class="mr-2" />
          <p class="mb-0">Museos visitados</p>
        </div>
        <div class="flex items-center">
          <vue-feather type="chevron-right" class="mx-3" />
        </div>
      </div>
    </v-card>
    <v-card class="rounded-lg mt-3">
      <div class="flex justify-between rounded-lg">
        <div class="flex items-center my-4 px-3">
          <vue-feather type="message-circle" class="mr-2" />
          <p class="mb-0">Reseñas</p>
        </div>
        <div class="flex items-center">
          <vue-feather type="chevron-right" class="mx-3" />
        </div>
      </div>
    </v-card>
    <v-card class="rounded-lg mt-3">
      <div class="flex justify-between rounded-lg">
        <div class="flex items-center my-4 px-3">
          <vue-feather type="settings" class="mr-2" />
          <p class="mb-0">Ajustes</p>
        </div>
        <div class="flex items-center">
          <vue-feather type="chevron-right" class="mx-3" />
        </div>
      </div>
    </v-card>
    <v-card class="rounded-lg mt-3">
      <div class="flex justify-between rounded-lg">
        <div class="flex items-center my-4 px-3">
          <vue-feather type="key" class="mr-2" />
          <p class="mb-0">Seguridad</p>
        </div>
        <div class="flex items-center">
          <vue-feather type="chevron-right" class="mx-3" />
        </div>
      </div>
    </v-card>
    <v-card class="rounded-lg mt-3" @click="logout">
      <div class="flex justify-between rounded-lg">
        <div class="flex items-center my-4 px-3">
          <vue-feather type="log-out" class="mr-2" />
          <p class="mb-0">Cerrar sesión</p>
        </div>
        <div class="flex items-center">
          <vue-feather type="chevron-right" class="mx-3" />
        </div>
      </div>
    </v-card>
    <p class="text-right text-xs font-thin my-3">Version: 1.0.1</p>
    <div class="h-4 mb-10" />
  </v-container>
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
