<template>
    <div class="h='[calc(100vh-230px)]' w-100vw mt-15px batting">
        <div class="flex w-95vw mx-auto my-0 batting-box">
            <div v-for="item in BETTING_BOX" :key="item.value" :class="['py-10px', 'px-25px', 'mb-10px', 'batting-box-item', { 'active': choice.includes(item.value) }]" @click="choiceItem(item)">
                <p class="text-15px batting-top-text">{{ item.label }}</p>
                <p class="text-10px  absolute left-0px">{{ gameStore?.item?.config?.betOddsMap[1] }}</p>
            </div>
        </div>
        <div class="flex w-95vw mx-auto my-0 batting-box">
            <div v-for="(item, index) in RETTING_BOX_SINGLE_PRESSURE" :key="item.value" :class="['py-3px', 'px-39px', 'mb-10px', 'batting-box-item', { 'active': choice.includes(item.value) }]" @click="choiceItem(item)">
                <img :src="item.img" alt="" class="w-35px h-35px">
                <span class="text-11px pt-6px pl-4px absolute right-0px bottom-0px ball-txt">{{ index + 1 }}</span>
                <p class="text-10px  absolute left-0px bottom-0px">{{ gameStore?.item?.config?.betOddsMap[2] }}</p>
            </div>
        </div>
        <div class="flex w-95vw mx-auto my-0 batting-box">
            <div v-for="item in RETTING_BOX_DUAL_PRESSURE" :key="item.value" :class="['py-8px', 'px-13px', 'mb-10px', 'batting-box-item', { 'active': choice.includes(item.value) }]" @click="choiceItem(item)">
                <img v-for="i in item.img" :key="i" :src="i" class="w-20px h-20px">
                <p class="text-10px  absolute left-0px bottom-0px">{{ gameStore?.item?.config?.betOddsMap[3] }}</p>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { BETTING_BOX, RETTING_BOX_SINGLE_PRESSURE, RETTING_BOX_DUAL_PRESSURE } from "./content";
import {sicboStore} from "@/stores/lottery/sicboStore"
import { gameInfoStore } from "@/stores/gameStore"
const gameStore = gameInfoStore();

const sicStore = sicboStore()
const choice = computed(() => sicStore.choices);

const choiceItem = (item) => {
  const index = sicStore.choices.indexOf(item.value);
  if (index > -1) {
    const updatedChoices = [...sicStore.choices];
    updatedChoices.splice(index, 1);
    sicStore.updateGameChoices(updatedChoices);
  } else {
    const updatedChoices = [...sicStore.choices, item.value];
    sicStore.updateGameChoices(updatedChoices);
  }
};
</script>
  
<style lang="less" scoped>
.batting-box {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    
    .batting-box-item.active{
        background: #f8d345;
        color: #6036a5;
        .batting-top-text{
            color: #6036a5;
        }
    }

    .batting-box-item {
        color: #ab7eff;
        border-radius: 5px;
        background: #6f3fc8;
        text-align: center;
        border: 1px solid #894ff6;
        position: relative;
        p{
            margin: 0;
        }
    }
}


.ball-txt{
    width: 22px;
    height: 22px;
    text-align: center;
    color: #2e3036;
    border-radius: 100% 0 0 0;
    background: rgba(153,98,255,.5);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all .3s;
    transition: all .3s;
}

.batting-top-text {
    color: #efa4c3;
}
</style>
  