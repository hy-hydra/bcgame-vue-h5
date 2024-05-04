<template>
  <div class="flex items-center h-24px mx-auto my-0 w-80vw lottery-info">
    <p class="text-13px w-50% text-center pl-15px time-text">{{ issue }}</p>
    <span class="w-50% flex items-center justify-center pr-14px">
      <img src="@/assets/sic-bo/clock.png" class="w-16px h-14px mr-4px" alt="">
      <p class="text-11px"><van-count-down :time="sicStore?.time" /></p>
    </span>
  </div>
</template>

<script setup lang="ts">
import {sicboStore} from "@/stores/lottery/sicboStore"

const sicStore = sicboStore()
const issue = ref<string>('20240127131');
// const time = ref<number>(30 * 60 * 60 * 1000);


</script>

<style>
.lottery-info {
  background: url('~/sic-bo/time-bg.png') no-repeat top left / 100% 100%;
}
.time-text{
  color: #ffcdaa;
}
</style>
