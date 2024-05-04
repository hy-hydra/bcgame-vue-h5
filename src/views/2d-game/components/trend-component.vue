<template>
  <div class="trend-component bg-fog-48 rounded-t-4px">
    <div class="flex p-16px text-12px">
      <div class="w-[50%]">{{$t("2d-game.Issue")}}</div>
      <div class="w-[50%]">{{$t("2d-game.win-num")}}</div>
    </div>
    <div class="px-16px">
      <div class="h-62px text-14px text-text-3 flex border-bottom" v-for="item in gameHistoryList">
        <div class="w-[50%] flex items-center">
          {{ item?.issue }}
        </div>
        <div class="w-[50%] flex items-center">
          {{  filterNum(item?.openNumber)  }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gameInfoStore } from '@/stores/gameStore';
import { gameGameHistory } from "@/api/game"

const gameStore = gameInfoStore();
const gameHistoryList = ref<any[]>([])
const gameGameHistoryFn = async () => {
  const res = await gameGameHistory({
    page: 1,
    limit: 30,
    gameId: gameStore.id
  })
  gameHistoryList.value = res?.data?.list || []
}

const filterNum = (num)=>{
  if(num.length == 1){
    return '0'+num
  }else{
    return num
  }
}

onMounted(() => {
  gameGameHistoryFn()
})
</script>

<style lang="less" scoped>
.border-bottom {
  border-bottom: 1px solid var(--border-10);
}
</style>
