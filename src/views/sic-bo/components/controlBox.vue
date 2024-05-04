<template>
    <div class="w-100vw px-15px pt-15px pb-15px fixed bottom-0 control">
        <div class="flex">
            <div class="input-box flex relative">
                <van-field class="van-input" @update:model-value="updata" v-model="inputNum" type="digit" />
                <div class="add-btn justify-center items-center">
                    <div class="add-icon" @click="addNum"></div>
                </div>
                <div class="absolute right-50px lh-40px text-10px">{{ DEFAULT_CURRENCY }}</div>
            </div>
            <!-- <div class='number-btn w-84px h-40px text-14px flex justify-center items-center ml-5px'>
                <p class="p-0px m-0px block">{{$t("sicbo.number")}}<br>{{$t("sicbo.basket")}}</p>
            </div> -->
            <div class='bet-btn w-64px h-40px text-14px lh-40px text-center ml-10px' @click="clickBet">
                {{ $t("sicbo.bet") }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { sicboStore } from "@/stores/lottery/sicboStore"
import { gameInfoStore } from '@/stores/gameStore';
import { gameBetSlot } from "@/api/game"
import { showToast, showLoadingToast, closeToast } from "vant";
import AudioManager from "@/utils/AudioManager"
import { useUserStore } from "@/stores/user";
import { DEFAULT_CURRENCY } from "@/const";

const sicStore = sicboStore()
const gameStore = gameInfoStore();
const userStore = useUserStore();

const inputNum = ref<number>(100);

const addNum = () => {
    inputNum.value = Number(inputNum.value) + 10
}

const clickBet = async () => {
    AudioManager.playSound('bet')
    showLoadingToast({ duration: 0 });
    let areaBetList = {};
    sicStore.choices.forEach(item => {
        let [area, bet] = item.split('-');
        if (!areaBetList[area]) {
            areaBetList[area] = [];
        }
        areaBetList[area].push(bet);
    });
    let params = {
        gameId: gameStore.id,
        betInterval: inputNum.value || 100,
        issue: gameStore?.item?.issue,
        areaBetList
    };

    try {
        let res = await gameBetSlot(params);
        if (res?.data?.balance >= 0) {
            userStore.setUserBalance({ ...userStore.userBalance, balance: res?.data.balance })
        }
        closeToast();
        showToast({ message: res?.msg });
    } catch (error) {
        closeToast();
    }
};


const updata = (v: string) => {
    if (Number(v) !== 0 && Number(v) < 10) { inputNum.value = 10 };
}
</script>

<style lang="less" scoped>
.control {
    background: #371d68;
}

.input-box {
    border-color: #a45acc;
    background: #8144a4;
    width: 180px;
    height: 40px;
    // padding-right: 40px;
    margin-right: 4px;
    color: #fff;
    // border: 2px solid #40424b;
    border-radius: 5px;
    --fog-13: none !important;
}

.add-btn {
    width: 40px;
    height: 40px;
    background: #8144a3;
    border-top: 2px solid #40424b;
    border-right: 2px solid #40424b;
    border-bottom: 2px solid #40424b;
    border-radius: 0px 5px 5px 0px;
    display: flex;
}

.add-icon {
    background: url('~/sic-bo/add-icon.png') no-repeat top left / 100% 100%;
    background-size: 20px 20px;
    width: 20px;
    height: 20px;
}

.van-input {
    background: #8144a3;
    width: 140px;
    height: 40px;
    border: 2px solid #40424b;
    border-radius: 5px 0px 0px 5px;
}

.van-add {
    // height: 40px;
    width: 40px;
    border-color: #a45acc;
    background: #8144a3;
}

.number-btn {
    background-color: #8c367e;
    border-radius: 5px;
    text-align: center;
    color: #fff;
}

.bet-btn {
    background-color: #e6c553;
    border-radius: 5px;
    color: #fff;
}
</style>
