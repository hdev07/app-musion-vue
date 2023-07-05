<template>
  <GoogleMap
    style="width: 100vw; height: 92vh"
    ref="mapRef"
    :api-key="mapConfig.apiKey"
    :center="center"
    :zoom="mapConfig.zoom"
    :disableDefaultUi="mapConfig.disableDefaultUI"
    :mapId="mapConfig.mapId"
    :restriction="mapConfig.restriction"
    :maxZoom="mapConfig.maxZoom"
    :minZoom="mapConfig.minZoom"
  >
    <CustomControl position="RIGHT_BOTTOM">
      <v-card class="mx-2 w-10 h-20">
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
      <v-card class="m-2 w-10 h-10">
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
import { ref, watch } from 'vue'

let gmap = null
const mapRef = ref(null)
const center = { lat: 19.4324881, lng: -99.1425509 }
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

watch(
  () => mapRef.value?.ready,
  (ready) => {
    if (ready) {
      gmap = mapRef.value.map
    }
  }
)

const zoomIn = () => {
  if (mapRef.value) {
    const currentZoom = gmap.getZoom()
    gmap.setZoom(currentZoom + 1)
  }
}

const zoomOut = () => {
  if (mapRef.value) {
    const currentZoom = gmap.getZoom()
    gmap.setZoom(currentZoom - 1)
  }
}

const currentLocation = () => {
  console.log(' :>> ')
}
</script>
