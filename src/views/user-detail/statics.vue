<template>
  <div class="user-statics flex-1 bg-fog-12">
    <div
      class="user-statics__header z-10 fixed bg-fog-12 w-[100%] h-50px flex justify-between items-center px-16px"
    >
      <span
        class="flex gap-4px cursor-pointer"
        @click="$router.push({ name: 'user-detail' })"
      >
        <svg class="h-14px w-14px fill-text-6 rotate-180">
          <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Arrow"></use>
        </svg>
        <span class="text-14px font-700 text-text-3">{{ $t("details") }}</span>
      </span>
      <svg
        class="h-14px w-14px fill-text-6 cursor-pointer"
        @click="$router.push({ name: 'home' })"
      >
        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Close"></use>
      </svg>
    </div>

    <div class="user-statics_body p-12px pt-50px flex flex-col gap-12px">
      <!-- statics option -->
      <div class="flex justify-between items-center mt-12px gap-15px">
        <span class="text-14px font-700 text-text-3">
          {{ $t("statistics") }}
        </span>
        <!-- <span class="flex-1">
          <BcSelect :options="options" :noSearch="true"></BcSelect>
        </span> -->
        <span class="flex gap-10px items-center">
          <img
            :src="userInfo.avatar"
            class="h-30px rounded-70px border-3px border-border-9 border-solid"
          />
          <div class="text-14px text-text-3 font-700">
            {{ userInfo.nickName || userInfo.account }}
          </div>
        </span>
      </div>
      <!-- statics total -->
      <div class="bg-fog-10 rounded-4px p-12px pt-2px">
        <TotalScores />
      </div>
      <!-- statics list -->
      <div class="bg-fog-10 text-12px rounded-4px p-12px">
        <div class="thead flex my-12px text-text-3">
          <span class="w-1/4 text-left">{{ $t("win") }}</span>
          <span class="w-1/4 text-center">{{ $t("bet") }}</span>
          <span class="w-1/2 text-right">{{ $t("wagered") }}</span>
        </div>
        <div class="tbody flex flex-col gap-12px">
          <van-loading
            v-if="loading"
            class="mt-20px mx-auto"
            width="40px"
            type="spinner"
          />
          <NoData v-else-if="!betRecords.length" />
          <template v-else>
            <div v-for="record, idx in betRecords" :key="idx" class="flex">
              <span class="w-1/4 text-left">{{ record.win }}</span>
              <span class="w-1/4 text-center">{{ record.bet }}</span>
              <span class="w-1/2 text-right">{{ record.wagered }}</span>
            </div>
            <van-pagination
              v-model="paginator.currentPage"
              :total-items="paginator.totalItems"
              :items-per-page="paginator.itemsPerPage"
              force-ellipses
              @change="handlePagination"
              class="mt-20px"
            >
              <template #prev-text>
                <van-icon name="arrow-left" />
              </template>
              <template #next-text>
                <van-icon name="arrow" />
              </template>
              <template #page="{ text }">{{ text }}</template>
            </van-pagination>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import TotalScores from "./components/totalScores.vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores";
import { gameBetRecords } from "@/api/game";
import { map } from "lodash-es";

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const { t } = useI18n();
const $t = key => t(`user-detail.${key}`);

const loading = ref<Boolean>(true);
interface BetRecord {
  win: number;
  bet: number;
  wagered: number;
}
const betRecords = ref<Array<BetRecord>>([]);
const paginator = ref({
  currentPage: 1,
  itemsPerPage: 5,
  totalItems: 100
});
const handlePagination = () => getGameBetRecords();

const getGameBetRecords = async () => {
  const res = await gameBetRecords({
    page: paginator.value.currentPage,
    limit: paginator.value.itemsPerPage
  });
  loading.value = true;
  if (res.success) {
    paginator.value.totalItems = res.data.total;
    betRecords.value = map(
      res.data.list,
      (item): BetRecord => ({
        win: item.status,
        bet: item.style,
        wagered: item.balance
      })
    );
    loading.value = false;
  } else {
    loading.value = false;
  }
};

onMounted(() => {
  getGameBetRecords();
});
</script>

<style lang="less" scoped></style>
