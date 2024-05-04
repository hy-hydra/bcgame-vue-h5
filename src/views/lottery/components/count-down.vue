<template>
        <van-count-down ref="countDown"  @finish="onFinish" class="mt-10px" :time="time" >
            <template #default="timeData">
                <div class="flex items-center justify-between relative w-100% h-26px text-14px">
                    <span class="block  w-26px flex items-center justify-center">{{ String(timeData.hours).padStart(2, '0') +'h' }}</span>
                    <span class="block">:</span>
                    <span class="block">{{ String(timeData.minutes).padStart(2, '0') +'m' }}</span>
                    <span class="block">:</span>
                    <span class="block w-26px flex items-center justify-center">{{ String(timeData.seconds).padStart(2, '0') +'s' }}</span>
                </div>
            </template>
        </van-count-down>
</template>

<script setup lang="ts">

const countDown = ref(null);
const props = defineProps<{
item:any
}>()

const time = ref(props.item?.interval * 1000 || 0)

const onFinish = ()=>{
    time.value = props.item?.periodInterval * 1000 
    countDown.value.start();
}


</script>

<style lang="less" scoped>

</style>