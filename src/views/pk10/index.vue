<template>
  <div class="bg-sci-bo pb-90px">
    <div class="fixed top-0 bg-#2e3036 z-1 pb-16px">
      <div class="sci-bo-top w-100vw py-9px px-9px flex items-center justify-center relative">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABHNCSVQICAgIfAhkiAAAAoFJREFUWEftV0Fy00AQnIEyRU7Eh9hHvByosi+YHzg/MC8gvCDkBXFekPCChBfETwgvSHLBwGXDEUFVzI3CiZaeOFFZ1mq9wmLlojInlaTd6e3Z6ZlhWnHjFcdH9wCXjdD/y+BIR6+JzMAQr4Olo45q7CzLlm19YQa1vlz/RZNjbNab3dAQvQPIt2WDLATws/7Rv6b4EIuEtYw9plpdqfq4TJBeAG9Z24fjLZfzh0Qvn6vGWVCAI/0doYwPibi1wPF5WzW6ZYKTvZwMAtyuJIKH03OEt1d2eHMBftFR94pI7poHI2avrZo+h/A4Z/aXDIOfdLQdEw3yEiGduWbI9MB555jMGFJ0809bbXwoijIFENqGu+ZOhKIO5qRoDIdDohpYr1/47JUAFAmJKRZ9C2Q8AKN7i5wlAEf6G+4RIynCGcT9bI1qm67kqhSgULEIZALwRozN5ALC8yQch1NPrjKZSpJpxfhdcj3lljGmx8xP3QevKVvieJW6Mhgd6csW0QQZTC9s+xkyw45qvpr/FgygOL6t6Qd4RKuWNZTKDJ6gABOQuXedNyE9J7PQgwMU5ygIRzksvgGL8i2xigDmaW62rlcC8KOODuB4O3sLVwfgqa1TQlOx01EbkkTVhdhV820dedAQS3cOvTu2tXIQ86+dZ01oZdqsAKVhvSYureQxRlNDcR+ut2z6N31nb3xTAHF59/Gi5FKXD+nui7C3xo+6tq5mppuJ5HTSsAY31zRYebsFNjLibM3i4A2roZ/E3J8vbblJMk0MOg0U3/eYS9DyL55L5oYmGdK95uDC54C8YGBiGZhOfIDdOQiqg4VPhQX3AP+GNWsWL7vRv1q/8iH+AxSm4ClDGU64AAAAAElFTkSuQmCC"
          class="w-19px h-19px absolute left-16px" alt="" @click="clickBack">
        <p class="text-16px text='[#ffcdaa]' font-DIN' p-0 m-0">{{ roomName }}</p>
        <p class="ml-40px text-16px text='[#ffcdaa]' font-DIN' p-0 m-0">{{  userBalance?.balance }} <span class="text-[#3dc119]">{{ DEFAULT_CURRENCY_UNIT }}</span></p>

        <div class="absolute right-16px">
          <van-popover v-model:show="showMenuBox" placement="bottom-end" theme="dark">
            <MenuBox />
            <template #reference>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAABHNCSVQICAgIfAhkiAAAARNJREFUaEPtmEEKwjAQRdMi7gVxbVbSU+gR9AR6ND2BHkFPUVzFtQjuixSVbFMhw/wQ4u+686fz/rT9bWUKO6rC5jEcKHdH6RAdSkyAK5cYeHS7nw617jk35rWNVoUWjA6NndyGWgwOdHWPdW/6I/TahOK1qTcLOz2FygcHat39/ClYCnuiyy6Nna3+e6DiVu5rp38odDv0/sTpj/eih0Jck3zO5os1Hy/CV0KH6FBiAly5xMCj2zFtRyMDFDBt+xxX2OcD0zbgXglLMm0nQw1pxKQAwaooSocUYUKk6BAEq6Io07YiTLEU0zbTtnh5ZIWilfMu8d+2DLliFV+sijAhUnQIglVRlA4pwoRI0SEIVkXRN4rObDVL+EA0AAAAAElFTkSuQmCC"
                class="w-26px h-26px" @click.stop="showMenuBox = true" alt="">
            </template>
          </van-popover>
        </div>
      </div>
      <!-- @updateTime="getGameInfo"  -->
      <BarBox :time="gameTime" @clickAllBtn="showRecentPop = true" />
    </div>
    <div class="pt-86px overflow-y-scroll">
      <div class="w-375px h-310px gamebox relative">
        <div ref="canvasContainer" class="w-100vw h-310px" id="canvas"></div>
        <div v-if="showOverRes" class="w-375px h-310px absolute  top-0 left-0 game-over-box ">
          <div class="w-200px h-24.5px mx-auto mt-50px mb-20px  over-title"></div>
          <div class="flex text-12px font-bold">
            <div class="flex-1 slide-in-left">
              <div class="flex item-center justify-center h-35px" v-for="(item, index) in evenIndexedArray">
                <div v-if="index == 0" class="max-w-60px min-w-45px mr-10px color-#ead043 text-14px mb-4px">{{$t("pk10.champion")}}
                </div>
                <div v-else class="max-w-60px min-w-45px"> NO.{{ index * 2 + 1 }} </div>
                <img v-if="!isShip" class="w-28px h-20px block mr-10px" :src="`${CAR_URL_OBJ[item]}`" alt="">
                <img v-else class="w-50px h-20px block mr-10px" :src="`${SHIP_URL_OBJ[item]}`" alt="">
                <div>{{ formatNumber(item) }}</div>
              </div>
            </div>
            <div class="flex-1 slide-in-right">
              <div class="flex item-center justify-center  h-35px" v-for="(item, index) in oddIndexedArray">
                <div v-if="index == 0" class="max-w-60px min-w-45px mr-10px color-#ea9743 text-14px mb-4px">{{$t("pk10.runner_up")}}
                </div>
                <div v-else class="max-w-60px min-w-45px"> {{$t("pk10.no")}}.{{ index * 2 + 2 }} </div>
                <img v-if="!isShip" class="w-28px h-20px block mr-10px" :src="`${CAR_URL_OBJ[item]}`" alt="">
                <img v-else class="w-50px h-20px block mr-10px" :src="`${SHIP_URL_OBJ[item]}`" alt="">
                <div>{{ formatNumber(item) }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="showbeginTime"
          class="w-375px h-310px absolute  top-0 left-0 game-over-box items-center flex justify-center">
          <div v-if="beginNum == 3" :class="[!isShip ? 'begin3' : 'ship3', 'w-120px', 'h-140px']"></div>
          <div v-if="beginNum == 2" :class="[!isShip ? 'begin2' : 'ship2', 'w-120px', 'h-140px']"></div>
          <div v-if="beginNum == 1" :class="[!isShip ? 'begin1' : 'ship1', 'w-120px', 'h-140px']"></div>
          <div v-if="beginNum == 0" :class="[!isShip ? 'begingo' : 'shipgo', 'w-200px', 'h-120px']"></div>
        </div>
      </div>
      <BattingBox />
    </div>
    <ControlBox />
    <RecentPop @closed="showRecentPop = false" :show="showRecentPop" />
  </div>
</template>

<script setup lang="ts">
import PixiEngine from "./systems/engine";
import BarBox from "./components/barBox.vue";
import ControlBox from "./components/controlBox.vue";
import BattingBox from "./components/bettingBox.vue"
import MenuBox from "./components/menuBox.vue"
import RecentPop from "./components/recentPop.vue"
import { gameLotteryEntry } from "@/api/game"
import { gameInfoStore } from '@/stores/gameStore';
import EventBus from "@/utils/eventbus"
import { pk10Store } from './pk10Store';
import { useSocket } from "@/composables/useSocket";
import { SHIP_URL_OBJ, CAR_URL_OBJ } from "./config"
// import { throttle } from "@/utils/index"
import AudioManager from "@/utils/AudioManager"
import { StateEnum } from "./systems/engine"
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { DEFAULT_CURRENCY_UNIT } from "@/const";

const userStore = useUserStore();
const { userBalance } = storeToRefs(userStore);
const gameStore = gameInfoStore();
const pkStore = pk10Store()

let PixiEngineObj

const isShip = gameStore.id == 6
const showRecentPop = ref(false)
const canvasContainer = ref(null);
const roomName = ref<string>('PK 10');
const showOverRes = ref<boolean>(false);
const gameResult = ref([2, 0, 1, 3, 7, 5, 6, 4, 8, 9]);
const showMenuBox = ref<boolean>(false);
const showbeginTime = ref<boolean>(false);
const router = useRouter();
const gameTime = ref<number>(0)
const beginNum = ref<number>(3)
const isLoaded = ref(false)

const clickBack = () => {
  router.go(-1);
}

const beginGame = () => {
  showbeginTime.value = true
  if (beginNum.value == 0) {
    setTimeout(() => {
      beginNum.value = 3
      showbeginTime.value = false
      if (PixiEngine.gameState == StateEnum.Init) {
        EventBus.fire("START")
      }
    }, 1000);
    return
  }
  setTimeout(() => {
    beginNum.value--;
    beginGame()
  }, 1000);
}

const evenIndexedArray = computed(() => gameResult.value.filter((_element, index) => {
  return index % 2 === 0;
}))
const oddIndexedArray = computed(() => gameResult.value.filter((_element, index) => {
  return index % 2 !== 0;
}))

const formatNumber = (num: number): string => {
  return num >= 1 && num <= 9 ? `0${num}` : num.toString();
};

const getGameInfo = async () => {
  let res = await gameLotteryEntry({ gameId: gameStore.id });
  gameStore.updateGameItem(res?.data?.lottery || {});
  pkStore.updateGameItem(res?.data?.lottery || {});
  roomName.value = res?.data?.lottery?.name
  if (res?.data?.lottery?.interval == 0 || !isLoaded.value) {
    setTimeout(() => {
      getGameInfo()
    }, 1000)
    return
  }
  gameTime.value = 0
  await nextTick()
  let time = res?.data?.lottery?.interval * 1000
  gameTime.value = time

  if (time <= 5000) {
    if (PixiEngine.gameState == StateEnum.Init) {
      EventBus.fire("START")
    }
  } else {
    beginGame()
  }
}

const lastOver = () => {
  showOverRes.value = true
  setTimeout(() => {
    showOverRes.value = false;
    if (PixiEngine.gameState != StateEnum.Init) {
      EventBus.fire('RESET')
    }
    // beginGame()
  }, 3000)
}

const handleDataReceived = (res) => {
  console.log('数据接收:', res);
  let data = JSON.parse(res)
  for (let i in data.data) {
    if (Number(i) == gameStore?.id) {
      if (Object.keys(data.data[gameStore?.id])[0] == gameStore?.item?.issue) {
        let resarr = data.data[gameStore?.id][gameStore?.item?.issue]
        console.log(resarr)
        if (PixiEngine.gameState == StateEnum.Race) {
          EventBus.fire("END", resarr)
        }
        gameResult.value = resarr
        setTimeout(() => {
          getGameInfo()
        }, 5000)
      } else {
        getGameInfo()
      }

    }
  }
};

const loadFinish = () => {
  setTimeout
  isLoaded.value = true
}

onMounted(() => {
  const width = canvasContainer.value.offsetWidth;
  const height = canvasContainer.value.offsetHeight;
  PixiEngineObj = new PixiEngine(width, height, isShip);
  const canvasInfo = PixiEngineObj.getCanvas();
  document.querySelector("#canvas")!.appendChild(canvasInfo as unknown as Node);
  const ossURL = import.meta.env.VITE_APP_OSS_URL as string
  // AudioManager.preloadSound('bg',`${ossURL}test/cloud/base/common/voice/scroll.mp3`)
  AudioManager.preloadSound('bet', `${ossURL}test/cloud/base/common/voice/bet.mp3`)

  // AudioManager.playSound('bg')

  getGameInfo();

  const { on } = useSocket();
  on('message', handleDataReceived);

  EventBus.on('LAST_OVER', lastOver)
  EventBus.on('LOAD_FINISH', loadFinish)

  // setTimeout(() => {
  //   handleDataReceived({
  //     msgId: 11000,
  //     topic: "merchant_test",
  //     data: {
  //       5: {
  //         20240314209: [
  //           9,
  //           5,
  //           10,
  //           2,
  //           7,
  //           3,
  //           4,
  //           8,
  //           6,
  //           1
  //         ]
  //       }
  //     }
  //   })
  // }, 9000)
})

onUnmounted(() => {
  EventBus.off('LOAD_FINISH', loadFinish);
  const { send } = useSocket();
  send(JSON.stringify({
    "msgId": 2001,
    "data": {
    }
  }))
  // AudioManager.stopSound('bg')
  EventBus.fire('DESTROY')
})
</script>

<style lang="less" scoped>
.slide-in-left {
  animation: slideInFromLeft 0.5s ease-out forwards;
  /* 动画名称，持续时间，缓动函数，填充模式 */
}

.slide-in-right {
  animation: slideInFromRight 0.5s ease-out forwards;
  /* 动画名称，持续时间，缓动函数，填充模式 */
}

.van-popover[data-popper-placement^=bottom] .van-popover__arrow {
  top: 1px;
}

@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
    /* 开始时元素在左侧不可见 */
    opacity: 0;
    /* 可以添加一个淡入效果 */
  }

  to {
    transform: translateX(0);
    /* 动画结束时元素回到原位 */
    opacity: 1;
    /* 完全可见 */
  }
}

@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
    /* 开始时元素在左侧不可见 */
    opacity: 0;
    /* 可以添加一个淡入效果 */
  }

  to {
    transform: translateX(0);
    /* 动画结束时元素回到原位 */
    opacity: 1;
    /* 完全可见 */
  }
}

.over-title {
  background: url('~/pk-10/text-finish.png') no-repeat top left / 100% 100%;
}


.begin3 {
  background: url('~/pk-10/text-3.png') no-repeat top left / 100% 100%;
}

.ship3 {
  background: url('~/airship/text-3.png') no-repeat top left / 100% 100%;
}

.begin2 {
  background: url('~/pk-10/text-2.png') no-repeat top left / 100% 100%;
}

.ship2 {
  background: url('~/airship/text-2.png') no-repeat top left / 100% 100%;
}

.ship1 {
  background: url('~/airship/text-1.png') no-repeat top left / 100% 100%;
}

.begin1 {
  background: url('~/pk-10/text-1.png') no-repeat top left / 100% 100%;
}

.begingo {
  background: url('~/pk-10/text-go.png') no-repeat top left / 100% 100%;
}

.shipgo {
  background: url('~/airship/text-go.png') no-repeat top left / 100% 100%;
}



#canvas {
  overflow: hidden;

}

.bg-sci-bo {
  background: #2e3036;
  width: 100vw;
  height: 100%;
  position: relative;
}

.sci-bo-top {
  color: #fff;
}
</style>
