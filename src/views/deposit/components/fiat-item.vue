<template>
  <div class="flex justify-between px-10px mb-10px">
    <div>
      <p class="text-14px">{{ $t("deposit_currency") }}</p>
    </div>
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
  <div v-if="activeTab == 'choose'" class="px-10px">
    <div class="text-14px">{{$t("choose_pay")}}</div>
    <div class="bg-[#17181B] border-rd-5px py-15px mt-20px px-10px">
      <div class="text-12px mb-8px">{{ $t("recommended") }}</div>
      <div @click="activeTab = 'pay'; activeItem={method:'Yo-Da Wallet', prize: '5,000~800,000 ARS', key: 'wallet'}" class="bg-[#31343c] py-18px px-10px flex  justify-between border-rd-5px relative mb-10px">
        <div class="items-center flex">
          <div class="log1 w-68px h-24px"></div>
          <b class="line"></b>
          <div class="text-12px">
            <div class="text-#ffff">Yo-Da Wallet</div>
            <div>EAT: 2 {{$t("min")}}</div>
          </div>
        </div>
        <div class="items-center flex text-12px w-44%">
          <div>5,000~800,000 ARS</div>
          <van-icon class="mx-2px" color="#3bc117" name="warning-o" />
          <van-icon name="arrow" size="20px" />
        </div>
        <div class="absolute tag text-8px px-10px py-4px">{{$t("fastest")}}</div>
      </div>
      <div @click="activeTab = 'pay'; activeItem={method: 'AstroPay', prize: '5,000~250,000 ARS', key: 'astroPay'}" class="bg-[#31343c] py-18px px-10px flex  justify-between border-rd-5px relative">
        <div class="items-center flex">
          <div class="log2 w-68px h-24px"></div>
          <b class="line"></b>
          <div class="text-12px">
            <div class="text-#ffff">AstroPay</div>
            <div>EAT: 6 {{$t("min")}}</div>
          </div>
        </div>
        <div class="items-center flex text-12px w-44%">
          <div>5,000~250,000 ARS</div>
          <van-icon class="mx-2px" color="#3bc117" name="warning-o" />
          <van-icon name="arrow" size="20px" />
        </div>
        <div class="absolute tag text-8px px-10px py-4px">{{$t("popular")}}</div>
      </div>
    </div>
  </div>
  <Pay v-if="activeTab == 'pay'" :activeItem='activeItem' @back="activeTab = 'choose'" />
</template>

<script setup lang="ts">
import Pay from './pay.vue'
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const $t = key => {
  return t("deposit." + key);
};
const activeTab = ref<string>("choose");
const activeItem = ref<{ method: string, prize: string, key: string }>({method:'', prize: '', key: ''});
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
</style>