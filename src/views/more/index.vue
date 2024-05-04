<template>
  <CommonMenuHeader />
  <div class="p-12px  more-view animate__bounceInUp animate__animated">
    <div class="menu-title-icon flex items-center h-70px mb-12px rounded-4px">
      <div>
        <img src="@/assets/more/activity_icon.b7616940.webp" class="h-93px" />
      </div>
      <div class="text-text-3">
        <div class="text-20px font-900 font-italic leading-32px">
          {{ $t("bc_anniversary") }}
        </div>
        <div class="text-12px font-400 ">
          {{ $t("exploration") }} &amp; {{ $t("rich") }}
        </div>
      </div>
    </div>
    <div class="menu-list bg-fog-1 rounded-5px">
      <div
        class="menu-item p-6px text-16px h-44px flex items-center"
        @click="$router.push('/vip-club')"
      >
        <svg class="s1ff97qc icon">
          <use
            xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_VipClub"
          ></use>
        </svg>
        <span class="text-text-3 px-8px text-12px"> {{ $t("vip_club") }}</span>
      </div>
      <div class="menu-item p-6px text-16px h-44px flex items-center">
        <svg class="s1ff97qc icon">
          <use
            xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_WeeklyRaffle"
          ></use>
        </svg>
        <span class="text-text-3 px-8px text-12px"> {{ $t("weekly") }}</span>
      </div>
      <div
        class="menu-item p-6px text-16px h-44px  flex items-center"
        @click="liveSupport"
      >
        <svg class="s1ff97qc icon">
          <use
            xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Support"
          ></use>
        </svg>
        <span class="text-text-3 px-8px text-12px"> {{ $t("live") }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/stores/config";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import _ from "lodash";

const configStore = useConfigStore();
const { customerList } = storeToRefs(configStore);

const liveSupport = () => {
  const randURL = _.random(0, customerList.value.length - 1);
  const liveTab = window.open(customerList.value[randURL].config, "_blank");
  liveTab.focus();
};

const { t } = useI18n();
const $t = key => {
  return t("more." + key);
};
defineProps<{
  show: boolean;
}>();
const emits = defineEmits(["update:show"]);
</script>

<style lang="less" scoped>
.menu-item {
  cursor: pointer;
}

.menu-title-icon {
  background: var(--fog-29);
}
</style>
