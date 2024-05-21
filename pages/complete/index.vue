<script>

import {defineComponent} from "vue";
import SacrraCard from "~/components/shared/SacrraCard.vue";
import SacrraHeader from "~/components/shared/SacrraHeader.vue";
import {LottieAnimation} from "lottie-web-vue";
import DoneAnimation from "~/components/shared/DoneAnimation.vue";

export default defineComponent({
  components: {DoneAnimation, LottieAnimation, SacrraHeader, SacrraCard}
})

try{
  const voteStore = useVoteStore();
  voteStore.election={};
  voteStore.voter= {
    email: '',
    companyName: '',
    fullName: ''
  };
  voteStore.choices= [];
}catch{}


</script>

<template>
  <sacrra-card>
    <sacrra-header title="Thank you for voting!"
                   sub-title="Your vote was recorded."
                   :show-required="false"/>

    <done-animation/>

  </sacrra-card>
</template>

<style scoped>

</style>