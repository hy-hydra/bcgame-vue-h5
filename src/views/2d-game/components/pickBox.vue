<template>
    <div class="w-100vw p-10px overflow-y:scroll overflow-x:hidden h-[calc(100vh-270px)] bg-fog-50">
        <div class="p-10px pick-item" v-for="item in useOpenHeader()" :key="item">
            <div class="flex items-center justify-between text-#fff text-12px font-bold">
                <p>{{ item }}</p>
                <p v-for="i in useOpenList()" :key="i.value" @click="action(item, i.value)">{{ i.label }}</p>
            </div>
            <div class="flex w-95vw mx-auto mt-15px mb-0px batting-box flex-wrap">
                <div v-for="num in battingNum" :key="num"
                    :class="['py-10px px-21px mb-10px flex justify-center items-center mx-5px mt-0 mb-20px text-28px font-700 text-#fff border-rd-8px bg-#2e3036 text-center border-2px border-solid border-#40424b', { 'active-item': choice.includes(`${num}-${item}`) }]"
                    @click="choiceItem(num, item)">
                    <p class="text-15px batting-top-text m-0">{{ num }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { useOpenHeader, useOpenList } from './content';
const choice = ref<string[]>([]);
const battingNum = ref<string[]>(Array.from({ length: 10 }, (_, i) => String(i)));
const getChoice = () => choice.value;
const generateRandomString = () =>{
  const numPart: number = Math.floor(Math.random() * 10);
  const textPart: "First" | "Second" = Math.random() < 0.5 ? "First" : "Second";
  return `${numPart}-${textPart}`;
}
const pickQuickPick = () =>{
    choice.value = [];
    choice.value = [generateRandomString()];
}
defineExpose({ getChoice, pickQuickPick });
defineProps<{
    showTip: boolean;
}>();
watch(choice, (newVal) => {
  emits("update:showTip", newVal.length > 0);
}, {
  deep: true
});
onBeforeUnmount(() => {
  choice.value = [];
  emits("update:showTip", false);
});
const emits = defineEmits(["update:showTip"]);

const choiceItem = (item: string, h: string) => {
    const index = choice.value.indexOf(`${item}-${h}`);
    index > -1 ? choice.value.splice(index, 1) : choice.value.push(`${item}-${h}`);
}
const addUniqueItem = (type: string, item: string) => {
    const newItem = `${item}-${type}`;
    choice.value = [...new Set(choice.value.concat(newItem))];
}
const isOdd = (number: number) => {
    return number % 2 === 1;
}
const all = (type: string) => {
    battingNum.value.forEach(item => { addUniqueItem(type, item) });
}
const big = (type: string) => {
    battingNum.value.forEach(item => { Number(item) >= 5 && addUniqueItem(type, item) });
}
const small = (type: string) => {
    battingNum.value.forEach(item => { Number(item) < 5 && addUniqueItem(type, item) });
}
const odd = (type: string) => {
    battingNum.value.forEach(item => {
        if (isOdd(Number(item))) { addUniqueItem(type, item) };
    })
}
const even = (type: string) => {
    battingNum.value.forEach(item => {
        if (!isOdd(Number(item))) { addUniqueItem(type, item) };
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
.pick-item:last-child {
    border: none;
}

.active-item {
    background: var(--fog-51);
    color: var(--text-3);
    border: 2px solid var(--fog-51);
}
</style>
  