<template>
  <div class="bounce-view bg-fog-50">
    <div class="bounce-view__title">
      <div class="bounce-view__title-left flex items-center">
        <img
          src="https://img.dbgames1.com/Wingo_Emerd.png"
          class="h-50px w-50px"
        />
        <div>
          <p class="text-12px text-text-3 font-700 m-0">Emerd</p>
          <p class="text-11px text-text-4 m-0 mt-4px">12/10-373 period</p>
        </div>
      </div>
      <div class="bounce-view__title-right">
        <BcCountDown :countSeconds="300000" />
      </div>
    </div>
    <div class="bounce-view__main">
      <div class="bounce-view__main-bar">
        <div class="bar-title text-11px text-text-4">
          Color true
        </div>
        <div class="bar-item">
          <div
            @click="
              betNumber = 'Red';
              betColor = 'red';
              showBottom = true;
            "
          >
            <p>Red</p>
            <p class="text-10px">2x</p>
          </div>
          <div
            @click="
              betNumber = 'Blue';
              betColor = 'blue';
              showBottom = true;
            "
          >
            <p>Blue</p>
            <p class="text-10px">4.5x</p>
          </div>
          <div
            @click="
              betNumber = 'Green';
              betColor = 'green';
              showBottom = true;
            "
          >
            <p>Green</p>
            <p class="text-10px">2x</p>
          </div>
        </div>
      </div>
      <div class="bounce-view__main-selection">
        <div class="selection-title text-11px text-text-4">
          Direct Selection
        </div>
        <div class="selection-main">
          <div
            @click="
              betNumber = 0;
              betColor = 'green';
              showBottom = true;
            "
          >
            <p class="font-700">0</p>
            <p>9x</p>
          </div>
          <div
            @click="
              betNumber = 1;
              betColor = 'red';
              showBottom = true;
            "
          >
            <p class="font-700">1</p>
            <p>9x</p>
          </div>
          <div
            @click="
              betNumber = 2;
              betColor = 'green';
              showBottom = true;
            "
          >
            <p class="font-700">2</p>
            <p>9x</p>
          </div>
          <div
            @click="
              betNumber = 3;
              betColor = 'red';
              showBottom = true;
            "
          >
            <p class="font-700">3</p>
            <p>9x</p>
          </div>
          <div
            @click="
              betNumber = 4;
              betColor = 'green';
              showBottom = true;
            "
          >
            <p class="font-700">4</p>
            <p>9x</p>
          </div>
          <div
            @click="
              betNumber = 5;
              betColor = 'blue';
              showBottom = true;
            "
          >
            <p class="font-700">5</p>
            <p>9x</p>
          </div>
          <div
            @click="
              betNumber = 6;
              betColor = 'green';
              showBottom = true;
            "
          >
            <p>6</p>
            <p>9x</p>
          </div>
          <div
            @click="
              betNumber = 7;
              betColor = 'red';
              showBottom = true;
            "
          >
            <p class="font-700">7</p>
            <p>9x</p>
          </div>
          <div
            @click="
              betNumber = 8;
              betColor = 'green';
              showBottom = true;
            "
          >
            <p class="font-700">8</p>
            <p>9x</p>
          </div>
          <div
            @click="
              betNumber = 9;
              betColor = 'red';
              showBottom = true;
            "
          >
            <p class="font-700">9</p>
            <p>9x</p>
          </div>
        </div>
      </div>
      <Tabs :options="options" v-model:value="activeOptions" class="mt-24px" />
      <Record class="mt-24px" v-if="activeOptions === 'record'" />
      <Continuos v-if="activeOptions === 'continuos'" class="mt-24px" />
    </div>
  </div>

  <van-popup
    v-model:show="showBottom"
    position="bottom"
    class="rounded-t-16px"
    :style="{ height: '55%' }"
  >
    <div class="pop-warpper px-12px py-20px bg-fog-48">
      <div class="color-bet-title flex text-14px justify-between text-text-4">
        <div>
          <span class="text-[#00b97c] text-17px font-700">
            {{ betNumber }}
          </span>
          <span class="color-bet-period flex1">
            01/17-185 period
          </span>
        </div>

        <div class="text-14px" @click="showBottom = false">
          Cancel
        </div>
      </div>
      <div
        class="bet-tag bg-[#8d71ff] w-26px h-17px text-text-3 text-10px flex justify-center items-center rounded-5px mt-4px"
      >
        9x
      </div>
      <div class="bet-money flex gap-40px items-center">
        <span class="text-12px whitespace-nowrap">Bet Money</span>
        <van-field
          class="!m-0"
          placeholder="limit >= 10"
          clearable
          v-model="betValue"
          type="text"
          autocomplete="off"
        />
      </div>
      <div class="bet-quick flex gap-12px mt-24px">
        <div
          class="bg-fog-49 h-40px flex-1 rounded-4px flex justify-center items-center text-text-3 font-700"
          @click="betValue = 1004"
        >
          +1004
        </div>
        <div
          @click="betValue = 5005"
          class="bg-fog-49 h-40px flex-1 rounded-4px flex justify-center items-center text-text-3 font-700"
        >
          +5005
        </div>
        <div
          @click="betValue = 5005"
          class="bg-fog-49 h-40px flex-1 rounded-4px flex justify-center items-center text-text-3 font-700"
        >
          max
        </div>
      </div>
      <div
        class="bet-quantity flex gap-40px items-center justify-between mt-24px"
      >
        <span class="text-12px">Quantity</span>
        <van-stepper class="!m-0" v-model="quantity" />
      </div>
      <div class="quantity-quick flex gap-8px mt-24px">
        <div
          class="bg-fog-49 h-40px flex-1 rounded-4px flex justify-center items-center text-text-3 font-700"
          @click="quantity = 1"
        >
          x1
        </div>
        <div
          @click="quantity = 3"
          class="bg-fog-49 h-40px flex-1 rounded-4px flex justify-center items-center text-text-3 font-700"
        >
          x3
        </div>
        <div
          @click="quantity = 9"
          class="bg-fog-49 h-40px flex-1 rounded-4px flex justify-center items-center text-text-3 font-700"
        >
          x9
        </div>
        <div
          @click="quantity = 27"
          class="bg-fog-49 h-40px flex-1 rounded-4px flex justify-center items-center text-text-3 font-700"
        >
          x27
        </div>
        <div
          @click="quantity = 81"
          class="bg-fog-49 h-40px flex-1 rounded-4px flex justify-center items-center text-text-3 font-700"
        >
          x81
        </div>
        <div
          @click="quantity = 243"
          class="bg-fog-49 h-40px flex-1 rounded-4px flex justify-center items-center text-text-3 font-700"
        >
          x243
        </div>
      </div>
      <van-button
        block
        native-type="submit"
        class="text-text-3 bc-login-btn !w-100%"
      >
        Bet | {{ betValue }}
      </van-button>
    </div>
  </van-popup>
</template>
<script lang="ts" setup>
import Record from "./components/record.vue";
import Tabs from "./components/tabs.vue";
import Continuos from "./components/continuos.vue";
import BcCountDown from "@/components/bc-count-down/index.vue";
const options = ref([
  { label: "Record", value: "record" },
  { label: "Probability", value: "probability" },
  {
    label: "Continuos",
    value: "continuos"
  }
]);
const activeOptions = ref("record");
const showBottom = ref(true);
const betValue = ref(0);
const quantity = ref(0);

const betNumber = ref<number | string>("Red");
const betColor = ref("red");
</script>
<style lang="less" scoped>
.bounce-view {
  color: white;
  &__title {
    padding: 10px 12px;
    padding-top: 0px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-left {
      display: flex;
      color: white;
      > img {
        width: 50px;
        margin-right: 5px;
      }
    }
    // &-right {
    //   display: flex;
    //   color: white;
    //   gap: 6px;
    //   align-items: stretch;
    //   > span {
    //     font-size: 18px;
    //     font-weight: 700;
    //   }
    //   > div {
    //     width: 30px;
    //     height: 30px;
    //     background: #3dc119;
    //     border-radius: 3px;
    //     position: relative;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     font-size: 18px;
    //     &::after {
    //       content: " ";
    //       position: absolute;
    //       width: 100%;
    //       height: 1px;
    //       background: white;
    //       top: 50%;
    //       left: 0;
    //     }
    //   }
    // }
  }
  &__main {
    padding: 0 12px;
    &-bar {
      justify-content: space-between;
      .bar-title {
        padding: 10px 0px;
      }
      .bar-item {
        display: flex;
        justify-content: space-between;
        > div {
          height: 47px;
          width: 104px;
          border-radius: 4px;
          text-align: center;
          > p {
            font-weight: 700;
            margin: 0;
            &:nth-child(1) {
              margin-top: 6px;
              font-size: 18px;
            }
            &:nth-child(2) {
              font-size: 11px;
            }
          }
          &:nth-child(1) {
            background: #f05;
          }
          &:nth-child(2) {
            background: #0161d1;
          }
          &:nth-child(3) {
            background: #00b97c;
          }
        }
      }
    }
    &-selection {
      .selection-title {
        padding: 10px 0px;
      }
      .selection-main {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        > div {
          height: 47px;
          width: 61px;
          border-radius: 4px;
          margin-bottom: 12px;
          text-align: center;
          > p {
            margin: 0;
            &:nth-child(1) {
              margin-top: 6px;
              font-size: 18px;
            }
            &:nth-child(2) {
              font-size: 11px;
            }
          }
          &:nth-child(1) {
            background: linear-gradient(
              37.5deg,
              #00b97c 0 50%,
              #0161d1 50% 100%
            );
          }
          &:nth-child(2) {
            background: #f05;
          }
          &:nth-child(3) {
            background: #00b97c;
          }
          &:nth-child(4) {
            background: #f05;
          }
          &:nth-child(5) {
            background: #00b97c;
          }
          &:nth-child(6) {
            background: linear-gradient(37.5deg, #f05 0 50%, #0161d1 50% 100%);
          }
          &:nth-child(7) {
            background: #00b97c;
          }
          &:nth-child(8) {
            background: #f05;
          }
          &:nth-child(9) {
            background: #00b97c;
          }
          &:nth-child(10) {
            background: #f05;
          }
        }
      }
    }
  }
}
</style>
