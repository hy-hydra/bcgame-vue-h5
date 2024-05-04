<template>
    <van-popup v-model:show="showPopup" position="bottom" closeable @close="emit('closed')" class="bg-fog-10 rounded-t-16px"
        :style="{ height: '60%' }">
        <div class="text-16px white text-center w='[100%]' lh-50px ">{{  $t("lottery.bet-today") }}</div>
        <div class="flex text-center h-40px lh-40px text-14px font-bold color-#ffffff border-b-2px border-b-solid border-b-#40424b">
            <div class="flex-1">{{ $t("lottery.issue") }}</div>
            <div class="flex-1">{{ $t("lottery.time") }}</div>
            <div class="flex-1">{{ $t("lottery.amount") }}</div>
            <div class="flex-1">{{ $t("lottery.status") }}</div>
            <div class="flex-1">{{ $t("lottery.honus") }}</div>
        </div>
        <div class="flex ml-10px mr-10px text-center h-40px lh-40px text-10px color-#ffffff border-b-2px border-b-solid border-b-#40424b" v-for="item in gameHistoryList">
            <div class="flex-1">{{ item.issue.substring(8) }}</div>
            <div class="flex-1">{{ item?.createdTime.split(' ')[1] }}</div>
            <div class="flex-1">{{ item?.amount }}</div>
            <div class="flex-1">{{ item?.status == 1? $t("lottery.win"):$t("lottery.lose")}}</div>
            <div class="flex-1">{{ item?.winAmount || '--'}}</div>
        </div>
    </van-popup>
</template>
  
<script setup lang="ts">
import { gameInfoStore } from '@/stores/gameStore';
import { gameBetRecords } from "@/api/game"

const gameStore = gameInfoStore();
const gameHistoryList = ref<any[]>([])
const gameGameHistoryFn = async () => {
  const res = await gameBetRecords({
    page: 1,
    limit: 5,
    gameId: gameStore.id
  })
  gameHistoryList.value = res?.data?.list || []
}
onMounted(() => {
  gameGameHistoryFn()
})

const emit = defineEmits(['closed'])
const props = defineProps<{
    show: boolean
}>()

let showPopup = ref<boolean>(false);

watch(props, (newProps) => {
    showPopup.value = newProps.show;
});
</script>
  
<style lang="less" scoped>
</style>
  