<template>
  <div class="my-profile">
    <div
      class="my-profile__header h-50px flex justify-between items-center px-16px"
    >
      <span class="text-14px font-700 text-text-3">{{ $t("title") }}</span>
      <svg
        class="h-14px w-14px fill-text-6"
        @click="$router.go(-1)"
      >
        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Close"></use>
      </svg>
    </div>
    <div class="my-profile__body bg-fog-10 p-18px h-[calc(100vh-50px)]">
      <div
        class="avatar text-center m-60px flex flex-col items-center self-center"
        @click="$router.push({ name: 'edit-avatar' })"
      >
        <img
          class="h-144px w-144px rounded-144px"
          :src="userInfo.avatar"
          alt=""
        />
        <button
          class="bg-fog-43 border-none text-12px px-12px py-8px rounded-8px text-text-3 -mt-20px"
        >
          {{ $t("edit_btn") }}
        </button>
      </div>
      <div class="form p-13px mt-24px">
        <div class="form-item">
          <div class="form-item__title text-12px text-text-14 pb-8px">
            {{ $t("form_title") }}
          </div>
          <van-field
            :placeholder="`2-16 ${$t('characters')}`"
            v-model="nickName"
            type="text"
            clearable
            autocomplete="off"
          />
          <div class="px-10px  text-10px text-text-14">
            {{ $t("desc") }}
          </div>
        </div>
        <van-button
          block
          native-type="submit"
          class="text-text-3 bc-login-btn !w-[100%]"
          @click="modifyAccount"
        >
          {{ $t("modify") }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores";
import { showNotify } from "vant";
import { ENotifyTypes } from "@/const/enums.d";
import type { ResponseBody } from "@/api/typing";
import { userEdit } from "@/api/user";

const { t } = useI18n()
const router = useRouter()

const userStore = useUserStore()

const { userInfo } = storeToRefs(userStore);
const $t = key => t("my-profile." + key);

const nickName = ref("");

nickName.value = userInfo.value.nickName;

const modifyAccount = async () => {
  if (nickName.value.length <= 2 || nickName.value.length >= 17) {
    showNotify({ type: ENotifyTypes.warning, message: $t('length-error') })
  } else if (nickName.value === userInfo.value.nickName) {
    showNotify({ type: ENotifyTypes.warning, message: $t("no-change") })
  } else {
    const res: ResponseBody<UserEditAPITypes.TUserEditRes> = await userEdit({
      nickName: nickName.value
    });

    if (res.success && res.code === 1) {
      showNotify({ type: ENotifyTypes.success, message: $t('success') })
      userStore.setUserInfo(res.data.user);
      router.go(-1);
    }
  }
};
</script>

<style></style>
