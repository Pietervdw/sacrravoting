<script setup>
import SacrraCard from "~/components/shared/SacrraCard.vue";
import SacrraHeader from "~/components/shared/SacrraHeader.vue";
import {doc, collection, addDoc, getFirestore} from 'firebase/firestore'

const isSubmitting = ref(false);

const voteStore = useVoteStore();
if (!voteStore.voter.email) {
  await navigateTo('/')
}
const questions = ref(voteStore.election.questions);

const handleSubmit = async () => {
  const formElements = document.querySelectorAll('input[type="radio"]');
  const selectedValues = {};

  formElements.forEach(element => {
    if (element.checked) {
      const name = element.name;
      selectedValues[name] = element.value;
    }
  });

  // Check if all questions have been answered
  const unansweredQuestions = questions.value.filter(question =>
      !selectedValues.hasOwnProperty(question.name)
  );

  if (unansweredQuestions.length > 0) {
    return;
  }

  isSubmitting.value = true;
  await saveVote(selectedValues);
  isSubmitting.value = false;
  await navigateTo('/complete')
  window.history.replaceState({}, '', window.location.pathname);
};

async function saveVote(selectedValues) {
  const db = getFirestore();

  const voteDocument = {
    ...selectedValues,
    electionId: doc(db, "election", voteStore.election.id),
    email: voteStore.voter.email,
    companyName: voteStore.voter.companyName,
    fullName: voteStore.voter.fullName,
  };

  try {
    await addDoc(collection(db, "votes"), voteDocument);
  } catch (error) {
    console.error("Error adding vote: ", error);
  }
}

</script>

<template>
  <sacrra-card>
    <sacrra-header :sub-title="voteStore.election.votingInstructions"/>
    <form @submit.prevent="handleSubmit">
      <div class="space-y-6 w-full max-w-2xl">
        <div v-for="(item, index) in questions"
             class="bg-white shadow-sm rounded-lg p-6">
          <p class="font-bold mb-4">{{ item.title }} <span class="font-normal">{{ item.description }}<span
              class="text-red-600">*</span></span></p>

          <div v-for="(option, idx) in item.options"
               :key="idx"
               class="flex items-center mb-4">
            <input type="radio" :name="item.name" :value="option" required class="form-radio text-gray-600"/>
            <label class="ml-2 text-gray-700">{{ option }}</label>
          </div>

        </div>
      </div>

      <div class="pt-5">
        <div v-if="isSubmitting" class="text-green-600">
          <svg class="animate-spin h-11 w-11" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
        </div>
        <button v-else
                type="submit"
                class="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
          CAST VOTE
        </button>
      </div>
    </form>
  </sacrra-card>
</template>

<style scoped>

</style>