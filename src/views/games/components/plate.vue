<template>
  <div class="plate px-16px pt-16px overflow-auto h-385px bg-fog-50">
    <div class="plate-item pb-24px bc-border-bottom">
      <div class="text-16px mb-12px">First</div>
      <div class="selection flex justify-between">
        <div
          @click="clickItem(1)"
          :class="value.includes(1) && 'selection-item--active'"
          class="selection-item bg-fog-48 w-73px h-40px border-solid border-1px border-border-10 rounded-4px text-10px flex items-center justify-center"
        >
          <div>
            <div>Big</div>
            <div class="text-center">1.9</div>
          </div>
        </div>
        <div
          @click="clickItem(2)"
          :class="value.includes(2) && 'selection-item--active'"
          class="selection-item bg-fog-48 w-73px h-40px border-solid border-1px border-border-10 rounded-4px text-10px flex items-center justify-center"
        >
          <div>
            <div>Small</div>
            <div class="text-center">1.9</div>
          </div>
        </div>
        <div
          @click="clickItem(3)"
          :class="value.includes(3) && 'selection-item--active'"
          class="selection-item bg-fog-48 w-73px h-40px border-solid border-1px border-border-10 rounded-4px text-10px flex items-center justify-center"
        >
          <div>
            <div>Odd</div>
            <div class="text-center">1.9</div>
          </div>
        </div>
        <div
          @click="clickItem(4)"
          :class="value.includes(4) && 'selection-item--active'"
          class="selection-item bg-fog-48 w-73px h-40px border-solid border-1px border-border-10 rounded-4px text-10px flex items-center justify-center"
        >
          <div>
            <div>Even</div>
            <div class="text-center">1.9</div>
          </div>
        </div>
      </div>
    </div>
    <div class="plate-item pb-24px bc-border-bottom mt-24px">
      <div class="text-16px mb-12px">Second</div>
      <div class="selection flex justify-between">
        <div
          @click="clickItem(5)"
          :class="value.includes(5) && 'selection-item--active'"
          class="selection-item bg-fog-48 w-73px h-40px border-solid border-1px border-border-10 rounded-4px text-10px flex items-center justify-center"
        >
          <div>
            <div>Big</div>
            <div class="text-center">1.9</div>
          </div>
        </div>
        <div
          @click="clickItem(6)"
          :class="value.includes(6) && 'selection-item--active'"
          class="selection-item bg-fog-48 w-73px h-40px border-solid border-1px border-border-10 rounded-4px text-10px flex items-center justify-center"
        >
          <div>
            <div>Small</div>
            <div class="text-center">1.9</div>
          </div>
        </div>
        <div
          @click="clickItem(7)"
          :class="value.includes(7) && 'selection-item--active'"
          class="selection-item bg-fog-48 w-73px h-40px border-solid border-1px border-border-10 rounded-4px text-10px flex items-center justify-center"
        >
          <div>
            <div>Even</div>
            <div class="text-center">1.9</div>
          </div>
        </div>
        <div
          @click="clickItem(8)"
          :class="value.includes(8) && 'selection-item--active'"
          class="selection-item bg-fog-48 w-73px h-40px border-solid border-1px border-border-10 rounded-4px text-10px flex items-center justify-center"
        >
          <div>
            <div>Odd</div>
            <div class="text-center">1.9</div>
          </div>
        </div>
      </div>
    </div>
    <div class="plate-item pb-24px bc-border-bottom mt-24px">
      <div class="text-16px mb-12px">Banker&Dealer</div>
      <div class="selection flex justify-between">
        <div
          @click="clickItem(9)"
          :class="value.includes(9) && 'selection-item--active'"
          class="selection-item bg-fog-48 w-73px h-40px border-solid border-1px border-border-10 rounded-4px text-10px flex items-center justify-center"
        >
          <div>
            <div>Banker</div>
            <div class="text-center">1.9</div>
          </div>
        </div>
        <div
          @click="clickItem(10)"
          :class="value.includes(10) && 'selection-item--active'"
          class="selection-item bg-fog-48 w-73px h-40px border-solid border-1px border-border-10 rounded-4px text-10px flex items-center justify-center"
        >
          <div>
            <div>Odd</div>
            <div class="text-center">1.9</div>
          </div>
        </div>
        <div
          @click="clickItem(11)"
          :class="value.includes(11) && 'selection-item--active'"
          class="selection-item bg-fog-48 w-73px h-40px border-solid border-1px border-border-10 rounded-4px text-10px flex items-center justify-center"
        >
          <div>
            <div>Dealer</div>
            <div class="text-center">1.9</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: number[];
}>();

const emits = defineEmits(["update:value"]);
const clickItem = (number: number) => {
  if (props.value.includes(number)) {
    emits("update:value", [...props.value.filter(item => item !== number)]);
  } else {
    emits("update:value", [...props.value, number]);
  }
};
</script>

<style lang="less" scoped>
.selection-item--active {
  background: var(--fog-6);
  color: var(--text-3);
}
</style>
