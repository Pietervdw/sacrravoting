<script setup>
import {collection, doc, getDoc, getDocs, getFirestore, limit, query, where} from 'firebase/firestore'
import SacrraCard from "~/components/shared/SacrraCard.vue";
import SacrraHeader from "~/components/shared/SacrraHeader.vue";
import VotingClosed from "~/components/VotingClosed.vue";
import {useVoteStore} from "~/stores/vote.ts";

const db = getFirestore();

const voteStore = useVoteStore();

const {pending, data: election} = await useLazyAsyncData('election', async () => {
  let electionData = null;
  const q = query(collection(db, 'election'), where('isOpen', '==', true), limit(1));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length > 0) {
    const electionDoc = querySnapshot.docs[0];
    electionData = {
      id: electionDoc.id,
      ...electionDoc.data(),
    };
  }
  voteStore.election = electionData;

  return electionData;
});

</script>


<template>
  <div v-if="pending">
    <svg class="text-green-500 animate-spin h-11 w-11" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
      </path>
    </svg>
  </div>
  <div v-else>
    <sacrra-card v-if="election">
      <sacrra-header :title="election.title"
                     :sub-title="election.subTitle"/>
      <voter-detail/>
    </sacrra-card>
    <voting-closed v-else/>
  </div>


</template>

<style scoped>

</style>