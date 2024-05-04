<template>
  <div class="tabs-component flex ">
    <div
      class="item flex-1 text-center text-12px h-32px leading-32px rounded-4px text-text-4"
      v-for="option in options"
      :key="option.value"
      :class="value === option.value && 'bg-fog-6 !text-text-3'"
      @click="updateValue(option.value)"
    >
      {{ option.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  options: any;
  value: string;
}>();
const emits = defineEmits(["update:value"]);
const updateValue = (value: string) => {
  emits("update:value", value);
};
</script>

<style></style>
