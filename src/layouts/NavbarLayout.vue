<template>
  <div class="fixed bottom-0 w-full z-50">
    <v-card class="mt-3 pb-3">
      <div class="flex items-center w-full">
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
              <vue-feather stroke-width="1" type="search" />
            </div>
            <p class="text-center mb-0 pt-1 font-extralight text-xs">Museos</p>
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
              'text-primary border-t-2 border-primary':
                activeTab === 'favorites',
              'text-white': activeTab !== 'favorites'
            }"
            @click="changeTab('favorites')"
          >
            <div class="mt-3 flex justify-center">
              <vue-feather
                stroke-width="1"
                type="heart"
                :fill="activeTab === 'favorites' ? '#ff4083' : '#212121'"
              />
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
    </v-card>
  </div>
  <RouterView />
</template>
<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore.js'

const userStore = useUserStore()
const activeTab = ref('home')
const route = useRoute()

userStore.getUser()

activeTab.value = getActiveTab(route)

function changeTab(tab) {
  activeTab.value = tab
}

watch(
  () => route.name,
  () => {
    activeTab.value = getActiveTab(route)
  }
)

function getActiveTab(route) {
  const subrouteList = '/museums/:id'
  const subrouteMap = '/map/routes'
  const subrouteProfile = '/profile/settings'

  if (route.path.startsWith(subrouteList)) {
    return 'list'
  } else if (route.path.startsWith(subrouteMap)) {
    return 'map'
  } else if (route.path.startsWith(subrouteProfile)) {
    return 'profile'
  } else {
    return route.name || 'home'
  }
}
</script>
