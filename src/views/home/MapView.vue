<template>
  <GoogleMap
    style="width: 100vw; height: 100vh"
    :api-key="mapConfig.apiKey"
    :center="center"
    :zoom="mapConfig.zoom"
    :disableDefaultUi="mapConfig.disableDefaultUI"
    :mapId="mapConfig.mapId"
    :restriction="mapConfig.restriction"
    :maxZoom="mapConfig.maxZoom"
    :minZoom="mapConfig.minZoom"
  >
    <CustomControl position="TOP_RIGHT" class="inline-block w-100">
      <SearchCommon class="m-2" />
    </CustomControl>

    <CustomControl position="RIGHT_BOTTOM" class="mb-16">
      <v-card class="mx-2 w-10 h-20 flex">
        <vue-feather
          stroke-width="2"
          type="zoom-in"
          class="m-2"
          @click="zoomIn"
        />

        <vue-feather
          stroke-width="2"
          type="zoom-out"
          class="m-2"
          @click="zoomOut"
        />
      </v-card>
    </CustomControl>
    <CustomControl position="RIGHT_BOTTOM">
      <v-card class="m-2 w-10 h-10 flex overflow-hidden">
        <vue-feather
          stroke-width="2"
          type="crosshair"
          class="m-2"
          @click="currentLocation"
        />
      </v-card>
    </CustomControl>
  </GoogleMap>
</template>

<script setup>
import { GoogleMap, CustomControl } from 'vue3-google-map'
import SearchCommon from '@/components/common/searchCommon.vue'

const center = { lat: 19.4324881, lng: -99.1425509 }

const currentLocation = () => alert('Ubicacion Actual!')
const zoomIn = () => alert('Zoom In')
const zoomOut = () => alert('Zoom Out')
const mapConfig = {
  apiKey: import.meta.env.VITE_API_KEY_MAPS,
  mapId: import.meta.env.VITE_MAP_ID,
  zoom: 16,
  minZoom: 2,
  maxZoom: 19,
  disableDefaultUI: true,
  restriction: {
    latLngBounds: {
      north: 85,
      south: -85,
      east: 180,
      west: -180
    },
    strictBounds: true
  }
}
</script>
