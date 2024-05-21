<script setup lang="ts">
const props = defineProps({
  title: String,
  subTitle: String,
  showRequired: {
    type: Boolean,
    default: true  // Default value set to true
  }
})
</script>

<template>
  <div class="flex justify-center mb-6">
    <img src="~/public/static/sacrra_logo.png" alt="SACRRA Logo" class="h-16">
  </div>
  <h2 class="text-center text-2xl font-bold mb-2">{{ props.title }}</h2>
  <p class="text-center text-gray-700 mb-4">{{ props.subTitle}}</p>
  <p v-if="showRequired" class="text-red-600 mb-6">* Required</p>
</template>

<style scoped>

</style>