<template>
    <div class="w-100vw history">
        <div class="flex history-tablist w-375 text-12px overflow-x-scroll">
            <div class="nav-item" @click="showDescriptionPop = true">{{$t("sicbo.game_description")}}</div>
            <div class="nav-item" @click="showTodayBetPop = true">{{$t("sicbo.bet_today")}}</div>
            <div class="nav-item" @click="showRecentPop = true">{{$t("sicbo.lottery_results")}}</div>
            <!-- <div class="nav-item">{{$t("sicbo.sun_size")}}</div>
            <div class="nav-item">{{$t("sicbo.sum_odd_even")}}</div> -->
        </div>
        <div class="flex history-list w-375 text-12px overflow-x-scroll min-h-100px">
            <div v-for="i in resuleList">
                <div v-for="(item,index) in i">
                    <div v-if="index <4" class="l-item">{{ item }}</div>
                    <div v-if="index == 4" class="l-item">{{ item }} <div v-if="i.length != 5" class="add-num">+{{ i.length - 5 }}</div></div>
                </div>
            </div>
        </div>
    </div>
    <GameDescriptionPop @closed="showDescriptionPop = false" :show="showDescriptionPop" />
    <RecentPop @closed="showRecentPop = false" :show="showRecentPop" />
    <TodayBetPop @closed="showTodayBetPop = false" :show="showTodayBetPop" />
</template>
  
<script setup lang="ts">
import GameDescriptionPop from "./gameDescriptionPop.vue"
import RecentPop from "./recentPop.vue"
import TodayBetPop from "./todayBetPop.vue"


import { gameInfoStore } from '@/stores/gameStore';
import { gameGameHistory } from "@/api/game"

const gameStore = gameInfoStore();

const showTodayBetPop = ref(false)
const showDescriptionPop = ref(false)
const showRecentPop = ref(false)

const resuleList = ref([]) 

const gameGameHistoryFn = async () => {
  const res = await gameGameHistory({
    page: 1,
    limit: 30,
    gameId: gameStore.id
  })
  let list = res?.data?.list || []
  console.log(list)


  resuleList.value = categorizeObjectsBySum(list)

}

const categorizeObjectsBySum = (objects)=>{
    const result = [];
    let currentSubArray = [];
    let lastChar = ''; // 记录上一次的字符（'b'或's'）

    objects.forEach(obj => {
        let numbersArray = obj?.openNumber.split(',').map(Number);
        let sum = numbersArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        const char = sum >= 9 ? 'b' : 's';

        // 检查是否需要开始新的子数组
        if (char !== lastChar) {
            // 如果不是第一个元素，先保存当前的子数组
            if (currentSubArray.length > 0) {
                result.push(currentSubArray);
            }
            // 开始新的子数组
            currentSubArray = [char];
            lastChar = char;
        } else {
            // 和前一个字符相同，继续添加到当前子数组
            currentSubArray.push(char);
        }
    });

    // 添加最后一个子数组到结果中
    if (currentSubArray.length > 0) {
        result.push(currentSubArray);
    }

    return result;
}

onMounted(() => {
  gameGameHistoryFn()
})

</script>
  
<style lang="less" scoped>
.nav-item {
    display: inline-block;
    margin: 0 15px;
    padding: 15px 0;
    white-space: nowrap;
    cursor: pointer;
}

.history-tablist {
    color: rgba(182, 117, 255, .6);
}

.l-item {
    width: 18px;
    height: 18px;
    line-height: 12px;
    margin: 2px;
    font-size: 12px;
    text-align: center;
    border: 2px solid #bcbfcb;
    border-radius: 50%;
    position: relative;
}
.add-num{
    position: absolute;
    right: -6px;
    top: -5px;
    color: #3dc119;;
    font-size: 10px;
    font-weight: bold;
}
</style>
  