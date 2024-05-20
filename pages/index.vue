<script setup lang="ts">

</script>

<template>
  <div class="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
    <div class="flex justify-center mb-6">
      <img src="~/public/static/sacrra_logo.png" alt="SACRRA Logo" class="h-16">
    </div>
    <h2 class="text-center text-2xl font-bold mb-2">Voting</h2>
    <p class="text-center text-gray-700 mb-4">Annual General Meeting No. 17/2024 to be held on 16 May 2024</p>
    <p class="text-red-600 mb-6">* Required</p>

    <form>
      <div class="mb-6">
        <label for="email" class="block text-gray-700 font-bold mb-2">Email address <span class="text-red-600">*</span></label>
        <input type="email" id="email" class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Your email">
      </div>

      <div class="mb-6">
        <label for="company" class="block text-gray-700 font-bold mb-2">Company Name <span class="text-red-600">*</span></label>
        <input type="text" id="company" class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Your answer">
      </div>

      <div class="mb-6">
        <label for="signature" class="block text-gray-700 font-bold mb-2">Enter your name and surname as a digital signature <span class="text-red-600">*</span></label>
        <input type="text" id="signature" class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Your answer">
      </div>

      <div class="flex justify-center">
        <button type="submit" class="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">NEXT</button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>