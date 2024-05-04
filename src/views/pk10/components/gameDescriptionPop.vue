<template>
    <van-popup v-model:show="showPopup" position="bottom" closeable @close="emit('closed')" class="bg-fog-10 rounded-t-16px"
        :style="{ height: '60%' }">
        <div class="text-16px white text-center w='[100%]' lh-50px ">{{$t("pk10.guanya")}}-{{$t("pk10.direct_menu")}}</div>
        <div class=" pl-15px pr-15px des-list white overflow-y: scroll;">
            <div class="size-item white text-14px">
                <div class="mb-10px color-#3dc119">{{$t("pk10.odds")}}:85.5</div>
                <div class="mb-10px color-#a7a7a7">{{$t("pk10.descrule")}}</div>
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
  