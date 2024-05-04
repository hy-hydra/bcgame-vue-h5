<template>
  <div class="phone-validate">
    <div
      class="phone-validate__header h-50px flex justify-end items-center px-16px"
    >
      <svg class="h-14px w-14px fill-text-6" @click="$router.go(-1)">
        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Close"></use>
      </svg>
    </div>
    <div class="phone-validate__body h-[calc(100vh-50px)] p-16px">
      <div class="phone-validate__title text-center">
        <img
          class="h-34px"
          alt="img"
          src="data:image/png;base64,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"
        />
        <div class="text-15px text-text-3 font-700 my-8px">
          {{ $t("title") }}
        </div>
        <div class="text-12px my-8px leading-18px">
          {{ $t("desc") }}
        </div>
      </div>
      <van-field
        :placeholder="$t('placeholder')"
        type="text"
        clearable
        autocomplete="off"
      />
      <div class="flex justify-center">
        <van-button
          block
          native-type="submit"
          class="text-text-3 bc-login-btn !w-[100%]"
        >
          {{ $t("verify") }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const $t = key => {
  return t("phone-validate." + key);
};
</script>

<style></style>
