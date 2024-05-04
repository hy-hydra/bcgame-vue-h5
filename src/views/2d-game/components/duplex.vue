<template>
  <div class="duplex px-16px pt-16px overflow-auto h-[calc(100vh-270px)] bg-fog-50">
    <div
      class="main-game__title flex justify-between text-14px text-text-3 pb-16px"
    >
      <span class="font-700">
        {{$t("2d-game.pick-number")}}
      </span>
      <span class="font-700" @click="emits('update:value', [])">{{$t("2d-game.clear-all")}}</span>
    </div>
    <div
      class="main-game__select-number flex flex-wrap justify-between gap-6px"
    >
      <div
        class="number-item h-42px w-62px bg-fog-48 flex items-center justify-center font-700 text-text-3 rounded-4px border-1px"
        v-for="item in duplexNum"
        :class="value.includes(item) && 'bg-fog-51'"
        @click="setValue(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: string[];
}>();
const emits = defineEmits(["update:value"]);
const duplexNum = ref<string[]>(Array.from({ length: 100 }, (_, i) => String(i).padStart(2, '0')));
const setValue = (index: string) => {
  const { value } = props;
  if (value.includes(index)) {
    emits("update:value", [...props.value.filter(item => item !== index)]);
  } else {
    emits("update:value", [...props.value, index]);
  }
};
</script>

<style></style>
