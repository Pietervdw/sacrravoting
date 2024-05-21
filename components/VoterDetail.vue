<script setup lang="ts">
import {reactive} from 'vue';
import {useVoteStore} from "~/stores/vote";
import {collection, doc, getDocs, getFirestore, query, where} from 'firebase/firestore'

const db = getFirestore();
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

const checkingEligibility = ref(false);
const errorMessage = ref('');

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

    const electionRef = doc(db, `/election/${voteStore.election.id}`);

    checkingEligibility.value = true;
    const q = query(
        collection(db, 'votes'),
        where('email', '==', formData.email),
        where('electionId', '==', electionRef)
    )
    const querySnapshot = await getDocs(q)
    checkingEligibility.value = false;

    if (querySnapshot.empty) {
      errorMessage.value='';
      voteStore.voter.email = formData.email;
      voteStore.voter.companyName = formData.company;
      voteStore.voter.fullName = formData.fullName;

      await navigateTo('/vote')
    } else {
      errorMessage.value='You\'ve already voted (Only one vote can be submitted).';
    }

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

    <div class="flex justify-center items-center"
         v-if="checkingEligibility">
      <svg class="text-green-500 animate-spin h-11 w-11" xmlns="http://www.w3.org/2000/svg" fill="none"
           viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
      </svg>
      <h3 class="pl-1 font-bold text-green-600">Checking your voting eligibility...</h3>
    </div>


    <div class="flex justify-center" v-else>
      <button type="submit"
              class="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
        NEXT
      </button>
    </div>
    <div class="flex justify-center pt-5 text-red-600 font-bold" v-if="errorMessage && !checkingEligibility">
     {{ errorMessage }}
    </div>
  </form>
</template>

<style scoped>

</style>