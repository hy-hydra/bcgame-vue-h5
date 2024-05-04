<template>
  <div class="game-page">
    <div ref="gamec" class="game-view"></div>
    <div class="game-tool">
      <div>
        <span>Payout</span>
        <div>
          <van-field v-model="payout" />
        </div>
      </div>
      <div>
        <span>Win Chance</span>
        <div>
          <van-field disabled v-model="chanceText" />
        </div>
      </div>
      <div class="game-box"></div>
      <div class="game-bt" @click="onBet">Game bet</div>
      <div v-if="activeTab === 'manual'">
        <div>
          <div class="amount-label">
            <span>Amount</span><span>≈0.0000962 BTC</span>
          </div>
          <div class="input-control">
            <img width="30" height="20" src="@/assets/coin/JPY.webp" />
            <div class="amount-input">
              <input class="amount-input-detail" v-model="amount" value="1000" />
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
      </div>
      <div v-if="activeTab === 'auto'" class="betting-box">
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
      <div v-if="activeTab === 'advanced'" class="betting-box">
        <div class="on-win">
          <div class="run-content">
            <div class="on-win-input">
              <input type="text" placeholder="Simple" disabled />
              <span><svg class="h-20 w-20 text-gray-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />
                  <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" />
                </svg></span>
            </div>
            <div class="on-win-btn">
              <button class="on-win-customize">Run</button>
            </div>
          </div>
        </div>

        <div class="on-win">
          <div class="run-content">
            <div class="on-win-input">
              <input type="text" placeholder="Martingale" disabled />
              <span><svg class="h-20 w-20 text-gray-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />
                  <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" />
                </svg></span>
            </div>
            <div class="on-win-btn">
              <button class="on-win-customize">Run</button>
            </div>
          </div>
        </div>

        <div class="on-win">
          <div class="run-content">
            <div class="on-win-input">
              <input type="text" placeholder="Payout Martingale" disabled />
              <span><svg class="h-20 w-20 text-gray-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />
                  <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" />
                </svg></span>
            </div>
            <div class="on-win-btn">
              <button class="on-win-customize">Run</button>
            </div>
          </div>
        </div>
        <div class="add-script-bt">Add a script</div>
        <div class="help-box">
          <img class="question-mark" src="@/assets/main/question-mark.webp" />
          <p class="script-tips">
            Use of scriptis optional and players must take full responsibiity
            for any attendant risks. We will not be held liable in this regard.
          </p>
        </div>
      </div>
      <div class="mode-tab">
        <button :class="{ active: activeTab === 'manual' }" @click="changeTab('manual')">
          Manual
        </button>
        <button :class="{ active: activeTab === 'auto' }" @click="changeTab('auto')">
          Auto
        </button>
        <button :class="{ active: activeTab === 'advanced' }" @click="changeTab('advanced')">
          Advanced
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
let game;
const payout = ref(1.01);
const chance = ref(0.99);
const chanceText = ref("0.99%");
const high = ref(false);
var activeTab = ref("manual");
var amount = ref(100);
var betsNumber = ref("∞");
var activeWinTab = ref("reset");
var activeLoseTab = ref("reset");
const userStore = useUserStore();
const name = "hashdice"
const result = ref<{balance?: number, winAmount?: string}>({})

let io;

watch(
  () => payout.value,
  val => {
    if (!val) {
      chance.value = 0;
    } else {
      chance.value = Math.floor((1 / val) * 100) / 100;
    }
    chanceText.value = `${chance.value}%`;
  }
);

let bet = null;
onMounted(async () => {
  game = await sdk.mountGame({ container: gamec.value, name });
  game.on("event:over", (data) => {
    userStore.setUserBalance({...userStore.userBalance, balance: result.value.balance})
    // winAmount.value = result.value.winAmount
  })
  io = new ioClass()

  io.bindEvent(name, (msgId, data) => {
    switch (msgId) {
      case 5370:
        console.log(`【进入游戏】`, data);
        break;

      case 5303:
        game.emit("game:play", data.random);
        result.value.balance = Number(data.balance)
        result.value.winAmount = data.winAmount
        // setTimeout( () => {
        //   userStore.setUserBalance({...userStore.userBalance, balance: data.balance})
        //   // winAmount.value = data.winAmount
        // }, 5000)

      case 5301:
        break;

      default:
        break;
    }
  });
});

const onBet = _ => {
  high.value = game.emit("get:flag");
  bet = io.send({
    msgId: 5302,
    data: {
      betAmount: amount.value,
      winChance: chance.value,
      payOut: payout.value,
      high: high.value
    }
  });
};

onUnmounted(async () => {
  await sdk.unmountGame(name)
  io.leave()
});

const changeAmount = val => {
  if (val === 2) amount.value *= 2;
  if (val === 0.5) amount.value /= 2;
};

const changeTab = tab => {
  activeTab.value = tab;
};

const changeBetsNumber = val => {
  betsNumber.value = val;
};

const changeWinTab = tab => {
  activeWinTab.value = tab;
};

const changeLoseTab = tab => {
  activeLoseTab.value = tab;
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

.mode-tab {
  display: flex;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 0.5rem;

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
  }
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

.amount-input {
  padding: 0 2px 0 2px;
  background-color: #222328;
  display: flex;

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
  padding: 0 3px 0px 5px;
  height: 24px;
  margin: 0;
  border-width: 0px;
  background-color: #222328;
  font-weight: bold;
  color: #fff;
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

.segment {
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
}

.betting-box {
  display: flex;
  flex-direction: column;
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

.amount-label {
  display: flex;
  justify-content: space-between;
}

.chance-percent {
  color: #fff;
}

.add-script-bt {
  color: #fff;
  background-color: #6e34e2b3;
  background-image: conic-gradient(from 1turn,
      rgba(136, 83, 252, 1),
      rgba(110, 52, 226, 1));
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  margin: 10px 0;
}

.cash-out-bt {
  cursor: default;
  height: 3.5rem;
  color: #fff;
  background-color: #f19511b3;
  background-image: conic-gradient(from 1turn, #f6c722, #f19511);
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
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

.winTabs {
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
  }

  &>button.active {
    background-color: #31343b;
    color: #fff;
    // border: 0.1px solid gray;
    border-radius: 2px;
  }
}

.run-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: min(0.533vw, 4px) min(1.6vw, 12px);
  border-radius: 0.25rem;
  background-color: #222328;
  padding-left: 0.75rem;
  padding-right: 0.1875rem;
  margin: 0.4rem 0;
  height: 3.25rem;

  button {
    width: 3.75rem;
    height: 2.75rem;
    border-radius: 0.25rem;
    background-color: #31343b;
    margin-right: 0.25rem;
    color: #ffffff;
    border: none;
  }
}
</style>
