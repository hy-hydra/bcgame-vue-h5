<template>
  <div class="">
    <div class="px-12px mb-12px text-[#fff] mt-12px">
      {{ $t("promotions") }}
    </div>
    <van-tabs
      title-inactive-color="#98A7B5"
      class="relative"
      shrink
      background="#1c1e22"
      color="#2D3035"
      v-model:active="active"
      type="card"
    >
      <van-tab class="h-100%" title="Latest Promotions">
        <template #title>
          <div class="text-12px ">{{ $t("latest-promotions") }}</div>
        </template>
        <div
          v-for="item in activeList"
          :key="item.index"
          class="pt-30px px-20px w-100vw"
          @click="() => jump(item)"
        >
          <img
            class="w-100%"
            onerror="this.onerror=null;this.src='https://bc.imgix.net/bc_event/9336c2586d.png?auto=format&amp;dpr=2&amp;w=450';"
            :src="
              gameStore?.fileConfig?.domainConfPrefix + item?.config?.wapPic
            "
            alt=""
          />
          <div class="flex items-center py-20px pl-10px bg-[#1C1E22]">
            <div class="w-230px text-12px text-ellipsis overflow-hidden">
              <div>Ends at {{ item?.config?.startTime }}</div>
              <div>{{ item?.config?.title }}</div>
            </div>
            <div
              class="text-[#47c737] bg-[#2d3035] mr-10px py-14px px-10px text-12px"
            >
              In progress
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab class="" title="Archived">
        <template #title>
          <div class="text-12x ">{{ $t("archived") }}</div>
        </template>
        <div class="pt-30px px-20px w-100vw">
          <img
            class="w-100%"
            src="https://bc.imgix.net/bc_event/9336c2586d.png?auto=format&amp;dpr=2&amp;w=450"
            alt=""
          />
          <div class="flex items-center py-20px pl-10px bg-[#1C1E22]">
            <div class="w-230px text-12px">
              <div>Ends at 2024/3/25 10:23:20</div>
              <div>Bet & Win</div>
            </div>
            <div
              class="text-[#47c737] bg-[#2d3035] mr-10px py-14px px-10px text-12px"
            >
              In progress
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <Footer />
    <van-back-top class="border-0px" right="6vw" bottom="10vh">
      <div class="text-center">
        <van-icon class="block text-[#47c737]" name="arrow-up" />
        <div class="text-14px">{{ $t("top") }}</div>
      </div>
    </van-back-top>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { userInfo } from "@/api/user";
import { ref, onMounted } from "vue";

import { activityList } from "@/api/active";
import { gameInfoStore } from "@/stores/gameStore";
import { promotionStore } from "@/stores/promotionStore";

const gameStore = gameInfoStore();
const proStore = promotionStore();
const activeList = ref<any[]>([]);
const router = useRouter();
const { t } = useI18n();
const $t = key => {
  return t("promotions." + key);
};

const active = ref(0);

const userInfoData = ref({});
const getUserInfo = async () => {
  const res = await userInfo({});
  userInfoData.value = res.data;
};

const getactivityList = async () => {
  let res = await activityList({
    page: 1,
    limit: 5
  });
  if (res?.code == 1) {
    activeList.value = res?.data?.list.slice(0, 5);
  }
};

const jump = item => {
  proStore.updateGameDetail(item);
  router.push({ name: "promotions-detail" });
};

onMounted(() => {
  // if(isEmpty(access_token.value)) {
  //   router.push({name: 'login'})
  // }
  getactivityList();
});

getUserInfo();
</script>

<style lang="less" scoped></style>

<style lang="less">
.van-back-top {
  border-radius: 0;
}

:root {
  --van-tabs-card-height: 40px !important;
  --van-back-top-background: #25272c;
}
</style>
