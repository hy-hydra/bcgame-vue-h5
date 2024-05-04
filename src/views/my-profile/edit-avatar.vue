<template>
  <div class="my-profile">
    <div
      class="my-profile__header h-50px flex justify-between items-center px-16px"
    >
      <span class="text-14px font-700 text-text-3">{{ $t("title") }}</span>
      <svg class="h-14px w-14px fill-text-6" @click="$router.go(-1)">
        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Close"></use>
      </svg>
    </div>
    <div class="my-profile__body bg-fog-10 p-18px h-[calc(100vh-50px)]">
      <div class="avatar text-center mt-48px flex flex-col items-center">
        <img class="h-144px w-144px rounded-144px" :src="avatar" alt="" />
      </div>
      <div class="form p-13px mt-24px">
        <div class="form-item">
          <div class="form-item__title text-12px text-text-14 pb-8px">
            <p>{{ $t("default") }}</p>
            <div class="flex justify-start gap-10px">
              <img
                v-for="avatar in avatars"
                :key="avatar.id"
                :src="avatar.avatar"
                @click="() => changeAvatar(avatar.avatar)"
                alt=""
                class="h-10rem w-10rem rounded-full cursor-pointer"
              />
            </div>
          </div>
        </div>
        <van-button
          block
          native-type="submit"
          class="text-text-3 bc-login-btn !w-[100%]"
          @click="saveChangedAvatar"
        >
          {{ $t("save") }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useUserStore } from "@/stores";
import useI18n from "@/utils/hooks/useI18n";
import { userAvatarList, userEdit } from "@/api/user";
import type { ResponseBody } from "@/api/typing";
// import { userEdit } from '@/api/user'
const $t = key => useI18n("my-profile.edit-avatar", key);
const router = useRouter();
const userStore = useUserStore();

const { userInfo: userInfoStore } = storeToRefs(userStore);
const avatar = ref<string>(userInfoStore.value.avatar)
const avatars = ref<Array<UserAvatarListAPITypes.TUserAvatarConfig>>([]);

const getAvatars = async () => {
  const params: UserAvatarListAPITypes.TUserAvatarListReq = {
    page: 1,
    pageSize: 10
  };
  const res: ResponseBody<UserAvatarListAPITypes.TUserAvatarListRes> = await userAvatarList(
    params
  );

  if (res.success && res.code === 1) {
    avatars.value = res.data.avatars;
  }
};

const changeAvatar = (src: string): void => {
  avatar.value = src;
};

const saveChangedAvatar = async () => {
  const res: ResponseBody<UserEditAPITypes.TUserEditRes> = await userEdit({ avatar: avatar.value });

  if (res.success && res.code === 1) {
    userStore.setUserInfo(res.data.user)
    router.push({ name: "my-profile" });
  }
};

onMounted(() => {
  getAvatars();
});
</script>

<style></style>
