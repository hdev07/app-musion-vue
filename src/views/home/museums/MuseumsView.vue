<template>
  <v-card :loading="loading">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      cover
      height="200"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    />

    <v-card-item>
      <div class="text-xl font-bold">
        {{ museumStore?.museum?.name }}
      </div>

      <!-- <v-card-subtitle>
        <span class="mr-1">En Tendencia</span>

        <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
      </v-card-subtitle> -->
    </v-card-item>

    <v-card-text>
      <div class="flex items-center">
        <v-rating
          :model-value="museumStore?.museum?.rating?.average"
          color="primary"
          density="compact"
          size="small"
          half-increments
          readonly
        />

        <div class="text-grey ml-1">
          {{ museumStore?.museum?.rating?.average }} (
          {{ museumStore?.museum?.rating?.total }}
          )
        </div>
      </div>

      <div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>

      <div>
        Small plates, salads & sandwiches - an intimate setting with 12 indoor
        seats plus patio seating.
      </div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <div class="px-4"></div>

    <!-- <v-card-actions>
      <v-btn color="deep-purple-lighten-2" variant="text" @click="reserve">
        Reserve
      </v-btn>
    </v-card-actions> -->
  </v-card>

  {{ museumStore.museum }}
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useMuseumsStore } from '@/stores/museumsStore.js'

const museumStore = useMuseumsStore()
const router = useRouter()

const getMuseumById = async () => {
  try {
    const museumId = router.currentRoute.value.params.id
    await museumStore.getMuseumById(museumId)
  } catch (error) {
    console.error('error :>> ', error)
  }
}

getMuseumById()

import { ref } from 'vue'

const loading = ref(false)
</script>

<style></style>
