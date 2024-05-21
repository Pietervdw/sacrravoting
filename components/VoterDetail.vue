<script setup lang="ts">
import {reactive} from 'vue';
import {useVoteStore} from "~/stores/vote";

const voteStore = useVoteStore();

const formData = reactive({
  email: '',
  company: '',
  fullName: ''
});
const errors = reactive({
  email: '',
  company: '',
  fullName: ''
});

const validateForm = () => {
  let isValid = true;

  if (!formData.email) {
    errors.email = 'Email is required';
    isValid = false;
  } else {
    errors.email = '';
  }

  if (!formData.company) {
    errors.company = 'Company Name is required';
    isValid = false;
  } else {
    errors.company = '';
  }

  if (!formData.fullName) {
    errors.fullName = 'Name and surname is required';
    isValid = false;
  } else {
    errors.fullName = '';
  }

  return isValid;
};

const handleSubmit = async () => {
  if (validateForm()) {
    voteStore.voter.email = formData.email;
    voteStore.voter.companyName = formData.company;
    voteStore.voter.fullName = formData.fullName;

    await navigateTo('/vote')
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-6">
      <label for="email" class="block text-gray-700 font-bold mb-2">Email address <span
          class="text-red-600">*</span></label>
      <input type="email" id="email"
             v-model="formData.email"
             class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
             placeholder="Your email">
      <div v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</div>
    </div>

    <div class="mb-6">
      <label for="company" class="block text-gray-700 font-bold mb-2">Company Name <span
          class="text-red-600">*</span></label>
      <input type="text" id="company"
             v-model="formData.company"
             class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
             placeholder="Your company">
      <div v-if="errors.company" class="text-red-600 text-sm mt-1">{{ errors.company }}</div>
    </div>

    <div class="mb-6">
      <label for="signature" class="block text-gray-700 font-bold mb-2">Enter your name and surname as a digital
        signature <span class="text-red-600">*</span></label>
      <input type="text" id="fullName"
             v-model="formData.fullName"
             class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
             placeholder="Your full name">
      <div v-if="errors.fullName" class="text-red-600 text-sm mt-1">{{ errors.fullName }}</div>
    </div>

    <div class="flex justify-center">
      <button type="submit"
              class="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
        NEXT
      </button>
    </div>
  </form>
</template>

<style scoped>

</style>