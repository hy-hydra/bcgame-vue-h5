<template>
  <div class="regist-view">
    <div class="regist-view__body">
      <div class="forget-view__body-title text-13px text-text-3 font-700">
        {{ $t("sign_up") }}
      </div>
      <Tabs :options="options" v-model:value="option" />
      <van-field
        :placeholder="$t(option)"
        clearable
        v-model="registerData.account"
        :disabled="!isAccountRegister && verifyState.sent"
        type="text"
        autocomplete="off"
      />
      <van-field
        v-model="registerData.password"
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
      <BcValidatePassword
        v-show="registerData.password.length"
        :status="passwordStrength"
      />
      <van-field
        v-model="registerData.confirm"
        :placeholder="$t('passConfirm')"
        :type="showPassword ? 'text' : 'password'"
        autocomplete="off"
      />
      <p v-show="passwordIsNotMatch && registerData.confirm.length">
        {{ $t("misMatch") }}
      </p>
      <van-field
        v-model="registerData.inviteCode"
        :placeholder="
          isAccountRegister ? $t('invite_code') : $t('optional_invite_code')
        "
        type="text"
        autocomplete="off"
      />

      <van-field
        v-show="!isAccountRegister"
        v-model="registerData.verifyCode"
        :placeholder="$t('verify_code')"
        :disabled="!verifyState.sent"
        type="text"
        autocomple="off"
      />
      <div class="signUp">
        <van-button
          v-if="isAccountRegister"
          type="primary"
          size="small"
          @click="signUp"
          :disabled="signUpDisabled"
          >{{ $t("sign_up") }}</van-button
        >
        <template v-else>
          <van-button
            v-if="!verifyState.sent"
            type="primary"
            size="small"
            @click="sendCode"
            :disabled="signUpDisabled"
            >{{ $t("send_code") }}</van-button
          >
          <van-button
            v-else
            type="primary"
            size="small"
            @click="signUp"
            :disabled="signUpDisabled || !verifyState.succeed"
            >{{ $t("sign_up") }}</van-button
          >
        </template>
      </div>

      <template v-if="!isAccountRegister && verifyState.sent">
        <div class="py-12px text-11px flex justify-between">
          <span class="cursor-pointer" @click="changeAccount">{{
            option === "email" ? $t("change_email") : $t("change_phone")
          }}</span>
          <span
            class="cursor-pointer"
            @click="resendCode"
            :disabled="!signUpDisabled"
            >{{ $t("resend_code") }}</span
          >
        </div>
      </template>

      <div class="py-12px">
        <span class="text-11px text-text-4">{{ $t("already") }}</span>
        <span
          class="text-13px text-text-5 ml-4px font-700 underline cursor-pointer"
          @click="$router.push('/login')"
          >{{ $t("sign_in") }}</span
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, computed } from "vue";
import { showNotify, showToast } from "vant";
import { register } from "../../api/login";
import { checkPasswordStrength } from "@/utils/index";
import { useI18n } from "vue-i18n";
import { useRegister } from "@/stores/userRegister.pinia";
import { useLoginStore } from "@/stores/login";
import { useRouter, useRoute } from "vue-router";
import { sendVerifyCode } from "@/api/user";
import { style } from "@/api/userInterface";
import { ENotifyTypes } from "@/const/enums.d";

import { EMAIL_REG, PHONE_REG } from "@/const/regExp";

const router = useRouter();
const route = useRoute();

const inviteCode: string =
  ref(route.query.inviteCode)?.value ||
  ref(route.query.inviteCode)[0]?.value ||
  "";

const { t } = useI18n();
const $t = key => t("regist." + key);

const option = ref("account");
const isAccountRegister = computed(() => option.value === "account");
const loginStore = useLoginStore();

const options = ref([
  { label: $t("account"), value: "account" },
  { label: $t("email"), value: "email" },
  { label: $t("phone"), value: "phone" }
]);

const passwordStrength = computed(() =>
  checkPasswordStrength(registerData.password)
);
const passwordIsNotMatch = ref(true);

const showPassword = ref(false);
const registerData = reactive({
  inviteCode,
  verifyCode: "",
  device: "",
  account: "",
  password: "",
  confirm: ""
});

watch(registerData, data => {
  if (data.confirm.length && data.password === data.confirm)
    passwordIsNotMatch.value = false;
  else passwordIsNotMatch.value = true;
});
const getBrowserInfo = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  // 检查userAgent以确定浏览器类型
  const isIE = userAgent.includes("msie") || userAgent.includes("trident");
  const isEdge = userAgent.includes("edg/");
  const isFirefox = userAgent.includes("firefox/");
  const isChrome = userAgent.includes("chrome/");
  const isSafari = userAgent.includes("safari/") && !isChrome;

  // 从userAgent中提取版本号
  const version =
    (isIE && userAgent.match(/(msie|rv:)\s?([\d.]+)/)?.[2]) ||
    (isEdge && userAgent.match(/edg\/([\d.]+)/)?.[1]) ||
    (isFirefox && userAgent.match(/firefox\/([\d.]+)/)?.[1]) ||
    (isChrome && userAgent.match(/chrome\/([\d.]+)/)?.[1]) ||
    (isSafari && userAgent.match(/version\/([\d.]+)/)?.[1]) ||
    "";

  // 根据浏览器类型返回名称
  const name =
    (isIE && "ie") ||
    (isEdge && "Edge") ||
    (isFirefox && "Firefox") ||
    (isChrome && "Chrome") ||
    (isSafari && "Safari") ||
    "";

  // 返回包含浏览器名称和版本号的对象
  return {
    name,
    version
  };
};
const clickRightIcon = () => {
  showPassword.value = !showPassword.value;
};
const signUp = async () => {
  const StoreRegister = useRegister();
  // const res = await register(registerData)
  registerData.device = getBrowserInfo().name + StoreRegister.device;
  const { account } = registerData;

  // Validator
  if (passwordIsNotMatch.value) {
    return false;
  }

  const formatState = () => {
    verifyState.sent = false;
    registerData.verifyCode = "";
    verifyState.succeed = false;
    registerData.account = "";
  };
  switch (option.value) {
    case "email":
      if (!EMAIL_REG.test(account)) {
        showToast($t("email_invalid"));
        formatState();
        return false;
      }
      break;
    case "phone":
      if (!PHONE_REG.test(account)) {
        showToast($t("phone_invalid"));
        formatState();
        return false;
      }
      break;
    default:
      if (account.length <= 4) {
        showToast($t("account_invalid"));
        formatState();

        return false;
      }
      break;
  }

  const res = await register(registerData);
  if (res.code === 1 && res.success) {
    showNotify({ type: ENotifyTypes.success, message: $t("register_succeed") });
    router.push({ name: "login" });
  } else if (res.code === 6) {
    showToast($t("invite_code_fail"));
    registerData.inviteCode = "";
  } else {
    showToast($t("account_fail"));
    formatState();
  }
};
const signUpDisabled = computed(() => {
  const { account, password, confirm } = registerData;
  return (
    !account ||
    !account.trim() ||
    !password ||
    !password.trim() ||
    passwordStrength.value === "Vulnerable" ||
    !confirm ||
    !confirm.trim() ||
    passwordIsNotMatch.value
  );
});

const verifyState = reactive({
  sent: false,
  succeed: false
});

const sendCode = async () => {
  const verifyParam = {
    scene: "1",
    style: style[option.value]
  };

  verifyState.sent = true;
  verifyState.succeed = false;
  const res = await sendVerifyCode(verifyParam);

  watch(registerData, data => {
    if (data.verifyCode === res.data.code) verifyState.succeed = true;
    else verifyState.succeed = false;
  });
};
const changeAccount = () => {
  registerData.account = "";
  registerData.verifyCode = "";
  verifyState.sent = false;
};
const resendCode = () => {
  registerData.verifyCode = "";
  sendCode();
};

onBeforeMount(() => {
  const token = loginStore.getToken();
  if (token) {
    showNotify({ type: ENotifyTypes.success, message: $t("token_exist") });
    router.push({ name: "home" });
  }
});
</script>
<style lang="less" scoped>
.regist-view {
  &__body {
    :deep(.tab-bar) {
      .bar-item {
        &:not(.bar-item--active) {
          border-bottom: none !important;
        }
      }
    }
  }
}
.signUp {
  width: 100%;
  text-align: center;
  margin-top: 3%;
}
</style>
