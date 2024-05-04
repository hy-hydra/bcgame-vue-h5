import type { log } from 'console';
<template>
  <div class="bc-sms-code-input flex gap-8px justify-center">
    <input
      v-for="(_, index) in codeDigits"
      :key="index"
      v-model="code[index]"
      @input="e => handleInput(e, index)"
      type="text"
      maxlength="1"
      :id="`bc-sms-code-input_${index}`"
      class="h-47px w-40px rounded-4px  text-center bg-transparent border-1px border-border-8 border-solid"
    />
  </div>
</template>

<script setup lang="ts">
const codeDigits = ref(6);
const code = ref(new Array(6).fill(""));
const handleInput = (e, index) => {
  if (!e.target.value) {
    const active: HTMLElement = document.querySelector(
      `#bc-sms-code-input_${index - 1}`
    );
    active && active.focus();
    return;
  }

  if (!/^\d*$/.test(code.value[index])) {
    code.value[index] = "";
  } else if (index < codeDigits.value - 1 && code.value[index] !== "") {
    const active: HTMLElement = document.querySelector(
      `#bc-sms-code-input_${index + 1}`
    );
    active && active.focus();
  }
};
</script>
<style scoped lang="less"></style>
