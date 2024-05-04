<template>
  <div class="join-members  bg-fog-13">
    <!-- <div class="join-item py-24px">
      <p class="text-text-3 text-18px text-center m-0 mb-16px">
        Accepted Networks
      </p>
      <div class="flex justify-center flex-wrap gap-6px px-10px ">
      </div>
    </div> -->
    <div class="join-item px-12px py-24px">
      <p class="text-center m-0 text-text-3 leading-24 text-18px mb-12px">
        Sponsorship and Gaming <br />
        Responsibilities
      </p>
      <div class="item-wrap text-center">
        <div class="h-54px flex justify-between mb-12px">
          <!-- https://bc.game/assets/sigma.1d4c21cd.png -->
          <!-- <img src="@/assets/join-members/sigma.webp" alt="" /> -->
          <img src="@/assets/join-members/cloudnine.webp" alt="" />
          <img src="@/assets/join-members/afa.webp" alt="" />
        </div>
        <div class="h-46px flex justify-between mb-12px">
          <img src="@/assets/join-members/verify.webp" alt="" />
          <img src="@/assets/join-members/itech.webp" alt="" />
          <img src="@/assets/join-members/respon.webp" alt="" />
        </div>

        <img class="h-46px mx-auto" src="@/assets/join-members/eighteen.webp" alt="" />
      </div>
    </div>
    <div class="join-item px-18px py-24px text-10px text-center">
      <!-- <p> -->
      <!-- https://bc.game/assets/logo_pure.5df3a0c2.png -->
      <!-- <img class="h-34px" src="@/assets/join-members/logo_pure.webp" alt="" /> -->
      <!-- </p> -->
      <span>
        A multi-award winning crypto casino. With a player-centric approach,
      </span>
      <span>{{ upperTitle }} </span>
      <span> is able to satisfy millions of gamblers across the globe. </span>
      <span>{{ upperTitle }}</span>
      <span>
        has its priority set on its community, ensuring an everlasting and
        endlessly entertaining gambling experience.</span>
      <p class="text-center mt-28px">
        <img class="h-34px" src="@/assets/join-members/license.webp" alt="" />
      </p>

      <span>{{ upperTitle }}</span>
      <span>
        is operated by BlockDance B.V. (Commercial register of Curaçao
        no.158182, Emancipatie Boulevard Dominico F. "Don" Martina 31, Curaçao)
        under a sublicense CIL pursuant to Master gaming License #5536/JAZ.
      </span>
      <p class="mt-24px m-0">©{{ dayjs().year() }} {{ upperTitle }} ALL RIGHTS RESERVED</p>
      <p class="m-2px">1BTC=¥6,205,672</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores';
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';

const { title } = storeToRefs(useConfigStore())
const upperTitle = title.value.toUpperCase()


</script>

<style lang="less" scoped>
// .loop(@index) when (@index > 0) {
//   // 生成带有不同背景颜色的样式规则
//   .item-icon {
//     background-image: url("@/assets/join-members/hover.png");
//   }
//   // 递归调用循环，减少索引
//   .loop(@index - 1);
// }
.join-members {
  .join-item {
    border-bottom: 1px solid var(--border-4);
  }

  .item-icon {
    background-image: url("@/assets/join-members/hover.png");
    background-size: 205px 164px;
    background-repeat: no-repeat;
    transform: scale(0.85);
    background-origin: left top;
    height: 40px;
    width: 40px;

    &:nth-child(1) {
      background-position-x: 0;
      background-position-y: -41px;
    }

    &:nth-child(2) {
      background-position: -82px -82px;
    }

    &:nth-child(3) {
      background-position: -41px -82px;
    }

    &:nth-child(4) {
      background-position: -164px -82px;
    }

    &:nth-child(5) {
      background-position: -82px 0;
    }

    &:nth-child(6) {
      background-position: -41px -123px;
    }

    &:nth-child(7) {
      background-position: -164px -41px;
    }

    &:nth-child(8) {
      background-position: -41px -41px;
    }

    &:nth-child(9) {
      background-position: -41px 0;
    }

    &:nth-child(10) {
      background-position: -123px -123px;
    }

    &:nth-child(11) {
      background-position: -82px -123px;
    }

    &:nth-child(12) {
      background-position: 0 0;
    }

    &:nth-child(13) {
      background-position: 0 -123px;
    }

    &:nth-child(14) {
      background-position: 0 -82px;
    }

    &:nth-child(15) {
      background-position: -123px 0;
    }

    &:nth-child(16) {
      background-position: -164px 0;
    }

    &:nth-child(17) {
      background-position: -82px -41px;
    }

    &:nth-child(18) {
      background-position: -123px -82px;
    }
  }
}
</style>
