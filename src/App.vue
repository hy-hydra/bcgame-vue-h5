<script setup lang="ts">
import { watch } from "vue";
import { storeToRefs } from "pinia";
// import { localStorage } from '@/utils/local-storage'
import { useThemeStore } from "@/stores";
import { useRegister } from "@/stores/userRegister.pinia";
import { useLoadStore } from "@/stores/loading";
// import { getFingerprint } from "@/utils/index"
import Loading from "@/components/loading/index.vue";
const { LOADING } = storeToRefs(useLoadStore());
watch(LOADING, newValue => {
  console.log(newValue);
});
// const store = useStore()
const themeStore = useThemeStore();
const StoreRegister = useRegister();

const { theme } = storeToRefs(themeStore);
// getFingerprint()
StoreRegister.getDeviceId();

// const theme = ref<ConfigProviderTheme>('dark')
// const mode = computed(() => store.mode)

// watch(mode, (val) => {
//   if (val === 'dark' || localStorage.get('theme') === 'dark') {
//     theme.value = 'dark'
//     document.querySelector('html')
//       .setAttribute('data-theme', 'dark')
//   }
//   else {
//     theme.value = 'light'
//     document.querySelector('html')
//       .setAttribute('data-theme', 'light')
//   }
// }, { immediate: true })

provide(
  "isRealDark",
  computed(() => theme.value === "dark")
);
</script>

<template>
  <VanConfigProvider :theme="theme">
    <Loading v-show="LOADING"></Loading>
    <RouterView />
  </VanConfigProvider>
</template>

<style>
.van-config-provider {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
