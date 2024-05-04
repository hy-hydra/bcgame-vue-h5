<template>
  <div class="statistics-list gap-5px flex justify-center mt-10px">
    <van-loading
      v-if="staticDataLoading"
      class="mt-10px"
      width="40px"
      type="spinner"
    />
    <template v-else>
      <div
        class="statistics-item rounded-4px bg-fog-46 h-72px flex-1 flex flex-col items-center justify-center"
      >
        <span class="flex items-center">
          <svg class="h-14px w-14px fill-text-7">
            <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Bet"></use>
          </svg>
          <span class="text-10px">
            {{ $t("total_wins") }}
          </span>
        </span>
        <div class="mt-4px text-center text-text-3 text-14px">
          {{ userStaticData.winTimes }}
        </div>
      </div>
      <div
        class="statistics-item rounded-4px bg-fog-46 h-72px flex-1 flex flex-col items-center justify-center"
      >
        <span class="flex items-center">
          <svg class="fill-text-18 h-14px w-14px">
            <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Coin"></use>
          </svg>
          <span class="text-10px ">
            {{ $t("total_bets") }}
          </span>
        </span>
        <div class="mt-4px text-center text-text-3 text-14px">
          {{ userStaticData.betTimes }}
        </div>
      </div>
      <div
        class="statistics-item rounded-4px bg-fog-46 h-72px flex-1 flex flex-col items-center justify-center"
      >
        <span class="flex items-center">
          <svg class="fill-text-18 h-14px w-14px">
            <use
              xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_TotalWager"
            ></use>
          </svg>
          <span class="text-10px">
            {{ $t("total_wagered") }}
          </span>
        </span>
        <div class="mt-4px text-center text-text-3 text-14px w-85px truncate">
          {{DEFAULT_CURRENCY_UNIT}} {{ userStaticData.winAmount }}
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { userStatics } from "@/api/user";
import type { ResponseBody } from "@/api/typing";
import { DEFAULT_CURRENCY_UNIT } from "@/const";

const userStaticData = ref({ winTimes: 0, betTimes: 0, winAmount: 0 });
const staticDataLoading = ref(true);

const { t } = useI18n();
const $t = key => t("user-detail." + key);

onMounted(async () => {
  const res: ResponseBody<UserStaticsAPITypes.TUserStaticsRes> = await userStatics({});

  if (res.success && res.code === 1) {
    userStaticData.value = res.data;
    staticDataLoading.value = false;
  } else {
    staticDataLoading.value = true;
  }
});
</script>
<style lang="less"></style>
