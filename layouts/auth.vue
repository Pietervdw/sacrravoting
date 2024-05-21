<script setup lang="ts">
import {
  signOut,
} from 'firebase/auth'

const auth = useFirebaseAuth()
const user = useCurrentUser();
if (!user.value) {
  await navigateTo('/login');
}

async function siteSignOut() {
  await signOut;
  await navigateTo('/login');
}

</script>

<template>
  <nav class="bg-white shadow-md">
    <div class="container mx-auto px-6 py-3 flex justify-between items-center">
      <div class="flex-1 flex justify-start"></div>
      <div class="flex-1 flex justify-center">
        <img src="~/public/static/sacrra_logo.png" alt="SACRRA Logo" class="h-16">
      </div>
      <div class="flex-1 flex justify-end">
        <button type="button"
                @click="siteSignOut"
                class="bg-green-600 text-white px-4 py-2 rounded">Sign Out
        </button>
      </div>
    </div>
  </nav>

  <div class="container mx-auto px-6 py-8">
    <slot/>
  </div>
</template>

<style scoped>

</style>