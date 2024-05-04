<template>
  <div class="flex justify-between px-10px mb-10px">
    <p class="text-14px">{{ $t("deposit_currency") }}</p>
    <BcSelect :options="optionsList">
      <template #option="{ data }">
        <div class="custom-option flex justify-between items-center h-[100%] ">
          <div class="left flex items-center gap-14px">
            <img :src="data.icon" class="h-23px w-23px" />
            <span class="text-14px text-text-3 font-800">{{
              data.label
            }}</span>
          </div>
          <div class="text-right h-40px ">
            <div class="text-12px text-text-3  lh-24px font-800  my-0 py-0">JP￥0</div>
            <div class="text-10px text-text-8 mt-0px  py-0">0</div>
          </div>
        </div>
      </template>
    </BcSelect>
  </div>
  <p class="text-14px px-10px mb-10px">Choose the currency type you want to withdraw</p>
  <div class="flex justify-between items-center bg-[#17181B] border-rd-5px py-15px px-10px mb-20px">
    <button @click="activeType = 'fiat'" class='px-10px py-4px border-rd-5px b-none bg-transparent'
      :class="{ 'is-active': activeType == 'fiat' }">Normal Fiat Withdraw</button>
    <div class="flex justify-center items-center relative">
      <div class="tip">Lower Fees &amp; Faster Arrival</div>
      <button disabled @click="activeType = 'convert'" class='px-10px py-4px border-rd-5px b-none bg-transparent'
        :class="{ 'is-active': activeType == 'convert' }">Convert to Cryptocurrency</button>
    </div>

  </div>
  <div v-if="activeTab == 'choose'" class="px-10px">
    <div class="text-14px">{{ $t("choose_pay") }}</div>
    <div class="bg-[#17181B] border-rd-5px py-15px mt-20px px-10px">
      <div class="text-12px mb-8px">{{ $t("recommended") }}</div>
      <div v-for="item in props.payList" :key="item.id" @click="activeTab = 'pay'; activeItem = { method: 'Yo-Da Wallet', prize: '5,000~800,000 ARS', key: 'wallet' }"
        class="bg-[#31343c] py-18px px-10px flex  justify-between border-rd-5px relative mb-10px">
        <div class="items-center flex">
          <img class="w-68px h-24px" :src="item.icon" />
          <b class="line"></b>
          <div class="text-12px">
            <div class="text-#ffff">{{ item.name }}</div>
            <div>EAT: {{ item.second }} {{ $t("min") }}</div>
          </div>
        </div>
        <div class="items-center flex text-12px w-44%">
          <div>{{ item.min }}~{{ item.max }}ARS</div>
          <van-icon class="mx-2px" color="#3bc117" name="warning-o" />
          <van-icon name="arrow" size="20px" />
        </div>
        <div class="absolute tag text-8px px-10px py-4px">{{ $t("fastest") }}</div>
      </div>
    </div>
  </div>
  <Pay v-if="activeTab == 'pay'" :activeItem='activeItem' @back="activeTab = 'choose'" />
</template>

<script setup lang="ts">
import BcSelect from "./fiat-select.vue";
import Pay from './pay.vue'
import { useI18n } from "vue-i18n";
const props = defineProps<{payList}>();
const { t } = useI18n();
const $t = key => {
  return t("deposit." + key);
};
const activeType = ref<string>('fiat');
const activeTab = ref<string>("choose");
const activeItem = ref<{ method: string, prize: string, key: string }>({ method: '', prize: '', key: '' });
const optionsList = ref([
  {
    icon: "/src/assets/coin/USDT.webp",
    label: "USDT",
    value: "USDT"
  },
  {
    icon: "/src/assets/coin/XRP.webp",
    label: "XRP",
    value: "XRP"
  },
  {
    icon: "/src/assets/coin/LTC.webp",
    label: "LTC",
    value: "LTC"
  },
  {
    icon: "/src/assets/coin/ETH.webp",
    label: "ETH",
    value: "ETH"
  },
  {
    icon: "/src/assets/coin/TRX.webp",
    value: "TRX",
    label: "TRX"
  }
]);
</script>

<style lang="less" scoped>
.tip {
  position: absolute;
  right: 0;
  top: 0px;
  -webkit-transform: translateY(-100%);
  -ms-transform: translateY(-100%);
  transform: translateY(-100%);
  background: linear-gradient(90deg, #e15a0f 5.42%, #f7931a 96.72%);
  border-radius: 10px;
  box-shadow: 0 4px 6px #00000047;
  color: #fff;
  padding: 6px 7px;
  font-size: 12px;
  line-height: 1;
  max-width: 92%;
  opacity: 0.5;
}

.tip::after {
  content: "";
  display: block;
  border: .4375rem solid transparent;
  border-top-color: #e15b10;
  position: absolute;
  bottom: -12px;
  left: 10px;
}

.log1 {
  background: url('~/wallet/log01.png') no-repeat top left / 100% 100%;
}

.log2 {
  background: url('~/wallet/log02.png') no-repeat top left / 100% 100%;
}

.line {
  display: block;
  margin-left: .5rem;
  margin-right: .5rem;
  width: 1px;
  background-color: #98a7b51a;
  -webkit-align-self: stretch;
  -ms-flex-item-align: stretch;
  align-self: stretch;
}

.tag {
  right: 0;
  top: 0;
  white-space: nowrap;
  background-image: linear-gradient(to right, #e15a0f, #f7931a);
  color: #fff;
  border-bottom-left-radius: .25rem;
}

.is-active {
  background: #32343B;
  color: #ffffff;
}
</style>