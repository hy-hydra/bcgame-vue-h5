<template>
  <div class="d-game bg-fog-52 overflow-hidden">
    <div class="headers flex items-center justify-between px-12px h-44px relative">
      <span class="flex items-center gap-8px z-130">
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-20px" @click="clickBack">
          <path
            d="M1.08 10.592a.834.834 0 010-1.179l6.667-6.666a.834.834 0 111.178 1.178L3.681 9.169h14.655a.833.833 0 110 1.667H3.68l5.244 5.244a.833.833 0 01-1.178 1.178L1.08 10.592z"
            fill="currentColor"></path>
        </svg>
        <span
          class="text-16px w-80vw font-700 text-text-1 flex items-center justify-center absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2"
          @click="gameTypeVisible = !gameTypeVisible">
          {{ $t("2d-game.top-t1") }}
          <img class="w-16px rotate-90"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAE9GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4wLWMwMDAgNzkuMTcxYzI3ZmFiLCAyMDIyLzA4LzE2LTIyOjM1OjQxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMTEtMDdUMTc6NTg6MzArMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTEyLTAyVDE0OjM5OjQzKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTEyLTAyVDE0OjM5OjQzKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MGM1MzlkZi04NzE2LTRmN2MtYTA3OC05NDg5N2Y3MDFmZTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTBjNTM5ZGYtODcxNi00ZjdjLWEwNzgtOTQ4OTdmNzAxZmU0IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6OTBjNTM5ZGYtODcxNi00ZjdjLWEwNzgtOTQ4OTdmNzAxZmU0Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MGM1MzlkZi04NzE2LTRmN2MtYTA3OC05NDg5N2Y3MDFmZTQiIHN0RXZ0OndoZW49IjIwMjMtMTEtMDdUMTc6NTg6MzArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC4wIChNYWNpbnRvc2gpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmwYvvcAAADTSURBVFiF7dexDYMwEIXhnygDUKdiBCZAGSEjZIOskhFYgQkiMQEjUKUOEzgFjpQOn+8pFLErI2Heh5FPRxVCYM9x2DW9AAoAOKbe2I2nz/QO9MC0tWbsnpvPte5AD9yAB9Aa17oBDXCJ81qFsABm4AwsSoT1E0xqRM4pkCJyj6EM4akDEoS3ELkRikroQihL8XdjUaUuUgBa1jeu4/XCuiPTLwCucC/AHe4BSMJzAbLwHIA03Apo1OFWwAwMynAwtGRxXIEXiS1ZyqjKn1EB/D3gDdF9P/wHJxRCAAAAAElFTkSuQmCC"
            alt="" />
        </span>
      </span>
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
      <div v-if="gameTypeVisible">
        <div
          class="flex pt-30px px-25px pb-10px justify-between absolute top-55px w-[100vw] bg-fog-48 z-101 left-0 rounded-b-8px">
          <div @click="tabClick('duplex')" :class="activeGameType === 'duplex' && 'bg-fog-6'"
            class="item mb-20px w-90px border-border-10 border-solid border-1px rounded-8px flex items-center text-center text-text-3 text-12px">
            {{ $t("2d-game.top-t1") }}
          </div>
          <div @click="tabClick('plate')" :class="activeGameType === 'plate' && 'bg-fog-6'"
            class="item mb-20px  w-90px border-border-10 border-solid border-1px rounded-8px flex items-center text-center text-text-3 text-12px">
            {{ $t("2d-game.top-t2") }}
          </div>
          <div @click="tabClick('pick')" :class="activeGameType === 'pick' && 'bg-fog-6'"
            class="item mb-20px  w-90px border-border-10 border-solid border-1px rounded-8px flex items-center text-center text-text-3 text-12px">
            {{ $t("2d-game.top-t3") }}
          </div>
        </div>
        <div class="mask-select fixed left-0 top-0 right-0 bottom-0 z-100"></div>
        <div class="fixed left-0 top-0 right-0 bottom-0 z-100"></div>
      </div>
    </div>
    <div class="py-20px flex justify-center gap-24px">
      <div class="left">
        <div class="flex text-12px justify-between mb-4px">
          <div class="mr-4px">{{ gameName }}</div>
          <div>{{ expect }}{{ $t("2d-game.period") }}</div>
        </div>
        <BcCountDown v-if="countSeconds" :countSeconds="countSeconds" @end="endTime" />
      </div>
      <div class="right flex flex-col items-center border-left pl-24px">
        <div class="text-12px mb-4px">
          {{ `${month}/${day}-${expect}` }}{{ $t("2d-game.period") }}
        </div>
        <div class="flex gap-12px">
          <div class="h-30px w-30px bg-fog-6 rounded-30px text-text-3 flex items-center justify-center">
            {{ lastOpenNums[0] }}
          </div>
          <div class="h-30px w-30px bg-fog-6 rounded-30px text-text-3 flex items-center justify-center">
            {{ lastOpenNums[1] }}
          </div>
        </div>
      </div>
    </div>
    <GameTabs v-model:value="tabValue" v-model:checkList="checkList" v-model:checkList_2="checkList_2"
      :activeGameType="activeGameType" @pickQuickPick="pickQuickPick"></GameTabs>
    <div v-if="tabValue === 'bet'">
      <Duplex v-model:value="checkList" class="mt-12px" v-if="activeGameType === 'duplex'"></Duplex>
      <Plate v-model:value="checkList_2" class="mt-12px" v-if="activeGameType === 'plate'"></Plate>
      <PickBox v-model:showTip="showTip" ref="pickBoxRef" class="mt-12px" v-if="activeGameType === 'pick'" />
      <div class="w-100vw p-8px absolute bottom-0px z-100">
        <div class="flex flex-col items-center mb-4px pt-6px bg-fog-52" v-if="showTips()">
          <span class="text-11px">
            The upper limit of winning the same lottery in the same period is
          </span>
          <span class="text-10px mt-4px">
            675,000₹
          </span>
        </div>
        <div class="flex gap-2px justify-between">
          <div class="flex d-game__input rounded-4px w-191px flex-shrink-0">
            <van-field v-model="inputValue" @update:model-value="updata" clearable type="number" autocomplete="off" />
            <div class="h-40px w-40px flex items-center justify-center bg-fog-6 rounded-r-4px" @click="addNum">
              <img class="h-12px"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADB/VeXAAAATklEQVRIDWNkIBL8BwJkpYxAgMzHxWbCJUEt8VELCIbkaBCNgCBiRM+hBP1MooLRVEQwwIgqEUGmoMfVaGlKMGyJVTCaTAmG1GgQEQwiACrKDCoDgVrEAAAAAElFTkSuQmCC"
                alt="" />
            </div>
          </div>
          <!-- <div class="border-border-1 border-1px rounded-4px border-solid  h-40px flex items-center ">
            <img class="h-20px"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE9GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4wLWMwMDAgNzkuMTcxYzI3ZmFiLCAyMDIyLzA4LzE2LTIyOjM1OjQxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMTEtMDdUMTc6NTg6MzArMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTEyLTAyVDE0OjI5OjE3KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTEyLTAyVDE0OjI5OjE3KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3MGZhMThlMi1iMGY3LTQ5ZGMtYTA2Mi0wMjIyYmZjYzEwOWEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzBmYTE4ZTItYjBmNy00OWRjLWEwNjItMDIyMmJmY2MxMDlhIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NzBmYTE4ZTItYjBmNy00OWRjLWEwNjItMDIyMmJmY2MxMDlhIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MGZhMThlMi1iMGY3LTQ5ZGMtYTA2Mi0wMjIyYmZjYzEwOWEiIHN0RXZ0OndoZW49IjIwMjMtMTEtMDdUMTc6NTg6MzArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC4wIChNYWNpbnRvc2gpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoQ1/eMAAAIfSURBVFiF7ZjdcZtAFEaPPC4AvfrF6iCqQMEViHSgVJK4grgDowoCFRipgdgd4Be/hlSAH3Y3XFYLrMSP7Bl9M4wuuzsfh73issusLEs+sq7ODdClDw94DbDa3yyANRDo9gJIgfwMTADsV2+ABgR+A0trTATcTUbUIJPiuaMvpJrRs8kARsC9Pl5Ffzgxz4FMip/1YfRD/4ZAMhmNQ9eOtowKcA38nYymUoqesFlZlqz2N/aAc1fvYr96m0NzHdxNCONSYAJXikH9777q+BWIR8VRCsU1U9PYBvhLx7fAA6p4j6k/1vWB5hTnwIs4jwbHqWtB/UWRmKDtXRyLOBoQxiXpnyKy1QaYiFi+p8dQ2HDdVsCcadIcoCbAKJOdXcutWMTREDQOSd8XrBVUF2Ai4rHSHIk4tju7AHPGTXNAPb2JPcBnRR2LOOpD45D0O0gvNBdqqYSqaK+Bp55QUgsRx64BPoA56u6+6POwB1CbElej76bp52AYbjXuf3xmENTdzTnctwyhgvpiuSZfQGOU9UI5QccAgppBsyTa0XLnQ/n4AgbAI4dlJgG+478UO9rHFzCmXlCNzIW+jeXj8xQvLdMU2AL/hPlyLB8fwFDEW220of7AyDGD+nyOj0cdykS8Rn3HKWhZww3p4wP4jPq/mOVWZPX/32SP4eOb4g1iK2iZbjw9TvLxLTMF1VMW6raM4wv10T6zyzfqnroA9tU7D1d9K2gmUSwAAAAASUVORK5CYII=" />
            <span class="text-12px whitespace-nowrap text-text-3">
              Number Basket
            </span>
          </div> -->
          <div @click="betClick"
            class="h-40px w-100% rounded-4px bg-fog-6 text-text-21 justify-center flex items-center text-12px">
            {{ $t("2d-game.bet") }}
          </div>
        </div>
        <div class="text-12px flex justify-between mt-8px">
          <div>
            <span>{{ length() }}</span>
            /
            <span>{{ length() * (inputValue || 100) }}</span>
          </div>
          <div>
            <span>
              Balance {{ userBalance?.balance }} {{ DEFAULT_CURRENCY_UNIT }}
            </span>
            |
            <span>
              topup
            </span>
          </div>
        </div>
      </div>
    </div>
    <TrendComponent v-if="tabValue === 'Trend'" class="mt-12px" />
  </div>
</template>

<script setup lang="ts">
import GameTabs from "./components/game-tabs.vue";
import Duplex from "./components/duplex.vue";
import Plate from "./components/plate.vue";
import BcCountDown from "@/components/bc-count-down/index.vue";
import TrendComponent from "./components/trend-component.vue";
import { gameInfoStore } from '@/stores/gameStore';
import MenuBox from "./components/menuBox.vue"
import PickBox from "./components/pickBox.vue";
import { showToast, showLoadingToast, closeToast } from "vant";
import { gameLotteryEntry, gameBetLottery } from "@/api/game"
import AudioManager from "@/utils/AudioManager"
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { DEFAULT_CURRENCY_UNIT } from "@/const";

const userStore = useUserStore();
const { userBalance } = storeToRefs(userStore);

const gameStore = gameInfoStore();
const checkList = ref<string[]>([]);
const checkList_2 = ref([]);
const showTip = ref(false);
const tabValue = ref("bet");
const activeGameType = ref("duplex");
const inputValue = ref<number>(100);
const pickBoxRef = ref(null);
const gameTypeVisible = ref(false);
const showMenuBox = ref(false);
const countSeconds = ref(0);
const issue = ref("");
const gameName = ref("");
const expect = ref('')
const lastOpenNums = ref([3, 6])
const month = computed(() => {
  return issue.value?.substring(4, 6)
})

const day = computed(() => {
  return issue.value?.substring(6, 8)
})

const router = useRouter();


const clickBack = () => {
  router.go(-1);
}

const addNum = ()=>{
  inputValue.value = Number(inputValue.value) + 10
}


const endTime = () => {
  getGameInfo()
}
const getGameInfo = async () => {
  let res = await gameLotteryEntry({ gameId: gameStore.id });
  if (res?.data?.lottery?.interval == 0) {
    setTimeout(() => {
      getGameInfo()
    }, 1000)
    return
  }
  countSeconds.value = 0;
  await nextTick()
  countSeconds.value = res?.data?.lottery?.interval * 1000;
  issue.value = res?.data?.lottery?.issue;
  gameName.value = res?.data?.lottery?.name;
  gameStore.updateGameItem(res?.data?.lottery || {});
  expect.value = res?.data?.lottery?.issue.substring(8);
  let lastOpen = res?.data?.lottery?.lastOpen
  let digitsString = lastOpen?.replace(/[^\d]/g, '');
  if (digitsString?.length === 1) {
    digitsString = '0' + digitsString;
  }
  lastOpenNums.value = digitsString?.split('').map(digit => parseInt(digit, 10));
}
onMounted(() => {
  const ossURL = import.meta.env.VITE_APP_OSS_URL as string

  // AudioManager.preloadSound('bg',`${ossURL}test/cloud/base/common/voice/scroll.mp3`)
  AudioManager.preloadSound('bet', `${ossURL}test/cloud/base/common/voice/bet.mp3`)
  // AudioManager.playSound('bg')
  getGameInfo();
})

onUnmounted(() => {
  // AudioManager.stopSound('bg')
})

const tabClick = (type: string) => {
  clearData();
  activeGameType.value = type;
  gameTypeVisible.value = !gameTypeVisible;
}

const betValuesMap: Record<string, () => any> = {
  'duplex': () => {
    let arr = checkList.value.map(item => Number(item))
    return {
      "1": arr
    }
  },
  'plate': () => {
    let obj: Record<string, number[]> = {};
    let categories: Record<string, (item: number) => number[]> = {
      '2': item => (item >= 1 && item <= 4) ? [item - 1] : [],
      '3': item => (item >= 5 && item <= 8) ? [item - 5] : [],
      '4': item => item === 9 ? [0] : item === 11 ? [1] : [],
      '5': item => item === 10 ? [0] : [],
    };
    Object.keys(categories).forEach(key => obj[key] = []);
    checkList_2.value.forEach(item => {
      Object.entries(categories).forEach(([key, condition]) => {
        const result = condition(item);
        if (result.length) {
          obj[key].push(...result);
        }
      });
    });
    Object.keys(obj).forEach(key => {
      if (!obj[key].length) {
        delete obj[key];
      }
    });
    return obj;
  },
  'pick': () => {
    let obj: Record<string, number[]> = {};
    let arr = pickBoxRef.value.getChoice();
    arr.forEach(item => {
      const [numberPart, textPart] = item.split('-');
      const number = Number(numberPart);
      if (textPart === 'First') {
        if (!obj["6"]) obj["6"] = [];
        obj["6"].push(number);
      } else if (textPart === 'Second') {
        if (!obj["7"]) obj["7"] = [];
        obj["7"].push(number);
      }
    });
    return obj;
  },
};

const betClick = async () => {
  AudioManager.playSound('bet')

  showLoadingToast({
    duration: 0,
  })
  let params: {
    gameId: number,
    betInterval: number,
    issue: string
  } = {
    gameId: gameStore.id,
    betInterval: inputValue.value ? inputValue.value : 100,
    issue: issue?.value
  };
  if (betValuesMap[activeGameType.value]) {
    params['areaBetList'] = betValuesMap[activeGameType.value]();
  }
  let res = await gameBetLottery(params)
  if (res?.data?.balance >= 0) {
    userStore.setUserBalance({ ...userStore.userBalance, balance: res?.data.balance })
  }
  closeToast();
  showToast({
    message: res?.msg
  })
}

const pickQuickPick = () => {
  pickBoxRef?.value?.pickQuickPick();
}

const clearData = () => {
  checkList.value = [];
  checkList_2.value = [];
  inputValue.value = 100;
}

const showTips = () => {
  return checkList.value?.length > 0 || checkList_2.value?.length > 0 || showTip.value;
}

const length = () => {
  return pickBoxRef?.value && activeGameType.value === 'pick' ? pickBoxRef?.value?.getChoice()?.length : checkList.value?.length || checkList_2.value?.length;
}

const updata = (v: string) => {
  if (Number(v) !== 0 && Number(v) < 10) { inputValue.value = 10 };
}
</script>

<style lang="less" scoped>
.border-left {
  border-left: 1px solid #676d7c;
}

.d-game {
  height: 100vh;

  :deep(.van-field) {
    margin: 0;
  }

  &__input {
    border: 1px solid var(--border-10);
  }
}

.mask-select {
  background: rgba(0, 0, 0, .5);
  top: 80px;
}
</style>
