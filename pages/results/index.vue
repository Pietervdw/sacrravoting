<script setup>
import {getFirestore} from "firebase/firestore";
import { collection, getDocs } from 'firebase/firestore';

definePageMeta({
  layout: 'auth'
})

const db = getFirestore();

const resolutions = ['Resolution1', 'Resolution2', 'Resolution3', 'Resolution4'];
const voteCounts = ref({});

const countVotes = (docs) => {
  const counts = {};

  resolutions.forEach(resolution => {
    counts[resolution] = {
      yes: 0,
      no: 0,
      abstain: 0
    };
  });

  docs.forEach(doc => {
    const data = doc.data();
    resolutions.forEach(resolution => {
      if (data[resolution]) {
        const vote = data[resolution].toLowerCase();
        if (vote === 'es' || vote === 'no' || vote === 'abstain') {
          counts[resolution][vote]++;
        }
      }
    });
  });

  return counts;
};

const fetchVotes = async () => {
  const votesSnapshot = await getDocs(collection(db, 'votes'));
  voteCounts.value = countVotes(votesSnapshot.docs);
};

onMounted(fetchVotes);

</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
    <div v-for="(counts, resolution) in voteCounts" :key="resolution" class="border rounded-lg shadow-md p-4">
      <h3 class="text-xl font-bold">{{ resolution }}</h3>
      <div class="mt-2">
        <table class="table-auto w-full">
          <thead>
          <tr>
            <th class="text-left">&nbsp;</th>
            <th class="text-center"># of Votes</th>
            <th class="text-right">% of Vote</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(voteCount, voteType) in counts" :key="voteType">
            <td class="py-2">{{ voteType }}</td>
            <td class="text-center py-2"><span class="bg-gray-200 rounded-full px-2">{{ voteCount }}</span></td>
            <td></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>