<template>
  <div class="location">
    <div class="location__header flex items-center w-100vw bc-border-bottom">
      <div
        class="header-item  text-12px w-[50%] h-53px flex items-center justify-center"
        :class="activeTab === 'language' && 'header-item--active'"
        @click="activeTab = 'language'"
      >
        {{ $t("language") }}
      </div>
      <div
        class="header-item  text-12px w-[50%] h-53px flex items-center justify-center"
        :class="activeTab === 'flat' && 'header-item--active'"
        @click="activeTab = 'flat'"
      >
        {{ $t("view") }}
      </div>
      <svg
        class="h-14px w-14px absolute fill-text-6 right-16px"
        @click="$router.go(-1)"
      >
        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Close"></use>
      </svg>
    </div>
    <div class="location__body p-20px">
      <div class="language-list">
        <div
          v-for="language in languageList"
          :key="language.value"
          class="language-item h-44px rounded-4px text-11px flex items-center px-18px mb-10px"
          @click="changeLanguage(language.value)"
        >
          {{ language.label }}
        </div>
      </div>
      <div class="flat-list"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

import { languageList } from "@/const/index";
const { t, locale } = useI18n();
const $t = key => {
  return t("location." + key);
};

const router = useRouter();
const changeLanguage = value => {
  locale.value = value;
  localStorage.setItem("language", value);
  router.go(-1);
};
const activeTab = ref("language");
</script>

<style lang="less" scoped>
.location {
  height: 100vh;
  &__header {
    .header-item {
      border-bottom: 2px solid transparent;

      &--active {
        border-bottom: 2px solid var(--border-5);
        color: var(--text-3);
      }
    }
  }
  &__body {
    height: calc(100vh - 55px);
    overflow: auto;
    .language-list {
      .language-item {
        &--active {
          color: var(--text-3);
          background: var(--fog-1);
        }
      }
    }
  }
}
</style>
