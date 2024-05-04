<template>
    <div class="px-10px py-20px pick-item" v-for="item in OPERATE_HEADER" :key="item.label">
        <div class="flex items-center justify-between text-#fff text-12px font-bold">
            <p>{{ item.label }}</p>
            <p v-for="i in useOpenList()" :key="i.value" @click="action(item.label, i.value)">{{ i.label }}</p>
        </div>
        <div class="flex w-95vw mx-auto mt-15px mb-0px batting-box flex-wrap">
            <div v-for="num in battingNum" :key="num"
                :class="['py-10px px-17px mb-10px flex justify-center items-center mx-5px mt-0 mb-20px text-28px font-700 text-#fff border-rd-8px bg-#2e3036 text-center border-2px border-solid border-#40424b', { 'active-item': choice.includes(`1-${item.value}${num}`) }]"
                @click="choiceItem(num,item.value )">
                <p class="text-15px batting-top-text m-0">{{ num }}</p>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { OPERATE_HEADER_ONE, OPERATE_HEADER_TWO, useOpenList } from './content';
import {pk10Store} from "../pk10Store"
import type { TYPE } from "./content"
const store = pk10Store()

const OPERATE_HEADER = ref<TYPE[]>([]);
const choice = ref<string[]>([]);
const type = ref<number | string>(0);
const props = defineProps<{
    type: number | string
}>()
watch(props, (newProps) => {
    type.value = newProps.type;
    choice.value = []
    store.updateGameChoices([]);
    OPERATE_HEADER.value = newProps.type === 0 ? OPERATE_HEADER_ONE : OPERATE_HEADER_TWO;
}, { immediate: true });

const battingNum = ref<string[]>(Array.from({ length: 10 }, (_, i) => String(i + 1).padStart(2, '0')));
const choiceItem = (num: string, h: string | number) => {
    const key = `1-${h}${num}`
    const index = choice.value.indexOf(key);
    index > -1 ? choice.value.splice(index, 1) : choice.value.push(key);
    store.updateGameChoices(choice.value);
}
const addUniqueItem = (type: string, item: string) => {
    const newItem = `${item}-${type}`;
    choice.value = [...new Set(choice.value.concat(newItem))];
}
const isOdd = (number: number) => {
    return number % 2 === 1;
}
const all = (type: string) => {
    battingNum.value.map(item => { addUniqueItem(type, item); return item });
}
const big = (type: string) => {
    battingNum.value.map(item => { Number(item) > 5 && addUniqueItem(type, item); return item });
}
const small = (type: string) => {
    battingNum.value.map(item => { Number(item) <= 5 && addUniqueItem(type, item); return item });
}
const odd = (type: string) => {
    battingNum.value.map(item => {
        if (isOdd(Number(item))) { addUniqueItem(type, item) }; return item;
    })
}
const even = (type: string) => {
    battingNum.value.map(item => {
        if (!isOdd(Number(item))) { addUniqueItem(type, item) }; return item;
    })
}
const clean = (type: string) => {
    choice.value = choice.value.filter(item => !item.includes(type));
}
const action = (type: string, i: string | number) => {
    clean(type);
    switch (i) {
        case 'All': all(type); break;
        case 'Big': big(type); break;
        case 'Small': small(type); break;
        case 'Odd': odd(type); break;
        case 'Even': even(type); break;
        case 'Clean': clean(type); break;
    }
}
</script>
  
<style lang="less" scoped>
.pick-item {
    border-bottom: 1px solid #6b7485;
}

.active-item {
    color: #fff;
    background-color: #6b7485;
    border: 2px solid #6b7485
}
</style>
  