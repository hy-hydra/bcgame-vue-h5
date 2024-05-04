<template>
    <div class="px-12px py-5px">
        <div class="py-10px text-[#98a7b5] text-11px">{{ $t("color.color_false") }}</div>
        <div class="flex font-700 justify-between">
            <van-button class="w-104px h-47px" color="#f05" @click="battingClick(['Red', 2])"><span
                    class="text-18px">{{ $t("color.red") }}</span><br><span class="text-11px">2x</span> </van-button>
            <van-button class="w-104px h-47px" color="#0161d1" @click="battingClick(['Blue', 4.5])"><span
                    class="text-18px">{{ $t("color.Blue") }}</span><br><span class="text-11px">4.5x</span> </van-button>
            <van-button class="w-104px h-47px" color="#00b97c" @click="battingClick(['Green', 2])"><span
                    class="text-18px">{{ $t("color.Green") }}</span><br><span class="text-11px">2x</span> </van-button>
        </div>
        <div class="py-10px text-[#98a7b5] text-11px">{{ $t("color.direct_selection") }}</div>
        <div class="flex font-700 flex-row justify-between flex-wrap">
            <van-button v-for="i in battingNum" :key="i" @click="battingClick([i, 9])" class="w-61px h-47px mb-10px"
                :color="COLOR_BTN_LIST[i]">
                <span class="text-18px">{{ i }}</span>
                <br><span class="text-11px">9x</span>
            </van-button>
        </div>
        <div class="flex mt-35 px-6px text-center font-700 text-13px text-[#98a7b5]">
            <div @click="() => { selectTab(0) }" :class="['h-34px lh-34px  flex-1', selectNum == 0 ? 'active-tab' : '']">
                {{ $t("color.Record") }}</div>
            <div @click="() => { selectTab(1) }" :class="['h-34px lh-34px flex-1', selectNum == 1 ? 'active-tab' : '']">
                {{ $t("color.Probability") }}</div>
            <!-- <div @click="() => { selectTab(2) }" :class="['h-34px lh-34px flex-1', selectNum == 2 ? 'active-tab' : '']">
                Continuos</div> -->
        </div>
        <div v-if="selectNum == 0">
            <div class="flex text-center text-12px text-[#98a7b5] font-600  h-34px lh-34px mt-6px">
                <div class="flex-1">{{ $t("color.Period") }}</div>
                <div class="flex-1">{{ $t("color.Price") }}</div>
                <div class="flex-1">{{ $t("color.win_num") }}</div>
            </div>
            <div class="h-200px overflow-scroll">
                <div v-for="item in gameHistoryList"
                    class="flex text-center text-12px text-[#fff] font-600  h-34px lh-34px mt-6px">
                    <div class="flex-1">{{ item?.issue }}</div>
                    <div class="flex-1">{{ item?.winAmount }}</div>
                    <div class="flex-1">{{ item?.openNumber }}</div>
                </div>
            </div>

            <div v-if="gameHistoryList.length < 6" class="w-100% text-center my-10px text-[#306bff] text-12px" @click="()=>{gameGameHistoryFn(20)}">
                {{ $t("color.View More") }}
                <img class="w-9px h-9px" data-v-0e9bf4d6=""
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAKlBMVEUAAAAxcv8wa/8wa/8wa/8wav8wav8wa/8wa/8wbP8wbP8wbP8waP8wa//Deo3wAAAADXRSTlMAEPDQn2Aw4L+zlYAgKgdSPAAAADlJREFUCNdjwA4sBGCsuzZw1qUEGOuuKpx1NwDOugJn3XWAsy5iit3G1KsGM+863A5DmL2zBNAcBwC8iyNUxCqVSQAAAABJRU5ErkJggg=="
                    alt="">

            </div>
        </div>
        <Probability v-if="selectNum == 1" :gamelist="gameHistoryList" />
        <BattingPop @closed="showBattinfPop = false" :type="clickItem" :show="showBattinfPop" />
    </div>
</template>

<script setup lang="ts">
import BattingPop from './batting-pop.vue';
import { COLOR_BTN_LIST } from './content';
import { gameInfoStore } from '@/stores/gameStore';
import { gameGameHistory } from "@/api/game"
import Probability from "./probability.vue"

const showBattinfPop = ref<boolean>(false);
const gameStore = gameInfoStore();

const clickItem = ref<(number | string)[]>([])
const battingNum = ref<number[]>(Array.from({ length: 10 }, (_, index) => index));
const battingClick = (key: (string | number)[]) => {
    showBattinfPop.value = true;
    clickItem.value = key;
}
const selectNum = ref(0)
const selectTab = (num) => {
    selectNum.value = num
}
const gameHistoryList = ref<any[]>([])


const gameGameHistoryFn = async (num) => {
    const res = await gameGameHistory({
        page: 1,
        limit: num,
        gameId: gameStore.id
    })
    gameHistoryList.value = res?.data?.list || []
}

onMounted(() => {
    gameGameHistoryFn(5)
})
</script>

<style lang="less" scoped>
.active-tab {
    background-color: #3dc119;
    color: #fff;
    font-weight: 700;
    border-radius: 4px;
}
</style>