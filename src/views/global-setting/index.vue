<template>
  <div class="global-setting bg-fog-9 p-16px pt-0">
    <p class="text-text-3 text-15px font-600">
      {{ $t("setting") }}
    </p>
    <div class="global-setting__menu bg-fog-18 p-12px rounded-8px">
      <div
        class="menu-item  h-44px px-10px flex justify-between items-center"
        @click="$router.push('/person')"
      >
        <div>
          <svg class="h-12px w-12px fill-text-3">
            <use
              xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_UserProfile"
            ></use>
          </svg>
          <span class="px-8px text-13px">
            {{ $t("account") }}
          </span>
        </div>

        <van-icon name="arrow" />
      </div>

      <div
        @click="$router.push('/security')"
        class="menu-item  h-44px px-10px flex justify-between items-center"
      >
        <div>
          <svg class="h-12px w-12px fill-text-3">
            <use
              xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Locked"
            ></use>
          </svg>
          <span class="px-8px text-13px">
            {{ $t("security") }}
          </span>
        </div>

        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const $t = key => {
  return t("global-setting." + key);
};
</script>

<style scoped>
.menu-item {
  cursor: pointer;
}
</style>
