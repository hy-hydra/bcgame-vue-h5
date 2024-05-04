<template>
  <div class="account-info bg-fog-9 p-16px pt-0">
    <p class="text-text-3">
      <svg
        class="h-10px w-10px fill-text-6 rotate-180 cursor-pointer"
        @click="$router.go(-1)"
      >
        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Arrow"></use>
      </svg>
      <span class="text-text-3 text-15px px-4px font-800">
        {{ $t("title") }}
      </span>
    </p>
    <div class="account-info__item bg-fog-18 p-12px rounded-8px">
      <p
        class="item-title text-14px text-text-3 m-0 pb-12px bc-border-bottom font-700"
      >
        {{ $t("profile") }}
      </p>
      <div class="item-content flex justify-between p-12px">
        <div class="content-left flex items-center">
          <img :src="userInfo.avatar" class="rounded-50 h-54px" />
          <div class="ml-12px text-text-3">
            <p class="text-13px m-0 !mb-8px">
              {{ userInfo.nickName || userInfo.account }}
            </p>
            <p class="text-12px m-0 mt-4px font-100">
              {{ $t("user_id") }} : {{ userInfo.id }}
            </p>
          </div>
        </div>
        <div class="content-right flex items-center">
          <van-button
            class="bc-btn h-30px"
            @click="$router.push('/my-profile')"
          >
            <svg class="fill-text-3 h-12px w-12px">
              <use
                xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Edit"
              ></use>
            </svg>
            {{ $t("edit") }}
          </van-button>
        </div>
      </div>
    </div>
    <div class="account-info__item bg-fog-18 p-12px rounded-8px mt-12px">
      <p
        class="item-title text-14px text-text-3 m-0 pb-12px bc-border-bottom font-700"
      >
        {{ $t("contact_info") }}
      </p>
      <!-- 邮箱验证 -->
      <div class="item-content p-12px !pb-0">
        <p class="text-12px text-text-3 m-0 mb-8px">
          {{ $t("verification") }}
        </p>
        <div
          class="py-6px mt-6px h-36px rounded-4px flex justify-between items-center"
        >
          <van-field
            class="!mb-0"
            v-model="email"
            type="text"
            :placeholder="$t('placeholder')"
            clearable
            autocomplete="off"
            :disabled="codeSent ? true : false"
          />
        </div>
      </div>

      <!-- 真名设置 -->
      <div class="item-content p-12px !pb-0">
        <p class="text-12px text-text-3 m-0 mb-8px">
          {{ $t("real-name") }}
        </p>
        <div
          class="py-6px mt-6px h-36px rounded-4px flex justify-between items-center"
        >
          <van-field
            class="!mb-0"
            v-model="realName"
            type="text"
            :placeholder="$t('real-name-placeholder')"
            clearable
            autocomplete="off"
            :disabled="codeSent ? true : false"
          />
        </div>
      </div>

      <div v-if="codeSent && !allSet" class="item-content p-12px !pb-0">
        <div
          class="py-6px mt-6px h-36px rounded-4px flex justify-between items-center"
        >
          <van-field
            class="!mb-0"
            v-model="codeInput"
            type="text"
            :placeholder="$t('code-place')"
            clearable
            autocomplete="off"
          />
        </div>
      </div>

      <!-- 真名，邮箱确认按钮 -->
      <div v-if="!allSet" class="p-12px !pb-0">
        <van-button
          block
          native-type="submit"
          class="text-text-3 bc-btn w-full"
          @click="handleClick"
        >
          {{ codeSent ? $t("add") : $t("send-code") }}
        </van-button>
      </div>
      <div v-else class="p-12px !pb-0">
        <van-button
          block
          native-type="submit"
          class="text-text-3 bc-btn w-full"
          @click="handleUpdate"
        >
          {{ $t("edit") }}
        </van-button>
      </div>

      <!-- 手机验证 -->
      <!-- 
        要实现：dy_au 0419
       -->
      <div class="item-content p-12px">
        <p class="text-12px text-text-3 m-0">{{ $t("phone") }}</p>
        <p class="text-12px text-text-3 m-0 text-text-4 mt-6px">
          {{ $t("tip") }}
        </p>
        <van-button
          class="bc-btn mt-6px"
          block
          @click="$router.push('/phone-validate')"
        >
          <svg class="fill-text-3 h-12px w-12px">
            <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Edit"></use>
          </svg>
          {{ $t("add") }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores";
import { showNotify } from "vant";
import { ENotifyTypes } from "@/const/enums.d";
import type { ResponseBody } from "@/api/typing";
import { sendVerifyCode, userEdit } from "@/api/user";
import { EMAIL_REG, ONLY_LETTER_REG } from "@/const/regExp";

const { t } = useI18n()
const $t = key => t("account." + key);

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore);

const email = ref<string>('')
const realName = ref<string>('')
email.value = userInfo.value.email
realName.value = userInfo.value.realName

const codeSent = ref<boolean>(false)
const code = ref<string>('')
const codeInput = ref<string>('')

const allSet = ref<boolean>(!!userInfo.value.email && !!userInfo.value.realName);

const handleUpdate = () => {
  allSet.value = false;
  codeSent.value = false;
  realName.value = "";
  email.value = "";
}

const handleClick = () => {
  if (codeSent.value) {
    saveData()
  } else {
    sendCode()
  }
}

const sendCode = async () => {
  if (!email.value) {
    showNotify({ type: ENotifyTypes.warning, message: $t('empty-email') })
  } else if (!EMAIL_REG.test(email.value)) {
    showNotify({ type: ENotifyTypes.warning, message: $t('email-invalid') })
  } else if (!realName.value) {
    showNotify({ type: ENotifyTypes.warning, message: $t('empty-real-name')})
  } else if (!ONLY_LETTER_REG.test(realName.value)) {
    showNotify({ type: ENotifyTypes.warning, message: $t('real-name-invalid') })
  } else if (realName.value.length <= 2 || realName.value.length >= 20) {
    showNotify({ type: ENotifyTypes.warning, message: $t('real-name-short') })
  } else {
    const res = await sendVerifyCode({
      style: 2
    })

    if (res.success && res.code === 1) {
      codeSent.value = true;

      code.value = res.data.code
    }
  }
}

const saveData = async () => {
  if (codeInput.value !== code.value) {
    showNotify({ type: ENotifyTypes.danger, message: $t('code-no-match') });
    codeInput.value = '';
  } else {
    const res: ResponseBody<UserEditAPITypes.TUserEditRes> = await userEdit({
      email: email.value,
      realName: realName.value,
      verifyCode: code.value
    });

    if (res.success && res.code === 1) {
      showNotify({ type: ENotifyTypes.success, message: $t('success') })
      allSet.value = true;
      userStore.setUserInfo(res.data.user);
    }
  }
}
</script>

<style lang="less" scoped></style>
