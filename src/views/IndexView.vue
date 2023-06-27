<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MsgDevice from '@/components/msgDevice.vue'

const router = useRouter()
const device = ref('')
const loading = ref(true)

onMounted(() => {
  device.value = window.navigator.userAgent.includes('Mobile')
    ? 'smartphone'
    : ''
  setTimeout(() => {
    const userLogged = localStorage.getItem('user')
    loading.value = false
    if (device.value === 'smartphone' && !userLogged) {
      router.push('/walkthrough')
    } else {
      router.push('/signin')
    }
  }, 1500)
})
</script>
<template>
  <div class="bg-[#FF4081] flex justify-center w-full h-screen">
    <div v-if="device !== 'smartphone'">
      <MsgDevice />
    </div>
    <div
      v-if="device === 'smartphone' && loading === true"
      class="max-w-auto m-auto"
    >
      <img
        src="@/assets/icons/LogoMusion.svg"
        alt="logo"
        class="to-blink mx-auto"
      />
    </div>
  </div>
</template>
<style scoped>
.to-blink {
  animation-name: parpadeo;
  animation-duration: 2.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  -webkit-animation-name: parpadeo;
  -webkit-animation-duration: 2.5s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}

@-moz-keyframes parpadeo {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes parpadeo {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@keyframes parpadeo {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
