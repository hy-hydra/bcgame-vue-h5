<template>
  <div class="record-component">
    <div class="table-header flex justify-between">
      <div class="header-col text-12px text-text-4 flex-1 text-center">
        Period
      </div>
      <div class="header-col text-12px text-text-4 flex-1 text-center">
        Price
      </div>
      <div class="header-col text-12px text-text-4 flex-1 text-center">
        Winning Numbers
      </div>
    </div>
    <div class="table-body">
      <div class="table-item flex justify-between items-center h-54px">
        <div class="table-item__cell text-12px flex-1 text-center font-700">
          01/17-253 period
        </div>
        <div class="table-item__cell text-12px flex-1 text-center font-700">
          90,734
        </div>
        <div class="table-item__cell flex-1 flex justify-center">
          <GreenBall :number="7" />
        </div>
      </div>
      <div class="table-item flex justify-between items-center h-54px">
        <div class="table-item__cell text-12px flex-1 text-center font-700">
          01/17-253 period
        </div>
        <div class="table-item__cell text-12px flex-1 text-center font-700">
          90,734
        </div>
        <div class="table-item__cell flex-1 flex justify-center">
          <RedBall :number="4" />
        </div>
      </div>
      <div class="table-item flex justify-between items-center h-54px">
        <div class="table-item__cell text-12px flex-1 text-center font-700">
          01/17-253 period
        </div>
        <div class="table-item__cell text-12px flex-1 text-center font-700">
          90,734
        </div>
        <div class="table-item__cell flex-1 flex justify-center">
          <RedBlueBall :number="4" />
        </div>
      </div>
      <div class="table-item flex justify-between items-center h-54px">
        <div class="table-item__cell text-12px flex-1 text-center font-700">
          01/17-253 period
        </div>
        <div class="table-item__cell text-12px flex-1 text-center font-700">
          90,734
        </div>
        <div class="table-item__cell flex-1 flex justify-center">
          <GreenBlueBall :number="4" />
        </div>
      </div>
    </div>
    <div class="roll overflow-auto h-78px ">
      <div
        class="roll-inner flex gap-32px"
        :style="{ transform: `translateX(-${activeIdnex * 56 - 220}px)` }"
      >
        <red-ball
          :number="1"
          v-for="index in 120"
          :key="index"
          :class="index === activeIdnex && 'scale-200'"
        ></red-ball>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RedBall from "./red-ball.vue";
import GreenBall from "./green-ball.vue";
import RedBlueBall from "./red-blue-ball.vue";
import GreenBlueBall from "./green-blue-ball.vue";

const activeIdnex = ref(14);
setInterval(() => {
  activeIdnex.value++;
}, 200);

// const animate = () => {
//   activeIdnex.value++;
//   requestAnimationFrame(animate);
// };
// animate();
</script>

<style lang="less" scoped>
.record-component {
  .table-body {
    .table-item {
      &:nth-child(even) {
        background-color: var(--fog-48);
      }
    }
  }
}
.roll {
  .roll-inner {
    transition: all 0.3s;
  }
}
</style>
