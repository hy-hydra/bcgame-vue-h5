<template>
  <teleport to="body">
    <div
      class="select-popover absolute top-0 right-10px bg-fog-10 drawer-out rounded-b-4px min-w-200px"
      :style="{
        top: positionInfo.top + 42 + 'px',
        // right: positionInfo.right + 'px',
        width: positionInfo.width + 'px'
      }"
    >
      <div class="select-search pt-10px px-10px pb-6px rounded-4px">
        <div class="bg-fog-12 flex items-center px-17px h-34px flex gap-5px">
          <svg class="icon">
            <use
              xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Search"
            ></use>
          </svg>
          <input
            type="text"
            class="flex-grow bg-fog-12 border-none text-text-3 h-34px text-12px w-100%"
          />
        </div>
      </div>
      <div
        class="select-popover__wrapper max-h-352px overflow-auto px-5px py-2px"
        v-if="!slots.option"
      >
        <div
          v-for="option in options"
          class="select-popover__item text-text-3 h-40px my-4px py-4px px-10px rounded-4px"
          :class="
            activeOption?.value === option.value &&
              'select-popover__item--active'
          "
          @click="emits('click-option', option)"
        >
          <div
            class="select-popover__item-wrapper flex items-center justify-between h-[100%]"
          >
            <span class="text-12px">
              {{ option.label }}
            </span>
            <div class="dot h-6px w-6px bg-fog-6 rounded-10px"></div>
          </div>
        </div>
      </div>
      <div
        class="select-popover__wrapper max-h-352px overflow-auto px-5px py-2px"
        v-else
      >
        <div
          v-for="option in options"
          class="select-popover__item text-text-3 h-40px px-10px rounded-4px"
          :class="
            activeOption?.value === option.value &&
              'select-popover__item--active'
          "
          @click="emits('click-option', option)"
        >
          <slot name="option" :data="option" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
defineProps<{
  positionInfo: any;
  options: any;
  activeOption: any;
}>();
const emits = defineEmits(["click-option"]);
const slots = useSlots();
console.log(slots.option);
</script>

<style lang="less" scoped>
.select-popover {
  .dot {
    display: none;
    box-shadow: 0 0 0 0.3125rem var(--shadow-2);
  }
  &__item {
    &--active {
      background: var(--fog-34);
      .dot {
        display: block;
      }
    }
  }
}
</style>
