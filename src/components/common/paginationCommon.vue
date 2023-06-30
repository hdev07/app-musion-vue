<script setup>
import { ref, watch } from 'vue'

const currentTx = ref()
const emit = defineEmits(['changePage'])

watch(currentTx, (newVal) => {
  emit('changePage', newVal)
})

defineProps({
  perPage: { type: Number },
  totalPages: { type: Number },
  currentPage: { type: Number }
})
</script>
<template>
  <div class="flex justify-around">
    <div class="absolute justify-center w-90">
      <v-pagination
        v-model="currentTx"
        :length="totalPages"
        active-color="primary"
        size="x-small"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        class="my-4"
        rounded="4"
      />
    </div>
  </div>
</template>

<style></style>
