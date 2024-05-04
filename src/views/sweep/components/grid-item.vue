<script setup lang="ts">
import { toRefs, ref } from "vue";
// import { useI18n } from "vue-i18n";

// const { t } = useI18n();
// const $t = key => {
//   return t("home.win_list." + key);
// };
const emit = defineEmits(["flag", "open", "openAll"]);
const props = defineProps({
  count: Number,
  isBomb: Boolean,
  index: Number,
  isOpen: Boolean
});
const {   isBomb, index } = toRefs(props);
const isOpen = ref(false);
const isFlag = ref(false);
const animate = ref(false);

const handleBom = () => {
  open();
};
const open = () => {
  if (props.isOpen || isFlag.value) {
    return;
  }
  isOpen.value = true;
  animate.value = true;
  emit("open");
};
const handleRightClick = event => {
  event.preventDefault();
  if (isOpen.value) {
    return;
  }
  isFlag.value = !isFlag.value;
  emit("flag", isFlag.value);
};

const reset = () => {
  isOpen.value = false;
  isFlag.value = false;
};
defineExpose({
  reset,
  open,
  isFlag,
  isBomb
});
</script>
<template>
  <div
    class="grid-item"
    :class="{ opened: isOpen }"
    @click="handleBom"
    @contextmenu="handleRightClick"
  >
    <template v-if="isFlag" class="sweep-header">ok</template>
    <template v-else-if="isOpen">
      <!-- 雷 -->
      <template v-if="isBomb&& index != 12">
        <span class="w70 rotate90 lei" :class="{front: animate}">
          <img class="w50" src="../../../assets/sweep/bom.png">
        </span>
      </template>
      <!-- 金币 -->
      <template v-else>
        <div class="w70 jb" :class="{front: animate}">
          <img class="w50" src="../../../assets/sweep/jb.png">
        </div>
      </template>
    </template>
    <!-- 宝箱 -->
    <!-- <template v-if="index == 12"> 
      <div class="wh70 cols">
        <img class="w60" src="../../../assets/sweep/bx.png">
      </div>
    </template> -->
    <!-- <div class="w70" :class="{front: animate}">
      <img class="w50" src="../../../assets/sweep/b1.png">
    </div> -->
  </div>
</template>
<style lang="less" scoped>
.w70 {
  width: 100%;
  height: 100%; 
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.cols{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.w50{
  width: 50px;
  height: 50px;
  
}
.jb{
  background-color: rgb(174 , 131, 31);
}
.lei{
  background-color: rgb(57 , 34, 92);
}
 
 .rotate90{
  transform: rotate(270deg);
 } 
.wh70 {
  width: 70px;
  height: 70px;
}
.grid-item {
  background-color: rgb(118 , 24, 26);
  display: inline-block !important;
}
.back{
  position: absolute;
  left: 0;
  top: 0;
  background-image: url(../../../assets/sweep/b1.png);
  background-size: cover;
  z-index: 1;
  animation: spin-reverse 0.6s linear;

}
.front{
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  // transform: rotateX(-90deg);
  animation: spin 0.6s linear;
  img{
    transform: rotate(-90deg);
  }
}
.opened {
  position: relative;
}
@keyframes spin {
  0% {
    transform: rotateY(0);
    z-index: -1;
  }

  100% {
    transform: rotateY(180deg);
    z-index: 1;
  }
}

@keyframes spin-reverse {
  0% {
    transform: rotateY(-180deg);
    z-index: 0;
  }

  100% {
    transform: rotateY(0);
    z-index: 1;
  }
}
.sweep-header{
  .a{

    display: flex;
  // position: absolute;
  // top: 25vw;
  // left: 0;
  width: 100%;
  justify-content: space-around;
  .left, .right{
    flex: 3;
    text-align: end;
    height: 80%;
    .box{
      background-color: rgba(34, 65, 122, 0.8);
      width: 3.6rem;
      // height: 3rem;
      text-align: center;
      border-radius: 0.4rem;
      font-size: 12px;
      color: #c1dff3;
      margin-top: 1rem;
      span{
        display: inline-block;
        width: 100%;
      }
    }
  }
  .right{
    display: flex;
    justify-content: flex-start;
    padding-left: 0.8rem;
    align-items: center;
  }
  .left img{
    width: 2.6rem;  
    height: 2.6rem;
    margin-top: 4px;
    margin-bottom: 4px;
  }
  .right img{
    width: 3rem;
    transform: rotate(-90deg);
  }
  .left{
    display: flex;
    justify-content: flex-end;
    padding-right: 0.8rem;
    align-items: center;
  }
  .center{
    flex: 8;
    text-align: center;
    .mines{
      width: 65%;
      height: 2.2rem;
    }
    .img{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 1.4rem;
      .jackpot{
        width: 75%;
        height: 3rem;
      }
      .bx{
        width: 2rem;
        height: 2rem;
      }
    }
    .text{
      font-size: 1.5rem;
      font-weight: 900;
      letter-spacing: 0.1rem;
      margin-top: 0.5rem;
      display: block;
      color: #d9ae53;
      .amount{
        display: inline-block;
        width: 14px;
      }
    }
    .bxoverlay{
      width: 90%;
      height: 80%;
      background: url('../../assets/sweep/mask.png') no-repeat;
      background-size: 100% 100%;
      position: relative;
      left: 5%;
      top: 10%;
      img.close{
        position: absolute;
        width: 25px;
        height: 25px;
        right: 3%;
        top: 1.4%;
        z-index: 2;
      }
      .headerBac{
        width: 96%;
        height: 30%;
        margin-top: 9%;
        text-align: center;
        // background: url('../../assets/sweep/n.png') no-repeat;
        // background-size: 100px 100px;
        // background-position: 0 300px;
        position: absolute;
        top: 0%;
        left: 2%;
        z-index: 0;
        p{
          position: absolute;
          z-index: 1;
          margin: 0;
          &.f{
            font-size: 1.8vh;
            top: 44%;
            left: 50%;
            transform: translateX(-50%);
          }
          &.text1{
            font-size: 7vh;
            top: 55%;
            left: 50%;
            transform: translateX(-50%);
            letter-spacing: -5px;
            color: #d8b42e;
          }
          &.score{
            top: 88%;
            color: #9bc1f9;
            font-size: 1.6vh;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
      .header{
        height: 26%;
        position: relative;
        z-index: 1;
        margin-bottom: 15%;
      }
      .header img{
        width: 80%;
        height: 18%;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
        &.letter{
          top: 1.4%;
          width: 38%;
          height: 14%;
        }
      }
      .content{
        padding: 0 3% 3% 3%;
        height: 63%;
        overflow: auto;
        img{
          position: absolute;
          left: 2%;
          height: 63%;
          width: 100%;
        }
        .tbgc{
          border-radius: 4px;
          width: 96%;
        }
        .table{
          width: 100%;
          overflow: auto;
        }
      }
    }

  }
  }
  
}
</style>
