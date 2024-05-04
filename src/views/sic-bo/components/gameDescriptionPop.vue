<template>
    <van-popup v-model:show="showPopup" position="bottom" closeable @close="emit('closed')" class="bg-fog-10 rounded-t-16px"
        :style="{ height: '60%' }">
        <div class="text-16px white text-center w='[100%]' lh-50px ">{{$t("sicbo.game_description")}}</div>
        <div class=" pl-15px pr-15px des-list white overflow-y: scroll;">
            <div class="pb-5px  text-14px mb-10px font-bold">{{$t("sicbo.size_odd_even")}}</div>
            <div class="size-item white text-14px">
                <div class="mb-10px">{{$t("sicbo.odds")}}:1.95</div>
                <div class="mb-10px"><span>{{$t("sicbo.sum")}}-</span><span class="red">{{$t("sicbo.large_amall")}}</span></div>
                <div class="mb-10px">{{$t("sicbo.large")}}: 11～17; {{$t("sicbo.small")}}: 4～10; {{$t("sicbo.note")}}: {{$t("sicbo.desc_lottery")}}</div>
            </div>
        </div>
    </van-popup>
</template>
  
<script setup lang="ts">

const emit = defineEmits(['closed'])
const props = defineProps<{
    show: boolean
}>()

let showPopup = ref<boolean>(false);

watch(props, (newProps) => {
    showPopup.value = newProps.show;
});
</script>
  
<style lang="less" scoped>
.white {
    color: #fff;
}
.red {
    color: red;
}

.des-list {
    width: 100%;
    height: 87%;
}
</style>
  