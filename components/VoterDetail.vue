<script setup lang="ts">

</script>

<template>
  <form>
    <div class="mb-6">
      <label for="email" class="block text-gray-700 font-bold mb-2">Email address <span class="text-red-600">*</span></label>
      <input type="email" id="email"
             class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
             placeholder="Your email">
    </div>

    <div class="mb-6">
      <label for="company" class="block text-gray-700 font-bold mb-2">Company Name <span class="text-red-600">*</span></label>
      <input type="text" id="company"
             class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
             placeholder="Your answer">
    </div>

    <div class="mb-6">
      <label for="signature" class="block text-gray-700 font-bold mb-2">Enter your name and surname as a digital
        signature <span class="text-red-600">*</span></label>
      <input type="text" id="signature"
             class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
             placeholder="Your answer">
    </div>

    <div class="flex justify-center">
      <button type="button"
              class="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
        NEXT
      </button>
    </div>
  </form>
</template>

<style scoped>

</style>