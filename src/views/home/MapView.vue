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
  </GoogleMap>
</template>

<script setup>
import { GoogleMap } from 'vue3-google-map'

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
</script>
