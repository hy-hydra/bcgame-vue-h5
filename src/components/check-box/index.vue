<template>
  <div
    class="check-box p-3px flex h-40 w-80 items-stretch bg-fog-30 rounded-4px relative"
  >
    <div
      class="check-box__item flex items-center justify-center h-34px w-37px  absolute left-3px top-3px z-11"
      @click="setTheme('dark')"
    >
      <svg class="icon">
        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Dark"></use>
      </svg>
    </div>
    <div
      class="check-box__item flex items-center justify-center h-34px w-37px  absolute right-3px top-3px z-11"
      @click="setTheme('light')"
    >
      <svg class="icon">
        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Light"></use>
      </svg>
    </div>
    <div
      class="check-box__slider relative bg-fog-18 h-34px w-37px rounded-4px"
      :class="activeTheme === 'light' && 'theme-light'"
    ></div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["update:value"]);
const activeTheme = ref("dark");
const setTheme = themeType => {
  activeTheme.value = themeType;
  emits("update:value", themeType);
};
</script>

<style lang="less" scoped>
.check-box {
  &__slider {
    transition: all 0.3s;
  }
  .theme-light {
    transform: translateX(37px);
  }
}
</style>
