<script setup>
definePageMeta({layout: 'auth'})

import {ref, onMounted, watch} from 'vue';
import {collection, doc, getDoc, getFirestore} from 'firebase/firestore';
import SacrraHeader from '~/components/shared/SacrraHeader.vue';
import SacrraCard from '~/components/shared/SacrraCard.vue';

const route = useRoute();
const electionId = ref(route.params.id);
const db = getFirestore();
const election = ref(null);
const pending = ref(true);

const fetchElection = async (id) => {
  try {
    const docRef = doc(db, 'election', id);
    const electionDoc = await getDoc(docRef);

    if (electionDoc.exists()) {
      election.value = {
        id: electionDoc.id,
        ...electionDoc.data(),
      };
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.error('Error fetching document: ', error);
  } finally {
    pending.value = false;
  }
};

onMounted(() => {
  fetchElection(electionId.value);
});

watch(route, () => {
  electionId.value = route.params.id;
  pending.value = true;
  fetchElection(electionId.value);
});

</script>

<template>
  <div v-if="pending">
    <svg class="text-green-500 animate-spin h-11 w-11" xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
      </path>
    </svg>
  </div>
  <div v-else>
    <sacrra-card v-if="election" :full-width="true">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Election Title</span>
        </div>
        <input type="text" v-model="election.title" placeholder="Election Title" class="input input-bordered w-full max-w-xs" />
      </label>
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Election Subtitle</span>
        </div>
        <input type="text" v-model="election.subTitle" placeholder="Election Subtitle" class="input input-bordered" />
      </label>
    </sacrra-card>
    <div v-else>
      <p>No election data found.</p>
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles here */
</style>

