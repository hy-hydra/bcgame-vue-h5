<template>
    <div>
        <div v-for="item in OPERATE_HEADER_TWO" class="px-0px py-20px pick-item" :key="item.label">
            <p class="text-16px">{{ item.label }}</p>
            <div class="flex items-center justify-between w-94vw mx-auto mt-15px mb-0px batting-box flex-wrap">
                <div v-for="num in useCastingCode()" :key="num.value"
                    :class="['w-80px h-45px mb-10px mr-5px mt-0 text-28px font-700 text-#cbd7e3 border-rd-8px bg-#414955 border-1px border-solid border-#6b7485 text-center', { 'active-item': choice.includes(`2-${item.value}${num.value}`) }]"
                    @click="choiceItem(num.value, item.value)">
                    <p class="text-13px batting-top-text mt-8px mb-1px my-auto">{{ num.value }}</p>
                    <p class="text-9px batting-top-text m-0">{{ num.key }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { OPERATE_HEADER_TWO, useCastingCode } from './content';
import {pk10Store} from "../pk10Store"

const store = pk10Store()

const choice = ref<string[]>([]);
// const emit = defineEmits(['closed'])
const choiceItem = (num: string | number, h: string | number) => {
    const key = `2-${h}${num}`
    const index = choice.value.indexOf(key);
    index > -1 ? choice.value.splice(index, 1) : choice.value.push(key);
    console.log(choice.value)
    store.updateGameChoices(choice.value);
}
</script>
  
<style lang="less" scoped>
.pick-item {
    border-bottom: 1px solid #3d4450;
}
.active-item {
    border: 1px solid #6b7485;
    color: #fff;
    background-color: #6b7485;
}
</style>
  