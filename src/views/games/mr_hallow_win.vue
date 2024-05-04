<template>
  <div class="game-page">
    <div ref="gamec" class="game-view"></div>
  </div>
</template>

<script setup lang="ts">
import { sdkStore } from '@/stores/sdkStore';

const gamec = ref(null);
const sdk = sdkStore();
let game;
const io = sdk.io;

console.log("sdk", sdk);

onMounted(async () => {


  game = await sdk.mountSlots({ container: gamec.value, name: "mr_hallow_win" });
 
  // game.reset();
  // // 监听游戏中点击开始事件
  // game.agent.on("start", ()=>{
  //   onBet(null);
  // })



  
  io.bindEvent("ox", (msgId, data) => {


    switch (msgId) {

    
      case 6001:
        console.log(`【设置押注回应】`, data);
        // game.agent.emit("startSpin", data);
      break;

      default:
        console.log(msgId, JSON.stringify(data));
      break;
    }
  });
});

const onBet = _=>{
  console.log("bet--1");
  io.send({
    msgId: 6000,
    data: {
      betAmount: 100
    }
  });
};

</script>

<style lang="less" scoped>
.game-view {
  background: #17191b;
  width: 100%;height: 100%;
  overflow: hidden;
  margin: auto;
}

.game-page {
  width: 100%;
  height: 100%;
}
.game-tool{
  padding: .75rem;
  background: #2e3035;
}

.game-bt{
  height: 54px;
  border-radius: .25rem;
  color: #fff;
    background-color: #1d803ab3;
    background-image: conic-gradient(from 1turn,rgba(88,175,16,1),rgba(29,128,58,1));
    text-align: center;
    line-height: 54px;
    font-size: 1.5rem;
}

</style>
