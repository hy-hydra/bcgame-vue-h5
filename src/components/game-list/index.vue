<template>
    <van-loading v-if="showLoading" class="text-center" size="40px" type="spinner" />
    <div class="flex bg-[#1C1E22] flex-wrap pl-14px">
        <div v-for="gameItem in gameList" class="w-110px mr-8px border-rd-10px overflow-hidden bg-[#32343B] my-10px"
            @click="() => { clickItem(gameItem) }">
            <img class="w-110px h-110px"
                onerror="this.onerror=null;this.src='https://bc.imgix.net/game/image/8cfca271-4759-45b4-a578-4052d04cc5a5.png?auto=format&dpr=2&w=200';"
                :src="gameStore?.fileConfig?.domainConfPrefix + gameItem?.icon" />
            <div class="w-100% bg-[#32343B] h-40px lh-40px text-center">
                {{ gameItem?.name }}
            </div>
        </div>
    </div>
    <Footer />
</template>

<script setup lang="ts">
import { homeGameList, fileConfig } from "@/api/banner"

import Footer from "@/components/footer/index.vue";
import { gamesMapping } from "@/utils/game-map";
import { gameInfoStore } from '@/stores/gameStore';
import { GAME_CONFIG } from "@/config/index"
import { useRegister } from "@/stores/userRegister.pinia";
import { useLoginStore } from "@/stores/login";
import { objectToQueryString } from "@/utils/index"
 
const { access_token } = useLoginStore();
const StoreRegister = useRegister();
const user_device = StoreRegister.device;
const gameList = ref<any[]>([])
const gameStore = gameInfoStore();
const groupName = ref('')
const showLoading = ref(true)
const router = useRouter()
const props = defineProps<{
    index: number
}>()

const getHomeGameList = async () => {
    showLoading.value = true
    let res = await homeGameList()
    if (res?.code == 1) {
        let index = props.index
        groupName.value = res?.data?.gameGroupList[index].name
        const groupList = res?.data?.gameGroupList[index]?.tagGameSetList || [];
        gameList.value = groupList.reduce((accumulator, current) => {
            return accumulator.concat(current.list);
        }, []);
        showLoading.value = false
    }
}

const clickItem = (item) => {
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

onMounted(async () => {
    let res = await fileConfig()
    if (res?.code == 1) {
        gameStore.setFileConfig(res?.data)
    }
    getHomeGameList()
})
</script>

<style lang="less" scoped></style>