<template>
  <div
    class="coin-item flex items-center gap-4px h-30px items-center justify-center rounded-30px flex-shrink-0 px-10px"
    :class="active && 'coin-item--active animate__bounceIn animate__animated'"
  >
    <img :src="props.icon" class="h-18px w-18px" />
    <span class="text-text-4 text-12px"> {{ props.name }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string;
  name: string;
  active: boolean;
}>();
</script>

<style lang="less" scoped>
.coin-item {
  border: 1px solid var(--border-6);
  transition: all 0.3s;
  &--active {
    border: 1px solid var(--border-5);
    background-color: var(--fog-32);
    span {
      color: var(--text-3);
    }
  }
}
</style>
