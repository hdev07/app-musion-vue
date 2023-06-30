<script setup>
defineProps({
  id: { type: String, default: '0' },
  title: { type: String, default: 'Museum Title' },
  description: { type: String, default: 'Museum Descripcion' },
  location: { type: String, default: 'Museum Location' }
})
</script>
<template>
  <div class="flex h-1/4 bg-secondary shadow-lg rounded mt-3">
    <div class="w-1/4 m-2 flex">
      <vue-feather type="grid" size="80" />
    </div>
    <div class="w-3/4 my-3 mr-3">
      <div class="flex justify-between content-center mb-1">
        <p class="mb-0 text-md">{{ title }}</p>
        <div @click.stop="handleFavorite(id)" class="">
          <vue-feather type="heart" stroke="#ff4083" fill="#ff4083" />
        </div>
      </div>
      <div>
        <p class="text-xs mb-1">
          {{ description }}
        </p>
      </div>
      <div class="flex mb-1">
        <vue-feather type="star" fill="#ff4083" stroke="#ff4083"></vue-feather>
        <vue-feather type="star" fill="#ff4083" stroke="#ff4083"></vue-feather>
        <vue-feather type="star" fill="#ff4083" stroke="#ff4083"></vue-feather>
        <vue-feather type="star" stroke="#ff4083"></vue-feather>
        <vue-feather type="star" stroke="#ff4083"></vue-feather>
      </div>
      <div>
        <p class="text-xs mb-1">
          {{ location }}
        </p>
      </div>
    </div>
  </div>
</template>
