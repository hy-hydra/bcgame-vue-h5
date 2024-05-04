<template>
  <div
    tabindex="1"
    class="more-coin-item flex items-center gap-4px w-121px h-30px items-center justify-center rounded-30px flex-shrink-0"
  >
    <span class="text-text-4 text-12px">{{ $t("deposit.more") }}</span>
    <div class="flex items-center">
      <img
        src="@/assets/coin/TRX.webp"
        class="h-18px w-18px -mr-6px z-3"
      />
      <img
        src="@/assets/coin/DOGE.webp"
        class="h-18px w-18px -mr-6px z-2"
      />
      <img
        src="@/assets/coin/LTC.webp"
        class="h-18px w-18px -mr-6px"
      />
    </div>
    <svg class="h-12px w-12px fill-text-6 ml-8px">
      <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Arrow"></use>
    </svg>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.more-coin-item {
  border: 1px solid var(--border-6);
  &:focus {
    border: none;
    background-color: var(--fog-33);
  }
}
</style>
