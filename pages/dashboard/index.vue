<script setup lang="ts">
import {collection, getDocs, getFirestore} from "firebase/firestore";
import SacrraCard from "~/components/shared/SacrraCard.vue";

const db = getFirestore();

definePageMeta({
  layout: 'auth'
})

const {pending, data: elections} = await useLazyAsyncData('elections', async () => {
  const colRef = collection(db, 'election');
  const electionDocs = await getDocs(colRef);

  return electionDocs.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
});

</script>

<template>
  <sacrra-card :full-width="true" class="flex items-center content-center">
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
        <tr v-for="(item, index) in elections">

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
            <NuxtLink :to="`/election/${item.id}`"
                      class=" ml-2 btn btn-outline">Config
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