<template>
    <div class="card-box" :class="{active: border}">
        <div class="skip" v-if="skip"></div>
        <div class="card" :class="{gold: gold}">
            <div :class="`${cardColor}${cardNum}`"></div>
            <div :class="cardType"></div>
            <div class="tip">{{cardMultiple}}x</div>
        </div>
        <div class="icon" v-if="result">
            <span class="eq" v-if="result === 'eq'"><img :src="eq" alt="eq"></span>
            <span class="up" v-if="result === 'up'"><img :src="up" alt="up"></span>
            <span class="down" v-if="result === 'down'"><img :src="down" alt="down"></span>
            <span class="skip" v-if="result === 'skip'"><img :src="skips" alt="skips"></span>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
// enum CardType {
//     S= 'spade',
//     B= 'block',
//     H= 'heart',
//     C= 'club'
// }
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
        border: {
            type: Boolean,
            default: false
        },
        skip: {
            type: Boolean,
            default: false
        },
        result: {
            type: String,
            default: ''
        },
        gold: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const data = reactive({
            cardNumArr: ['A', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
            eq: new URL('@/assets/hilo/D.png', import.meta.url).href,
            up: new URL('@/assets/hilo/Up.png', import.meta.url).href,
            down: new URL('@/assets/hilo/Down.png', import.meta.url).href,
            skips: new URL('@/assets/hilo/forward.png', import.meta.url).href,
        })
        const cardColor = computed(() => {
            return props.cardType === 'block' || props.cardType === 'heart' ? 'r' : 'b'
        })
        

        return {
            ...toRefs(data),
            cardColor
        }
    },
})
</script>
<style lang="less" scoped>
.card-box{
    height: 84%;
    min-height: 60px;
    min-width: 15%;
    max-width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid transparent;
    border-radius: 5%;
    padding: 0.4%;
    float: left;
    margin: 0 .5%;
    position: relative;
    .skip{
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: rgba(0,0,0,.3);
      z-index: 10;
    }
    .icon{
      position: absolute;
      width: 16px;
      height: 16px;
      top: 50%;
      left: -5px;
      transform: translateY(-50%) translateX(-50%);
      background-color: #1cddbd;
      border-radius: 100%;
      z-index: 10;
      span{
        display: inline-block;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        &.up{
            background: #fbbd32;
        }
        &.down{
            background: #812a65;
        }
        &.eq{

        }
        &.skip{
            background: #009f85;
        }
      }
      img{
        width: 10px;
        height: 10px;
        position: relative;
        z-index: 11;
      }
    }
}
.active{
    border-color: #daa11c;
}
.card{
    width: 100%;
    height: 100%;
    background: url('../../../assets/hilo/8.png?imageMogr2/rotate/90') no-repeat;
    background-position: 35% 99.2%;
    background-size: 709% 201%;
    padding-top: 1%;
    position: relative;
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
        background-position: 99.9% 20.3%;
        background-size: 1000% 2000%;
        margin: 0 auto;
    }
    .bQ{
        width: 50%;
        height: 50%;
        background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
        background-position: 98.2% 25.6%;
        background-size: 1200% 2000%;
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
        background-position: 99.9% 46.4%;
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
        background-position: 76% 60.7%;
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
        background-position: 66.4% 59.7%;
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
        width: 25%;
        height: 30%;
        background: url('../../../assets/hilo/8.png?imageMogr2/rotate/90') no-repeat;
        background-position: 99.8% 147%;
        background-size: 1000% 200%;
        margin: 0 auto;
    }
    .block {
        width: 25%;
        height: 30%;
        background: url('../../../assets/hilo/8.png?imageMogr2/rotate/90') no-repeat;
        background-position: 88.8% 147%;
        background-size: 1200% 200%;
        margin: 0 auto;
    }
    .heart{
        width: 25%;
        height: 10%;
        background: url('../../../assets/hilo/8.png?imageMogr2/rotate/90') no-repeat;
        background-position: 100.8% 42%;
        background-size: 2200% 1000%;
        margin: 0 auto;
    }
    .club{
        width: 20%;
        height: 10%;
        background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
        background-position: 82% 35%;
        background-size: 1070% 380%;
        margin: 0 auto;
    }
    .tip{
        background-color: #1cddbd;
        border-radius: 10px;
        width: 102%;
        height: 22%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bolder;
        font-size: 0.8rem;
        color: #000;
        position: absolute;
        bottom: -0px;
        text-align: center;
    }
    
}
.card{
    .c{
        width: 100%;
        height: 100%;
        background: url('../../../assets/hilo/8.png?imageMogr2/rotate/90') no-repeat;
        background-position: 35% 99.2%;
        background-size: 709% 201%;
        padding-top: 1%;
        position: relative;
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
            background-position: 99.9% 20.3%;
            background-size: 1000% 2000%;
            margin: 0 auto;
        }
        .bQ{
            width: 50%;
            height: 50%;
            background: url(/src/assets/hilo/81.png?imageMogr2/rotate/90) no-repeat;
            background-position: 98.2% 25.6%;
            background-size: 1200% 2000%;
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
            background-position: 99.9% 46.4%;
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
            background-position: 76% 60.7%;
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
            background-position: 66.4% 59.7%;
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
            width: 25%;
            height: 30%;
            background: url('../../../assets/hilo/8.png?imageMogr2/rotate/90') no-repeat;
            background-position: 99.8% 147%;
            background-size: 1000% 200%;
            margin: 0 auto;
        }
        .block {
            width: 25%;
            height: 30%;
            background: url('../../../assets/hilo/8.png?imageMogr2/rotate/90') no-repeat;
            background-position: 88.8% 147%;
            background-size: 1200% 200%;
            margin: 0 auto;
        }
        .heart{
            width: 25%;
            height: 10%;
            background: url('../../../assets/hilo/8.png?imageMogr2/rotate/90') no-repeat;
            background-position: 100.8% 42%;
            background-size: 2200% 1000%;
            margin: 0 auto;
        }
        .club{
            width: 20%;
            height: 10%;
            background: url(/src/assets/hilo/8.png?imageMogr2/rotate/90) no-repeat;
            background-position: 82% 35%;
            background-size: 1070% 380%;
            margin: 0 auto;
        }
        .tip{
            background-color: #1cddbd;
            border-radius: 10px;
            width: 102%;
            height: 22%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bolder;
            font-size: 0.8rem;
            color: #000;
            position: absolute;
            bottom: -0px;
            text-align: center;
        }
    }
    
    
}
.gold{
    background: url('../../../assets/hilo/8.png?imageMogr2/rotate/90') no-repeat;
    background-position: 19% 99.2%;
    background-size: 740% 201%;
}
</style>
