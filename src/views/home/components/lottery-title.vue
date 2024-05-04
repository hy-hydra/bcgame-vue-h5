<template>
  <div class="main-view__lottery-item__title">
    <div class="title">
      <slot />
      <span class="text-17px px-6px font-700">{{ title }}</span>
    </div>
    <div class="count text-12px" @click="setActiveNav">{{ $t("view_all") }}</div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { gameInfoStore } from '@/stores/gameStore';

const gameStore = gameInfoStore();
const { t } = useI18n();
const $t = key => {
  return t("home.lottery." + key);
};
const props = defineProps<{
  title: string;
}>();

const setActiveNav = () => {
  gameStore.setTab(props?.title)
}
</script>

<style lang="less" scoped>
.main-view__lottery-item {
  &__title {
    color: white;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin-bottom: 12px;
    .title {
      display: flex;
      align-items: center;
      > img {
        margin-right: 6px;
        height: 20px;
        width: 20px;
      }
    }
    .count {
      color: var(--text-5);
    }
  }
}
</style>
