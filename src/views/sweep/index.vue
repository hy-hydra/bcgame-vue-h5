<template>
  <div class="bg" @click="pageClick">
    <van-overlay
      :show="show"
      z-index="1000"
      style="--van-overlay-background: rgba(255, 255, 255, 1)"
    >
      <div class="overlay">
        <div class="process">
          <van-progress
            :percentage="percent"
            pivot-text=""
            track-color="#1b3157"
            pivot-color="#7232dd"
            color="#038fd4"
          />
          <div class="text">{{ percent }}%</div>
        </div>
      </div>
    </van-overlay>
    <div class="header0" v-if="!show">
      <div class="access-layout__nav relative w-[100%]">
        <svg
          class="h-12px w-12px fill-text-6 absolute right-12px cursor-pointer"
          style="top: -26px;"
          @click="pageClose"
        >
          <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Close"></use>
        </svg>
      </div>
      <!-- <img src="@/assets/sweep/header.png" alt="" srcset="" /> -->
      <div class="sweep-header sweep-header0 sweep-header1">
        <div class="left">
          <div class="box">
            <img src="@/assets/sweep/jb.png" alt="" />
            <span>{{ coinNumber }}</span>
          </div>
        </div>
        <div class="center">
          <img src="@/assets/sweep/mines.png" class="mines" alt="" />
          <div class="img">
            <img src="@/assets/sweep/t1.png" alt="" class="jackpot" />
            <img
              src="@/assets/sweep/jbx.png"
              alt=""
              ref="bx"
              class="bx object"
              @click="bxClick"
            />
          </div>
          <van-overlay :show="bxShow" z-index="1000">
            <div class="bxoverlay">
              <div class="headerBac">
                <img src="@/assets/sweep/headerB.png" alt="" />
                <p class="f">*9333</p>
                <p class="text1">375,640.94</p>
                <p class="score">2/11</p>
              </div>
              <div @click="closeClick">
                <img src="@/assets/sweep/close.png" alt="" class="close" />
              </div>
              <div class="header">
                <img src="@/assets/sweep/h.png" alt="" />
                <img src="@/assets/sweep/jack1.png" alt="" class="letter" />
              </div>
              <div class="content">
                <img src="@/assets/sweep/t.png" alt="" class="tbgc" />
                <van-grid
                  :border="false"
                  :column-num="4"
                  style="--van-grid-item-content-background: #1b3c71;--van-grid-item-text-color:#7a9cc1;"
                >
                  <van-grid-item
                    text="JPName"
                    style="--van-grid-item-content-padding: 2px"
                  />
                  <van-grid-item
                    text="Date"
                    style="--van-grid-item-content-padding: 2px"
                  />
                  <van-grid-item
                    text="Winner"
                    style="--van-grid-item-content-padding: 2px"
                  />
                  <van-grid-item
                    text="Coin"
                    style="--van-grid-item-content-padding: 2px"
                  />
                </van-grid>
                <div class="table">
                  <van-grid
                    :border="false"
                    :column-num="4"
                    v-for="index in 20"
                    :key="index"
                    :style="{
                      '--van-grid-item-content-background':
                        index % 2 ? '#1b3c71' : '#112648',
                      '--van-grid-item-text-color': '#9ec2f9'
                    }"
                  >
                    <van-grid-item style="--van-grid-item-content-padding: 4px">
                      <van-image :src="name" />
                    </van-grid-item>
                    <van-grid-item
                      text="2/16"
                      style="--van-grid-item-content-padding: 4px"
                    />
                    <van-grid-item
                      text="*0223"
                      style="--van-grid-item-content-padding: 4px"
                    />
                    <van-grid-item
                      text="60,100.93"
                      style="--van-grid-item-content-padding: 4px"
                    />
                  </van-grid>
                </div>
              </div>
            </div>
          </van-overlay>
          <!-- <span class="text">300,000.00</span> -->
          <span class="text">
            <b
              class="amount"
              v-for="(item, index) in currentAmount"
              :key="index"
              >{{ item }}</b
            >
            <!-- {{currentAmount}} -->
          </span>
        </div>
        <div class="right">
          <div class="box">
            <img src="@/assets/sweep/bom.png" alt="" />
            <span>{{ bomNumber }}</span>
          </div>
        </div>
      </div>
      <div class="scroll">
        <img src="@/assets/sweep/tri.png" alt="" @click="leftArrowClick" />
        <div>
          <div class="ul" ref="ulx">
            <span v-for="(item, key) in bsNum" :key="key">{{ item }}x</span>
            <b class="poup">
              <img src="@/assets/sweep/jbx.png" alt="" class="jbbox" />
              <img src="@/assets/sweep/poup.png" alt="" class="" />
            </b>
          </div>
        </div>
        <img
          src="@/assets/sweep/tri.png"
          alt=""
          class="rigArrow"
          @click="rightArrowClick"
        />
      </div>
    </div>
    <div id="game-grid" :class="{ 'game-over': isGameOver }">
      <template v-if="STARTNUM">
        <grid-item
          v-for="(item, index) in grid"
          :key="item"
          class="grid-item bjing"
          :class="'leilei'"
          :count="item.count"
          :is-bomb="item.isBomb"
          :is-open="handShow"
          ref="gridItems"
          :index="index"
          @flag="onItemflag"
          @dblclick.prevent="ondblclick"
          @open="onItemOpen(item)"
          @open-all="onItemOpenAll()"
        ></grid-item>
      </template>
      <template v-else>
        <grid-ite
          v-for="(items, index) in grid"
          :key="items"
          class="grid-item"
          :class="!gridItem.isBomb && index != 12 ? 'leilei' : ''"
          :count="items.count"
          :is-bomb="items.isBomb"
          ref="gridItems"
          :index="index"
          :animate="animate"
          @flag="onItemflag"
          @dblclick.prevent="ondblclick"
          @open="onItemOpen(items, index)"
          @open-all="onItemOpenAll()"
        ></grid-ite>
      </template>
    </div>

    <div class="b00">
      <div>
        <span class="Balance">Balance:</span>
        <span class="huan huan0">{{ balance }}</span>
        <span class="huan huan1"
          >{{ $t("sweep.win") }}:<span>{{ Math.floor(win) }}</span></span
        >
      </div>
    </div>

    <div class="b0">
      <div class="b1" @click="betClick">
        <div style="color: #3179c9;">{{ $t("sweep.win") }}</div>
        <div>{{ curNum }}</div>
        <div class="butP" v-if="clickType === 'bet' && handShow">
          <div class="betPoup">
            <div
              @click="e => betNumClick(e, item)"
              v-for="item in betAmount"
              :key="item"
              :class="{ active: curNum === item }"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div class="b1" @click="minesClick">
        <div style="color: #3179c9;">{{ $t("sweep.mines") }}</div>
        <div>{{ bomNumber }}</div>
        <div class="butP minesP" v-if="clickType === 'mines' && handShow">
          <div class="betPoup minesPoup">
            <div
              v-for="item in minesData"
              :key="item"
              @click="e => minesNumClick(e, item)"
              :class="{ active: bomNumber === item }"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div class="b3" @click="startClick" v-if="handShow">
        <div>{{ $t("sweep.start") }}</div>
        <div class="hand" v-if="handShow && handSrc">
          <img :src="handSrc" alt="" />
        </div>
      </div>
      <div class="b100" @click="cashoutClick" v-else>
        <div>{{ $t("sweep.cashout") }}</div>
      </div>

      <!-- <div class="b4" @click="autoClick">
        <div class="autoIcon"></div>
        <div>{{ $t("sweep.auto") }}</div>
        <van-overlay :show="autoShow" z-index="1000" style="--van-overlay-background: rgba(255, 255, 255, 1)">
          <div class="autoverlay">
            <div class="header">
              <img src="@/assets/sweep/h.png" alt="" >
              <img src="@/assets/sweep/automatic.png" alt="" class="letter">
            </div>
            <div style="position: relative;width: 100%">
              <div class="selection">
                <div class="selImg"></div>
              </div>
              <van-grid square :border="false" :gutter="10" :column-num="5" style="--van-grid-item-content-padding: 0; --van-grid-item-content-background: transparent;padding: 0 5% 0 7%">
                <van-grid-item v-for="(value, index) in 25" :key="index" @click="chooseBlock(index)">
                  <img :src="data.img1" v-if="!chooseArr.includes(index)" data-img="1" style="width: 100%; height: 100%"/>
                  <img :src="data.img2" data-img="2" v-else style="width: 100%; height: 100%"/>
                </van-grid-item>
              </van-grid>
            </div>
            <van-cell-group :border="false" style="margin-bottom: 5%;--van-grid-item-content-background: transparent;--van-cell-background: transparent;--van-cell-group-background:transparent;">
              <van-cell :border="false" title-class="titleClass">
                <template #title>
                  <div style="padding-left: 30px">Number of mines in a single game</div>
                </template>
                <template #value>
                  <van-stepper v-model="bomNumber" min="1" max="100" step="1" input-width="80" style="--van-stepper-background: #0f1930;--van-stepper-input-text-color:#bbfaff"/>
                </template>
              </van-cell>
              <van-cell :border="false" title-class="titleClass" :class="{'cell-hover': active.includes('1')}">
                <template #title>
                  <van-checkbox shape="square" v-model="totalCheck" style="--van-checkbox-label-color: #73b1e1; --van-checkbox-border-color: transparent">Total Round</van-checkbox>
                </template>
                <template #value>
                  <van-stepper v-model="autoTotal" min="1" step="1" input-width="80" style="--van-stepper-background: #0f1930;--van-stepper-input-text-color:#bbfaff"/>
                  <div class="tipB" style="position: relative;visibility: hidden;">
                    <div></div>
                  </div>
                </template>
                <template #extra>
                  <div class="tipB">
                    <div @click="e => numClick(e, 50)">50</div>
                    <div @click="e => numClick(e, 100)">100</div>
                    <div @click="e => numClick(e, 200)">200</div>
                    <div @click="e => numClick(e, 500)">500</div>
                    <div @click="e => numClick(e, 999)">999</div>
                  </div>
                </template>
              </van-cell>
              <van-cell :border="false" title-class="titleClass" :class="{'cell-hover': active.includes('2')}">
                <template #title>
                  <van-checkbox shape="square" v-model="belowCheck" style="--van-checkbox-label-color: #73b1e1; --van-checkbox-border-color: transparent">Until total money is below</van-checkbox>

                </template>
                <template #value>
                  <van-stepper v-model="data.below" min="1" step="1" input-width="80" style="--van-stepper-background: #0f1930;--van-stepper-input-text-color:#bbfaff"/>
                </template>
              </van-cell>
              <van-cell :border="false" title-class="titleClass" :class="{'cell-hover': active.includes('3')}">
                <template #title>
                  <van-checkbox shape="square" v-model="aboveCheck" style="--van-checkbox-label-color: #73b1e1; --van-checkbox-border-color: transparent">Unitl total money is above</van-checkbox>
               
                </template>
                <template #value>
                  <van-stepper v-model="data.above" min="1" step="1" input-width="80" style="--van-stepper-background: #0f1930;--van-stepper-input-text-color:#bbfaff"/>
                </template>
              </van-cell>
            </van-cell-group>
            <div class="buttons">
              <div class="button" @click="autoCancelClick">CANCEL</div>
              <div class="button startB" @click="autoStartClick">START</div>
            </div>
          </div>
        </van-overlay>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import * as TWEEN from "@tweenjs/tween.js";
import { forEach, map, uniq } from "lodash-es";
import { useRouter } from "vue-router";
import { showNotify } from "vant";

import { ENotifyTypes } from "@/const/enums.d";
import useAudio from "@/utils/hooks/useAudio";

import gridItem from "./components/grid-item.vue";
import gridIte from "./components/grid-items.vue";
import { useSearch } from "./composables/useSearch";

const router = useRouter();

const signsSrc = ["betClick", "bg", "bombChoose", "curChoose"];
const signs = {};
forEach(signsSrc, src => {
  signs[src] = useAudio(`/audio/mines/${src}.mp3`);
});

// const { img1, img2, chooseBlock, chooseArr } = useAuto()
// const data = {
//   img1: new URL("../../assets/sweep/block.png", import.meta.url).href,
//   img2: new URL("../../assets/sweep/purple.png", import.meta.url).href,
  // total: 100,
  // below: 1000,
  // above: 3000,
  // count: 0,
  // totalCheck: false,
  // belowCheck: false,
  // aboveCheck: false,
  // chooseSet: new Set([12])
//   interval: null
// };
// const totalCheck = ref(true);
// const belowCheck = ref(false);
// const aboveCheck = ref(false);
// const chooseArr = ref([12]);
// const chooseSet = new Set([12]);
const autoTotal = ref(100);
// const chooseBlock = index => {
//   const x = index % 5;
//   const y = (index / 5) >> 0;
//   if (chooseSet.size && !chooseSet.has(index)) {
//     chooseSet.add(index);
//   } else if (chooseSet.size && chooseSet.has(index)) {
//     chooseSet.delete(index);
//   }
//   chooseArr.value = Array.from(chooseSet);
// };
// const autoCancelClick = e => {
//   e.stopPropagation();
//   autoShow.value = false;
// };
// const autoStartClick = e => {
//   e.stopPropagation();
//   autoShow.value = false;
//   data.interval = setInterval(() => {
//     if (data.count >= autoTotal.value) {
//       clearInterval(data.interval);
//     }
//     data.count++;
//     if (balance.value > data.below && balance.value < data.above) {
//       handleStart();
//     } else {
//       clearInterval(data.interval);
//     }
//   }, 500);
// };
// const chooseArrs = computed(() => chooseArr.value)

// const protoUrl = "/src/proto/MessageProto.proto";
// const protoUrl1 = "/src/proto/GameBase.proto";
// const protoUrl2 = "/src/proto/Slot.proto";
// MessageProtoApi(protoUrl1, 'com.ttg.gamecore.proto.EnterGameReq')
// MessageProtoApi(protoUrl2, 'com.ttg.gamecore.proto.ChangeReq')
// sendMsg()
const {
  search,
  allData,
  start,
  betChoose,
  BomChoose,
  CashOut,
  Jackpot
} = useSearch();
search();
const row = ref(5);
const column = ref(5);
const bomNumber = ref(3);
const balance = ref(2000);
const win = ref(0);
const grid = ref(null);
const gridItems = ref();
const isGameOver = ref(false);
const disabled = ref(false);
const coinNumber = ref(22);
const total = computed(() => {
  return row.value * column.value;
});
const opened = ref(0);
const isSuccess = ref(null);
const isFail = ref(null);
const STARTNUM = ref(false);
const currentItem = ref(null);
const bsNum = ref([
  1.1,
  1.26,
  1.45,
  1.68,
  1.96,
  2.3,
  2.73,
  3.28,
  3.98,
  4.7,
  5.88,
  7.48,
  9.72,
  12.96,
  17.83,
  25.46,
  38.2,
  61.11,
  106.85,
  216.7,
  534.75,
  2139
]);
const handleStart = event => {
  disabled.value = true;
  grid.value = [];
  opened.value = 0;
  isSuccess.value = isFail.value = null;
  const arr = [] as any;
  for (let i = 0; i < total.value; i++) {
    arr.push(0);
  }
  let bomb = bomNumber.value;
  while (bomb) {
    const index = (Math.random() * total.value) >> 0;
    if (arr[index]) {
      continue;
    }
    arr[index] = 1;
    bomb--;
  }
  grid.value = arr.map((item, index) => {
    const x = index % column.value;
    const y = (index / column.value) >> 0;
    const count = ref<any>(0);
    for (let i = Math.max(0, y - 1); i < Math.min(y + 2, row.value); i++) {
      for (let j = Math.max(0, x - 1); j < Math.min(x + 2, column.value); j++) {
        if (arr[i * column.value + j] && !(i === y && j === x)) {
          count.value++;
        }
      }
    }
    return { isBomb: false, count: count.value, isOpen: false, x, y };
  });

  if (event) {
    for (const item of gridItems.value) {
      item.reset();
    }
  }
  isGameOver.value = false;
  allData.value.clear();
};
handleStart();
function onItemflag() {}
function stopGame(isWin = false) {
  isGameOver.value = true;
  setTimeout(() => {
    // if(isWin) {
    cashoutClick(isWin);
    // }
  }, 200);
  win.value = 0;
  if (isWin) {
    isSuccess.value = isWin;
  } else {
    isFail.value = true;
  }
}
function onItemOpen(item) {
  currentItem.value = item;
  if (handShow.value) return;
  allData.value.set(3005, null);
  item.isOpen = true;
  BomChoose({
    x: item.x,
    y: item.y
  });

  setTimeout(() => {
    if (curOrBomb.value) {
      item.isBomb = true;
      // STARTNUM.value = false
      win.value = 0;
      onItemOpenAll();
      stopGame(false);
      return;
    }
    opened.value += 1;
    item.isBomb = false;
    if (opened.value >= total.value - bomNumber.value) {
      // STARTNUM.value = false
      onItemOpenAll();
      return stopGame(true);
    }
  }, 0);

  // openGridItem(item, index);
}
function ondblclick() {
  if (isOpen.value) return;
  emit("openAll");
}
function onItemOpenAll() {
  // if (item.count === 0) return;
  grid.value.forEach((d, index) => {
    // if(d.isOpen) return;
    gridItems.value[index].isOpen = true;
  });
  // const x = index % column.value;
  // const y = (index / column.value) >> 0;
  // let count = ref(0);
  // const itemsToOpen = ref([]);
  // for (let i = Math.max(0, y - 1); i < Math.min(y + 2, row.value); i++) {
  //   for (let j = Math.max(0, x - 1); j < Math.min(x + 2, column.value); j++) {
  //     if (i === y && j === x) continue;
  //     const gridItem = gridItems.value[i * column.value + j];
  //     if (gridItem.isFlag) {
  //       count.value++;
  //     } else {
  //       itemsToOpen.value.push(gridItem);
  //     }
  //   }
  // }
  // if(count==item.count){
  //   for(const gridItem of itemsToOpen){
  //     gridItem.open()
  //   }
  // }
}
// const handleStart2 = () => {
//   STARTNUM.value = true;
// };
const ulx = ref();
const leftArrowClick = () => {
  ulx.value.scrollLeft += 100;
};
const rightArrowClick = () => {
  ulx.value.scrollLeft -= 100;
};

const currentAmount = ref(null);
const animationNum = () => {
  // 定义初始值和目标值
  const initialValue = 410000; // 起始金额为0
  const targetValue = 9000000000; // 目标金额为1000

  // 更新函数，每次调用时会根据当前时间计算并更新金额值
  function update() {
    requestAnimationFrame(update);

    // 清除之前的所有 tweens（如果有）
    TWEEN.update();
  }

  // 创建 tween 对象
  new TWEEN.Tween({ value: initialValue })
    .to({ value: targetValue }, 100000000000) // 设置过渡时长为2000ms
    .onUpdate(obj => {
      const amount = Number(obj.value.toFixed(2)); // 保留两位小数
      currentAmount.value =
        amount.toLocaleString().split(".")[1]?.length > 1
          ? amount.toLocaleString()
          : amount.toLocaleString() + "0";
    })
    .start();

  // 开始动画
  requestAnimationFrame(update);
};

const clickType = ref("");
const curNum: Ref<number> = ref(200);
const minesData = ref([
  24,
  18,
  12,
  6,
  23,
  17,
  11,
  5,
  22,
  16,
  10,
  4,
  21,
  15,
  9,
  3,
  20,
  14,
  8,
  2,
  19,
  13,
  7,
  1
]);

const betClick = e => {
  e.stopPropagation();
  signs["bg"].loopPlay();
  if (!STARTNUM.value) {
    signs["betClick"].signPlay();
  }
  if (clickType.value === "bet") {
    clickType.value = "";
  } else {
    clickType.value = "bet";
  }
};
const minesClick = e => {
  e.stopPropagation();
  signs["bg"].loopPlay();
  if (!STARTNUM.value) {
    signs["betClick"].signPlay();
  }
  if (clickType.value === "mines") {
    clickType.value = "";
  } else {
    clickType.value = "mines";
  }
};
const betNumClick = (e, num) => {
  e.stopPropagation();
  signs["bg"].loopPlay();
  curNum.value = num;
  clickType.value = "";
  betChoose({
    boomCount: bomNumber.value,
    nBetIdx: betAmount.value.indexOf(curNum.value)
  });
};
const minesNumClick = (e, num) => {
  e.stopPropagation();
  signs["bg"].loopPlay();
  bomNumber.value = num;
  clickType.value = "";
  betChoose({
    boomCount: bomNumber.value,
    nBetIdx: betAmount.value.indexOf(curNum.value)
  });
};
const pageClick = () => {
  clickType.value = "";
  signs["bg"].loopPlay();
};

const pageClose = e => {
  e.stopPropagation();
  router.push({ name: "home" });
};

const percent = ref(0);
const show = ref(true);
// const handNum = ref(1);
const handSrc = ref(null);
// const handInterval = null;
const handShow = ref(false);
const loadingFunc = () => {
  // 定义初始值和目标值
  const initialValue = 1; // 起始金额为0
  const targetValue = 100; // 目标金额为1000

  // 更新函数，每次调用时会根据当前时间计算并更新金额值
  // function update() {
  //   requestAnimationFrame(update);

    // 清除之前的所有 tweens（如果有）
  //   TWEEN.update();
  // }

  // 创建 tween 对象
  new TWEEN.Tween({ value: initialValue })
    .to({ value: targetValue }, 50) // 设置过渡时长为2000ms
    .onUpdate(obj => {
      percent.value = Number(obj.value.toFixed(0)); // 保留两位小数
      if (percent.value === 100) {
        show.value = false;
        handShow.value = true;
        // const handInterval = setInterval(() => {
        //   handNum.value = handNum.value === 1 ? 2 : 1;
        //   handSrc.value = new URL(
        //     `../../assets/sweep/hand${handNum.value}.png`,
        //     import.meta.url
        //   ).href;
        // }, 500);
      }
    })
    .start();

  // 开始动画
};
const animate = ref(false);
const startClick = () => {
  animate.value = true;
  handShow.value = false;

  start();
  setTimeout(() => {
    STARTNUM.value = true;
    handleStart({});
  }, 550);
};

const bxShow = ref(false);
const bxClick = () => {
  bxShow.value = true;
  Jackpot();
};
const name = new URL("../../assets/sweep/t2.png", import.meta.url).href;
const closeClick = e => {
  e.stopPropagation();
  bxShow.value = false;
};
// const autoShow = ref(false);
// const autoClick = () => {
//   autoShow.value = true;
// };

// const values = reactive({
//   value1: 24,
//   value2: 100,
//   value3: 1000,
//   value4: 3000
// });
// const checked = reactive({
//   checked1: "",
//   checked2: "",
//   checked3: ""
// });
// const active = computed(() => {
//   const arr = [];
//   for (const key in checked) {
//     if (checked[key]) {
//       arr.push(key.replace("checked", ""));
//     }
//   }
//   return arr;
// });
// const numClick = (e, num) => {
//   e.stopPropagation();
//   autoTotal.value = num;
// };
const cashoutClick = isWin => {
  allData.value.set(3005, null);
  disabled.value = true;
  isWin && CashOut();
  handShow.value = true;
  opened.value = 0;

  // balance.value = balance.value + win.value
  // allData.value.set(3005, null)
  setTimeout(() => {
    win.value = 0;
    curOrBomb.value = false;
    showNotify({
      type: ENotifyTypes.warning,
      message: "游戏结束",
      duration: 1000
    });
  }, 100);

  onItemOpenAll();
};

// const allData = ref(new Map())
const betAmount: Ref<number[]> = ref([]);
const nOddsIdx = ref();
const curOrBomb = ref(false);
// const getDataLists = (data) => {
//   allData.value.set(data.msgId, data)
// }
watch(
  () => allData.value,
  newVal => {
    let msg2000s = newVal.get(3070) && newVal.get(3070).data;
    if (msg2000s) {
      betAmount.value = map(uniq(msg2000s.betAmount), val => Number(val));
      bomNumber.value = msg2000s.bombNumber;
      win.value = msg2000s.winScore;
      balance.value = parseInt(msg2000s.score);
    }

    let msg3002s = newVal.get(3003) && newVal.get(3003).data;
    if (msg3002s) {
      bomNumber.value = msg3002s.bombNumber;
      win.value = msg3002s.winScore;
      balance.value = parseInt(msg3002s.score);
      bsNum.value = msg3002s.odds;
    }
    let msg3004s = newVal.get(3005) && newVal.get(3005).data;
    if (msg3004s) {
      coinNumber.value = msg3004s.coinNumber;
      win.value = msg3004s.winScore;
      balance.value = parseInt(msg3004s.score);
      nOddsIdx.value = msg3004s.nOddsIdx;
      curOrBomb.value = msg3004s.boom;
      currentItem.value.isBomb = msg3004s.boom;
    }
    let msg3010s = newVal.get(3020) && newVal.get(3020).data;
    if (msg3010s) {
      balance.value = parseInt(msg3010s.score);
    }
  },
  { deep: true, immediate: true }
);
// let initQuery = JSON.stringify({"msgId":2000,"data":{"gameId":10001}})
// // MessageProtoApi(protoUrl, 'com.ttg.gamecore.proto.Game')

// let ChooseRes = JSON.stringify({"msgId":3002,"data":{
//   boomCount: bomNumber.value,
//   nBetIdx: curNum.value
// }})
// const getChooseResLists = (data: any) => {
// }
// let startReq = JSON.stringify({"msgId":3008,"data":{}})
// const getstartReqLists = (data: any) => {
// }
// let chooseBom = JSON.stringify({"msgId":3004,"data":{
//   "x":0,
//   "y":0
// }})
// let quchu = JSON.stringify({"msgId":3010,"data":{}})
// let startCallback = () => {
//   sendMsg(initQuery, getDataLists)
//   // sendMsg(startReq, getDataLists)
//   // sendMsg(chooseBom, getDataLists)
//   // sendMsg(quchu, getDataLists)
//   sendMsg(ChooseRes, getDataLists)
// }
// MessageProtoApi(protoUrl, 'com.ttg.gamecore.proto.Game', startCallback)

onMounted(() => {
  animationNum();
  loadingFunc();
  signs["bg"].addSwitchState();

  const interval = setInterval(() => {
    if (betAmount.value) {
      betChoose({
        boomCount: bomNumber.value,
        nBetIdx: betAmount.value?.indexOf(curNum.value)
      });
      clearInterval(interval);
    }
  }, 500);
});

onUnmounted(() => {
  signs["bg"].removeSwitchState();
});
</script>

<style lang="less" scoped>
.overlay {
  width: 100%;
  height: 100%;
  background: url("@/assets/sweep/loading.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  .process {
    position: absolute;
    width: 40%;
    left: 30%;
    top: 72%;
    color: #ced7e5;
    font-size: 12px;
    .text {
      position: absolute;
      top: 208%;
      left: 63%;
    }
    :deep(.van-progress__portion) {
      box-shadow: inset 0 -1px 2px rgba(61, 174, 227, 1);
    }
  }
}
.header0 {
  height: 130px;
}
.header0 img {
  width: 100%;
  height: 100%;
}
.bg {
  // background-image: url(@/assets/sweep/bg.jpg);
  // background-size: cover;
  // height: 100vh;
  // background-color: rgb(27, 51, 97);
  padding-top: 40px;
  background-image: radial-gradient(circle, #5972a3, #15274a);
  padding-bottom: 100px;
}
// .leilei {
//   background-color: rgb(118, 24, 26);
// }
.bjing {
  background-image: url("@/assets/sweep/b1.png");
  background-size: cover;
}
// .bjing:nth-child(13){
//   background-image: url('@/assets/sweep/n.png');
//   background-position: 200px  330px;
// }
#game-grid {
  display: grid;
  grid-template-rows: repeat(5, 70px);
  grid-template-columns: repeat(5, 70px);
  justify-content: center;
  margin-top: 30px;
  perspective: 1000px;
}
.grid-item {
  display: flex;
  justify-content: center;
  align-items: center;
  // border: solid 1px;
  // background-color: ;

  border-radius: 3px;
  overflow: hidden;
  margin: 6px;
}
.isOpen {
  background-image: url(@/assets/sweep/coin.jpg);
  background-size: cover;
}
// .grid-item:not(.opened) {
  // background-color: #eee;
  // border-top-color: #eee;
  // border-left-color: #eee;
  // border-right-color: #ccc;
  // border-bottom-color: #ccc;
// }

.game-over {
  pointer-events: none;
}
.ssss {
  background-color: #56bd48;
  background-color: #147a40;
  background-color: #3179c9;
  background-color: #215bad;
  background-color: #d8b42e;
  background-color: #aa7a1c;
}
.Balance {
  color: #999;
  padding-left: 16px;
}
.huan {
  color: #d8b42e;
}
.huan1 {
  margin-left: 40px;
}
.b00 {
  background-color: #324c79;
  padding: 4px 0;
}
.b0 {
  width: 94%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}
.b1 {
  // width: 24%;
  width: 28%;
  height: 40px;
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: linear-gradient(to bottom, #56bd48, #147a40);
  position: relative;
}
.b3 {
  width: 32%;
  height: 40px;
  text-align: center;
  font-size: 16px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  position: relative;
  background: linear-gradient(to bottom, #3179c9, #215bad);
  .hand {
    position: absolute;
    left: 60%;
    top: 70%;
    width: 50px;
    height: 34px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.b4 {
  width: 20%;
  height: 40px;
  border-radius: 4px;

  color: white;
  // display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #d8b42e, #aa7a1c);
  .autoIcon {
    background: url("@/assets/sweep/n.png") no-repeat;
    background-size: 950px auto;
    background-position: 46% 18.7%;
    width: 20px;
    height: 20px;
    margin: 0 auto;
    transform: rotateZ(90deg);
  }
  .autoverlay {
    width: 100%;
    height: 100%;
    background-color: #15274a;
    overflow: auto;
    .header {
      height: 4%;
      position: relative;
      z-index: 1;
      margin-bottom: 20%;
    }
    .header img {
      width: 80%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
      &.letter {
        top: 1.4%;
        width: 38%;
        height: 100%;
      }
    }
    .buttons {
      width: 100%;
      text-align: center;
      display: flex;
      justify-content: space-around;
      margin-bottom: 10%;
      .button {
        font-size: 20px;
        color: #80e3fa;
        width: 140px;
        height: 46px;
        line-height: 46px;
        background: url("@/assets/sweep/blueB.png") no-repeat;
        background-size: 100% 100%;
        &.startB {
          color: #ecf6bc;
          background: url("@/assets/sweep/greenB.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .tipB {
      display: flex;
      position: absolute;
      top: 48px;
      right: 16px;
      text-align: center;
      z-index: 4;
      & > div {
        min-width: 50px;
        height: 26px;
        line-height: 26px;
        border-radius: 2px;
        color: #bbfaff;
        background-color: #3286d4;
        margin-left: 5px;
      }
    }
    .cell-hover {
      background-color: #33438b;
    }
    .selection {
      width: 100%;
      height: 17%;
      position: absolute;
      top: 40%;
      z-index: 3;
      pointer-events: none;
      .selImg {
        width: 100%;
        height: 60px;
        background: url("@/assets/sweep/n.png") no-repeat;
        background-size: 300% auto;
        background-position: 52% 72%;
        opacity: 1;
        animation: shake-opacity 1.5s infinite;
      }
    }
  }
}

.sweep-header {
  display: flex;
  // position: absolute;
  // top: 25vw;
  // left: 0;
  width: 100%;
  justify-content: space-around;
  .left,
  .right {
    flex: 3;
    text-align: end;
    height: 80%;
    .box {
      background-color: rgba(34, 65, 122, 0.8);
      width: 3.6rem;
      // height: 3rem;
      text-align: center;
      border-radius: 0.4rem;
      font-size: 12px;
      color: #c1dff3;
      margin-top: 1rem;
      span {
        display: inline-block;
        width: 100%;
      }
    }
  }
  .right {
    display: flex;
    justify-content: flex-start;
    padding-left: 0.8rem;
    align-items: center;
  }
  .left img {
    width: 2.6rem;
    height: 2.6rem;
    margin-top: 4px;
    margin-bottom: 4px;
  }
  .right img {
    width: 3rem;
    transform: rotate(-90deg);
  }
  .left {
    display: flex;
    justify-content: flex-end;
    padding-right: 0.8rem;
    align-items: center;
  }
  .center {
    flex: 8;
    text-align: center;
    .mines {
      width: 65%;
      height: 2.2rem;
    }
    .img {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 1.4rem;
      .jackpot {
        width: 75%;
        height: 3rem;
      }
      .bx {
        width: 2rem;
        height: 2rem;
      }
    }
    .text {
      font-size: 1.5rem;
      font-weight: 900;
      letter-spacing: 0.1rem;
      margin-top: 0.5rem;
      display: block;
      color: #d9ae53;
      .amount {
        display: inline-block;
        width: 14px;
      }
    }
    .bxoverlay {
      width: 90%;
      height: 80%;
      background: url("@/assets/sweep/mask.png") no-repeat;
      background-size: 100% 100%;
      position: relative;
      left: 5%;
      top: 10%;
      img.close {
        position: absolute;
        width: 25px;
        height: 25px;
        right: 3%;
        top: 1.4%;
        z-index: 2;
      }
      .headerBac {
        width: 96%;
        height: 30%;
        margin-top: 9%;
        text-align: center;
        // background: url('@/assets/sweep/n.png') no-repeat;
        // background-size: 100px 100px;
        // background-position: 0 300px;
        position: absolute;
        top: 0%;
        left: 2%;
        z-index: 0;
        p {
          position: absolute;
          z-index: 1;
          margin: 0;
          &.f {
            font-size: 1.8vh;
            top: 44%;
            left: 50%;
            transform: translateX(-50%);
          }
          &.text1 {
            font-size: 7vh;
            top: 55%;
            left: 50%;
            transform: translateX(-50%);
            letter-spacing: -5px;
            color: #d8b42e;
          }
          &.score {
            top: 88%;
            color: #9bc1f9;
            font-size: 1.6vh;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
      .header {
        height: 26%;
        position: relative;
        z-index: 1;
        margin-bottom: 15%;
      }
      .header img {
        width: 80%;
        height: 18%;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
        &.letter {
          top: 1.4%;
          width: 38%;
          height: 14%;
        }
      }
      .content {
        padding: 0 3% 3% 3%;
        height: 63%;
        overflow: auto;
        img {
          position: absolute;
          left: 2%;
          height: 63%;
          width: 100%;
        }
        .tbgc {
          border-radius: 4px;
          width: 96%;
        }
        .table {
          width: 100%;
          overflow: auto;
        }
      }
    }
  }
}
.sweep-header0 {
  display: flex;
  // position: absolute;
  // top: 25vw;
  // left: 0;
  width: 100%;
  justify-content: space-around;
  .left,
  .right {
    flex: 3;
    text-align: end;
    height: 80%;
    .box {
      background-color: rgba(34, 65, 122, 0.8);
      width: 3.6rem;
      // height: 3rem;
      text-align: center;
      border-radius: 0.4rem;
      font-size: 12px;
      color: #c1dff3;
      margin-top: 1rem;
      span {
        display: inline-block;
        width: 100%;
      }
    }
  }
  .right {
    display: flex;
    justify-content: flex-start;
    padding-left: 0.8rem;
    align-items: center;
  }
  .left img {
    width: 2.6rem;
    height: 2.6rem;
    margin-top: 4px;
    margin-bottom: 4px;
  }
  .right img {
    width: 3rem;
    transform: rotate(-90deg);
  }
  .left {
    display: flex;
    justify-content: flex-end;
    padding-right: 0.8rem;
    align-items: center;
  }
  .center {
    flex: 8;
    text-align: center;
    .mines {
      width: 65%;
      height: 2.2rem;
    }
    .img {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 1.4rem;
      .jackpot {
        width: 75%;
        height: 3rem;
      }
      .bx {
        width: 2rem;
        height: 2rem;
      }
    }
    .text {
      font-size: 1.5rem;
      font-weight: 900;
      letter-spacing: 0.1rem;
      margin-top: 0.5rem;
      display: block;
      color: #d9ae53;
      .amount {
        display: inline-block;
        width: 14px;
      }
    }
    .bxoverlay {
      width: 90%;
      height: 80%;
      background: url("@/assets/sweep/mask.png") no-repeat;
      background-size: 100% 100%;
      position: relative;
      left: 5%;
      top: 10%;
      img.close {
        position: absolute;
        width: 25px;
        height: 25px;
        right: 3%;
        top: 1.4%;
        z-index: 2;
      }
      .headerBac {
        width: 96%;
        height: 30%;
        margin-top: 9%;
        text-align: center;
        // background: url('@/assets/sweep/n.png') no-repeat;
        // background-size: 100px 100px;
        // background-position: 0 300px;
        position: absolute;
        top: 0%;
        left: 2%;
        z-index: 0;
        p {
          position: absolute;
          z-index: 1;
          margin: 0;
          &.f {
            font-size: 1.8vh;
            top: 44%;
            left: 50%;
            transform: translateX(-50%);
          }
          &.text1 {
            font-size: 7vh;
            top: 55%;
            left: 50%;
            transform: translateX(-50%);
            letter-spacing: -5px;
            color: #d8b42e;
          }
          &.score {
            top: 88%;
            color: #9bc1f9;
            font-size: 1.6vh;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
      .header {
        height: 26%;
        position: relative;
        z-index: 1;
        margin-bottom: 15%;
      }
      .header img {
        width: 80%;
        height: 18%;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
        &.letter {
          top: 1.4%;
          width: 38%;
          height: 14%;
        }
      }
      .content {
        padding: 0 3% 3% 3%;
        height: 63%;
        overflow: auto;
        img {
          position: absolute;
          left: 2%;
          height: 63%;
          width: 100%;
        }
        .tbgc {
          border-radius: 4px;
          width: 96%;
        }
        .table {
          width: 100%;
          overflow: auto;
        }
      }
    }
  }
}
.scroll {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 5%;
  margin-top: -10px;
  img {
    width: 0.8rem;
    height: 1rem;
    margin: 0 4px;
    margin-top: 40px;
  }
  img.rigArrow {
    transform: rotate(180deg);
  }
  > div {
    // overflow: hidden;
    display: flex;
    align-items: center;
    margin-top: 0.2rem;
    width: 100%;
    .ul {
      width: 100%;
      float: left;
      overflow-x: scroll;
      // overflow-y: hidden;
      padding-top: 40px;
      position: relative;
    }
    span {
      // float: left;`
      display: inline;
      color: #8495c5;
      font-size: 10px;
      background-color: #173371;
      padding: 4px 10px;
      margin: 0 2px;
      white-space: nowrap;
      line-height: 2;
    }
    b {
      position: absolute;
      left: 0;
      top: -40px;
      width: 40px;
      height: 40px;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      img.jbbox {
        width: 24px;
        height: 20px;
        text-align: center;
        position: absolute;
        z-index: 1;
        left: 8px;
        top: 8px;
        transform-origin: left bottom;
        animation: zoom-scale 1s infinite;
      }
    }
  }
}
.sweep-header1 {
  display: flex;
  // position: absolute;
  // top: 25vw;
  // left: 0;
  width: 100%;
  justify-content: space-around;
  .left,
  .right {
    flex: 3;
    text-align: end;
    height: 80%;
    .box {
      background-color: rgba(34, 65, 122, 0.8);
      width: 3.6rem;
      // height: 3rem;
      text-align: center;
      border-radius: 0.4rem;
      font-size: 12px;
      color: #c1dff3;
      margin-top: 1rem;
      span {
        display: inline-block;
        width: 100%;
      }
    }
  }
  .right {
    display: flex;
    justify-content: flex-start;
    padding-left: 0.8rem;
    align-items: center;
  }
  .left img {
    width: 2.6rem;
    height: 2.6rem;
    margin-top: 4px;
    margin-bottom: 4px;
  }
  .right img {
    width: 3rem;
    transform: rotate(-90deg);
  }
  .left {
    display: flex;
    justify-content: flex-end;
    padding-right: 0.8rem;
    align-items: center;
  }
  .center {
    flex: 8;
    text-align: center;
    .mines {
      width: 65%;
      height: 2.2rem;
    }
    .img {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 1.4rem;
      .jackpot {
        width: 75%;
        height: 3rem;
      }
      .bx {
        width: 2rem;
        height: 2rem;
      }
    }
    .text {
      font-size: 1.5rem;
      font-weight: 900;
      letter-spacing: 0.1rem;
      margin-top: 0.5rem;
      display: block;
      color: #d9ae53;
      .amount {
        display: inline-block;
        width: 14px;
      }
    }
    .bxoverlay {
      width: 90%;
      height: 80%;
      background: url("@/assets/sweep/mask.png") no-repeat;
      background-size: 100% 100%;
      position: relative;
      left: 5%;
      top: 10%;
      img.close {
        position: absolute;
        width: 25px;
        height: 25px;
        right: 3%;
        top: 1.4%;
        z-index: 2;
      }
      .headerBac {
        width: 96%;
        height: 30%;
        margin-top: 9%;
        text-align: center;
        // background: url('@/assets/sweep/n.png') no-repeat;
        // background-size: 100px 100px;
        // background-position: 0 300px;
        position: absolute;
        top: 0%;
        left: 2%;
        z-index: 0;
        p {
          position: absolute;
          z-index: 1;
          margin: 0;
          &.f {
            font-size: 1.8vh;
            top: 44%;
            left: 50%;
            transform: translateX(-50%);
          }
          &.text1 {
            font-size: 7vh;
            top: 55%;
            left: 50%;
            transform: translateX(-50%);
            letter-spacing: -5px;
            color: #d8b42e;
          }
          &.score {
            top: 88%;
            color: #9bc1f9;
            font-size: 1.6vh;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
      .header {
        height: 26%;
        position: relative;
        z-index: 1;
        margin-bottom: 15%;
      }
      .header img {
        width: 80%;
        height: 18%;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
        &.letter {
          top: 1.4%;
          width: 38%;
          height: 14%;
        }
      }
      .content {
        padding: 0 3% 3% 3%;
        height: 63%;
        overflow: auto;
        img {
          position: absolute;
          left: 2%;
          height: 63%;
          width: 100%;
        }
        .tbgc {
          border-radius: 4px;
          width: 96%;
        }
        .table {
          width: 100%;
          overflow: auto;
        }
      }
    }
  }
}
.scroll1 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 5%;
  margin-top: -10px;
  img {
    width: 0.8rem;
    height: 1rem;
    margin: 0 4px;
    margin-top: 40px;
  }
  img.rigArrow {
    transform: rotate(180deg);
  }
  > div {
    // overflow: hidden;
    display: flex;
    align-items: center;
    margin-top: 0.2rem;
    width: 100%;
    .ul {
      width: 100%;
      float: left;
      overflow-x: scroll;
      // overflow-y: hidden;
      padding-top: 40px;
      position: relative;
    }
    span {
      // float: left;`
      display: inline;
      color: #8495c5;
      font-size: 10px;
      background-color: #173371;
      padding: 4px 10px;
      margin: 0 2px;
      white-space: nowrap;
      line-height: 2;
    }
    b {
      position: absolute;
      left: 0;
      top: -40px;
      width: 40px;
      height: 40px;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      img.jbbox {
        width: 24px;
        height: 20px;
        text-align: center;
        position: absolute;
        z-index: 1;
        left: 8px;
        top: 8px;
        transform-origin: left bottom;
        animation: zoom-scale 1s infinite;
      }
    }
  }
}
.butP {
  background: url("@/assets/sweep/bet.png") no-repeat;
  background-size: 100% 100%;
  width: 200px;
  height: 160px;
  position: absolute;
  left: -2%;
  top: -400%;
  // top: 0;
  animation: slowIn 0.5s;
  .betPoup {
    width: 196px;
    height: 152px;
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
    color: #8e93ab;
    font-weight: 700;
    position: relative;
    left: 3px;
    top: 1px;
    & > div {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .active {
        color: #07e9ff;
        border: 1px solid #378aa7;
        background-image: radial-gradient(circle, #15274a, #4c8ba1);
        width: 100%;
        height: 100%;
        line-height: 2;
        border-radius: 6px;
      }
    }
  }
}

.minesP {
  background: url("@/assets/sweep/minesp.png") no-repeat;
  background-size: 100% 100%;
  width: 240px;
  height: 200px;
  left: -90%;
  top: -500%;
  .minesPoup {
    width: 236px;
    height: 188px;
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(4, 1fr);
  }
}

.reverse {
  transform-origin: center center;
  animation: reverseAnimation 0.6s alternate; /* 添加动画效果 */
}

.object {
  width: 100px;
  height: 100px;
  position: relative;
  animation: zoom-shake 2s infinite;
}

@keyframes zoom-shake {
  0% {
    transform: scaleX(1) scaleY(1);
    transform-origin: 50% 50%;
    top: 0;
  }
  25% {
    transform: scaleX(1.2) scaleY(1.2);
    transform-origin: 50% 50%;
    top: -10px;
  }
  50% {
    transform: scaleX(1.2) scaleY(1.2) rotateZ(15deg);
    transform-origin: 50% 50%;
    top: -10px;
  }
  55% {
    transform: scaleX(1.2) scaleY(1.2) rotateZ(-15deg);
    transform-origin: 50% 50%;
    top: -10px;
  }
  60% {
    transform: scaleX(1.2) scaleY(1.2) rotateZ(15deg);
    transform-origin: 50% 50%;
    top: -10px;
  }
  65% {
    transform: scaleX(1.2) scaleY(1.2) rotateZ(-15deg);
    transform-origin: 50% 50%;
    top: -10px;
  }
  70% {
    transform: scaleX(1) scaleY(1);
    transform-origin: 50% 50%;
    top: 0;
  }
  100% {
    transform: scaleX(1) scaleY(1);
    transform-origin: 50% 50%;
    top: 0;
  }
}

@keyframes zoom-scale {
  0% {
    transform: scaleY(1);
    top: 8px;
  }
  50% {
    transform: scaleY(1.1);
    top: 6px;
  }
  80% {
    transform: scaleY(1);
    top: 8px;
  }
  100% {
    transform: scaleY(1);
    top: 8px;
  }
}

@keyframes slowIn {
  0% {
    top: 0;
    opacity: 0;
  }
  50% {
    top: -200%;
    opacity: 0;
  }
  80% {
    top: -300%;
    opacity: 0.3;
  }
  100% {
    top: -400%;
    opacity: 1;
  }
}

@keyframes shake-opacity {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}

@keyframes reverseAnimation {
  0% {
    transform: rotateY(0deg); /* 初始状态 */
  }
  100% {
    transform: rotateY(-180deg); /* 结束状态 */
  }
}
.b100 {
  width: 32%;
  height: 40px;
  text-align: center;
  font-size: 16px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: #78252d;
  color: white;
  font-weight: bold;
}
</style>
<style lang="less">
.titleClass {
  color: #73b1e1;
}
.van-checkbox__icon {
  background-color: #0f1930;
}

.van-stepper__minus,
.van-stepper__plus {
  background-color: #3286d4;
}
</style>
