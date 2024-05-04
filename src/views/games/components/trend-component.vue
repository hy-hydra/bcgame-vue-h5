<template>
  <div class="trend-component bg-fog-48 rounded-t-4px">
    <div class="flex p-16px text-12px">
      <div class="w-[50%]">Issue</div>
      <div class="w-[50%]">Winning Numbers</div>
    </div>
    <div class="px-16px">
      <div class="h-62px text-14px text-text-3 flex border-bottom" v-for="item in gameHistoryList">
        <div class="w-[50%] flex items-center">
          {{ item?.issue }}
        </div>
        <div class="w-[50%] flex items-center">
          {{  item?.openNumber.replace(/,/g, '   ')  }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { game2dStore } from '@/stores/game2dStore';
import { gameGameHistory } from "@/api/game"

const gameStore = game2dStore();
const gameHistoryList = ref<any[]>([])
const gameGameHistoryFn = async () => {
  const res = await gameGameHistory({
    page: 1,
    limit: 30,
    gameId: gameStore.id
  })
  gameHistoryList.value = res?.data?.list || []
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
