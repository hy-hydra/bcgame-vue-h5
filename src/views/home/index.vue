<template>
  <CommonHeaderMenu />
  <Lottery v-if="gameStore.tabSelect == 'Lottery'" />
  <GameList v-else-if="gameStore.tabSelect == 'Slots'" :index="2"></GameList>
  <GameList v-else-if="gameStore.tabSelect == 'ENT'" :index="0"></GameList>
  <div v-else class="main-view">
    <div class="main-view__banner animate__bounceInUp animate__animated">
      <van-swipe :width="349" :height="151" :loop="false">
        <van-swipe-item v-for="item in bannerItemList" :key="item.id">
          <div class="main-view__banner-img-wrapper">
            <img v-if="item?.pic" :src="prefix + item?.pic" width="100%" />
            <img v-else src="@/assets/layout/8986a4f98b.webp" alt="" />
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="p-6px animate__bounceInUp animate__animated">
      <WinsList :marquees="marquees" />
    </div>
    <div class="main-view__lottery animate__bounceInUp animate__animated">
      <ListItem
        v-for="(item, idx) in gameGroupList"
        :item="item"
        :key="idx"
      ></ListItem>
    </div>
    <MainDesc />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import WinsList from "./components/wins-list.vue";
import MainDesc from "./components/main-desc.vue";
import ListItem from "./components/list-item.vue";
import Lottery from "@/views/lottery/index.vue";
import GameList from "@/components/game-list/index.vue";
import { bannerList, homeGameList, fileConfig } from "@/api/banner";
import { userInfo } from "@/api/user";
import { useSocket } from "@/composables/useSocket";
import { useChatRoomList } from "@/utils/hooks/useChatRoomList";
import { useUserStore, gameInfoStore } from "@/stores";
import type { BannerTypeAPITypes } from "@/api/bannerTypes.d";

const gameStore = gameInfoStore();
const userStore = useUserStore();

const prefix = ref("");
const bannerItemList = ref<any[]>([]);

const gameGroupList = ref<any[]>([]);
const marquees = ref<BannerTypeAPITypes.TGameWinMarquee[]>([]);

const getHomeGameList = async () => {
  let res = await homeGameList();
  if (res.success && res.code === 1) {
    gameGroupList.value = res.data?.gameGroupList || [];
    marquees.value = res.data.marquees || [];
  }
};

const getBannerList = async () => {
  let res = await bannerList({});
  if (res?.code == 1) {
    prefix.value = res?.data?.prefix;
    bannerItemList.value = res?.data?.list;
  }
};

onMounted(async () => {
  const userRes: any = await userInfo({});
  if (userRes.success) {
    userStore.setUser(userRes.data);
  }
  
  useChatRoomList();
  useSocket();
  let res = await fileConfig();
  if (res?.code == 1) {
    gameStore.setFileConfig(res?.data);
  }
  await getBannerList();
  getHomeGameList();
});
</script>

<style lang="less" scoped>
.main-view {
  overflow-x: hidden;

  &__banner {
    padding: 4px 0 4px 4px;

    &-img-wrapper {
      border-radius: 4px;
      height: 100%;
      padding-right: 12px;

      > img {
        border-radius: 4px;
        width: 100%;
        height: 100%;
      }
    }
  }

  &__btns {
    display: flex;
    padding: 0 14px;
    justify-content: space-between;
  }

  &__btn {
    width: 100px;
    height: 38px;

    > img {
      height: 100%;
      width: 100%;
    }
  }

  &__lottery {
    &-item {
      padding: 0 4px;

      .lottery-item__img-wrapper {
        height: 100%;
        padding-right: 4px;
        font-size: 0;

        > img {
          height: 108px;
          width: 108px;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }

        > p {
          padding: 7px;
          width: 108px;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          background-color: var(--fog-21);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;

          > span {
            font-size: 12px;
          }
        }
      }
    }
  }

  &__table {
    &-header {
      padding: 15px 29px;
      color: white;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
    }

    &-body {
      .row {
        display: flex;
        color: white;
        justify-content: space-between;
        height: 44px;
        margin: 0 14px;
        border-radius: 8px;
        align-items: center;
        padding: 0 18px;
        margin-bottom: 6px;
        font-size: 12px;
      }
    }
  }
}
</style>
