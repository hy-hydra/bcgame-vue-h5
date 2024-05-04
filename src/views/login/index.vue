<template>
  <div class="login-view bg-fog-37">
    <div class="login-view__main">
      <p class="m-0 text-text-3 text-13px font-700 mb-12px">
        {{ $t("sign_in") }}
      </p>
      <van-field
        :placeholder="$t('placeholder_1')"
        clearable
        v-model="loginData.account"
        type="text"
        autocomplete="off"
      />
      <van-field
        v-model="loginData.password"
        :placeholder="$t('placeholder_2')"
        :type="showPassword ? 'text' : 'password'"
        @click-right-icon="clickRightIcon"
        autocomplete="off"
      >
        <template #right-icon>
          <svg class="h-12px w-12px fill-text-6" v-if="showPassword">
            <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_View"></use>
          </svg>
          <svg class="h-12px w-12px fill-text-6" v-else>
            <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Hide"></use>
          </svg>
        </template>
      </van-field>
      <div class="forget">
        <span
          class="submit-tip cursor-pointer"
          @click="$router.push('/forget')"
          >{{ $t("forgot") }}</span
        >
      </div>
      <van-button
        block
        native-type="submit"
        class="text-text-3 bc-login-btn"
        :disabled="loginDisabled"
        @click="signIn"
      >
        {{ $t("sign_in") }}
      </van-button>
    </div>
    <div class="login-view__footer">
      <div class="footer-title my-12px">
        <span class="text-12px">{{ $t("new") }}</span>
        <span
          class="text-13px font-600 text-text-5 ml-10px cursor-pointer"
          @click="$router.push('/regist')"
        >
          {{ $t("create") }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { reactive, computed, ref, onBeforeMount } from "vue";
import { login } from "@/api/login";

import { showNotify, showToast } from "vant";
import { useRouter } from "vue-router";
import { useLoginStore } from "@/stores/login";

import { ENotifyTypes } from "@/const/enums.d";

import { md5 } from "js-md5";

const loginStore = useLoginStore();
const { t } = useI18n();
const $t = key => t("login." + key);

const router = useRouter();
const showPassword = ref(false);
const clickRightIcon = () => {
  showPassword.value = !showPassword.value;
};

const loginData = reactive({
  account: "",
  password: "",
  device: "7869616f6c69313233",
  loginStyle: 0,
  code: ""
});
const loginDisabled = computed(() => {
  const { account, password } = loginData;
  if (!account || !account.trim() || !password || !password.trim()) {
    return true;
  }
  return false;
});
const signIn = async () => {
  const password = md5(loginData.password);
  const res = await login({ ...loginData, password });
  if (res.success) {
    showNotify({ type: ENotifyTypes.success, message: $t("login_succeed") });
    loginStore.setToken(res.data.token);
    loginStore.setLoginInfo(res.data);

    router.push({ name: "home" });
  } else if (res.code === 3 || res.code === 9) {
    showToast($t(res.msg));
  }
};

onBeforeMount(() => {
  // const token = loginStore.getToken();
  // if (token) {
  //   showNotify({ type: ENotifyTypes.primary, message: $t("token_exist") });
  //   router.push({ name: "home" });
  // }
});
</script>
<style lang="less" scoped>
.login-view {
  &__header {
    height: 44px;
  }

  &__nav {
    text-align: center;

    > p {
      &:nth-child(2) {
        font-size: 12px;
      }
    }
  }

  &__main {
    .forget {
      display: flex;
      justify-content: right;

      .submit-tip {
        color: var(--text-3);
        text-decoration: underline;
        font-size: 12px;
      }
    }
  }

  &__footer {
    .method-item {
      height: 34px;
      width: 37px;
      border: 1px solid var(--border-7);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;

      > svg {
        fill: var(--text-3);
      }
    }
  }
}
</style>
