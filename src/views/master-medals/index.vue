<template>
  <div class="master-medals bg-fog-10">
    <div
      class="master-medals__header z-10 fixed bg-fog-12 w-[100%] h-50px flex justify-between items-center px-16px"
    >
      <svg class="h-14px w-14px fill-text-6 rotate-180" @click="$router.go(-1)">
        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Arrow"></use>
      </svg>
      <span class="text-14px font-700 text-text-3">{{ $t("title") }}</span>

      <svg
        class="h-14px w-14px fill-text-6"
        @click="$router.push('/account-info')"
      >
        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Close"></use>
      </svg>
    </div>
    <div class="master-medals__body p-12px pt-50px ">
      <div class="banner flex gap-10px pt-6px">
        <div class="banner-item h-60px flex-1 bg-fog-47 text-center">
          <img src="@/assets/master-medals/1.png" class="h-32px mt-8px" />
          <div class="text-10px text-text-19">0</div>
        </div>
        <div class="banner-item h-60px flex-1 bg-fog-47 text-center">
          <img src="@/assets/master-medals/2.png" class="h-32px mt-8px" />
          <div class="text-10px text-text-19">5</div>
        </div>
        <div class="banner-item h-60px flex-1 bg-fog-47 text-center">
          <img src="@/assets/master-medals/2.png" class="h-32px mt-8px" />
          <div class="text-10px text-text-19">10</div>
        </div>
        <div class="banner-item h-60px flex-1 bg-fog-47 text-center">
          <img src="@/assets/master-medals/2.png" class="h-32px mt-8px" />
          <div class="text-10px text-text-19">15</div>
        </div>
        <div class="banner-item h-60px flex-1 bg-fog-47 text-center">
          <img src="@/assets/master-medals/2.png" class="h-32px mt-8px" />
          <div class="text-10px text-text-19">{{ $t("max") }}</div>
        </div>
      </div>
      <div class="progress mt-6px p-12px bg-fog-47">
        <van-progress
          :percentage="50"
          :show-pivot="false"
          :stroke-width="6"
          color="#3BC117"
          track-color="#1e2024"
        />
      </div>
      <div class="p-17px bg-fog-47 flex flex-col gap-6px mt-12px">
        <div class="text-10px text-text-20">
          {{ $t("achieve") }}
          <span class="text-text-5"> 5 </span>
          {{ $t("medals") }}:{{ $t("get") }} 20 BCD
        </div>
        <div class="text-10px text-text-20">
          {{ $t("achieve") }}
          <span class="text-text-5"> 10 </span>
          {{ $t("medals") }}: {{ $t("get") }} 800 BCD
        </div>
        <div class="text-10px text-text-20">
          {{ $t("achieve") }}
          <span class="text-text-5"> 15 </span>
          {{ $t("medals") }}: {{ $t("get") }} 2400 BCD
        </div>
        <div class="text-10px text-text-20">
          {{ $t("achieve") }}
          <span class="text-text-5"> 20 </span>
          {{ $t("medals") }}: {{ $t("get") }} 10000 BCD
        </div>
      </div>
      <div
        class="text-text-3 font-700 text-14px mt-20px bc-border-bottom pb-24px"
      >
        {{ $t("unlocked") }}
      </div>
      <div class="text-text-3 font-700 text-14px mt-20px mb-8px">
        {{ $t("await") }}
      </div>
      <div class="await-unlocking flex flex-wrap gap-10px">
        <div
          class="unlocking-item bg-fog-12 w-110px h-160px flex items-center justify-center"
          :key="medal"
          v-for="medal in medals"
        >
          <div>
            <img :src="medal" class="h-60" />
            <div class="text-10px text-text-14 text-center py-11px">
              xxxx
            </div>
            <div
              class="px-8px bg-fog-10 h-30px flex items-center justify-center text-10px"
            >
              <svg class="h-12px w-12px fill-text-5">
                <use
                  xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Firends"
                ></use>
              </svg>
              <span class="text-text-5">123</span>
            </div>
          </div>
        </div>
      </div>
      <div class="text-text-5 text-center mt-27px pb-32px">
        <span class="text-10px flex items-center justify-center">
          <svg class="h-12px w-12px fill-text-5">
            <use
              xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Inform"
            ></use>
          </svg>
          {{ $t("desc_1") }}
        </span>
        <span class="text-10px"> {{ $t("desc_2") }} </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { medals } from "../user-detail/const";
const { t } = useI18n();
const $t = key => {
  return t("master-medals." + key);
};
</script>

<style></style>
