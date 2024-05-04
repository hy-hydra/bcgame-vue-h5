<template>
  <div class="user-detail bg-fog-12 ">
    <div class="user-detail__header z-10 fixed bg-fog-12 w-[100%] h-50px flex justify-between items-center px-16px">
      <span class="text-14px font-700 text-text-3">{{ $t("title") }}</span>
      <svg class="h-14px w-14px fill-text-6 cursor-pointer" @click="$router.push({name: 'account'})">
        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Close"></use>
      </svg>
      <div class="absolute right-45px top-0">
        <img class="w-55px"
          src="data:image/png;base64,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" />
        <span class="text-12px font-900 absolute text-text-3 left-19px top-28px">
          V{{ userVip?.vipLevel }}
        </span>
      </div>
    </div>
    <div class="user-detail__body p-12px pt-50px">
      <div class="avatar flex justify-between items-start mt-12px">
        <div class="flex items-center gap-4px px-10px">
          <svg class="h-14px w-14px fill-text-17">
            <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Like"></use>
          </svg>
          <span class="text-12px text-text-3">12</span>
        </div>

        <div class="text-center">
          <img :src="userInfo.avatar" class="h-70px rounded-70px border-3px border-border-9 border-solid" />
          <div class="text-17px text-text-3 font-700 mt-12px">
            {{ userInfo.nickName || userInfo.account }}
          </div>
          <div class="text-text-4 text-12px my-4px">
            <span>{{ $t("user_id") }}:</span>
            <span>{{ userVip.id }}</span>
          </div>
        </div>
        <div class="h-30px w-30px bg-fog-10 rounded-4px flex items-center justify-center cursor-pointer"
          @click="$router.push({ name: 'my-profile' })">
          <svg class="h-14px w-14px fill-text-14">
            <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Edit"></use>
          </svg>
        </div>
      </div>
      <!-- dy_au 隐藏了在4月1号 -->
      <!-- <div class="medals bg-fog-10 rounded-4px p-12px my-12px">
        <div class="flex justify-between">
          <span class="flex items-center ">
            <svg class="w-14px h-14px fill-text-6">
              <use
                xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Medal"
              ></use>
            </svg>
            <span class="text-12px text-text-3 px-6px">{{ $t("medals") }}</span>
            <span class="text-12px text-text-3">0</span>
          </span>
          <span class="flex gap-4px">
            <span
              class="text-text-5 text-12px"
              @click="$router.push('/master-medals')"
              >{{ $t("details") }}</span
            >
            <svg class="h-14px w-14px fill-text-6">
              <use
                xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Arrow"
              ></use>
            </svg>
          </span>
        </div>
        <div class="flex overflow-auto gap-12px mt-12px">
          <img
            :src="medal"
            v-for="medal in medals"
            :key="medal"
            class="w-37px opacity-50"
          />
        </div>
      </div> -->

      <!-- 用户统计 -->
      <div class="statistics bg-fog-10 rounded-4px p-12px">
        <div class="flex justify-between">
          <span class="flex items-center ">
            <svg class="w-14px h-14px fill-text-6">
              <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Statistics"></use>
            </svg>
            <span class="text-12px text-text-3 px-6px">
              {{ $t("statistics") }}
            </span>
          </span>
          <!-- Details 按钮 -->
          <span class="flex gap-4px cursor-pointer" @click="$router.push({name: 'user-statics'})">
            <span class="text-text-5 text-12px">{{ $t("details") }}</span>
            <svg class="h-14px w-14px fill-text-6">
              <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Arrow"></use>
            </svg>
          </span>
        </div>
        <!-- 统计数据列表 -->
        <TotalScores />
      </div>
      <div class="favorite-game p-12px bg-fog-10 mt-12px">
        <div class="pt-3px pb-10px text-12px text-text-3">
          {{ $t("favorite") }}
        </div>
        <div class="game-list">
          <div class="game-item flex items-center justify-between mb-12px">
            <div class="flex items-center">
              <img class="h-68px rounded-8px"
                src="https://img2.luckybc888.com/game/image/ff0b0511-1f48-43d1-8dd3-294bb6437b4b.png" />
              <span class="px-18px">Limbo</span>
            </div>
            <div class="text-10px text-right">
              <div class="text-text-14 leading-16px">{{ $t("wagered") }}</div>
              <div class="text-text-3 leading-16px">{{ DEFAULT_CURRENCY_UNIT }} 6,589.56</div>
            </div>
          </div>
          <div class="game-item flex items-center justify-between mb-12px">
            <div class="flex items-center">
              <img class="h-68px rounded-8px"
                src="https://img2.luckybc888.com/game/image/ff0b0511-1f48-43d1-8dd3-294bb6437b4b.png" />
              <span class="px-18px">Limbo</span>
            </div>
            <div class="text-10px text-right">
              <div class="text-text-14 leading-16px">{{ $t("wagered") }}</div>
              <div class="text-text-3 leading-16px">{{ DEFAULT_CURRENCY_UNIT }} 6,589.56</div>
            </div>
          </div>
          <div class="game-item flex items-center justify-between mb-12px">
            <div class="flex items-center">
              <img class="h-68px rounded-8px"
                src="https://img2.luckybc888.com/game/image/ff0b0511-1f48-43d1-8dd3-294bb6437b4b.png" />
              <span class="px-18px">Limbo</span>
            </div>
            <div class="text-10px text-right">
              <div class="text-text-14 leading-16px">{{ $t("wagered") }}</div>
              <div class="text-text-3 leading-16px">{{ DEFAULT_CURRENCY_UNIT }} 6,589.56</div>
            </div>
          </div>
        </div>
      </div>
      <div class="wager-contest p-12px bg-fog-10 mt-12px">
        <div class="pt-3px pb-10px text-12px text-text-3">
          {{ $t("wager_title") }}
        </div>
        <NoData />
      </div>
      <div class="p-17px text-center">
        <span class="text-10px text-text-14">{{ $t("joined") }} {{ dayjs(userInfo.loginTime).format('M/DD/YYYY')
          }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";
import { storeToRefs } from "pinia";
// import { medals } from "./const";
import { useUserStore } from "@/stores";
import TotalScores from "./components/totalScores.vue";
import { DEFAULT_CURRENCY_UNIT } from "@/const";

const { userInfo, userVip } = storeToRefs(useUserStore());
const { t } = useI18n();
const $t = key => {
  return t("user-detail." + key);
};
</script>

<style></style>
