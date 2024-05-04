<template>
    <div class="menu-box text-center px-9px py-6px">
        <div class="text-14px ml-5px mr-5px mt-10px pb-5px border-b-1px border-b-solid border-b-#677386"
            @click.stop="showDescriptionPop = true">{{$t("pk10.game_rule")}}</div>
        <div class="py-9px text-12px mt-5px mb-10px" @click.stop="showTodayBetPop = true">{{$t("pk10.betting")}} <br /> {{$t("pk10.record")}}</div>
    </div>
    <GameDescriptionPop @closed="showDescriptionPop = false" :show="showDescriptionPop" />
    <TodayBetPop @closed="showTodayBetPop = false" :show="showTodayBetPop" />
</template>

<script setup lang="ts">
import GameDescriptionPop from "./gameDescriptionPop.vue"
import TodayBetPop from './todayBetPop.vue'

const showDescriptionPop = ref(false)
const showTodayBetPop = ref(false)

</script>

<style lang="less" scoped>
.menu-box{
    color: #d5deef;
    font-weight: bold;
}
.nav-wrap-top-icon {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid #576171;
    margin-left: 148px;
}
</style>