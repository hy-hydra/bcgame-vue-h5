<template>
  <div class="flex items-center justify-between mt-10px h-26px w-100vw px-10px py-0">
    <div class="time-bg w-100px h-26px flex items-center justify-center">
      <div  v-if="props?.time != 0" class="text-9px">
        <van-count-down :time="props?.time"  @finish="onFinish">
          <template #default="timeData">
            <div class="flex items-center justify-center relative w-100px h-26px text-9px">
              <span class="block absolute left-0px w-26px flex items-center justify-center">{{ String(timeData.hours).padStart(2, '0') }}</span>
              <span>{{ String(timeData.minutes).padStart(2, '0') }}</span>
              <span class="block absolute right-0px w-26px flex items-center justify-center">{{ String(timeData.seconds).padStart(2, '0') }}</span>
            </div>
          </template>
        </van-count-down>
      </div>
    </div>
    <div class='w="[calc(100vw-100px)]"'>
      <div class="flex items-center justify-between text-12px">
        <p class="m-0">{{$t("pk10.no")}}.{{ gameStore?.item?.issue }}</p>
        <span class="flex items-center justify-center click-row" @click="emit('clickAllBtn')">{{$t("pk10.all")}} <img class="w-16px h-16px"
            src="@/assets/pk-10/right.png"></span>
      </div>
      <span class="flex items-center justify-center ">
        <p v-for="item in roundList" :key="item" class="round-item">{{ item }}</p>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { gameInfoStore } from '@/stores/gameStore';
import { pk10Store } from '../pk10Store';

const props = defineProps<{
  time: number;
}>();
const gameStore = gameInfoStore();
const pkStore = pk10Store()

const emit = defineEmits(['clickAllBtn','updateTime'])
const round = ref<string[]>(['03', '04', '05', '06', '09', '07', '08', '01', '02']);

const onFinish = ()=>{
  emit('updateTime')
}

const roundList = computed(()=>{
  if(pkStore?.item?.lastOpen?.length){
    let arr = JSON.parse(pkStore?.item?.lastOpen) || []
    return  arr.map(item => String(item).padStart(2, '0'))
  }else{
    return  round.value
  }
})

onMounted(()=>{

})
</script>

<style lang="less" scoped>
.lottery-info {
  background: url('~/sic-bo/time-bg.png') no-repeat top left / 100% 100%;
}

.time-bg {
  background: url('~/pk-10/time-bg.png') no-repeat top left / 100% 100%;

  .time-text {
    color: #ffcdaa;
  }
}

.round-item {
  margin: 2px 2px 2px 0;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: #d7dfea;
  padding: 2px;
  font-size: 8px;
  background-color: #555e6e;
  border: 2px solid #616c7d;
  border-radius: 34px
}

.click-row {
  color: #e4c575;
}
</style>
