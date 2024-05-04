<template>
            <div v-for="card in props.list" class="ml-10px mr-10px bg-[#1e2024] border-rd-4px p-15px mt-10px mb-10px">
                <van-icon name="star-o" />
                <div class="text-[#fff] mt-10px">{{ card?.name }}</div>
                <div class="mt-10px">Next Draw Starts in</div>
                <van-divider />
                <countDown :item="card"></countDown>
                <van-button class="mt-30px w-100% h-30px" @click="() => { clickItem(card) }"
                    color="conic-gradient(from 1turn, rgba(88, 175, 16, 1), rgba(29, 128, 58, 1))">
                   Bet Now
                </van-button>
            </div>
            <Footer />
</template>

<script setup lang="ts">
import Footer from "@/components/footer/index.vue";
import { gamesMapping } from "@/utils/game-map";
import { gameInfoStore } from '@/stores/gameStore';
import { GAME_CONFIG } from "@/config/index"
import { useRegister } from "@/stores/userRegister.pinia";
import { useLoginStore } from "@/stores/login";
import { objectToQueryString } from "@/utils/index"
import countDown from "./count-down.vue";

const { access_token } = useLoginStore();
const StoreRegister = useRegister();
const user_device = StoreRegister.device;
const props = defineProps<{
    list:any
}>()
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


</script>

<style lang="less" scoped>

</style>