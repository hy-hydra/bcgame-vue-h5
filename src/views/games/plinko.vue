<template>
  <div class="game-page">
    <div ref="gamec" class="game-view"></div>
    <div class="game-tool">
      <div class="game-bt" @click="onStart">start</div>
      <div>
        <span>Amount</span>
        <div class="input-control">
          <img width="30" height="20" src="@/assets/coin/JPY.webp" />
          <div class="amount-input">
            <input v-model="amount" class="amount-input-detail" />
          </div>
          <div class="amount-btn">
            <button class="amount-customize" @click="changeAmount(0.5)">
              /2
            </button>
            <button class="amount-customize" @click="changeAmount(2)">
              x2
            </button>
            <button class="amount-customize" @click="">
              ⇕
            </button>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'auto'">
        <span>Number of Bets</span>
        <div class="input-control">
          <div class="amount-input">
            <input v-model="betsNumber" class="amount-input-detail" />
          </div>
          <div class="amount-btn">
            <button class="amount-customize" @click="changeBetsNumber('∞')">
              ∞
            </button>
            <button class="amount-customize" @click="changeBetsNumber('10')">
              10
            </button>
            <button class="amount-customize" @click="changeBetsNumber('100')">
              100
            </button>
          </div>
        </div>
      </div>
      <div>
        <span>Risk</span>
        <div class="risk">
          <van-tabs class="riskTabs" type="card" v-model:active="riskVal" @click-tab="changeRisk" color="#31343b"
            background="#222328" title-active-color="#FFFCF3" title-inactive-color="#91a1b5"
            :before-change="beforeChange">
            <van-tab title="Low" />
            <van-tab title="Medium" />
            <van-tab title="High" />
          </van-tabs>
        </div>
      </div>
      <div>
        <span>Row</span>
        <div class="row">
          <span style="display: inline-block;color: aliceblue;vertical-align: middle;width: 40px;text-align: center;">{{
            rows }}</span>
          <van-slider class="rowSlider" v-model="value" :max="16" :min="8" bar-height="10px" active-color="#44f15b"
            inactive-color="#44f15b" style="display: inline-block;" @update:model-value="changeRow"
            v-bind:disabled="slidFlag">
            <template #button>
              <div class="custom-button"></div>
            </template>
          </van-slider>
          <span style="display: inline-block;color: aliceblue;width: 40px;text-align: center;">16</span>
        </div>
      </div>
      <div class="help-box">
        <img class="question-mark" src="@/assets/main/question-mark.webp" />
        <p class="script-tips">
          Use of scriptis optional and players must take full responsibiity for
          any attendant risks. We will not be held liable in this regard.
        </p>
      </div>
      <div class="mode-tab">
        <button :class="{ active: activeTab === 'manual' }" @click="changeTab('manual')">
          Manual
        </button>
        <button :class="{ active: activeTab === 'auto' }" @click="changeTab('auto')">
          Auto
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { sdkStore } from "@/stores/sdkStore";
import ioClass from "@/views/games/service/ws";
import { useUserStore } from "@/stores/user";

const gamec = ref(null);
var amount = ref(100);
var betsNumber = ref("∞");
var activeTab = ref("manual");
const sdk = sdkStore();
let io;
let game;

let bet = null;
var value = ref(0);
var riskVal = ref("");
const style = ref(1);
var rows = ref(8);
var slidFlag = ref(false);
const userStore = useUserStore();
const name = "plinko"
const result = ref<{balance?: number, winAmount?: string}>({})

onMounted(async () => {
  console.log(gamec.value);

  game = await sdk.mountGame({ container: gamec.value, name });
  game.on("event:over", (data) => {
    userStore.setUserBalance({...userStore.userBalance, balance: result.value.balance})
    // winAmount.value = result.value.winAmount
  })
  io = new ioClass()

  io.bindEvent(name, (msgId, data) => {
    switch (msgId) {
      case 5670:
        console.log(`【进入游戏】`, data);
        break;

      case 5601:
        console.log(`【押注回应】`, data);
        // slidFlag.value = true;
        game.emit("game:play", Number(data.random));
        result.value.balance = Number(data.balance)
        result.value.winAmount = data.winAmount
        // setTimeout( () => {
        //   userStore.setUserBalance({...userStore.userBalance, balance: data.balance})
        //   // winAmount.value = data.winAmount
        // }, 7000)

        break;

      default:
        console.log(msgId, JSON.stringify(data));
        break;
    }
  });
  // game.setFallOverBack(playOver);
});

const playOver = payout => {
  console.log("最终落下的结果：", payout);
  slidFlag.value = false;
};

const onStart = () => {
  if (activeTab.value == "manual") {
    onBet();
    return;
  } else {
    if (betsNumber.value == "∞") {
      setInterval(onBet, 1000); // Call onBet every 1 second
    } else {
      var betNum = Number(betsNumber.value);
      for (var i = 0; i < betNum; i++) {
        setTimeout(onBet, i * 1000); // Call onBet after i seconds
      }
    }
  }
};

onUnmounted(async () => {
  await sdk.unmountGame(name)
  io.leave()
});

const onBet = () => {
  // if (slidFlag.value) {
  //   console.log("slidFlag");
  //   return;
  // }

  // let settings = game.getSettings();
  const row = game.emit( "get:row");
// 难易程度， 结果是 low/medium/high 三种
  const risk = game.emit( "get:risk");
  console.log("row-risk", row, risk)
  bet = io.send({
    msgId: 5600,
    data: {
      betAmount: amount.value,
      style: style.value,
      layer: rows.value
    }
  });
};

const changeRisk = risk => {
  // if (slidFlag.value) {
  //   return;
  // }
  console.log("risk change:", risk);
  style.value = risk.name + 1;
  let riskStr = "low";
  if (risk.name == 0) {
    riskStr = "low";
  } else if (risk.name == 1) {
    riskStr = "medium";
  } else if (risk.name == 2) {
    riskStr = "high";
  }
  game.emit("set:risk", riskStr);
};

const changeRow = row => {
  console.log("lei change:", row);
  rows.value = row;
  if (game) {
    game.emit("set:row", row);
  }
};
const beforeChange = index => {
  console.log("Risk change Before!!!!", index);
  return !slidFlag.value;
};
const changeBetsNumber = val => {
  betsNumber.value = val;
};

const changeAmount = val => {
  if (val === 2) amount.value *= 2;
  if (val === 0.5) amount.value /= 2;
};

const changeTab = tab => {
  activeTab.value = tab;
};
</script>

<style lang="less" scoped>
.game-view {
  background: #17191b;
  width: 100%;
  height: 100vw;
}

.game-page {
  width: 100%;
  padding: 0 5vw;
}

.game-tool {
  padding: 0.75rem;
  background: #2e3035;
}

.game-bt {
  height: 54px;
  border-radius: 0.25rem;
  color: #fff;
  background-color: #1d803ab3;
  background-image: conic-gradient(from 1turn,
      rgba(88, 175, 16, 1),
      rgba(29, 128, 58, 1));
  text-align: center;
  line-height: 54px;
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
}

.risk {
  border-radius: 0.25rem;
  color: #222328;
  background-color: #222328;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;

  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
}

.row {
  border-radius: 0.25rem;
  color: #222328;
  background-color: #222328;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;

  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  vertical-align: middle;
}

.rowSlider {
  width: 240px;
  align-content: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.custom-button {
  width: 16px;
  height: 28px;
  color: #fff;
  line-height: 18px;
  text-align: center;
  background-color: #fff;
  border-radius: 4px;
}

.input-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 6px;
  border-radius: 0.25rem;
  background-color: #222328;
  padding-left: 0.75rem;
  padding-right: 0.1875rem;
  margin: 0.4rem 0;
  height: 3.25rem;

  img {
    width: 1.25rem;
    height: 1.25rem;
  }
}

.amount-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;

  >button {
    width: 3.75rem;
    height: 2.75rem;
    border-radius: 0.25rem;
    background-color: #31343b;
    margin-right: 0.25rem;
    color: #ffffff;
    border: none;
  }
}

.amount-input {
  padding: 0 2px 0 2px;
  background-color: #222328;

  .amount-input-detail {
    width: 60%;
  }
}

.amount-input-detail {
  padding: 0 3px 0px 0;
  height: 24px;
  margin: 0;
  border-width: 0px;
  background-color: #222328;
}

.mode-tab {
  display: flex;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 3.5rem;

  &>button {
    padding: 10px;
    border: 0px;
    width: 50%;
    background-color: #2e3035;
  }

  &>button.active {
    color: #fff;
    border-bottom: 2px solid var(--primary-color);
    background: linear-gradient(180deg,
        rgba(59, 193, 23, 0) 20%,
        rgba(59, 193, 23, 0.2) 100%);
    border-bottom: 2px solid #3bc117;
  }
}

.help-box {
  width: 100%;
  display: flex;
  margin-top: 0.5rem;

  .question-mark {
    width: 22px;
    height: 15px;
  }

  .script-tips {
    color: #99a4b0;
    font-size: 12px;
    font-weight: 400;
    margin: 0;
  }
}
</style>
