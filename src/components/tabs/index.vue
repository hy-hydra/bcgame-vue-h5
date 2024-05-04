<template>
  <div class="tab-bar flex  border-b-1px border-fog-2">
    <div
      v-for="option in options"
      :key="option.value"
      class="bar-item  h-45px w-[50%]  text-center leading-45px text-13px"
      :class="activeClass(option.value)"
      @click="emits('update:value', option.value)"
    >
      {{ option.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
const activeClass = activeType => {
  return activeType === props.value ? "bar-item--active" : "";
};
interface IOption {
  value: string;
  label: string;
}
const props = defineProps<{
  options: IOption[];
  value: string;
}>();
const emits = defineEmits(["update:value"]);
</script>

<style lang="less" scoped>
.tab-bar {
  .bar-item {
    transition: all 0.3s;
    border-bottom: 1px solid var(--border-2);
    cursor: pointer;

    &--active {
      background-image: var(--fog-11);
      border-bottom: 1px solid var(--border-1);
      color: var(--text-3);
    }
  }
}
</style>
