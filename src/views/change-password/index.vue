<template>
  <div class="change-password">
    <div
      class="change-password__header h-50px flex justify-end items-center px-16px"
    >
      <svg class="h-14px w-14px fill-text-6" @click="$router.go(-1)">
        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Close"></use>
      </svg>
    </div>
    <div class="change-password__body h-[calc(100vh-50px)] p-16px">
      <div class="change-password__title text-center">
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
      <div class="pb-5px text-12px">
        {{ $t("old") }}
      </div>
      <BcPasswordInput
        v-model:value="password"
        :placeholder="$t('placeholder')"
      />
      <div class="flex justify-center">
        <van-button
          @click="$router.push('set-password')"
          :disabled="!password"
          block
          native-type="submit"
          class="text-text-3 bc-login-btn !w-[100%]"
        >
          {{ $t("confirm") }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BcPasswordInput from "@/components/bc-password-input/index.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const $t = key => {
  return t("change-password." + key);
};
const password = ref("");
</script>

<style></style>
