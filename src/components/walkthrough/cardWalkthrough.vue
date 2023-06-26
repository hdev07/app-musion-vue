<script setup>
import { useRouter } from 'vue-router'
import walkthrough_1 from './walkthrough_1.vue'
import walkthrough_2 from './walkthrough_2.vue'
import walkthrough_3 from './walkthrough_3.vue'
defineProps({
  img: { type: Number, Required: true },
  title: { type: String, Required: true },
  desc: { type: String, Required: true },
  step: { type: Number, Required: true }
})
const router = useRouter()

const emit = defineEmits(['next'])

function nextStep() {
  emit('next')
}

const createAccount = () => {
  router.push({ name: 'signin' })
}
</script>

<template>
  <div class="h-screen bg-background">
    <div>
      <walkthrough_1
        v-if="img === 1"
        :currentColor="'#212121'"
        :currentColorPrimary="'#FF4081'"
        class="m-auto w-full py-12 px-4 md:w-2/3 lg:w-1/3"
      />
      <walkthrough_2
        v-if="img === 2"
        :currentColor="'#212121'"
        :currentColorPrimary="'#FF4081'"
        class="m-auto w-full py-12 px-4 md:w-2/3 lg:w-1/3"
      />
      <walkthrough_3
        v-if="img === 3"
        :currentColor="'#212121'"
        :currentColorPrimary="'#FF4081'"
        class="m-auto w-full py-12 px-4 md:w-2/3 lg:w-1/3"
      />
    </div>
    <div
      class="fixed bottom-0 w-full max-h-[60%] rounded-t-[30px] shadow-md bg-secondary"
    >
      <div>
        <div class="mt-8">
          <p class="text-center text-xl py-2 mb-1">{{ title }}</p>
          <p class="text-center text-md py-1 my-0 mx-8">{{ desc }}</p>
        </div>
        <div class="my-2 mx-auto flex justify-evenly w-1/6">
          <div
            :class="step === 1 ? 'bg-primary' : 'bg-white'"
            class="rounded-full w-2 h-2 my-2"
          />
          <div
            :class="step === 2 ? 'bg-primary' : 'bg-white'"
            class="rounded-full w-2 h-2 my-2"
          />
          <div
            :class="step === 3 ? 'bg-primary' : 'bg-white'"
            class="rounded-full w-2 h-2 my-2"
          />
        </div>
        <div
          v-if="step === 1 || step === 2"
          class="flex justify-between m-8 items-center"
        >
          <RouterLink to="/signin" class="text-xs"> Saltar </RouterLink>
          <div class="flex w-2/5 justify-end">
            <v-btn color="primary" variant="outlined" rounded @click="nextStep">
              Siguiente
            </v-btn>
          </div>
        </div>
        <div v-else class="flex justify-between m-8 items-center">
          <v-btn color="primary" block rounded @click="createAccount">
            Registrarme
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
