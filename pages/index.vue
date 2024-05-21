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
    <div class="animate-spin h-5 w-5 mr-3 ...">

    </div>
    Processing...
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