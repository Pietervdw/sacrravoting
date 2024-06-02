<script setup lang="ts">
import {collection, doc, getDocs, getFirestore, query, where} from "firebase/firestore";

definePageMeta({
  layout: 'auth'
})
import SacrraCard from "~/components/shared/SacrraCard.vue";

const db = getFirestore();
const route = useRoute();

const electionRef = doc(db, `/election/${route.params.id}`);

const {pending, data: votes} = await useLazyAsyncData('votes', async () => {
  let votes = [];
  const q = query(
      collection(db, 'votes'),
      where('isProxy', '==', true),
      where('electionId', '==', electionRef)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    // Remove if not needed, or transform non-POJOs here
    votes.push({
      id: doc.id,
      ...data,
      electionId: data.electionId.id, // Convert document reference to its string ID
    });
  });

  return votes;
});
</script>

<template>
  <sacrra-card :full-width="true" class="flex items-center content-center">
    <h1>Proxy Votes</h1>
    <div class="overflow-x-auto w-full">
      <table class="table w-full">
        <!-- head -->
        <thead>
        <tr>
          <th>Title</th>
          <th>Sub-title</th>
          <th>Created</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in votes">

          <td>
            <div class="flex items-center gap-3">
              {{ item.title }}
            </div>
          </td>
          <td>
            <div class="flex items-center gap-3">
              {{ item.subTitle }}
            </div>
          </td>
          <td>
            {{ item.createdDate.toDate().toLocaleDateString() }}
          </td>
          <th>
            <NuxtLink :to="`/results/${item.id}`"
                      class="
                      btn btn-primary bg-green-600 border-green-500
                      hover:bg-green-700
                      hover:border-green-600">Results
            </NuxtLink>
            <NuxtLink :to="`/proxies/${item.id}`"
                      class="
                      ml-2 btn btn-primary bg-green-600 border-green-500
                      hover:bg-green-700
                      hover:border-green-600">Proxy Votes
            </NuxtLink>
            <NuxtLink :to="`/election/${item.id}`"
                      class="ml-2 btn btn-outline">Config
            </NuxtLink>

          </th>
        </tr>
        </tbody>

      </table>
    </div>
  </sacrra-card>
</template>

<style scoped>

</style>
