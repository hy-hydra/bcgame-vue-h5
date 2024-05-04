<template>
  <div class="bc-count-down">
    <div>
      {{ valueInfo.hh }}
    </div>
    <span>:</span>
    <div>{{ valueInfo.mm }}</div>
    <span>:</span>
    <div>{{ valueInfo.ss }}</div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const props = defineProps<{
  countSeconds: number;
}>();

const emits = defineEmits(["end"]);

const initCountSeconds = ref(0);
initCountSeconds.value = props.countSeconds;

const getFormat = (value, formatType) => {
  return dayjs.duration(value).format(formatType);
};

const valueInfo = ref({
  hh: "00",
  mm: "00",
  ss: "00"
});

const formatContSeconds = countSeconds => {
  valueInfo.value.hh = getFormat(countSeconds, "HH");
  valueInfo.value.mm = getFormat(countSeconds, "mm");
  valueInfo.value.ss = getFormat(countSeconds, "ss");
};

formatContSeconds(initCountSeconds.value);
watch(() => initCountSeconds.value, formatContSeconds);

const startCountDown = () => {
  const timer = setInterval(() => {
    initCountSeconds.value = initCountSeconds.value - 1000;
    if (initCountSeconds.value <= 0) {
      clearInterval(timer);
      emits('end')
    }
  }, 1000);
};

startCountDown();
</script>

<style lang="less" scoped>
.bc-count-down {
  display: flex;
  color: white;
  gap: 6px;
  align-items: stretch;
  > span {
    font-size: 18px;
    font-weight: 700;
  }
  > div {
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    background: #3dc119;
    border-radius: 3px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    &::after {
      content: " ";
      position: absolute;
      width: 100%;
      height: 1px;
      background: white;
      top: 50%;
      left: 0;
    }
  }
}
</style>
