<template>
    <div class="flex justify-between my-10px mt-20px">
        <div class="font-bold text-[#fff] ml-20px" >{{ item?.tag }}</div>
        <div class="flex font-bold text-[#fff]">
            <div class="w-30px h-30px lh-30px text-center  bg-[#1e2024] border-rd-4px mr-10px" @click="clickPrev">&lt;</div>
            <div class="w-30px h-30px lh-30px text-center bg-[#1e2024] border-rd-4px mr-10px" @click="clickNext">></div>
        </div>
    </div>
    <van-swipe ref="swipeRef" :loop="false" :width="250" :show-indicators="false">
        <van-swipe-item v-for="card in props?.item?.lotteryList">
            <div class="ml-10px mr-10px bg-[#1e2024] border-rd-4px p-15px">
                <van-icon name="star-o" />
                <div class="text-[#fff] mt-10px">{{ card?.name }}</div>
                <div class="mt-10px">Next Draw Starts in</div>
                <van-divider />
                <countDown :item="card"></countDown>
                <van-button class="mt-10px w-100% h-30px"  @click="() => { clickItem(card) }"
                    color="conic-gradient(from 1turn, rgba(88, 175, 16, 1), rgba(29, 128, 58, 1))">
                   Bet Now
                </van-button>
            </div>
        </van-swipe-item>
    </van-swipe>
</template>

<script setup lang="ts">
import { gamesMapping } from "@/utils/game-map";
import { gameInfoStore } from '@/stores/gameStore';
import { GAME_CONFIG } from "@/config/index"
import { useRegister } from "@/stores/userRegister.pinia";
import { useLoginStore } from "@/stores/login";
import { objectToQueryString } from "@/utils/index"
import countDown from "./count-down.vue";


const swipeRef = ref<any>(null);

const props = defineProps<{
    item:any
}>()

const { access_token } = useLoginStore();
const StoreRegister = useRegister();
const user_device = StoreRegister.device;

const gameStore = gameInfoStore();
const router = useRouter();

const clickItem = (item)=>{
    let query = {...GAME_CONFIG,device:user_device,token:access_token,id: item?.gameId}
    if(item?.jumpLink){
        window.location.href = `${item?.link}?${objectToQueryString(query)}`
        return
    }
    gameStore.updateGameId(item?.gameId);
    router.push({
        name: gamesMapping[item?.gameId].router,
        query
    })
}

const clickNext = ()=>{
    swipeRef.value?.next()
}

const clickPrev = ()=>{
    swipeRef.value?.prev()
}
</script>

<style lang="less" scoped>

</style>