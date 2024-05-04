<template>
  <div class="wallet-layout w-100vw">
    <div
      class="wallet__header h-50px flex items-center justify-between px-12px"
    >
      <div class="header__left">
        <span class="text-13px text-text-3">{{ $t("title") }}</span>
      </div>
      <div
        class="header__right text-12px m-0 mt-8px gap-12px flex items-center"
      >
        <span>{{ $t("nfts") }}</span>
        <span>{{ $t("rollover") }}</span>
        <svg class="h-15px w-15px fill-text-6">
          <use
            xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_History"
          ></use>
        </svg>
        <svg class="h-15px w-15px fill-text-6" @click="$router.go(-1)">
          <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Close"></use>
        </svg>
      </div>
    </div>
    <div class="wallet__view bg-fog-31">
      <RouterView />
    </div>
    <div
      class="wallet__footer h-66px flex px-13px py-11px justify-between items-center"
    >
      <div class="footer__item text-center"  @click="()=>clickFooterItem('deposit')">
        <svg class="h-20px w-20px " :class="selected == 'deposit'?'fill-[#ffffff]':'fill-text-6'">
          <use
            xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Deposit"
          ></use>
        </svg>
        <p class="text-12px m-0 mt-8px" :class="selected == 'deposit'?'text-[#ffffff]':'text-[#98a7b5]'">{{ $t("deposit") }}</p>
      </div>
      <div class="footer__item text-center" @click="()=>clickFooterItem('withdraw')">
        <svg class="h-20px w-20px" :class="selected == 'withdraw'?'fill-[#ffffff]':'fill-text-6'">
          <use
            xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_WithDraw"
          ></use>
        </svg>
        <p class="text-12px m-0 mt-8px" :class="selected == 'withdraw'?'text-[#ffffff]':'text-[##98a7b5]'">{{ $t("Withdraw") }}</p>
      </div>
      <div class="footer__item text-center" @click="()=>clickFooterItem('withdraw-method')">
        <svg class="h-20px w-20px fill-text-6"  :class="selected == 'withdraw-method'?'fill-[#ffffff]':'fill-text-6'">
          <use
            xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_BuyCrypto"
          ></use>
        </svg>
        <p class="text-12px m-0 mt-8px"  :class="selected == 'withdraw-method'?'text-[#ffffff]':'text-[##98a7b5]'">{{ $t("withdraw_method") }}</p>
      </div>
      <!-- <div class="footer__item text-center">
        <svg class="h-20px w-20px fill-text-6">
          <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Swap"></use>
        </svg>
        <p class="text-12px m-0 mt-8px">{{ $t("bc_swap") }}</p>
      </div>
      <div class="footer__item text-center">
        <svg class="h-20px w-20px fill-text-6">
          <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Vault"></use>
        </svg>
        <p class="text-12px m-0 mt-8px">{{ $t("vault_pro") }}</p>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const router = useRouter();
const route = useRoute();

const selected = ref('deposit')
const { t } = useI18n();
const $t = key => {
  return t("layout-wallet." + key);
};

const clickFooterItem = (name)=>{
  selected.value = name
  router.replace({name})
}

watch(route, () => {
  setSelectedFromRoute();
});

// 根据当前路由更新selected.value
function setSelectedFromRoute() {
  const name = route.name;
  // 这里假设路由的名称与selected.value应该匹配的值一致
  // 需要根据实际路由结构调整逻辑
  selected.value = name ? name.toString() : 'deposit';
}

onMounted(()=>{
  setSelectedFromRoute()
})

</script>

<style lang="less" scoped>
.wallet-layout {
  .wallet__view {
    height: calc(100vh - 116px);
    overflow: auto;
  }
}
</style>
