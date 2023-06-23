<script setup>
defineProps({
  from: {
    type: String,
    rquired: true
  }
})
</script>
<template>
  <div class="m-4 my-4 py-2 flex justify-around">
    <div class="w-1/3">
      <RouterLink to="/signin">
        <v-btn
          :variant="from !== 'login' ? 'outlined' : 'flat'"
          rounded
          block
          color="primary"
          text="white"
        >
          Sign In
        </v-btn>
      </RouterLink>
    </div>
    <div class="w-1/3">
      <RouterLink to="/signup">
        <v-btn
          :variant="from !== 'register' ? 'outlined' : 'flat'"
          block
          rounded
          color="primary"
        >
          Sign Up
        </v-btn>
      </RouterLink>
    </div>
  </div>
</template>

<style></style>
