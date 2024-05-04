<template>
  <div class="bc-select" ref="bcSelectRef" :class="visible && 'bc-select--active'">
    <div ref="triggerClickRef" class="bc-select__wrapper h-40px px-17px flex justify-between items-center rounded-4px"
      :class="visible && 'bg-fog-10'" @click="showSelectPopover">
      <div v-if="activeOption?.icon" class="bc-select__inner text-text-3 text-12px flex-grow-1">
        <div class="custom-trigger flex justify-between items-center pr-8px">
          <div class="left flex items-center gap-14px">
            <img :src="activeOption.icon" class="h-23px w-23px" />
            <span class="text-14px">{{ activeOption.label }}</span>
          </div>
        </div>
      </div>
      <div class="bc-select__icon">
        <svg class="h-12px w-12px fill-text-6" :class="visible && 'rotate-90'">
          <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Arrow"></use>
        </svg>
      </div>
    </div>
  </div>
  <SelectPopover v-if="visible" :position-info="positionInfo" :options="options" :activeOption="activeOption"
    @click-option="clickOption">
    <template #option="{ data }" v-if="slots.option">
      <slot name="option" :data="data" />
    </template>
  </SelectPopover>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import SelectPopover from "./select-popover.vue";
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

const props = defineProps<{
  options: any;
}>();
const slots = useSlots();
console.log(slots.trigger);
const activeOption = ref(null);
const clickOption = option => {
  activeOption.value = option;
};

onMounted(() => {
  if (props.options && props.options.length > 0) {
    activeOption.value = props.options[0];
  }
})
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
