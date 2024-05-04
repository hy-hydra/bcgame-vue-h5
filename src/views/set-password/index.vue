<template>
  <div class="set-password">
    <div
      class="set-password__header h-50px flex justify-between items-center px-16px "
    >
      <svg
        class="h-14px w-14px fill-text-6 cursor-pointer rotate-180"
        @click="$router.go(-1)"
      >
        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Arrow"></use>
      </svg>

      <svg
        class="h-14px w-14px fill-text-6 cursor-pointer"
        @click="$router.push({ name: 'global-setting' })"
      >
        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Close"></use>
      </svg>
    </div>
    <div class="set-password__body h-[calc(100vh-50px)] p-16px">
      <div class="set-password__title text-center">
        <img class="h-34px" alt="img" src="@/assets/forget/lock.png" />
        <div class="text-15px text-text-3 font-700 my-8px">
          {{ $t("title") }}
        </div>
      </div>

      <!-- 旧密码验证框 -->
      <div class="pb-5px text-12px">
        {{ $t("old") }}
      </div>
      <div class="text-12px mb-8px leading-18px">
        {{ $t("desc") }}
      </div>
      <BcPasswordInput
        v-model:value="pwdData.old"
        :placeholder="$t('oldPwd-placeholder')"
      />

      <!-- 新密码输入框 -->
      <div class="pb-5px text-12px">
        {{ $t("password") }}
      </div>
      <BcPasswordInput
        v-model:value="pwdData.new"
        :placeholder="$t('password_placeholder')"
      />
      <!-- 密码安全度评价线 -->
      <BcValidatePassword v-show="pwdData.new.length" :status="pwdStrength" />

      <!-- 新密码验证框 -->
      <div class="pb-5px text-12px">
        {{ $t("confirm_password") }}
      </div>
      <BcPasswordInput
        v-model:value="pwdData.confirm"
        :placeholder="$t('confirm_password_placeholder')"
      />

      <p v-show="pwdData.confirm.length && pwdNotMatch">
        {{ $t("mismatch") }}
      </p>
      <div class="flex items-center gap-5px">
        <svg class="h-12px w-12px fill-text-6">
          <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Inform"></use>
        </svg>
        <span class="text-10px">
          {{ $t("tip") }}
        </span>
      </div>
      <div class="flex justify-center">
        <van-button
          @click="handleConfirm"
          :disabled="!pwdData.new || !pwdData.old || pwdNotMatch"
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
import { useI18n } from "vue-i18n";
import { md5 } from "js-md5";
import { showNotify } from "vant";
import { checkPasswordStrength } from "@/utils/index";
import type { ResponseBody } from "@/api/typing";
import { userEdit } from "@/api/user";
import { ENotifyTypes } from "@/const/enums.d";
import { useLoginStore } from "@/stores";

const loginStore = useLoginStore();
const router = useRouter();

const { t } = useI18n();
const $t = key => {
  return t("set-password." + key);
};

const pwdData = reactive({
  old: "",
  new: "",
  confirm: ""
});

const pwdNotMatch = ref<boolean>(true);
watch(pwdData, data => {
  if (data.confirm.length && data.new === data.confirm)
    pwdNotMatch.value = false;
  else pwdNotMatch.value = true;
});

const pwdStrength = computed(() => checkPasswordStrength(pwdData.new));

const handleConfirm = async () => {
  const res: ResponseBody<UserEditAPITypes.TUserEditRes> = await userEdit({
    oriPass: md5(pwdData.old),
    password: pwdData.new
  });

  if (res.success && res.code === 1 && res.data.user) {
    showNotify({ type: ENotifyTypes.success, message: $t('success') });
    loginStore.setToken("");
    router.push({ name: "login" });
  } else {
    showNotify({ type: ENotifyTypes.warning, message: $t('old-mismatch') });
    pwdData.old = "";
    pwdData.new = "";
    pwdData.confirm = "";
  }
}
</script>

<style></style>
