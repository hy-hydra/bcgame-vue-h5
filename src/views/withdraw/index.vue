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
    <Crypto v-if="activeTab == 'crypto'" />
    <Fiat :payList="payList" v-else></Fiat>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import Crypto from "./components/crypto.vue";
import Fiat from "./components/fiat.vue"
import { walletList } from "@/api/wallet";

const { t } = useI18n();
const $t = key => {
  return t("deposit." + key);
};
const payList = ref([]);
const activeTab = ref("crypto");

onMounted(()=>{
  getData()
})
const getData = async() => {
  let res = await walletList();
  const { data, code } = res;
  if(code === 1) {
    payList.value = data.withdraw || [];
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

