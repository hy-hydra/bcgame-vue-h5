<template>
    <div v-if="showMoneyBox" class="money-box fixed justify-center pt-10px bottom-70px left-0px h-110px w-100vw flex">
        <div class="money-100 w-60px h-60px" @click="() => { selectedMoney(0) }"></div>
        <div class="money-500 w-60px h-60px" @click="() => { selectedMoney(1) }"></div>
        <div class="money-2000 w-60px h-60px" @click="() => { selectedMoney(2) }"></div>
        <div class="money-5000 w-60px h-60px" @click="() => { selectedMoney(3) }"></div>
        <div class="money-20000 w-60px h-60px" @click="() => { selectedMoney(4) }"></div>
        <div class="money-50000 w-60px h-60px" @click="() => { selectedMoney(5) }"></div>
    </div>
    <div class="w-100vw h-90px px-16px pt-12px pb-0 fixed bottom-0 control">
        <div class="flex justify-center">
            <div @click="showMoneyBox = true" class="input-box flex w-112px h-42px relative">
                <img :src="moneyList[selectMoney]" class="w-70px h-70px absolute bottom-0">
            </div>
            <div class='del-btn w-54px h-42px  ml-16px'>
            </div>
            <div @click="clickBetBtn"
                :class="['bet-btn', 'w-145px', 'h-42px', 'ml-16px', store?.choices?.length ? '' : 'grayscale-100']">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import money100 from '~/pk-10/money-100.png';
import money500 from '~/pk-10/money-500.png';
import money2000 from '~/pk-10/money-2000.png';
import money5000 from '~/pk-10/money-5000.png';
import money20000 from '~/pk-10/money-20000.png';
import money50000 from '~/pk-10/money-50000.png';
import { pk10Store } from "../pk10Store"
import { gameBetLottery } from "@/api/game"
import { gameInfoStore } from '@/stores/gameStore';
import { showToast, showLoadingToast, closeToast } from "vant";
import AudioManager from "@/utils/AudioManager"
import { useUserStore } from "@/stores/user";

const store = pk10Store()
const gameStore = gameInfoStore();
const userStore = useUserStore();

const showMoneyBox = ref<boolean>(false)
const moneyList = [money100, money500, money2000, money5000, money20000, money50000]
const moneyValueList = [100, 500, 2000, 5000, 20000, 50000]
let moneyValue = 100
const selectMoney = ref<number>(0)

const selectedMoney = (index) => {
    selectMoney.value = index
    moneyValue = moneyValueList[index]
    showMoneyBox.value = false
}

const clickBetBtn = async () => {
    AudioManager.playSound('bet')

    showLoadingToast({
        duration: 0,
    })
    let areaBetList = {};
    store?.choices.forEach(item => {
        let [area, bet] = item.split('-');
        if (!areaBetList[area]) {
            areaBetList[area] = [];
        }
        areaBetList[area].push(bet);
    });
    let params = {
        gameId: gameStore.id,
        betInterval: moneyValue,
        issue: gameStore.item?.issue,
        areaBetList
    }
    let res = await gameBetLottery(params)
    console.log(areaBetList)
    if (res?.data?.balance >= 0) {
        userStore.setUserBalance({ ...userStore.userBalance, balance: res?.data.balance })
    }
    closeToast();
    showToast({
        message: res?.msg
    })
}
</script>

<style lang="less" scoped>
.control {
    background: url('~/pk-10/contro-bg.png') no-repeat top left / 100% 100%;
}

.input-box {
    background: url('~/pk-10/select-bg.png') no-repeat top left / 100% 100%;
}

.del-btn {
    background: url('~/pk-10/select-del.png') no-repeat top left / 100% 100%;
}

.bet-btn {
    background: url('~/pk-10/bet.png') no-repeat top left / 100% 100%;
}

.money-100 {
    background: url('~/pk-10/money-100.png') no-repeat top left / 100% 100%;
}

.money-500 {
    background: url('~/pk-10/money-500.png') no-repeat top left / 100% 100%;
}

.money-2000 {
    background: url('~/pk-10/money-2000.png') no-repeat top left / 100% 100%;
}

.money-5000 {
    background: url('~/pk-10/money-5000.png') no-repeat top left / 100% 100%;
}

.money-20000 {
    background: url('~/pk-10/money-20000.png') no-repeat top left / 100% 100%;
}

.money-50000 {
    background: url('~/pk-10/money-50000.png') no-repeat top left / 100% 100%;
}

.money-box {
    background-color: #5d6674;
    border-radius: 20px 20px 0 0;
}
</style>