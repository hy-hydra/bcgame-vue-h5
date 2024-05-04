<template>
    <van-popup :overlay=false v-model:show="showPopup" position="bottom" @close="emit('closed')"
        class="rounded-t-16px pl-15px pr-15px batting-pop" :style="{ height: '49%' }">
        <div class="text-14px flex justify-between items-center pt-20px px-5px pb-10px">
            <span class="text-12px text-#98a7b5 flex items-center justify-start">
                <p class="mr-16px my-0 text-17px text-#00b97c">{{ props.type[0] }}</p>
                <p class="m-0">03/12-389 {{ $t("color.period") }}</p>
            </span>
            <span class="m-0" @click="emit('closed')">{{ $t("color.cancel") }}</span>
        </div>
        <span class="text-10px border-rd-8px bg-#8d71ff text-#fff px-10px py-2px">{{ props.type[1] }}x</span>
        <div class="text-14px flex justify-between items-center mt-10px">
            <p class="mb-10px mt-0 mx-0 text-#98a7b5 text-13px">{{ $t("color.bet-money") }}</p>
            <div class="flex justify-between items-center bg-none d-game__input rounded-4px w-191px flex-shrink-0">
                <van-field v-model="inputValue" clearable type="number" autocomplete="off" />{{ DEFAULT_CURRENCY }}
            </div>
        </div>
        <div class="text-14px flex justify-between items-center mt-5px">
            <span class="text-14px flex justify-center items-center border-rd-8px bg-#5b5f6f text-#fff w-100px py-10px"
                v-for="i in STATTIC_LIST" :key="i.value" @click="() => { upNumber(i.value) }">{{ i.lable }}</span>
        </div>
        <div class="text-14px flex justify-between items-center mt-25px">
            <span class="text-14px m-0 text-#5b5f6f mb-10px">{{ $t("color.quantity") }}</span>
            <div class="flex justify-between items-center bg-none d-game__input rounded-4px w-191px flex-shrink-0">
                <span @click="betValue > 0 && (betValue = Number(betValue) - 1)"
                    class="flex justify-center items-center w-44px h-25px bg-#676d7c mb-10px border-rd-50% mr-9px">-</span>
                <van-field v-model="betValue" clearable type="number" autocomplete="off" />
                <span @click="betValue = Number(betValue) + 1"
                    class="flex justify-center items-center w-44px h-25px mb-10px bg-#676d7c border-rd-50% ml-9px">+</span>
            </div>
        </div>
        <div class="text-14px flex justify-between items-center mt-15px">
            <span @click="betValue = i.value"
                :class="['text-14px flex justify-center items-center border-rd-8px bg-#5b5f6f text-#fff px-10px py-13px', betValue == i.value ? 'click-bg' : '']"
                v-for="i in MULTIPLE_LIST" :key="i.value">{{ i.lable }}</span>
        </div>
        <div class="flex justify-center items-center mt-24px">
            <van-button @click="clickBetBtn" class="w-80% h-40px" color="#00b97c">{{ $t("color.Bet") }}</van-button>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import { gameInfoStore } from '@/stores/gameStore';
import { gameBetLottery } from "@/api/game"
import { STATTIC_LIST, MULTIPLE_LIST } from './content';
import { showToast, showLoadingToast, closeToast } from "vant";
import { useUserStore } from "@/stores/user";
import { DEFAULT_CURRENCY } from "@/const";

const userStore = useUserStore();

const emit = defineEmits(['closed'])
const props = defineProps<{
    show: boolean,
    type: (string | number)[]
}>()
const inputValue = ref<number>(100);
const betValue = ref<number>(1);
const showPopup = ref<boolean>(false);
// const loading = ref(false);
const gameStore = gameInfoStore();
// const gameHistoryList = ref<any[]>([]);

// const gameGameHistoryFn = async () => {
//     loading.value = true;
//     const res = await gameGameHistory({
//         page: 1,
//         limit: 30,
//         gameId: gameStore.id
//     })
//     if (res?.data) {
//         // gameHistoryList.value = res.data?.list.map(item => {
//         //     item.settleTime = item.settleTime.split(' ').pop().split(':').slice(0, 2).join(':');
//         //     item.Champion = classifyNumber(item.openNumber.split(',')[0]);
//         //     item.Runner = classifyNumber(item.openNumber.split(',')[1]);
//         //     return item;
//         // }) || [];
//     }
//     loading.value = false;
// }
const upNumber = (num) => {
    inputValue.value = Number(inputValue.value) + Number(num)
}
const clickBetBtn = async () => {
    showLoadingToast({
        duration: 0,
    })
    console.log(props.type)
    let areaBetList = {}
    switch (props.type[0]) {
        case 'Red':
            areaBetList[1] = [0]
            break
        case 'Green':
            areaBetList[2] = [0]
            break
        case 'Blue':
            areaBetList[3] = [0]
            break
        default:
            areaBetList[0] = [props.type[0]]
            break
    }
    console.log(areaBetList)
    const lastBetValue = inputValue.value * betValue.value
    let params = {
        gameId: gameStore.id,
        betInterval: lastBetValue,
        issue: gameStore.item?.issue,
        areaBetList
    }

    let res = await gameBetLottery(params)
    console.log(res)

    if (res?.data?.balance >= 0) {
        userStore.setUserBalance({ ...userStore.userBalance, balance: res?.data.balance })
    }

    closeToast();
    showToast({
        message: res?.msg
    })
}

watch(props, (newProps) => {
    showPopup.value = newProps.show;
});
onMounted(() => {
    // gameGameHistoryFn()
})
</script>

<style lang="less" scoped>
.batting-pop {
    background: #2e3036 !important
}

.click-bg {
    background: #3dc119 !important;
}
</style>