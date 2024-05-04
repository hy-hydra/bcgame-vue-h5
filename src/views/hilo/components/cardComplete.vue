<template>
  <div class="card">
    <div class="card1" :class="{back: animateShow}">
      <div :class="`${cardColor}${cardNum} num`"></div>
      <div :class="`${cardType} type`"></div>
      <div :class="`${cardTypeBig} big`"></div>
      <!-- <div class="tip">{{cardMultiple}}x</div> -->
    </div>
    <!-- <div class="bgc">
      <div class="b"></div>
      <div class="b b1"></div>
      <div class="b b2"></div>
    </div> -->
    <div class="card1 card2" :class="{front: animateShow, gold: cardGlod}">
      <!-- <div :class="`${cardColor}${cardNum} num`"></div>
      <div :class="`${cardType} type`"></div>
      <div :class="`${cardType} big`"></div> -->
      <!-- <div class="tip">{{cardMultiple}}x</div> -->
    </div>
    <div class="bgc">
      <div class="b bb"></div>
      <div class="b bb b1"></div>
      <div class="b bb b2"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
 
export default defineComponent({
  props: {
      cardNum: {
          type: String,
          default: ''
      },
      cardType: {
          type: String,
          default: ''
      },
      cardMultiple: {
          type: Number,
          default: 1
      },
      animate: {
        type: Boolean,
        default: false
      },
      cardGlod: {
        type: Boolean,
        default: false
      }
  },
  setup(props) {
      const data = reactive({
          cardNumArr: ['A', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
      })
      const cardColor = computed(() => {
          return props.cardType === 'block' || props.cardType === 'heart' ? 'r' : 'b'
      })
      const cardTypeBig = computed(() => {
        let cardType = props.cardType
        if(props.cardNum === 'J') {
          cardType = props.cardType === 'block' || props.cardType === 'heart' ? 'rjoker' : 'bjoker'
        } else if(props.cardNum === 'Q') {
          cardType = props.cardType === 'block' || props.cardType === 'heart' ? 'rqueen' : 'bqueen'
        } else if(props.cardNum === 'K') {
          cardType = props.cardType === 'block' || props.cardType === 'heart' ? 'rking' : 'bking'
        }
        return cardType
      })
      const animateShow = computed(() => props.animate)

      return {
          ...toRefs(data),
          cardColor,
          animateShow,
          cardTypeBig
      }
  },
})
</script>
<style lang="less" scoped>
.card{
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 0;
  border-radius: 1%;
  .bgc{
    position: absolute;
    top: 0;
    left: -1%;
    width: 101%;
    height: 100%;
    z-index: -1;
    .b, .bb {
      background: url('../../../assets/hilo/8.png?imageMogr2/rotate/90');
      background-repeat: no-repeat;
      background-position: 35% 99.2%;
      background-size: 709% 199%;
      position: absolute;
      top: 1%;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    .b1{
      top: 2%;
      z-index: -2;
    }
    .b2{
      top: 3%;
      z-index: -3;
    }
  }
}
.card1{
  width: 100%;
  height: 100%;
  background: url('../../../assets/hilo/8.png?imageMogr2/rotate/90');
  background-repeat: no-repeat;
  background-position: 35% 99.2%;
  background-size: 746% 199%;
  padding-top: 1%;
  position: absolute;
  z-index: 4;
  top: 0;
  left: 0;
  border-radius: 14px;
  .bK{
      width: 50%;
      height: 50%;
      background: url('../../../assets/hilo/8.png?imageMogr2/rotate/90') no-repeat;
      background-position: 45.9% 58.2%;
      background-size: 2900% 700%;
      margin: 0 auto;
  }
  .rK{
      width: 50%;
      height: 50%;
      background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
      background-position: 97.9% 51.7%;
      background-size: 1200% 2000%;
      margin: 0 auto;
  }
  .bQ{
      width: 50%;
      height: 50%;
      background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
      background-position: 97.9% 25.7%;
      background-size: 1200% 2000%;
      margin: 0 auto;
  }
  .rQ{
      width: 50%;
      height: 50%;
      background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
      background-position: 97.9% 20.3%;
      background-size: 1200% 2000%;
      margin: 0 auto;
  }
  .bQ{
      width: 50%;
      height: 50%;
      background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
      background-position: 99.5% 25.6%;
      background-size: 1000% 2000%;
      margin: 0 auto;
  }
  .rJ{
      width: 50%;
      height: 50%;
      background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
      background-position: 97.9% 36%;
      background-size: 1200% 2000%;
      margin: 0 auto;
  }
  .bJ{
      width: 50%;
      height: 50%;
      background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
      background-position: 97.9% 30.7%;
      background-size: 1200% 2000%;
      margin: 0 auto;
  }
  .r10{
      width: 56%;
      height: 50%;
      background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
      background-position: 99.9% 41.2%;
      background-size: 960% 2000%;
      margin: 0 auto;
  }
  .b10{
      width: 56%;
      height: 50%;
      background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
      background-position: 99.9% 46.5%;
      background-size: 960% 2000%;
      margin: 0 auto;
  }
  .b9{
      width: 46%;
      height: 50%;
      background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
      background-position: 63.9% 1.8%;
      background-size: 3200% 730%;
      margin: 0 auto;
  }
  .r9{
      width: 46%;
      height: 50%;
      background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
      background-position: 60.9% 1.8%;
      background-size: 3200% 730%;
      margin: 0 auto;
  }
  .b8{
      width: 46%;
      height: 50%;
      background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
      background-position: 72.9% 59.8%;
      background-size: 3200% 730%;
      margin: 0 auto;
  }
  .r8{
      width: 46%;
      height: 50%;
      background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
      background-position: 69.7% 59.8%;
      background-size: 3200% 730%;
      margin: 0 auto;
  }
  .b7{
      width: 46%;
      height: 50%;
      background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
      background-position: 98.2% 70.8%;
      background-size: 3200% 730%;
      margin: 0 auto;
  }
  .r7{
      width: 46%;
      height: 50%;
      background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
      background-position: 46.5% 97.7%;
      background-size: 1100% 2000%;
      margin: 0 auto;
  }
  .b6{
      width: 46%;
      height: 50%;
      background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
      background-position: 76.07% 60.6%;
      background-size: 3200% 730%;
      margin: 0 auto;
  }
  .r6{
      width: 46%;
      height: 50%;
      background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
      background-position: 81% 78.4%;
      background-size: 1100% 2000%;
      margin: 0 auto;
  }
  .b5{
      width: 46%;
      height: 50%;
      background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
      background-position: 66.5% 59.7%;
      background-size: 3200% 730%;
      margin: 0 auto;
  }
  .r5{
      width: 46%;
      height: 50%;
      background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
      background-position: 63.2% 58.7%;
      background-size: 3200% 730%;
      margin: 0 auto;
  }
  .b4{
      width: 46%;
      height: 50%;
      background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
      background-position: 82.4% 60.6%;
      background-size: 3200% 730%;
      margin: 0 auto;
  }
  .r4{
      width: 46%;
      height: 50%;
      background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
      background-position: 90.8% 22.6%;
      background-size: 3200% 730%;
      margin: 0 auto;
  }
  .b3{
      width: 46%;
      height: 50%;
      background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
      background-position: 57% 58%;
      background-size: 3200% 730%;
      margin: 0 auto;
  }
  .r3{
      width: 46%;
      height: 50%;
      background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
      background-position: 60.2% 58%;
      background-size: 3200% 730%;
      margin: 0 auto;
  }
  .b2{
      width: 46%;
      height: 50%;
      background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
      background-position: 81% 83.4%;
      background-size: 1100% 2000%;
      margin: 0 auto;
  }
  .r2{
      width: 46%;
      height: 50%;
      background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
      background-position: 79.1% 60.6%;
      background-size: 3200% 730%;
      margin: 0 auto;
  }
  .bA{
      width: 46%;
      height: 50%;
      background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
      background-position: 98% 56.9%;
      background-size: 1100% 2000%;
      margin: 0 auto;
  }
  .rA{
      width: 46%;
      height: 50%;
      background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
      background-position: 49.5% 58.7%;
      background-size: 3200% 730%;
      margin: 0 auto;
  }
  .spade{
      width: 25% !important;
      height: 30% !important;
      background: url('../../../assets/hilo/8.png?imageMogr2/rotate/90') no-repeat;
      background-position: 99.8% 148%;
      background-size: 1000% 200%;
      margin: 0 auto;
  }
  .spade.big{
    width: 56% !important;
    height: 77% !important;
  }
  .block {
      width: 25% !important;
      height: 30% !important;
      background: url('../../../assets/hilo/8.png?imageMogr2/rotate/90') no-repeat;
      background-position: 88.8% 147%;
      background-size: 1200% 200%;
      margin: 0 auto;
  }
  .block.big{
    width: 52% !important;
    height: 75% !important;
  }
  .heart{
      width: 25% !important;
      height: 15% !important;
      background: url('../../../assets/hilo/8.png?imageMogr2/rotate/90') no-repeat;
      background-position: 100.8% 42%;
      background-size: 2200% 900%;
      margin: 0 auto;
  }
  .big.heart{
    width: 66% !important;
    height: 42% !important;
  }
  .club{
      width: 26%;
      height: 10%;
      background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
      background-position: 82% 35%;
      background-size: 1070% 380%;
      margin: 0 auto;
  }
  .big.bjoker{
    width: 55%;
    height: 57%;
    background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
    background-position: 71.6% 25%;
    background-size: 1110% 290%;
    margin: 0 auto;
    position: absolute;
    top: 39%;
  }
  .big.rjoker{
    width: 55%;
    height: 57%;
    background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
    background-position: 71.6% 25%;
    background-size: 1110% 290%;
    margin: 0 auto;
    position: absolute;
    top: 39%;
  }
  .big.bqueen{
    width: 55%;
    height: 57%;
    background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
    background-position: 61.5% 24%;
    background-size: 1080% 290%;
    margin: 0 auto;
    position: absolute;
    top: 39%;
  }
  .big.rqueen{
    width: 55%;
    height: 57%;
    background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
    background-position: 69.5% 100%;
    background-size: 1080% 290%;
    margin: 0 auto;
    position: absolute;
    top: 39%;
  }
  .big.bking{
    width: 55%;
    height: 57%;
    background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
    background-position: 59.2% 99%;
    background-size: 1110% 290%;
    margin: 0 auto;
    position: absolute;
    top: 39%;
  }
  .big.rking{
    width: 55%;
    height: 57%;
    background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
    background-position: 49.2% 99%;
    background-size: 1110% 290%;
    margin: 0 auto;
    position: absolute;
    top: 39%;
  }
  .tip{
      background-color: #1cddbd;
      border-radius: 1rem;
      width: 102%;
      height: 22%;
      line-height: 1.5;
      font-size: 0.8rem;
      color: #000;
      position: absolute;
      bottom: -2px;
      text-align: center;
  }
  .num{
    position: absolute;
    left: 5%;
    top: 3%;
    width: 25%;
    height: 30%;
  }
  .type{
    position: absolute;
    left: 6%;
    top: 34%;
    width: 25%;
    height: 19%;
  }
  .big{
    position: absolute;
    left: 40%;
    top: 50%;
    width: 54%;
    height: 43%;
  }
}
.card1{
  .v{
    width: 100%;
    height: 100%;
    background: url('../../../assets/hilo/8.png?imageMogr2/rotate/90');
    background-repeat: no-repeat;
    background-position: 35% 99.2%;
    background-size: 746% 199%;
    padding-top: 1%;
    position: absolute;
    z-index: 4;
    top: 0;
    left: 0;
    border-radius: 14px;
    .bK{
        width: 50%;
        height: 50%;
        background: url('../../../assets/hilo/8.png?imageMogr2/rotate/90') no-repeat;
        background-position: 45.9% 58.2%;
        background-size: 2900% 700%;
        margin: 0 auto;
    }
    .rK{
        width: 50%;
        height: 50%;
        background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
        background-position: 97.9% 51.7%;
        background-size: 1200% 2000%;
        margin: 0 auto;
    }
    .bQ{
        width: 50%;
        height: 50%;
        background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
        background-position: 97.9% 25.7%;
        background-size: 1200% 2000%;
        margin: 0 auto;
    }
    .rQ{
        width: 50%;
        height: 50%;
        background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
        background-position: 97.9% 20.3%;
        background-size: 1200% 2000%;
        margin: 0 auto;
    }
    .bQ{
        width: 50%;
        height: 50%;
        background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
        background-position: 99.5% 25.6%;
        background-size: 1000% 2000%;
        margin: 0 auto;
    }
    .rJ{
        width: 50%;
        height: 50%;
        background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
        background-position: 97.9% 36%;
        background-size: 1200% 2000%;
        margin: 0 auto;
    }
    .bJ{
        width: 50%;
        height: 50%;
        background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
        background-position: 97.9% 30.7%;
        background-size: 1200% 2000%;
        margin: 0 auto;
    }
    .r10{
        width: 56%;
        height: 50%;
        background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
        background-position: 99.9% 41.2%;
        background-size: 960% 2000%;
        margin: 0 auto;
    }
    .b10{
        width: 56%;
        height: 50%;
        background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
        background-position: 99.9% 46.5%;
        background-size: 960% 2000%;
        margin: 0 auto;
    }
    .b9{
        width: 46%;
        height: 50%;
        background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
        background-position: 63.9% 1.8%;
        background-size: 3200% 730%;
        margin: 0 auto;
    }
    .r9{
        width: 46%;
        height: 50%;
        background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
        background-position: 60.9% 1.8%;
        background-size: 3200% 730%;
        margin: 0 auto;
    }
    .b8{
        width: 46%;
        height: 50%;
        background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
        background-position: 72.9% 59.8%;
        background-size: 3200% 730%;
        margin: 0 auto;
    }
    .r8{
        width: 46%;
        height: 50%;
        background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
        background-position: 69.7% 59.8%;
        background-size: 3200% 730%;
        margin: 0 auto;
    }
    .b7{
        width: 46%;
        height: 50%;
        background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
        background-position: 98.2% 70.8%;
        background-size: 3200% 730%;
        margin: 0 auto;
    }
    .r7{
        width: 46%;
        height: 50%;
        background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
        background-position: 46.5% 97.7%;
        background-size: 1100% 2000%;
        margin: 0 auto;
    }
    .b6{
        width: 46%;
        height: 50%;
        background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
        background-position: 76.07% 60.6%;
        background-size: 3200% 730%;
        margin: 0 auto;
    }
    .r6{
        width: 46%;
        height: 50%;
        background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
        background-position: 81% 78.4%;
        background-size: 1100% 2000%;
        margin: 0 auto;
    }
    .b5{
        width: 46%;
        height: 50%;
        background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
        background-position: 66.5% 59.7%;
        background-size: 3200% 730%;
        margin: 0 auto;
    }
    .r5{
        width: 46%;
        height: 50%;
        background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
        background-position: 63.2% 58.7%;
        background-size: 3200% 730%;
        margin: 0 auto;
    }
    .b4{
        width: 46%;
        height: 50%;
        background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
        background-position: 82.4% 60.6%;
        background-size: 3200% 730%;
        margin: 0 auto;
    }
    .r4{
        width: 46%;
        height: 50%;
        background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
        background-position: 90.8% 22.6%;
        background-size: 3200% 730%;
        margin: 0 auto;
    }
    .b3{
        width: 46%;
        height: 50%;
        background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
        background-position: 57% 58%;
        background-size: 3200% 730%;
        margin: 0 auto;
    }
    .r3{
        width: 46%;
        height: 50%;
        background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
        background-position: 60.2% 58%;
        background-size: 3200% 730%;
        margin: 0 auto;
    }
    .b2{
        width: 46%;
        height: 50%;
        background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
        background-position: 81% 83.4%;
        background-size: 1100% 2000%;
        margin: 0 auto;
    }
    .r2{
        width: 46%;
        height: 50%;
        background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
        background-position: 79.1% 60.6%;
        background-size: 3200% 730%;
        margin: 0 auto;
    }
    .bA{
        width: 46%;
        height: 50%;
        background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
        background-position: 98% 56.9%;
        background-size: 1100% 2000%;
        margin: 0 auto;
    }
    .rA{
        width: 46%;
        height: 50%;
        background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
        background-position: 49.5% 58.7%;
        background-size: 3200% 730%;
        margin: 0 auto;
    }
    .spade{
        width: 25% !important;
        height: 30% !important;
        background: url('../../../assets/hilo/8.png?imageMogr2/rotate/90') no-repeat;
        background-position: 99.8% 148%;
        background-size: 1000% 200%;
        margin: 0 auto;
    }
    .spade.big{
      width: 56% !important;
      height: 77% !important;
    }
    .block {
        width: 25% !important;
        height: 30% !important;
        background: url('../../../assets/hilo/8.png?imageMogr2/rotate/90') no-repeat;
        background-position: 88.8% 147%;
        background-size: 1200% 200%;
        margin: 0 auto;
    }
    .block.big{
      width: 52% !important;
      height: 75% !important;
    }
    .heart{
        width: 25% !important;
        height: 15% !important;
        background: url('../../../assets/hilo/8.png?imageMogr2/rotate/90') no-repeat;
        background-position: 100.8% 42%;
        background-size: 2200% 900%;
        margin: 0 auto;
    }
    .big.heart{
      width: 66% !important;
      height: 42% !important;
    }
    .club{
        width: 26%;
        height: 10%;
        background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
        background-position: 82% 35%;
        background-size: 1070% 380%;
        margin: 0 auto;
    }
    .big.bjoker{
      width: 55%;
      height: 57%;
      background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
      background-position: 71.6% 25%;
      background-size: 1110% 290%;
      margin: 0 auto;
      position: absolute;
      top: 39%;
    }
    .big.rjoker{
      width: 55%;
      height: 57%;
      background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
      background-position: 71.6% 25%;
      background-size: 1110% 290%;
      margin: 0 auto;
      position: absolute;
      top: 39%;
    }
    .big.bqueen{
      width: 55%;
      height: 57%;
      background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
      background-position: 61.5% 24%;
      background-size: 1080% 290%;
      margin: 0 auto;
      position: absolute;
      top: 39%;
    }
    .big.rqueen{
      width: 55%;
      height: 57%;
      background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
      background-position: 69.5% 100%;
      background-size: 1080% 290%;
      margin: 0 auto;
      position: absolute;
      top: 39%;
    }
    .big.bking{
      width: 55%;
      height: 57%;
      background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
      background-position: 59.2% 99%;
      background-size: 1110% 290%;
      margin: 0 auto;
      position: absolute;
      top: 39%;
    }
    .big.rking{
      width: 55%;
      height: 57%;
      background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
      background-position: 49.2% 99%;
      background-size: 1110% 290%;
      margin: 0 auto;
      position: absolute;
      top: 39%;
    }
    .tip{
        background-color: #1cddbd;
        border-radius: 1rem;
        width: 102%;
        height: 22%;
        line-height: 1.5;
        font-size: 0.8rem;
        color: #000;
        position: absolute;
        bottom: -2px;
        text-align: center;
    }
    .num{
      position: absolute;
      left: 5%;
      top: 3%;
      width: 25%;
      height: 30%;
    }
    .type{
      position: absolute;
      left: 6%;
      top: 34%;
      width: 25%;
      height: 19%;
    }
    .big{
      position: absolute;
      left: 40%;
      top: 50%;
      width: 54%;
      height: 43%;
    }
  }
  
}
.card2 {
  background: url('../../../assets/hilo/81.png?imageMogr2/rotate/90');
  background-repeat: no-repeat;
  background-position: 82% 46%;
  background-size: 263% 550%;
  .bb{
    background: url('../../../assets/hilo/81.png?imageMogr2/rotate/90');
    background-repeat: no-repeat;
    background-position: 82% 46%;
    background-size: 263% 550%;
  }
}
.gold{
  background: url(/src/assets/hilo/11.png);
  background-repeat: no-repeat;
  background-size: 102% 101%;
  background-position-x: 42%;
}
.back{
  position: absolute;
  left: 0;
  top: 1%;
  z-index: 0;
  animation: spin-reverse .5s linear;

}
.front{
  position: absolute;
  left: 2%;
  top: 2%;
  z-index: -1;
  animation: spin .5s linear;
}
@keyframes spin {
  0% {
    transform: rotateY(0);
    z-index: 0;
  }

  100% {
    transform: rotateY(180deg);
    z-index: -1;
  }
}

@keyframes spin-reverse {
  0% {
    transform: rotateY(-180deg);
    z-index: -1;
  }

  100% {
    transform: rotateY(0);
    z-index: 0;
  }
}
</style>
