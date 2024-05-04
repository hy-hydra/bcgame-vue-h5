<template>
  <div class="forget-view">
    <div class="forget-view__body">
      <div class="forget-view__body-title text-13px text-text-3 font-700">
        {{ $t("reset") }}
      </div>
      <van-field
        class="mt-16px"
        :placeholder="$t('placeholder_1')"
        clearable
        type="text"
        autocomplete="off"
      />
      <van-button
        block
        native-type="submit"
        class="text-text-3 bc-login-btn mt-16px"
      >
        {{ $t("reset") }}
      </van-button>
      <div class="py-12px">
        <span class="text-11px text-text-4">{{ $t("already") }}</span>
        <span
          class="text-13px text-text-5 ml-4px font-700 underline"
          @click="$router.push('/login')"
          >{{ $t("sign_in") }}</span
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const $t = key => {
  return t("forget." + key);
};
</script>
<style lang="less" scoped>
.forget-view {
  &__body {
    &-wran {
      display: flex;
      gap: 20px;
      padding: 24px 28px;
      align-items: center;
      > img {
        width: 36px;
        height: 36px;
      }
      > p {
        font-size: 24px;
        color: #93acd3;
      }
    }
    &-step {
      padding: 0 97px;
      padding-top: 80px;
      display: flex;
      justify-content: space-between;
      &__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
        width: 100px;
        position: relative;
        &::after {
          content: " ";
          position: absolute;
          height: 1px;
          border: 1px dashed #494955;
          margin-top: 12px;
          width: 150%;
          transform: translateX(80%);
        }
        &:nth-child(3) {
          &::after {
            display: none;
          }
        }
        .circle {
          background-color: #55657e;
          height: 28px;
          width: 28px;
          border-radius: 50%;
          text-align: center;
          line-height: 28px;
        }
        &--active {
          .circle {
            background-color: #0f7bfb;
          }
        }
        .step-tip {
          font-size: 24px;
          font-weight: 400;
          text-align: center;
        }
      }
    }
    &-form {
      padding: 0 24px;
      padding-top: 80px;
      &__item {
        display: flex;
        gap: 12px;
      }
    }
  }
}
</style>
