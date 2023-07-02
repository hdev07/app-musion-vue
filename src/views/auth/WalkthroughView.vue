<script setup>
import CardWalkthrough from '@/components/walkthrough/cardWalkthrough.vue'
import { ref } from 'vue'

const img1 = 1
const img2 = 2
const img3 = 3
const title1 = 'Selecciona los museos'
const title2 = 'Nosotros nos encargaremos del resto'
const title3 = 'Relájate y disfruta de tus visitas.'
const desc1 = 'Asegúrate de seleccionar los museos que deseas visitar.'
const desc2 =
  '¡Gracias a la implementación de la tecnología, trazamos la mejor ruta para visitarlos todos!.'
const desc3 =
  'Diviértete y aprende todo sobre el museo, ¡ya que el próximo te está esperando!.'

let step = ref(1)

const nextStep = () => {
  step.value = step.value + 1
}
</script>
<template>
  <div>
    <CardWalkthrough
      v-if="step === 1"
      :img="img1"
      :title="title1"
      :desc="desc1"
      :step="step"
      @next="nextStep()"
    />
    <CardWalkthrough
      v-if="step === 2"
      :img="img2"
      :title="title2"
      :desc="desc2"
      :step="step"
      @next="nextStep()"
    />
    <CardWalkthrough
      v-if="step === 3"
      :img="img3"
      :title="title3"
      :desc="desc3"
      :step="step"
    />
  </div>
</template>

<style></style>
