<script setup>
defineProps({
  id: { type: String, default: '0' },
  title: { type: String, default: 'Museum Title' },
  category: { type: String, default: 'Museum Category' },
  description: { type: String, default: 'Museum Descripcion' },
  location: { type: String, default: 'Museum Location' }
})

const isMuseumFavorite = (id) => {}
const detaillsMuseums = (id) => {
  console.log('id :>> ', id)
}
</script>

<template>
  <v-card class="mt-3" @click="detaillsMuseums(id)">
    <template v-slot:title>
      <div class="flex justify-between items-center">
        <span class="overflow-auto w-10/12">
          {{ title }}
        </span>
        <vue-feather
          type="heart"
          :fill="isMuseumFavorite(id) ? '#ff4083' : 'none'"
          stroke="#ff4083"
        />
      </div>
    </template>
    <template v-slot:subtitle>
      <v-chip color="primary" size="small" variant="tonal" color-text="white">
        {{ category ? category : 'Sin Categoría' }}
      </v-chip>
    </template>
    <template v-slot:text>
      {{ description }}
      <div class="flex items-center">
        <v-rating
          :model-value="3.8"
          color="primary"
          density="compact"
          half-increments
          readonly
        />
        <div class="text-grey ml-1">4.5 (413)</div>
      </div>
      <div>
        <p>{{ location }}</p>
      </div>
    </template>
  </v-card>
</template>
