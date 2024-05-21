<template>
  <div class="w-full max-w-full bg-white p-6 sm:p-8 rounded-lg shadow-lg" v-if="fullWidth">
    <slot/>
  </div>
  <div class="w-full max-w-3xl bg-white p-6 sm:p-8 rounded-lg shadow-lg" v-else>
    <slot/>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  fullWidth: {
    type: Boolean,
    default: false
  }
})
</script>