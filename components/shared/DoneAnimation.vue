<script setup lang="ts">
import {LottieAnimation} from "lottie-web-vue";
import DoneJson from "../../assets/done1.json";
</script>

<template>
  <div class="flex justify-center items-center">
    <lottie-animation
        class="w-64 h-64 lottie"
        ref="anim"
        loop
        :animationData="DoneJson"
    />
  </div>
</template>

<style scoped>
.lottie {
  width: 300px; /* Adjust width as needed */
  height: 300px; /* Adjust height as needed */
}
</style>