<template>
  <van-field
    :modelValue="value"
    @update:modelValue="$event => emits('update:value', $event)"
    :placeholder="placeholder"
    :type="showPassword ? 'text' : 'password'"
    @click-right-icon="clickRightIcon"
    autocomplete="off"
  >
    <template #right-icon>
      <svg class="h-12px w-12px fill-text-6" v-if="!showPassword">
        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_View"></use>
      </svg>
      <svg class="h-12px w-12px fill-text-6" v-else>
        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Hide"></use>
      </svg>
    </template>
  </van-field>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    value: string;
    placeholder: string;
  }>(),
  {
    value: "",
    placeholder: ""
  }
);
const showPassword = ref(false);
const clickRightIcon = () => {
  showPassword.value = !showPassword.value;
};
const emits = defineEmits(["update:value"]);
</script>

<style></style>
