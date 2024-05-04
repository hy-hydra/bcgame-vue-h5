<template>
    <div class="mt-20px h-300px overflow-y-scroll">
        <div class="flex justify-between items-center border-b-2px border-b-solid border-b-gray h-40px" v-for="item in gamelist">
            <div class="flex">
                <div v-for="color in colorConfig[item?.openNumber]" :class="color" class="w-40px h-20px border-rd-2px  text-center lh-20px text-8px mr-5px">{{ color }}</div>
            </div>
            <div>{{ item?.openNumber }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">

const colorConfig = {
    "0":['Blue','Green'],
    "1":['Red'],
    "2":['Green'],
    "3":['Red'],
    "4":['Green'],
    "5":['Blue','Red'],
    "6":['Green'],
    "7":['Red'],
    "8":['Green'],
    "9":['Red'],
}

defineProps<{
    gamelist: any;
}>();
</script>

<style lang="less" scoped>
.Blue{
    background-color:#0161d1
}
.Green{
    background-color:#00b97c
}
.Red{
    background-color: #f05;
}
</style>