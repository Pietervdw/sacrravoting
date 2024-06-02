<script setup>
import {getFirestore, limit, query, where} from "firebase/firestore";
import { collection, getDocs } from 'firebase/firestore';

// definePageMeta({
//   layout: 'auth'
// })

const db = getFirestore();

const resolutions = ref([]);
const voteCounts = ref({});

const countVotes = (docs) => {
  const counts = {};

  resolutions.value.forEach(resolution => {
    const { name } = resolution;
    counts[name] = {
      Yes: 0,
      No: 0,
      Abstain: 0,
      Total: 0
    };
  });

  docs.forEach(doc => {
    const data = doc.data();
    resolutions.value.forEach(resolution => {
      const { name } = resolution;
      if (data[name]) {
        const vote = data[name];
        if (vote === 'Yes' || vote === 'No' || vote === 'Abstain') {
          counts[name][vote]++;
          counts[name].Total++;
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

const fetchData = async () => {
  const q = query(collection(db, 'election'), where('isOpen', '==', true), limit(1));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length > 0) {
    const electionDoc = querySnapshot.docs[0];
    const electionData = {
      id: electionDoc.id,
      ...electionDoc.data(),
    };

    resolutions.value = electionData.questions.map(question => ({
      name: question.name,
      description: question.description,
    }));
    await fetchVotes();
  }
};

onMounted(fetchData);

const voteCountsWithDescriptions = computed(() => {
  return resolutions.value.map(resolution => {
    const counts = voteCounts.value[resolution.name] || { Yes: 0, No: 0, Abstain: 0, Total: 0 };
    const percentages = {
      Yes: counts.Total > 0 ? ((counts.Yes / counts.Total) * 100).toFixed(2) : '0.00',
      No: counts.Total > 0 ? ((counts.No / counts.Total) * 100).toFixed(2) : '0.00',
      Abstain: counts.Total > 0 ? ((counts.Abstain / counts.Total) * 100).toFixed(2) : '0.00'
    };
    return {
      name: resolution.name,
      description: resolution.description,
      counts,
      percentages
    };
  });
});

</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
    <div v-for="resolution in voteCountsWithDescriptions" :key="resolution.name" class="border rounded-lg shadow-md p-4">
      <h3 class="text-xl font-bold">{{ resolution.name }}</h3>
      <p class="mt-1 text-gray-600">{{ resolution.description }}</p>
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
          <tr v-for="(voteCount, voteType) in resolution.counts" :key="voteType" v-if="voteType !== 'total'">
            <td class="py-2" >{{ voteType }}</td>
            <td class="text-center py-2"><span class="bg-gray-200 rounded-full px-2">{{ voteCount }}</span></td>
            <td class="text-right py-2">
              <span class="bg-gray-200 rounded-full px-2" v-if="voteType !=='Total'">
                {{ resolution.percentages[voteType] }}%
              </span></td>
          </tr>
          </tbody>
        </table>
      </div>
<!--      <div class="mt-2">-->
<!--        <strong>Total Votes: {{ resolution.counts.Total }}</strong>-->
<!--      </div>-->
    </div>
  </div>
</template>

<style scoped>

</style>