<template>
    <div class="w-100vw px-16px pt-12px pb-0 bottom-0 betting-box">
        <div class="flex justify-center betting-bar items-center flex h-40px text-#98a7b5 text-8px bg-#262f3d border-rd-40px shadow-inset_0_0_20px_rgba(0,0,0,.5) box-border">
            <span v-for="item in useTopSwitchBar()" :key="item.value"
                :class="['betting-bar-item','h-40px grow-1 w-220px text-center lh-40px border-rd-40px text-13px overflow-hidden text-ellipsis whitespace-nowrap', { active: currentIndex === item.value }]" @click="selectTab(item.value)">{{
                    item.label }}</span>
        </div>
        <div>
            <PickBox v-if="currentIndex !== 2" :type=currentIndex />
            <PlateBox v-else />
        </div>
    </div>
</template>
  
<script setup lang="ts">
import PickBox from "./pickBox.vue";
import PlateBox from "./plateBox.vue";
import { useTopSwitchBar } from './content';
const currentIndex = ref<number | string>(0);
const selectTab = (index: number | string) => {
    currentIndex.value = index;
};  
</script>
  
<style lang="less" scoped>
.betting-box{
    overflow-x: hidden;
}
.betting-bar {
    -webkit-box-align: center;
    -webkit-box-sizing: border-box;
    -ms-flex-align: center;
    -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, .5) inset;
}

.betting-bar-item {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
}

.active {
    color: #fff;
    background-image: -webkit-gradient(linear, left top, left bottom, from(#f3b246), to(#c87d01));
    background-image: linear-gradient(180deg, #f3b246, #c87d01)
}
</style>
  