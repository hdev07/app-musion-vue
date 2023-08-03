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
    <MarkerCluster>
      <div style="text-align: center">
        <img
          src="https://s3.amazonaws.com/musion.day/clusters/m1.png"
          alt=""
          width="30"
          height="30"
        />
      </div>
      <CustomMarker
        v-for="(location, i) in locations"
        :options="{ position: location }"
        :key="i"
      >
        <div style="text-align: center">
          <img
            src="https://s3.amazonaws.com/musion.day/marker.png"
            width="30"
            height="30"
          />
        </div>
      </CustomMarker>
    </MarkerCluster>
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
import {
  GoogleMap,
  CustomControl,
  CustomMarker,
  MarkerCluster
} from 'vue3-google-map'
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

const locations = [
  { lat: -31.56391, lng: 147.154312 },
  { lat: -33.718234, lng: 150.363181 },
  { lat: -33.727111, lng: 150.371124 },
  { lat: -33.848588, lng: 151.209834 },
  { lat: -33.851702, lng: 151.216968 },
  { lat: -34.671264, lng: 150.863657 },
  { lat: -35.304724, lng: 148.662905 },
  { lat: -36.817685, lng: 175.699196 },
  { lat: -36.828611, lng: 175.790222 },
  { lat: -37.75, lng: 145.116667 },
  { lat: -37.759859, lng: 145.128708 },
  { lat: -37.765015, lng: 145.133858 },
  { lat: -37.770104, lng: 145.143299 },
  { lat: -37.7737, lng: 145.145187 },
  { lat: -37.774785, lng: 145.137978 },
  { lat: -37.819616, lng: 144.968119 },
  { lat: -38.330766, lng: 144.695692 },
  { lat: -39.927193, lng: 175.053218 },
  { lat: -41.330162, lng: 174.865694 },
  { lat: -42.734358, lng: 147.439506 },
  { lat: -42.734358, lng: 147.501315 },
  { lat: -42.735258, lng: 147.438 },
  { lat: -43.999792, lng: 170.463352 }
]

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
