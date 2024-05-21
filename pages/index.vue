<script setup>
import {collection, doc, getDoc, getDocs, getFirestore, limit, query, where} from 'firebase/firestore'
import SacrraCard from "~/components/shared/SacrraCard.vue";
import SacrraHeader from "~/components/shared/SacrraHeader.vue";
import VotingClosed from "~/components/VotingClosed.vue";


const db = getFirestore();

const {pending, data: election} = await useLazyAsyncData('election', async () => {
  const q = query(collection(db, 'election'), where('isOpen', '==', true), limit(1));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length > 0 ? querySnapshot.docs[0].data() : null;
});

</script>


<template>
  <div v-if="pending">
    <div class="animate-spin h-5 w-5 mr-3 ..." >

    </div>
    Processing...
  </div>
  <div v-else>
    <sacrra-card v-if="election">
      <sacrra-header title="Voting"
                     :sub-title="election.title"/>

      <voter-detail/>
    </sacrra-card>
    <voting-closed v-else/>
  </div>



</template>

<style scoped>

</style>