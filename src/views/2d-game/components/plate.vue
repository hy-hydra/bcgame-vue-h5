<template>
  <div class="plate px-16px pt-16px overflow-auto h-[calc(100vh-270px)] bg-fog-50">
    <div class="plate-item pb-24px bc-border-bottom">
      <div class="text-16px mb-12px">{{ $t("2d-game.First") }}</div>
      <div class="selection flex justify-between">
        <div @click="clickItem(1)" :class="value.includes(1) && 'selection-item--active'"
          class="selection-item bg-fog-48 w-73px h-40px border-solid border-1px border-border-10 rounded-4px text-10px flex items-center justify-center">
          <div>
            <div>{{ $t("2d-game.Big") }}</div>
            <div class="text-center">{{ firstBet }}</div>
          </div>
        </div>
        <div @click="clickItem(2)" :class="value.includes(2) && 'selection-item--active'"
          class="selection-item bg-fog-48 w-73px h-40px border-solid border-1px border-border-10 rounded-4px text-10px flex items-center justify-center">
          <div>
            <div>{{ $t("2d-game.Small") }}</div>
            <div class="text-center">{{ firstBet }}</div>
          </div>
        </div>
        <div @click="clickItem(3)" :class="value.includes(3) && 'selection-item--active'"
          class="selection-item bg-fog-48 w-73px h-40px border-solid border-1px border-border-10 rounded-4px text-10px flex items-center justify-center">
          <div>
            <div>{{ $t("2d-game.Odd") }}</div>
            <div class="text-center">{{ firstBet }}</div>
          </div>
        </div>
        <div @click="clickItem(4)" :class="value.includes(4) && 'selection-item--active'"
          class="selection-item bg-fog-48 w-73px h-40px border-solid border-1px border-border-10 rounded-4px text-10px flex items-center justify-center">
          <div>
            <div>{{ $t("2d-game.Even") }}</div>
            <div class="text-center">{{ firstBet }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="plate-item pb-24px bc-border-bottom mt-24px">
      <div class="text-16px mb-12px">{{ $t("2d-game.Second") }}</div>
      <div class="selection flex justify-between">
        <div @click="clickItem(5)" :class="value.includes(5) && 'selection-item--active'"
          class="selection-item bg-fog-48 w-73px h-40px border-solid border-1px border-border-10 rounded-4px text-10px flex items-center justify-center">
          <div>
            <div>{{ $t("2d-game.Big") }}</div>
            <div class="text-center">{{ secondBet }}</div>
          </div>
        </div>
        <div @click="clickItem(6)" :class="value.includes(6) && 'selection-item--active'"
          class="selection-item bg-fog-48 w-73px h-40px border-solid border-1px border-border-10 rounded-4px text-10px flex items-center justify-center">
          <div>
            <div>{{ $t("2d-game.Small") }}</div>
            <div class="text-center">{{ secondBet }}</div>
          </div>
        </div>
        <div @click="clickItem(7)" :class="value.includes(7) && 'selection-item--active'"
          class="selection-item bg-fog-48 w-73px h-40px border-solid border-1px border-border-10 rounded-4px text-10px flex items-center justify-center">
          <div>
            <div>{{ $t("2d-game.Even") }}</div>
            <div class="text-center">{{ secondBet }}</div>
          </div>
        </div>
        <div @click="clickItem(8)" :class="value.includes(8) && 'selection-item--active'"
          class="selection-item bg-fog-48 w-73px h-40px border-solid border-1px border-border-10 rounded-4px text-10px flex items-center justify-center">
          <div>
            <div>{{ $t("2d-game.Odd") }}</div>
            <div class="text-center">{{ secondBet }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="plate-item pb-24px bc-border-bottom mt-24px">
      <div class="text-16px mb-12px">{{ $t("2d-game.Banker") }}&{{ $t("2d-game.Dealer") }}</div>
      <div class="selection flex justify-between">
        <div @click="clickItem(9)" :class="value.includes(9) && 'selection-item--active'"
          class="selection-item bg-fog-48 w-73px h-40px border-solid border-1px border-border-10 rounded-4px text-10px flex items-center justify-center">
          <div>
            <div>{{ $t("2d-game.Banker") }}</div>
            <div class="text-center">{{ bankBet }}</div>
          </div>
        </div>
        <div @click="clickItem(10)" :class="value.includes(10) && 'selection-item--active'"
          class="selection-item bg-fog-48 w-73px h-40px border-solid border-1px border-border-10 rounded-4px text-10px flex items-center justify-center">
          <div>
            <div>{{ $t("2d-game.Odd") }}</div>
            <div class="text-center">{{ oddBet }}</div>
          </div>
        </div>
        <div @click="clickItem(11)" :class="value.includes(11) && 'selection-item--active'"
          class="selection-item bg-fog-48 w-73px h-40px border-solid border-1px border-border-10 rounded-4px text-10px flex items-center justify-center">
          <div>
            <div>{{ $t("2d-game.Dealer") }}</div>
            <div class="text-center">{{ bankBet }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gameInfoStore } from '@/stores/gameStore';

const gameStore = gameInfoStore();

const firstBet = computed(() => gameStore.item?.config?.betOddsMap[2]);
const secondBet = computed(() => gameStore.item?.config?.betOddsMap[3]);
const bankBet = computed(() => gameStore.item?.config?.betOddsMap[4]);
const oddBet = computed(() => gameStore.item?.config?.betOddsMap[5]);

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
