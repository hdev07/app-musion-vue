<template>
  <div class="fixed bottom-0 w-full bg-secondary pb-3 mt-3 z-50">
    <div class="flex items-center w-">
      <RouterLink to="/home" class="w-1/5">
        <div
          class="mx-1"
          :class="{
            'text-primary border-t-2 border-primary': activeTab === 'home',
            'text-white': activeTab !== 'home'
          }"
          @click="changeTab('home')"
        >
          <div class="mt-3 flex justify-center">
            <vue-feather stroke-width="1" type="grid" />
          </div>
          <p class="text-center mb-0 pt-1 font-extralight text-xs">Inicio</p>
        </div>
      </RouterLink>
      <RouterLink to="/museums" class="w-1/5">
        <div
          class="mx-1"
          :class="{
            'text-primary border-t-2 border-primary': activeTab === 'museums',
            'text-white': activeTab !== 'museums'
          }"
          @click="changeTab('museums')"
        >
          <div class="mt-3 flex justify-center">
            <vue-feather stroke-width="1" type="list" />
          </div>
          <p class="text-center mb-0 pt-1 font-extralight text-xs">Lista</p>
        </div>
      </RouterLink>
      <RouterLink to="/map" class="w-1/5">
        <div
          class="mx-1"
          :class="{
            'text-primary border-t-2 border-primary': activeTab === 'map',
            'text-white': activeTab !== 'map'
          }"
          @click="changeTab('map')"
        >
          <div class="mt-3 flex justify-center">
            <vue-feather stroke-width="1" type="map-pin" />
          </div>
          <p class="text-center mb-0 pt-1 font-extralight text-xs">Mapa</p>
        </div>
      </RouterLink>
      <RouterLink to="/favorites" class="w-1/5">
        <div
          class="mx-1"
          :class="{
            'text-primary border-t-2 border-primary': activeTab === 'favorites',
            'text-white': activeTab !== 'favorites'
          }"
          @click="changeTab('favorites')"
        >
          <div class="mt-3 flex justify-center">
            <vue-feather stroke-width="1" type="heart" />
          </div>
          <p class="text-center mb-0 pt-1 font-extralight text-xs">Favs</p>
        </div>
      </RouterLink>
      <RouterLink to="/profile" class="w-1/5">
        <div
          class="mx-1"
          :class="{
            'text-primary border-t-2 border-primary': activeTab === 'profile',
            'text-white': activeTab !== 'profile'
          }"
          @click="changeTab('profile')"
        >
          <div class="mt-3 flex justify-center">
            <vue-feather stroke-width="1" type="user" />
          </div>
          <p class="text-center mb-0 pt-1 font-extralight text-xs">Perfil</p>
        </div>
      </RouterLink>
    </div>
  </div>
  <RouterView />
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const activeTab = ref('home')
const route = useRoute()

// Actualizar la pestaña activa basada en la ruta actual
activeTab.value = route.name || 'home'

function changeTab(tab) {
  activeTab.value = tab
}
</script>
