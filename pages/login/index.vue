<script setup>
// import necessary Firebase functions and VueFire composables
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {ref} from 'vue';
import SacrraCard from "~/components/shared/SacrraCard.vue";
import SacrraHeader from "~/components/shared/SacrraHeader.vue";

const auth = getAuth();
const user = useCurrentUser();

const email = ref('');
const password = ref('');
const error = ref('');

const loading = ref(false);

const login = async () => {
  try {
    loading.value = true;
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    await navigateTo('/dashboard')
  } catch (err) {
    loading.value = false;
    console.error("Error logging in:", err);
    error.value = 'Invalid email or password. Please try again.';
  }
};
</script>
<template>
  <sacrra-card>
    <sacrra-header :show-required="false" title="Login"/>
    <form @submit.prevent="login">
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input v-model="email" type="email" id="email"
               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               required>
      </div>
      <div class="mb-6">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <input v-model="password" type="password" id="password"
               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               required>
      </div>
      <div class="flex justify-center" v-if="loading">
        <svg class="text-green-500 animate-spin h-11 w-11" xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
      </div>
      <div class="flex justify-center" v-else>
        <button type="submit"
                class="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
          Sign In
        </button>
      </div>
      <div v-if="error && !loading" class="flex text-red-700 justify-center">
        {{ error }}
      </div>
    </form>


  </sacrra-card>
</template>

<style scoped>

</style>