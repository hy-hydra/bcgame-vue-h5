<template>
  <div class="vlidate-secure flex items-center gap-4px pb-16px" :class="status">
    <div class="status-view flex gap-4px flex-grow">
      <div class="bg-fog-40 h-5px rounded-4px flex-grow"></div>
      <div class="bg-fog-40 h-5px rounded-4px flex-grow"></div>
      <div class="bg-fog-40 h-5px rounded-4px flex-grow"></div>
    </div>
    <div class="status-text text-10px">{{ statusMap[status] }}</div>
  </div>
</template>

<script setup lang="ts">
const statusMap = {
  Vulnerable: "High risk",
  Moderate: "Average",
  Secure: "Secure"
};
defineProps<{
  status: "Secure" | "Moderate" | "Vulnerable";
}>();
</script>

<style lang="less" scoped>
.Secure {
  .status-view {
    > div {
      background: var(--fog-6);
    }
  }
  .status-text {
    color: var(--text-5);
  }
}
.Moderate {
  .status-view {
    > div {
      &:not(:nth-child(3)) {
        background-color: var(--fog-42);
      }
    }
  }
  .status-text {
    color: var(--text-13);
  }
}
.Vulnerable {
  .status-view {
    > div {
      &:nth-child(1) {
        background-color: var(--fog-41);
      }
    }
  }
  .status-text {
    color: var(--text-12);
  }
}
</style>
