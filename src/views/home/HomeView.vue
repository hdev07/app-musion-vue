<template>
  <v-container fluid>
    <Greating />
    <v-row class="mt-3">
      <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
        <v-card>
          <v-img
            :src="card.src"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)"
          >
            <v-card-title class="text-white" v-text="card.title" />
          </v-img>
          <v-card-actions class="flex justify-end">
            <v-btn size="small" color="primary" icon="mdi-heart" />
            <v-btn size="small" color="primary" icon="mdi-bookmark" />
            <v-btn size="small" color="primary" icon="mdi-share-variant" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Greating from '@/components/common/greeatingCommon.vue'
const cards = [
  {
    title: 'Ultimo museo visitado',
    src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
    flex: 12
  }
]
</script>

<style></style>
