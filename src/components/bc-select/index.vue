<template>
  <div class="bc-select" ref="bcSelectRef" :class="visible && 'bc-select--active'">
    <div ref="triggerClickRef"
      class="bc-select__wrapper h-40px px-17px flex justify-between items-center bg-fog-10 rounded-4px"
      @click="showSelectPopover">
      <div class="bc-select__inner text-text-3 text-12px flex-grow-1">
        <span class="text-12px text-text-3" v-if="!slots.trigger && activeOption">
          {{ activeOption.label }}
        </span>
        <slot v-if="slots.trigger && activeOption" name="trigger" :data="activeOption" />
      </div>
      <div class="bc-select__icon">
        <svg class="h-12px w-12px fill-text-6" :class="visible && 'rotate-90'">
          <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Arrow"></use>
        </svg>
      </div>
    </div>
  </div>
  <SelectPopover v-if="visible" :position-info="positionInfo" :options="options" :noSearch="noSearch"
    :activeOption="activeOption" @click-option="clickOption">
    <template #option="{ data }" v-if="slots.option">
      <slot name="option" :data="data" />
    </template>
  </SelectPopover>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import SelectPopover from "./components/select-popover.vue";
import { onClickOutside } from "@vueuse/core";
const visible = ref(false);
const bcSelectRef = ref();
const positionInfo = ref(null);
const showSelectPopover = () => {
  const info = bcSelectRef.value.getBoundingClientRect();
  positionInfo.value = info;
  nextTick(() => {
    visible.value = !visible.value;
  });
};

const triggerClickRef = ref(null);

onClickOutside(triggerClickRef, () => {
  setTimeout(() => {
    if (visible.value) {
      visible.value = false;
    }
  }, 0);
});

defineProps<{
  options: any;
  noSearch?: boolean;
}>();
const slots = useSlots();
const activeOption = ref(null);
const clickOption = option => {
  activeOption.value = option;
};
</script>

<style lang="less" scoped>
.bc-select {
  border: 1px solid transparent;
  transition: all 0.3s;

  &--active {
    border: 1px solid var(--border-5);
  }

  &__icon {
    >svg {
      transition: all 0.3s;
    }
  }
}
</style>
