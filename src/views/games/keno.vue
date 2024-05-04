<template>
  <div class="game-page">
    <div ref="gamec" class="game-view"></div>
    <div class="game-tool">
      <div class="game-keno-ctrl-panel">
        <button @click="autoPick">
          Auto Pick
        </button>
        <button @click="clearTable">
          Clear Table
        </button>
      </div>
      <div class="game-bt" @click="onBet">Bet</div>
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
      <div v-if="activeTab === 'manual'" class="betting-box">
        <div>
          <span>Risk</span>
          <div class="risk">
            <van-tabs class="riskTabs" type="card" v-model:active="riskVal" @click-tab="changeRisk" color="#31343b"
              background="#222328" title-active-color="#FFFCF3" title-inactive-color="#91a1b5">
              <van-tab title="Low" />
              <van-tab title="Classic" />
              <van-tab title="Medium" />
              <van-tab title="High" />
            </van-tabs>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'auto'" class="betting-box">
        <div>
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
        <div class="on-win">
          <span>On win</span>
          <div class="on-win-content">
            <div class="winTabs">
              <button :class="{ active: activeWinTab === 'reset' }" @click="changeWinTab('reset')">
                Reset
              </button>
              <button :class="{ active: activeWinTab === 'increase' }" @click="changeWinTab('increase')">
                Increase by
              </button>
            </div>
            <div class="on-win-input">
              <input type="text" />
              <span>%</span>
            </div>
          </div>
        </div>
        <div class="on-win">
          <span>On Lose</span>
          <div class="on-win-content">
            <div class="winTabs">
              <button :class="{ active: activeLoseTab === 'reset' }" @click="changeLoseTab('reset')">
                Reset
              </button>
              <button :class="{ active: activeLoseTab === 'increase' }" @click="changeLoseTab('increase')">
                Increase by
              </button>
            </div>
            <div class="on-win-input">
              <input type="text" />
              <span>%</span>
            </div>
          </div>
        </div>
        <div class="on-stopwin">
          <span>Stop on win</span>
          <div class="on-stopwin-content">
            <div class="on-stopwin-input">
              <input type="text" value="0.00000000" />
              <img src="@/assets/coin/JB.webp" class="coin" width="16" />
            </div>
          </div>
        </div>
        <div class="on-stoplose">
          <span>Stop on lose</span>
          <div class="on-stopwin-content">
            <div class="on-stopwin-input">
              <input type="text" value="0.00000000" />
              <img src="@/assets/coin/JB.webp" class="coin" width="16" />
            </div>
          </div>
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
const sdk = sdkStore();
let io;

let game;

let bet = null;
var amount = ref(100);
var betsNumber = ref("∞");
var riskVal = ref("");
const risk = ref(1);
const selects = ref([]);
var activeTab = ref("manual");
var activeWinTab = ref("reset");
var activeLoseTab = ref("reset");
var slidFlag = ref(false);
const userStore = useUserStore();
const name = "keno"
const result = ref<{balance?: number, winAmount?: string}>({})

onMounted(async () => {
  game = await sdk.mountGame({ container: gamec.value, name });
  game.on("event:over", (data) => {
    userStore.setUserBalance({...userStore.userBalance, balance: result.value.balance})
    // winAmount.value = result.value.winAmount
  })
  io = new ioClass()
  // let app = game.app;

  // game.width = app.screen.width;
  // game.height = app.screen.height;
  // game.reset();

  io.bindEvent(name, (msgId, data) => {
    switch (msgId) {
      case 5570:
        console.log(`【进入游戏】`, data);
        // game.reset();
        // game.start(data.rate);
        break;

      case 5501:
        console.log(`【押注回应】`, data);
        game.emit("game:play", data.random);
        result.value.balance = Number(data.balance)
        result.value.winAmount = data.winAmount
        // setTimeout( () => {
        //   userStore.setUserBalance({...userStore.userBalance, balance: data.balance})
        //   // winAmount.value = data.winAmount
        // }, 500)
        break;

      default:
        console.log(msgId, JSON.stringify(data));
        break;
    }
  });
});

const clearTable = async () => {
  game.emit("game:clear_table");
};

const autoPick = () => {
  game.emit("game:auto_pick")
};

const onBet = _ => {
  selects.value = game.emit("get:select");
  bet = io.send({
    msgId: 5500,
    data: {
      betAmount: amount.value.toString(),
      betNumbers: selects.value,
      risk: risk.value
    }
  });
};

onUnmounted(async () => {
  await sdk.unmountGame(name)
  io.leave()
});


const changeRisk = val => {
  if (slidFlag.value) {
    return;
  }
  risk.value = val.name + 1
  console.log("risk change:", risk);
  let riskStr = "low";
  if (val.name == 0) {
    riskStr = "low";
  } else if (val.name == 1) {
    riskStr = "classic";
  } else if (val.name == 2) {
    riskStr = "medium";
  } else if (val.name == 3) {
    riskStr = "high";
  }
  // game.changeRisk(riskStr);
  game.emit("set:risk", riskStr);
};

const changeBetsNumber = val => {
  betsNumber.value = val;
};

const changeAmount = val => {
  if (val === 2) amount.value *= 2;
  if (val === 0.5) amount.value /= 2;
};

const changeWinTab = tab => {
  activeWinTab.value = tab;
};

const changeLoseTab = tab => {
  activeLoseTab.value = tab;
};

const changeTab = tab => {
  activeTab.value = tab;
};
</script>

<style lang="less" scoped>
.game-view {
  background: #17191b;
  width: 100%;
  height: 104vw;
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

span {
  padding-bottom: 10;
  color: #91a1b5;
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

.amount-customize {
  width: 32px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-color: rgb(49, 52, 59);
  border-width: 0.5px;
  background-color: #222328;
}

.amount-input {
  padding: 0 2px 0 2px;
  background-color: #222328;

  .amount-input-detail {
    width: 60%;
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

.amount-input-detail {
  padding: 0 3px 0px 0;
  // width: 32px;
  height: 24px;
  margin: 0;
  border-width: 0px;
  background-color: #222328;
}

.betting-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.on-win {
  width: 100%;
  margin-top: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  justify-content: flex-start;
  align-items: flex-start;
}

.on-stopwin,
.on-stoplose {
  width: 100%;
  margin-top: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  justify-content: flex-start;
  align-items: flex-start;
}

.on-win-content,
.on-stopwin-content {
  width: 100%;
  display: flex;
  gap: 10px;
}

.on-win-input {
  width: 100%;
  display: flex;
  position: relative;
  min-width: auto;

  &>input {
    background-color: #242328;
    border: 1px solid #242328;
    width: 100%;
    min-width: auto;
  }

  &>span {
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    right: 0.6em;
  }
}

.on-stopwin-input {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  min-width: auto;

  &>input {
    background-color: #242328;
    border: 1px solid #242328;
    width: 100%;
    min-width: auto;
    padding: 12px 30px;
  }

  &>span {
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    right: 0.6em;
  }

  &>.coin {
    position: absolute;
    display: flex;
    align-items: center;
    left: 0.6em;
  }
}

.game-keno-ctrl-panel {
  display: flex;
  gap: 0.5rem;
  width: 100%;

  &>button {
    color: #fff;
    font-size: 12px;
    background-color: #40434b;
    border: 0px;
    padding: 10px 4px;
    white-space: nowrap;
    width: 50%;
    border-radius: 0.2rem;
    height: 3rem;
    margin-bottom: 0.6rem;
  }
}

.winTabs,
.segmentTabs {
  display: flex;
  gap: 4px;
  padding: 0px;
  padding: 0.4rem 0.4rem;
  margin: 0 -0.2rem;
  border-radius: 2px;

  background-color: #242328;

  &>button {
    color: gray;
    font-size: 12px;
    background-color: transparent;
    border: 0px;
    padding: 10px 4px;
    white-space: nowrap;
    min-width: 24%;
  }

  &>button.active {
    background-color: #31343b;
    color: #fff;
    // border: 0.1px solid gray;
    border-radius: 2px;
  }
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

.risk {
  background-color: #222328;
  padding: 0.2rem;
}
</style>
