<template>
  <div class="game-page">
    <div ref="gamec" class="game-view"></div>
    <div class="game-tool">
      <div class="game-box">
      </div>
      <div v-if="activeTab === 'manual'">
        <div class="game-bt" @click="onBet">{{ btnText }}</div>
        <div>
          <div class="amount-label">
            <span>Amount</span>
          </div>
          <div class="input-control">
            <img width="30" height="20" src="@/assets/coin/JPY.webp" />
            <div class="amount-input">
              <input class="amount-input-detail" v-model="amount" value="1000" />
            </div>
            <div class="amount-btn">
              <button class="amount-customize" @click="changeAmount(0.5)">/2</button>
              <button class="amount-customize" @click="changeAmount(2)">x2</button>
              <button class="amount-customize" @click="">
                ⇕
              </button>
            </div>
          </div>
        </div>

        <div>
          <div class="amount-label">
            <span>Auto cash out</span><span>chance<span class="chance-percent"> 1.01%</span></span>
          </div>
          <div class="input-control">
            <div class="amount-input">
              <input class="amount-input-detail" v-model="betsNumber" />
            </div>
            <div class="amount-btn">
              <button class="amount-customize" @click="changeBetsNumber('prev')">↼</button>
              <button class="amount-customize" @click="changeBetsNumber('next')">⇀</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'advanced'" class="betting-box">
        <div class="cash-out-bt">cash out</div>
        <div class="on-win">
          <div class="on-win-content">
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
              <button class="on-win-customize"> Run </button>
            </div>
          </div>
        </div>

        <div class="on-win">
          <div class="on-win-content">
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
              <button class="on-win-customize"> Run </button>
            </div>
          </div>
        </div>

        <div class="on-win">
          <div class="on-win-content">
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
              <button class="on-win-customize"> Run </button>
            </div>
          </div>
        </div>
        <div class="add-script-bt">Add a script</div>
        <div class="help-box">
          <img class="question-mark" src="@/assets/main/question-mark.webp" />
          <p class="script-tips">
            Use of scriptis optional and players must take full responsibiity for any attendant risks. We will not be
            held liable in this regard.
          </p>
        </div>
      </div>
      <div class="mode-tab">
        <button :class="{ active: activeTab === 'manual' }" @click="changeTab('manual')">Manual</button>
        <button :class="{ active: activeTab === 'advanced' }" @click="changeTab('advanced')">Advanced</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { sdkStore } from '@/stores/sdkStore';
import ioClass from "@/views/games/service/ws";
import { useUserStore } from "@/stores/user";

const gamec = ref(null);
const amount = ref(1000);
const betsNumber = ref('100x');
const sdk = sdkStore();
var btnText = ref("start");
let game;
const name = "crash"

var activeTab = ref("manual");

let io;
let bet = null;
let betAmount = 100;
const userStore = useUserStore();
const result = ref<{balance?: number, winAmount?: string}>({})

const STATUS = {
  BET: 1,   //可以下注
  BETING: 2, //下注后，等待开始或取消下注
  CRASH_OUT: 3, // crash out 后
  NEXT_BET: 4, // 游戏过程中，显示
  PLAYING: 5, //游戏开始，等待crashout
};


const crashStatus = ref(STATUS.BET);

const setStatus = (status) => {

  switch (status) {
    //重置为可下注状态
    case STATUS.BET:
      btnText.value = "Bet";
      crashStatus.value = STATUS.BET;
      break;

    //已经下注，等待开始或可以取消。
    case STATUS.BETING:
      btnText.value = crashStatus.value === STATUS.BET ? "Loading" : "Cancel";
      crashStatus.value = STATUS.BETING;
      break;

    case STATUS.PLAYING:
      btnText.value = "Playing";
      crashStatus.value = STATUS.PLAYING;
      break;

    //游戏开始，可以跳出。
    case STATUS.CRASH_OUT:
      btnText.value = "Crash Out";
      crashStatus.value = STATUS.CRASH_OUT;
      // io.send({
      //   msgId: 5002,
      //   data: {
      //     rate: game.emit("get:value")
      //   }
      // });
      //发送跳出事件。
      break;

    //游戏开始，可以跳出。
    case STATUS.NEXT_BET:
      btnText.value = "Next Bet";
      crashStatus.value = STATUS.NEXT_BET;
      break;

  }


};

onMounted(async () => {

  game = await sdk.mountGame({ container: gamec.value, name });
  game.on("event:over", (data) => {
    if(data.amount){
      userStore.setUserBalance({...userStore.userBalance, balance: result.value.balance})
    }
    // winAmount.value = result.value.winAmount
  })
  io = new ioClass()
  // let app = game.app;

  // game.width = app.screen.width;
  // game.height = app.screen.height;
  // game.reset();

  io.bindEvent(name, (msgId, data) => {


    switch (msgId) {

      case 5070:
        console.log(`【进入游戏】`, data);
        game.emit("game:start");
        game.emit("game:play", Number(data.rate));
        if(data.status === 0){
          setStatus(STATUS.BET);         
        }else{          
          setStatus(STATUS.NEXT_BET);
        }
        
        
        
        userStore.setUserBalance({...userStore.userBalance, balance: data.balance})
        break;

      case 5071:

        console.log(`【游戏开始】倒计时:${data.interval},time:${io.parseTime(data.startTimestamp)}`);

        if (crashStatus.value === STATUS.BETING) {
          btnText.value = "Loading"
        } else {
          setStatus(STATUS.BET);
        }

        if (crashStatus.value === STATUS.BETING) {
          btnText.value = "Loading"
          setTimeout(_ => {

            if (crashStatus.value === STATUS.BETING) {
              io.send({
                msgId: 5000,
                data: {
                  ball: 1,
                  amount: amount.value
                }
              });
            }

            // setStatus(STATUS.PLAYING);
          }, (Number(data.interval) - 2) * 1000);

          setTimeout(_ => {
            setStatus(STATUS.CRASH_OUT);
          }, (Number(data.interval)) * 1000);

        } else {
          setTimeout(_ => {
            if (crashStatus.value === STATUS.BETING) {
              setStatus(STATUS.CRASH_OUT);
            } else {
              setStatus(STATUS.NEXT_BET);
            }

          }, (Number(data.interval)) * 1000);
        }

        //设置倒计时时长
        game.emit("set:countdown", Number(data.interval));
        game.emit("game:start");
        game.emit("game:play");
        break;

      //游戏结束
      case 5073:

        console.log(`【游戏结束】time:${Number(data.startTimestamp)},rate:${data.rate}`);

        game.emit("game:end", Number(data.rate));
        // game.end(Number(data.rate));

        break;

      case 5074:

        let t = Number(data.timestampInterval);
        let value = getValueByTime(t);

        console.log(`【游戏更新】time:${tn(Number(data.timestampInterval))},rate:${data.rate},value:${value},${tn(game.gameTime)}:${game.gmvalue}`);
        // console.log(`【游戏更新】time:${tn(Number(data.timestampInterval))},rate:${data.rate},value:${value.toFixed(3)},${tn(game.gameTime)}:${game.gmvalue.toFixed(3)}`);
        // game.start(data.rate);
        data.winners.length > 0 && data.winners.map(winner => {
          console.log(winner.name)
          game.emit("set:text", winner.name, Number(data.profit))
            ;
        })
        game.emit("game:play", Number(data.rate));


        break;

      case 5001:
        console.log(`【下注成功】amount:${data.amount}`);
        break;

      case 5003:
        console.log(`【crashOut】`, data);
        result.value.balance = Number(data.score)
        result.value.winAmount = data.winAmount
        // setTimeout( () => {
        //   userStore.setUserBalance({...userStore.userBalance, balance: data.score})
        //   // winAmount.value = data.amount * data.rate
        // }, 500)
        break;

      case 5072:
        console.log(`【下注】amount:${betAmount}`);
        break;


      default:
        console.log("default", msgId, data);
        break;
    }

  });
  setStatus(STATUS.BET);

});

onUnmounted(async () => {
  await sdk.unmountGame(name)
  io.leave()
});


function tn(n) {


  return (n / 1000).toFixed(3)
}

function getValueByTime(ms) {

  const FPS = 1000 / 60;
  let count = Math.floor(ms / FPS);

  let
    speed = 0.02,
    speedScale = 0.02,
    accSpeed = 0.0005,
    accScale = 0.0001,
    value = 1;


  while (count-- > 0) {
    speed = speed + accSpeed;
    accSpeed = accSpeed + accSpeed * accScale;
    value = value + (speedScale * speed);
  }

  return value

}


const onBet = _ => {

  switch (crashStatus.value) {
    case STATUS.BET:
      setStatus(STATUS.BETING);
      break;
    case STATUS.NEXT_BET:
      setStatus(STATUS.BETING);
      break;
    case STATUS.CRASH_OUT:
      io.send({
        msgId: 5002,
        data: {
          rate: game.emit("get:value")
        }
      });
      setStatus(STATUS.NEXT_BET);
      break;
    case STATUS.BETING:
      if (btnText.value === "Cancel") {
        console.log("------------")
        setStatus(STATUS.NEXT_BET);
      }
      break;
  }

  // bet = io.send({
  //   msgId: 5000,
  //   data: {
  //     betAmount: amount.value,
  //     ball: 1
  //   }
  // });

  //   io.ws.addEventListener("message", function(event) {
  //   const message = JSON.parse(event.data);
  //   console.log("winAmount:",message.data.winAmount);
  // });

};

const changeAmount = (val) => {
  if (val === 2) amount.value *= 2;
  if (val === 0.5) amount.value /= 2;
}

const changeTab = (tab) => {
  activeTab.value = tab;
}


const changeBetsNumber = (op) => {
  if (op === 'prev')
    betsNumber.value = (parseInt(betsNumber.value) - 1) + 'x'
  else
    betsNumber.value = (parseInt(betsNumber.value) + 1) + 'x';
}

</script>

<style lang="less" scoped>
.game-view {
  background: #17191b;
  width: 100%;
  height: 61.8vw;
}

.game-page {
  width: 100%;
  padding: 0 5vw;
}

.game-tool {
  padding: .75rem;
  background: #2e3035;
}

.game-bt {
  height: 54px;
  border-radius: .25rem;
  color: #fff;
  background-color: #1d803ab3;
  background-image: conic-gradient(from 1turn, rgba(88, 175, 16, 1), rgba(29, 128, 58, 1));
  text-align: center;
  line-height: 54px;
  font-size: 1.5rem;
  margin: 0 0 15px 0;
}

.cash-out-bt {
  cursor: default;
  height: 3.5rem;
  color: #fff;
  background-color: #f19511b3;
  background-image: conic-gradient(from 1turn, #F6C722, #F19511);
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}

.add-script-bt {
  color: #fff;
  background-color: #6e34e2b3;
  background-image: conic-gradient(from 1turn, rgba(136, 83, 252, 1), rgba(110, 52, 226, 1));
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  margin: 10px 0;
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

.amount-input {
  // width: 90%;
  // margin: 0 0 0 5px;
  padding: 0 2px 0 2px;
  background-color: #222328;
  display: flex;

  .amount-input-detail {
    width: 60%
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
    background-color: #31343B;
    margin-right: .25rem;
    color: #ffffff;
    border: none;
  }
}

.amount-input-detail {
  padding: 0 3px 0px 5px;
  // width: 32px;
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
  // height: 54px;
  border-radius: .25rem;
  color: #222328;
  background-color: #222328;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;

  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
}

.row {
  border-radius: .25rem;
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

.on-win {
  width: 100%;
  margin-top: .4rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  justify-content: flex-start;
  align-items: flex-start;
}

.on-stopwin,
.on-stoplose {
  width: 100%;
  margin-top: .4rem;
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
    background-color: #31343B;
    margin-right: 0.25rem;
    color: #ffffff;
    border: none;
  }
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
    background: linear-gradient(180deg, rgba(59, 193, 23, 0) 20%, rgba(59, 193, 23, .2) 100%);
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
</style>
