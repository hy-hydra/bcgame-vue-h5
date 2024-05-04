<template>
  <div class="notification bg-fog-10">
    <div
      class="notification__header h-51px flex justify-between px-16px items-center  bg-fog-9"
    >
      <span class="text-13px text-text-3">{{ $t("notification") }}</span>
      <van-icon
        name="cross"
        class="text-text-6 font-900 text-14px"
        @click="$router.go(-1)"
      />
    </div>
    <div class="notification__content">
      <Tabs :options="options" v-model:value="value" />
      <div v-if="value === 'System Notice'" class="p-12px">
        <Card />
      </div>
      <div
        v-if="value === 'Activities'"
        class="justify-center items-center empty"
      >
        <div class="flex justify-center">
          <img src="@/assets/common/empty.png" alt="empty" class="w-40rem" />
        </div>
        <div class="flex justify-center text-12px mt--5rem">
          Oops! There is no data yet!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import Tabs from "@/components/tabs/index.vue";
import Card from "./components/card.vue";

const { t } = useI18n();
const $t = key => {
  return t("notification." + key);
};

const options = ref([
  { label: "System Notice", value: "System Notice" },
  { label: "Activities", value: "Activities" }
]);

const value = ref("System Notice");
</script>

<style lang="less" scoped>
.notification {
  .bar-item {
    &--active {
      background-image: var(--fog-11);
      border-bottom: 1px solid var(--border-5);
      color: var(--text-3);
    }
  }
}

.empty {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>