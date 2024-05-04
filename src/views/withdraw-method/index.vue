<template>
  <p class="m-0 text-center w-100% bg-#24262b py-10px">{{ $t('deposit.Withdraw_Method')}}</p>
  <div class="deposit-view px-8px py-16px">
    <div class="flex justify-between items-center bg-[#17181B] border-rd-5px py-5px px-10px mb-20px w-100%">
      <button @click="activeType = 'bankCard'" class='w-48% px-10px py-8px border-rd-5px b-none bg-transparent'
        :class="{ 'is-active': activeType == 'bankCard' }">{{ $t('deposit.bank_card') }}</button>
      <button @click="activeType = 'virtualCoin'"
        class='w-48% px-10px py-8px border-rd-5px b-none bg-transparent'
        :class="{ 'is-active': activeType == 'virtualCoin' }">{{ $t("deposit.virtual_coin") }}</button>
    </div>
    <BankCard v-if="activeType == 'bankCard'" />
    <VirtualCoin v-if="activeType == 'virtualCoin'" />
  </div>
</template>
<script setup lang="ts">
import BankCard from './components/bank-card.vue';
import VirtualCoin from './components/virtual-coin.vue';
const activeType = ref<string>('virtualCoin');
// import { useI18n } from "vue-i18n";
onMounted(() => {
})

</script>


<style lang="less" scoped>
.add-box {
  border-radius: 8px;
  position: relative;
  box-sizing: border-box;
  padding: 10px 12px;
  color: #f5f5f5;
  background: #000;
}

.is-active {
  background: #32343B;
  color: #ffffff;
}
</style>

