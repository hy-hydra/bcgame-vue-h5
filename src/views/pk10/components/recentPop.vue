<template>
    <van-popup v-model:show="showPopup" position="bottom" closeable @close="emit('closed')"
        class="bg-fog-10 rounded-t-16px pl-15px pr-15px" :style="{ height: '60%' }">
        <div class="text-16px white text-center w='[100%]' lh-50px ">PK10{{$t("pk10.trend")}}</div>
        <div class="text-14px flex justify-between pb-20px title-box">
            <p class="m-0">{{$t("pk10.period")}}</p>
            <p class="m-0">{{$t("pk10.win_num")}}</p>
        </div>
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <div class="px-0 py-15px">
                <div class="item-pk10 relative" v-for="item in gameHistoryList" :key="item.id">
                    <div class="clearfix flex relative">
                        <p class="text-14px text-#fff font-700  relative top--3px m-0">{{ item.settleTime }}</p>
                        <div class="relative mx-10px mt-0px mb-0">
                            <div class="dot"></div>
                            <div class="bg-#40424b relative z-5 w-1px h-104px left-3px"></div>
                        </div>
                        <div class="z-5">
                            <div class="text-14px text-#fff font-700">{{$t("pk10.no")}}.{{ item.issue }}</div>
                            <div class="result text-10px mb-15px">
                                <p class="mr-10px mb-0">{{$t("pk10.champion")}}</p>
                                <p class="text-red mr-20px mb-0">{{ item.Champion }}</p>
                                <p class="mr-10px mb-0">{{$t("pk10.runner_up")}}</p>
                                <p class="text-red mr-20px mb-0">{{ item.Runner }}</p>
                            </div>
                            <div class="flex">
                                <p v-for="i in item.openNumber?.split(',')" :key="i" class="ball-item text-10px">{{
                                    i?.length >= 2 ? i : '0' + i }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </van-pull-refresh>
    </van-popup>
</template>
  
<script setup lang="ts">
import { gameInfoStore } from '@/stores/gameStore';
import { gameGameHistory } from "@/api/game"
const emit = defineEmits(['closed'])
const props = defineProps<{
    show: boolean
}>()

let showPopup = ref<boolean>(false);
const loading = ref(false);
const gameStore = gameInfoStore();
const gameHistoryList = ref<any[]>([]);
const classifyNumber = (input: string): string => {
    const num = parseInt(input, 10);
    const size = num >= 5 ? 'Big' : 'Small';
    const parity = num % 2 === 0 ? 'Even' : 'Odd';
    return `${size} | ${parity}`;
}
const gameGameHistoryFn = async () => {
    loading.value = true;
    const res = await gameGameHistory({
        page: 1,
        limit: 30,
        gameId: gameStore.id
    })
    if (res?.data) {
        gameHistoryList.value = res.data?.list.map(item => {
            item.settleTime = item.settleTime.split(' ').pop().split(':').slice(0, 2).join(':');
            item.Champion = classifyNumber(item.openNumber.split(',')[0]);
            item.Runner = classifyNumber(item.openNumber.split(',')[1]);
            return item;
        }) || [];
    }
    loading.value = false;
}
const onRefresh = () => {
    setTimeout(() => {
        loading.value = false;
    }, 1000);
};
watch(props, (newProps) => {
    showPopup.value = newProps.show;
});
onMounted(() => {
    gameGameHistoryFn()
})
</script>
  
<style lang="less" scoped>
.item-pk10 .dot {
    width: 7px;
    height: 7px;
    border: 2px solid #e54a44;
    border-radius: 50%;
    background: #2e3036;
}


.result {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.item-pk10 .ball-item {
    display: inline-block;
    margin: 0 6px 6px 0;
    color: #fff;
    padding: 4px;
    border: 1px solid #40424b;
    background: -webkit-gradient(linear, left bottom, left top, from(#191a1e), to(#24262c));
    background: linear-gradient(0deg, #191a1e, #24262c);
    text-align: center;
    border-radius: 50%;
}

.title-box {
    border-bottom: 2px solid #40424b;
}

.white {
    color: #fff;
}

.red {
    color: red;
}

.des-list {
    width: 100%;
    height: 87%;
}

.circle {
    border: 2px solid #98d0ff;
    border-radius: 50%;
}
</style>
  