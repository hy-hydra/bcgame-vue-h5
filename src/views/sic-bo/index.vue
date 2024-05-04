<template>
  <div class="bg-sci-bo pb-90px">
    <div class="sci-bo-top w-100vw py-9px px-9px flex items-center justify-center relative">
      <img src="@/assets/sic-bo/row.png" class="w-19px h-19px absolute left-9px" alt="" @click="clickBack">
      <div class="text-16px text='[#ffcdaa]' font-DIN' p-0 m-0">{{  userBalance?.balance }}{{ DEFAULT_CURRENCY_UNIT }}</div>
    </div>
    <div class="w-371px h-234px pt-52px relative sicGamebox">
      <div class="text-13px w-100% text-center top-9px time-text absolute">{{ issue }}</div>
      <div ref="canvasContainer" class="w-100% h-140px px-44px items-center flex" id="canvas"></div>
    </div>
    <img src="@/assets/sic-bo/center.jpg" class="w-100vw h-15px mb-9px" alt="">
    <TimeBox />
    <BattingBox />
    <HistoryBox />
    <ControlBox />
  </div>
</template>

<script setup lang="ts">
import PixiEngine from "./systems/engine";
import TimeBox from "./components/timeBox.vue"
import BattingBox from "./components/bettingBox.vue"
import HistoryBox from "./components/historyBox.vue"
import ControlBox from "./components/controlBox.vue"
import { gameInfoStore } from '@/stores/gameStore';
import { gameLotteryEntry } from "@/api/game"
import { useSocket } from "@/composables/useSocket";
import EventBus from "@/utils/eventbus"
import { throttle } from "@/utils/index"
import { sicboStore } from "@/stores/lottery/sicboStore"
import AudioManager from "@/utils/AudioManager"
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { DEFAULT_CURRENCY_UNIT } from "@/const";

const userStore = useUserStore();
const { userBalance } = storeToRefs(userStore);
let timer = null

const sicStore = sicboStore()
const gameStore = gameInfoStore();
const canvasContainer = ref(null);
const router = useRouter();
const issue = computed(() => gameStore?.item?.issue)
const isLoaded = ref(false) 

const clickBack = () => {
  router.go(-1);
}

const getGameInfo = throttle(async () => {
  let res = await gameLotteryEntry({ gameId: gameStore.id });
  if (res?.data?.lottery?.interval == 0 || !isLoaded.value) {
    setTimeout(() => {
      getGameInfo()
    }, 1000)
    return
  }

  timer = setTimeout(() => {
    AudioManager.loopSound('bg')
    EventBus.fire('START')
  }, 1000)
  gameStore.updateGameItem(res?.data?.lottery || {});
  sicStore.updateTime(res?.data?.lottery?.interval * 1000 || 0)
}, 1000)

const handleDataReceived = (res) => {
  let data = JSON.parse(res)
  console.log('数据接收:', data);
  for (let i in data.data) {
    if (Number(i) == gameStore?.id) {
      if (Object.keys(data.data[gameStore?.id])[0] == gameStore?.item?.issue) {
        let resarr = data.data[gameStore?.id][gameStore?.item?.issue]
        console.log(resarr, 'resarr')
        EventBus.fire('STOP', resarr)
        AudioManager.stopSound('bg')
        setTimeout(() => {
          getGameInfo()
        }, 6000)
      } else {
        getGameInfo()
      }
    }
  }
};

onMounted(() => {
  EventBus.on('LOAD_FINISH', loadFinish)

  const width = canvasContainer.value.offsetWidth;
  const height = canvasContainer.value.offsetHeight;
  let PixiEngineObj = new PixiEngine(width, height);
  const canvasInfo = PixiEngineObj.getCanvas();
  document.querySelector("#canvas")!.appendChild(canvasInfo as unknown as Node);

  getGameInfo();

  const ossURL = import.meta.env.VITE_APP_OSS_URL as string
  AudioManager.preloadSound('bg', `${ossURL}test/cloud/base/common/voice/scroll.mp3`)
  AudioManager.preloadSound('bet', `${ossURL}test/cloud/base/common/voice/bet.mp3`)

  const { on } = useSocket();
  on('message', handleDataReceived);
})

const loadFinish = ()=>{
  isLoaded.value = true
}
onUnmounted(() => {
  EventBus.off('LOAD_FINISH', loadFinish);

  const { send } = useSocket();
  send(JSON.stringify({
    "msgId": 2001,
    "data": {
    }
  }))
  clearTimeout(timer)
  AudioManager.stopSound('bg')
  EventBus.fire('DESTROY')
})
</script>
<style lang="less" scoped>
.sicGamebox {
  background: url('~/sic-bo/slot-machines-bg1.png') no-repeat top left / 100% 100%;
}

#canvas {
  overflow: hidden;

}

.bg-sci-bo {
  background: linear-gradient(180deg, #5d307e 560px, #371d68);
  width: 100vw;
  height: 100%;
  position: relative;
}

.sci-bo-top {
  color: #ffcdaa;
}
</style>
