<template>
    <van-popup v-model:show="showPopup" position="bottom" closeable @close="emit('closed')"
        class="bg-fog-10 rounded-t-16px pl-15px pr-15px" :style="{ height: '60%' }">
        <div class="text-16px white text-center w='[100%]' lh-50px ">{{$t("sicbo.recent_draws")}}</div>
        <div class="flex justify-between pb-20px title-box">
            <div>{{$t("sicbo.period")}}</div>
            <div>{{$t("sicbo.number")}}</div>
        </div>
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <div class="item" v-for="item in gameHistoryList">
                <div class="flex justify-between mt-10px text-14px">
                    <div class="flex items-center">
                        <div class="white">{{ item.settleTime }}</div>
                        <div class="circle w-5px h-5px ml-12px mr-20px"></div>
                        <div class="white">{{$t("sicbo.no")}}.{{ item.issue }}</div>
                    </div>
                    <div>{{ item.count }}</div>
                </div>
                <div class="h-52px relative">
                    <div class="line w-2px h-76px ml-51.5px absolute bottom--18px"></div>
                    <div class="flex mt-10px mb-10px absolute right-0 top-0">
                        <img v-for="i in item.openNumber.split(',')" :key="i" class="w-20px h-20px mt-6px mb-6px"
                            :src="IMG_LIST[Number(i)]" alt="" />
                    </div>
                </div>
            </div>
        </van-pull-refresh>
    </van-popup>
</template>
  
<script setup lang="ts">
import { IMG_LIST } from './content';
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
const analyzeNumbers = (input: string): string => {
    const numbers = input.split(',').map(num => parseInt(num, 10));
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    const size = sum > 9 ? 'Big' : 'Small';
    const parity = sum % 2 === 0 ? 'Even' : 'Odd';

    return `${size} | ${parity} | ${sum}`;
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
            item.count = analyzeNumbers(item.openNumber);
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
.line {
    background: #98d0ff;
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
    background-color: #98d0ff;
    width: 4px;
    height: 4px;
    border-radius: 50%;
}
</style>
  