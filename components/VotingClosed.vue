<script setup lang="ts">

import SacrraCard from "~/components/shared/SacrraCard.vue";
import {LottieAnimation} from "lottie-web-vue";
import ClosedJson from "../assets/closed.json";
import SacrraHeader from "~/components/shared/SacrraHeader.vue";
</script>

<template>
<sacrra-card>
<sacrra-header
    title="Voting is closed."
    :show-required="false"/>
  <lottie-animation
      class="lottie"
      ref="anim"
      loop
      :animationData="ClosedJson"
  />
</sacrra-card>
</template>

<style scoped>

</style>