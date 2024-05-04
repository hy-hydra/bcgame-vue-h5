<template>
  <div>
    <div v-for="(info, index) in informationList" :key="index">
      <div class="notification-card p-12px bg-fog-9 mb-10px">
        <div class="card-header">
          <div class="time text-10px">{{ info.startTime }}</div>
          <div class="title text-14px mt-10px text-text-3">
            {{ info.title }}
          </div>
        </div>
        <div class="card-img mt-10px">
          <img
            class="w-[100%] rounded-4px"
            src="@/assets/main/notification.png"
            alt=""
          />
        </div>
        <div class="card-desc">
          <div class="desc"></div>
        </div>
        <div class="card-link text-text-1 text-12px flex items-center">
          <div class="desc" v-html="info.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useConfigStore } from "@/stores/config";

const configStore = useConfigStore();
const informationList = configStore.informationList;
</script>
<style>
.desc p {
  overflow-wrap: anywhere;
}
</style>
