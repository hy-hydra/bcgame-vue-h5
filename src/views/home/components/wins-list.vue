<template>
  <div class="flex items-center gap-5px mb-6px">
    <div class="animate-dot h-6px w-6px bg-fog-24 rounded-4px relative"></div>
    <span class="text-12px text-text-3">{{ $t("title") }}</span>
  </div>
  <div class="win-list scrollbar-hidden bg-fog-1">
    <div v-for="(marquee, idx) in marquees" :key="idx" class="win-list__item">
      <div class="item-right">
        <img v-if="marquee.game.icon" :src="marquee.game.icon" alt="" />
        <img
          v-else
          src="@/assets/home/6341e853-7981-4a9d-91cb-0e5f09fca749.webp"
          alt=""
        />
        <span>{{ marquee.name }}</span>
      </div>
      <div class="item-left">
        <span class="mr-10px text-12px flex item-center gap-4px">
          {{ DEFAULT_CURRENCY }} {{ marquee.totalWin }}
          <img src="@/assets/coin/USD.webp" class="h-12px" alt="" />
        </span>
        <van-icon name="arrow" size="12px" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { BannerTypeAPITypes } from "@/api/bannerTypes.d";
import { DEFAULT_CURRENCY } from "@/const";

const props = defineProps<{
  marquees: BannerTypeAPITypes.TGameWinMarquee[]
}>();

const { t } = useI18n();
const $t = key => {
  return t("home.win_list." + key);
};
</script>

<style lang="less" scoped>
.win-list {
  color: #98a7b5;
  padding: 6px;
  border-radius: 4px;
  height: 125px;
  overflow: hidden;
  position: relative;
  &::after {
    content: "";
    height: 50px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: var(--fog-26);
    pointer-events: none;
  }
  &__item {
    margin-bottom: 6px;
    height: 34px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:last-child {
      margin: 0;
    }
    .item-right {
      display: flex;
      align-items: center;
      font-size: 12px;
      > img {
        height: 34px;
        width: 34px;
        border-radius: 4px;
        margin-right: 6px;
      }
    }
    .item-left {
      display: flex;
      align-items: center;
      > span {
        color: #3bc117;
      }
    }
  }
}
.animate-dot {
  &::after {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    // transform: translate(-50%, -50%);
    margin-top: -3px;
    margin-left: -3px;
    background-color: var(--fog-25);
    animation: sun infinite 1s linear;
  }
}

@keyframes sun {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(2.5);
  }
}
</style>
