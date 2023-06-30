<script setup>
import { ref, watch } from 'vue'

defineProps({
  showTune: { type: Boolean, default: false }
})

const emit = defineEmits(['search'])
const searchText = ref('')
let searchClearTimeout

watch(searchText, (newVal) => {
  if (searchClearTimeout) clearTimeout(searchClearTimeout)
  searchClearTimeout = setTimeout(() => {
    emit('search', newVal)
  }, 500)
})

function iconClick() {
  console.log('Hola, me dio click')
}
</script>
<template>
  <v-text-field
    v-model="searchText"
    :append-icon="showTune ? 'mdi-tune-vertical' : ''"
    placeholder="Que museo quieres descubrir"
    prepend-inner-icon="mdi-magnify"
    density="compact"
    color="primary"
    variant="solo"
    type="text"
    clearable
    hide-details
    @click:append="iconClick"
  />
</template>

<style></style>
