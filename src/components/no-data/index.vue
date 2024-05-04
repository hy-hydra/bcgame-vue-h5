<template>
    <div class="text-center">
      <img src="@/assets/layout/empty.webp" class="h-170px w-170px" />
      <div class="text-12px text-text-14">
        {{ $t("oops") }}
      </div>
    </div>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const $t = key => t(`comp.${key}`)
</script>
<style lang="less"></style>
