<template>
  <div class="deposit-view px-8px py-16px">
    <div class="deposit-view__header h-30px flex justify-between items-strenth mb-13px">
      <div class="header-item text-center w-[50%] " :class="activeTab === 'crypto' && 'header-item--active'"
        @click="activeTab = 'crypto'">
        <span class="text-12px">{{ $t("crypto") }}</span>
      </div>
      <div class="header-item text-center w-[50%]" @click="activeTab = 'fiat'"
        :class="activeTab === 'fiat' && 'header-item--active'">
        <span class="text-12px">{{ $t("fiat") }}</span>
      </div>
    </div>
    <div v-if="activeTab == 'crypto'">
      <div class="deposit-view__body pt-12px">
        <p class="text-12px">{{ $t("deposit_currency") }}</p>
        <div class="currency-list flex gap-7px py-10px px-4px  overflow-auto scrollbar-hidden">
          <CoinItem v-for="coin in coinList" :key="coin.name" :name="coin.name" :icon="coin.icon"
            :active="activeCoin === coin.name" @click="activeCoin = coin.name" />
          <MoreCoinItem />
        </div>
        <div class="select">
          <BcSelect :options="optionsList">
            <template #option="{ data }">
              <div class="custom-option flex justify-between items-center h-[100%] ">
                <div class="left flex items-center gap-14px">
                  <img :src="data.icon" class="h-23px w-23px" />
                  <span class="text-14px text-text-3 font-800">{{
                    data.label
                  }}</span>
                </div>
                <div class="right text-right ">
                  <p class="text-12px text-text-3 font-800">JP￥0</p>
                  <p class="text-10px text-text-8 !mt-4px">0</p>
                </div>
              </div>
            </template>
            <template #trigger="{ data }">
              <div class="custom-trigger flex justify-between items-center pr-8px">
                <div class="left flex items-center gap-14px">
                  <img :src="data.icon" class="h-23px w-23px" />
                  <span class="text-14px">{{ data.label }}</span>
                </div>
                <div class="right flex items-center gap-4px">
                  <span class="text-text-4">{{ $t("deposit.Balance") }}</span>
                  <span class="text-text-3">0</span>
                </div>
              </div>
            </template>
          </BcSelect>
        </div>
      </div>
      <div class="deposit-view__body pt-12px">
        <p class="text-12px !mb-10px">{{ $t("choose_network") }}</p>
        <div class="select">
          <BcSelect :options="blockList">
            <template #option="{ data }">
              <div class="custom-option flex justify-between items-center h-[100%] ">
                {{ data?.name }}
              </div>
            </template>
            <template #trigger="{ data }">
              <div class="custom-trigger flex justify-between items-center pr-8px">
                <div class="left flex items-center gap-14px">
                  <span class="text-14px">{{ data.name }}</span>
                </div>
              </div>
            </template>
          </BcSelect>
        </div>
      </div>
      <div class="deposit-view__body px-12px py-16px bg-fog-35 mt-16px rounded-4px">
        <div class="text-center">
          <img class="w-141px rounded-4px" :src="qrcode" alt="" />
        </div>
        <div class="mt-30px mb-10px">
          <p class="text-12px text-text-4 leading-20px">
            {{ $t("deposit_address") }}
          </p>
          <div class="flex bg-fog-10 items-center p-4px gap-8px">
            <div class="wallet-address text-12px text-text-3 break-all">
              <span class="text-text-5">bc1q</span>
              Txfwerwrwwrwreff
              <span class="text-text-5"> s2uq</span>
            </div>
            <div class="bg-fog-36 text-12px px-17px h-25px leading-25px rounded-4px" @click="copyCode">
              {{ $t("copy") }}
            </div>
          </div>
        </div>
      </div>
      <div class="deposit-view__notice px-10px py-7px text-10px mt-17px bg-fog-32 text-text-3 rounded-4px">
        <span class="text-text-5 font-800 leading-12px">{{ $t("notice") }}:</span>
        <span class="leading-12px">
          Send only BTC to this address. Coins will be deposited after 2 network
          confirmations.
        </span>
      </div>

    </div>
    <Fiat v-if="activeTab == 'fiat'" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import CoinItem from "./components/coin-item.vue";
import MoreCoinItem from "./components/more-coin-item.vue";
import BcSelect from "@/components/bc-select/index.vue";
import Fiat from "./components/fiat-item.vue"
import { COIN_LIST } from "@/config/wallet"
import { walletList, getEnums } from "@/api/wallet";
import QRCode from 'qrcode'
import { showToast } from "vant";
import { useClipboard } from '@vueuse/core'

const qrcode = ref('')
const { t } = useI18n();
const $t = key => {
  return t("deposit." + key);
};
const activeCoin = ref("");
const activeTab = ref("crypto");
const coinList = ref(COIN_LIST);

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

const blockList = ref([])

const copyCode = async () => {
    const { copy, copied } = useClipboard({ legacy: true })
    await copy('Txfwerwrwwrwreff')
    if (copied) {
      showToast($t('copy_success'))
    } else {
        showToast($t('copy_err'))
    }
}

const getOptions = async () => {
  const res = await getEnums()
  if (res?.code == 1) {
    blockList.value = res?.data?.blockChain.map(obj => {
      return {
        ...obj,
        value: obj.name
      };
    });
  }
}

onMounted(() => {
  QRCode.toDataURL('Txfwerwrwwrwreff')
    .then(url => {
      qrcode.value = url
    })
    .catch(err => {
      console.error(err)
    })
  getData()
  getOptions()
})

const getData = async () => {
  let res = await walletList();
  const { data, code } = res;
  if (code === 1) {
    console.log(data)
  }
}

</script>

<style lang="less" scoped>
.deposit-view {
  &__header {
    .header-item {
      border-bottom: 1px solid var(--border-6);

      &--active {
        border-bottom: 2.5px solid var(--border-5);
        color: var(--text-3);
        background-image: var(--fog-11);
      }
    }
  }
}
</style>
