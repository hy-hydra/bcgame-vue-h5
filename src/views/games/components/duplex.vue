<template>
  <div class="duplex px-16px pt-16px overflow-auto h-385px bg-fog-50">
    <div
      class="main-game__title flex justify-between text-14px text-text-3 pb-16px"
    >
      <span class="font-700">
        Pick number
      </span>
      <span class="font-700" @click="emits('update:value', [])">Clear all</span>
    </div>
    <div
      class="main-game__select-number flex flex-wrap justify-between gap-6px"
    >
      <div
        class="number-item h-42px w-62px bg-fog-48 flex items-center justify-center font-700 text-text-3 rounded-4px border-1px"
        v-for="index in 100"
        :class="value.includes(index) && 'bg-fog-51'"
        @click="setValue(index)"
      >
        {{ index - 1 }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: number[];
}>();
const emits = defineEmits(["update:value"]);
const setValue = (index: number) => {
  const { value } = props;
  if (value.includes(index)) {
    emits("update:value", [...props.value.filter(item => item !== index)]);
  } else {
    emits("update:value", [...props.value, index]);
  }
};
</script>

<style></style>
