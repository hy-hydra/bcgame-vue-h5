<template>
  <div class="green-blue-ball relative text-0">
    <img
      class="h-24px"
      src="https://m.dbgames1.com/static/images/color-green-blue.png"
      alt=""
    />
    <span class="number text-10px text-black font-700 leading-14px"
      >{{ number }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  number: number;
}>();
</script>

<style lang="less" scoped>
.green-blue-ball {
  .number {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
