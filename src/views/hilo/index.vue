<template>
    <div class="hilo" @click="pageClick">
        <van-overlay :show="show" z-index="1000" style="--van-overlay-background: rgba(255, 255, 255, 1)">
            <div class="overlay">
                <div class="process">
                    <van-progress :percentage="percent" pivot-text="" track-color="#1b3157" pivot-color="#7232dd"
                        color="#038fd4" />
                    <div class="text">{{ percent }}%</div>
                </div>
            </div>
        </van-overlay>
        <!-- 返回首頁的按鈕 -->
        <div class="access-layout__nav relative w-[100%]">
            <svg class="h-12px w-12px fill-text-6 absolute right-12px cursor-pointer" style="top: -26px"
                @click="pageClose">
                <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Close"></use>
            </svg>
        </div>
        <van-col span="24" class="header">
            <div class="center">
                <div class="img">
                    <img src="@/assets/sweep/t1.png" alt="" class="jackpot" />
                    <img src="@/assets/sweep/jbx.png" alt="" ref="bx" class="bx object" @click="bxClick" />
                    <van-overlay :show="bxShow" z-index="1000">
                        <div class="bxoverlay">
                            <div class="headerBac">
                                <img src="@/assets/sweep/headerB.png" alt="" />
                                <p class="f">*9333</p>
                                <p class="text1">375,640.94</p>
                                <p class="score">2/11</p>
                            </div>
                            <div @click="closeClick">
                                <img src="@/assets/sweep/close.png" alt="" class="close" />
                            </div>
                            <div class="header">
                                <img src="@/assets/sweep/h.png" alt="" />
                                <img src="@/assets/sweep/jack1.png" alt="" class="letter" />
                            </div>
                            <div class="content">
                                <img src="@/assets/sweep/t.png" alt="" class="tbgc" />
                                <van-grid :border="false" :column-num="4" style="
                                        --van-grid-item-content-background: #1b3c71;
                                        --van-grid-item-text-color: #7a9cc1;
                                    ">
                                    <van-grid-item text="JPName" style="
                                            --van-grid-item-content-padding: 2px;
                                        " />
                                    <van-grid-item text="Date" style="
                                            --van-grid-item-content-padding: 2px;
                                        " />
                                    <van-grid-item text="Winner" style="
                                            --van-grid-item-content-padding: 2px;
                                        " />
                                    <van-grid-item text="Coin" style="
                                            --van-grid-item-content-padding: 2px;
                                        " />
                                </van-grid>
                                <div class="table">
                                    <van-grid :border="false" :column-num="4" v-for="index in 20" :key="index" :style="{
        '--van-grid-item-content-background':
            index % 2
                ? '#1b3c71'
                : '#112648',
        '--van-grid-item-text-color':
            '#9ec2f9'
    }">
                                        <van-grid-item style="
                                                --van-grid-item-content-padding: 4px;
                                            ">
                                            <van-image :src="name" />
                                        </van-grid-item>
                                        <van-grid-item text="2/16" style="
                                                --van-grid-item-content-padding: 4px;
                                            " />
                                        <van-grid-item text="*0223" style="
                                                --van-grid-item-content-padding: 4px;
                                            " />
                                        <van-grid-item text="60,100.93" style="
                                                --van-grid-item-content-padding: 4px;
                                            " />
                                    </van-grid>
                                </div>
                            </div>
                        </div>
                    </van-overlay>
                </div>
                <span class="text">
                    <b class="amount" v-for="(item, index) in currentAmount" :key="index">{{ item }}</b>
                </span>
            </div>
        </van-col>
        <van-col span="24" class="scrollbox">
            <div class="scroll">
                <img src="@/assets/sweep/tri.png" alt="leftClick" @click="leftArrowClick" />
                <div style="height: 100%">
                    <div class="ul" ref="ulx">
                        <Card :cardNum="card.cardNum" :cardType="card.cardType" :cardMultiple="card.cardMultiple"
                            :border="index === cardRecord.length - 1" :key="index" :skip="card.skip"
                            :result="card.result" :gold="card.gold" v-for="(card, index) in cardRecord" />
                    </div>
                </div>
                <img src="@/assets/sweep/tri.png" alt="rightClick" @click="rightArrowClick" />
            </div>
        </van-col>
        <van-col span="24" class="game game1">
            <div class="k"></div>
            <div class="cardBox">
                <CardComplete :cardNum="cardNum" :cardType="cardType" :cardGlod="cardGold" :animate="animate" />
            </div>
            <div class="bs">
                <div class="skip" @click="upDownClick('skip')">
                    <div class="skip-text"></div>
                </div>
                <!-- 上个按钮 -->
                <template v-if="cardNum === 'K'">
                    <div class="up upEq" @click="upDownClick('eq')">
                        <p class="t">SAME</p>
                        <p class="num">{{ Number((1 / 13).toFixed(2)) * 100 + '%(' + equalRate.toFixed(2) + 'x)' }}
                        </p>
                    </div>
                </template>
                <template v-else>
                    <div class="up" @click="upDownClick('up')">
                        <p class="t">HIGH</p>
                        <p class="num">{{ Number(((13 - switchPokerNum(cardNum)) / 13).toFixed(2)) * 100 + '%(' +
                            highRate.toFixed(2) + 'x)' }}</p>
                    </div>
                </template>
                <!-- 结束上个按钮 -->
                <!-- 下个按钮 -->
                <template v-if="cardNum === 'A'">
                    <div class="down dEq" @click="upDownClick('eq')">
                        <p class="t L">SAME</p>
                        <p class="num N">{{ Number((1 / 13).toFixed(2)) * 100 + '%(' + equalRate.toFixed(2) + 'x)'
                            }}
                        </p>
                    </div>
                </template>
                <template v-else>
                    <div class="down" @click="upDownClick('down')">
                        <p class="t L">LOW</p>
                        <p class="num N">{{ Number(((switchPokerNum(cardNum) - 1) / 13).toFixed(2)) * 100 + '%(' +
                            lowRate.toFixed(2) + 'x)' }}</p>
                    </div>
                </template>
                <!-- 结束下个按钮 -->
            </div>
            <div class="k l"></div>
        </van-col>
        <van-col span="24" class="info">
            <div class="coeff">
                <span class="text">COEFFICIENT：</span>
                <span class="num">{{ odds.toFixed(2) }}x</span>
            </div>
            <div class="b00">
                <div>
                    <span class="Balance">Balance:</span>
                    <span class="huan huan0">{{ balance }}</span>
                    <span class="huan huan1">{{ $t('sweep.win') }}:<span>{{ win }}</span></span>
                </div>
            </div>
        </van-col>
        <div class="b0">
            <div class="b1">
                <div class="j" @click="minusClick">-</div>
                <div @click="(e) => betClick(e, betNum)">
                    <div style="color: #7bdeff">Bet</div>
                    <div class="betN">{{ betNum }}</div>
                </div>
                <div class="butP minesP" v-if="clickType === 'hilo' && !STARTNUM">
                    <div class="betPoup minesPoup">
                        <div @click="(e) => betNumClick(e, item)" v-for="item in betAmount" :key="item"
                            :class="{ active: curNum === item }">
                            {{ item }}
                        </div>
                    </div>
                </div>
                <div class="plus" @click="plusClick">+</div>
            </div>
            <div class="b3" @click="startClick" v-if="!STARTNUM">
                <div>{{ $t('sweep.start') }}</div>
                <div class="hand" v-if="handShow && handSrc">
                    <img :src="handSrc" alt="" />
                </div>
            </div>
            <div class="b100" @click="cashoutClick" v-else>
                <div>{{ $t('sweep.cashout') }}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs, watch } from 'vue'
import * as TWEEN from '@tweenjs/tween.js'
import Card from './components/card.vue'
import CardComplete from './components/cardComplete.vue'
// import { sampleSize } from 'lodash-es'
import { showNotify } from 'vant'
import { useSearch } from './composables/useSearch'
import { useRouter } from "vue-router";
import { ENotifyTypes } from '@/const/enums.d'
import useAudio from '@/utils/hooks/useAudio'
import { forEach } from 'lodash-es'

// 音效資源
const signsSrc = ['betClick', 'bg']
const signs = {}
forEach(signsSrc, src => {
    signs[src] = useAudio(`/audio/hilo/${src}.mp3`)
})


enum CardType {
    S = 'spade',
    B = 'block',
    H = 'heart',
    C = 'club',
    J = 'joker',
    Q = 'queen',
    K = 'king'
}
export default defineComponent({
    components: { Card, CardComplete },
    setup() {
        const router = useRouter();
        const data = reactive({
            show: true,
            percent: 0,
            currentAmount: null,
            cardNum: '',
            cardType: CardType.S,
            cardGold: false,
            cardMultiple: 1,
            handShow: false,
            handNum: 1,
            handSrc: '',
            clickType: '',
            curNum: 1,
            bxShow: false,
            STARTNUM: false,
            betNum: 1,
            animate: false,
            balance: 2000,
            win: 0,
            odds: 1.0,
            betAmount: [],
            gameFinish: false,
            highRate: 0,
            lowRate: 0,
            equalRate: 0
        })
        const hiloData = ref([
            1, 2, 3, 5, 8, 10, 20, 30, 50, 100, 200, 300, 500, 800, 1000
        ])
        // const cardNum = ref([
        //   "2",
        //   "3",
        //   "4",
        //   "5",
        //   "6",
        //   "7",
        //   "8",
        //   "9",
        //   "10",
        //   "J",
        //   "Q",
        //   "K",
        //   "A"
        // ]);
        // const cardType = ref(["S", "B", "H", "C"]);

        const {
            search,
            allData,
            start,
            betChoose,
            PokerChoose,
            PokerCashOut
        } = useSearch()
        search()

        // 加载
        const loadingFunc = () => {
            // 定义初始值和目标值
            const initialValue = 1 // 起始金额为0
            const targetValue = 100 // 目标金额为1000

            // 更新函数，每次调用时会根据当前时间计算并更新金额值
            function update() {
                requestAnimationFrame(update)
                // 清除之前的所有 tweens（如果有）
                TWEEN.update()
            }

            // 创建 tween 对象
            new TWEEN.Tween({ value: initialValue })
                .to({ value: targetValue }, 50) // 设置过渡时长为2000ms
                .onUpdate((obj) => {
                    data.percent = Number(obj.value.toFixed(0)) // 保留两位小数
                    if (data.percent === 100) {
                        data.show = false
                        data.handShow = true
                        // const handInterval = setInterval(() => {
                        //   data.handNum = data.handNum === 1 ? 2 : 1;
                        //   data.handSrc = new URL(
                        //     `../../assets/sweep/hand${data.handNum}.png`,
                        //     import.meta.url
                        //   ).href;
                        // }, 500);
                    }
                })
                .start()

            // 开始动画
            requestAnimationFrame(update)
        }

        const initialValue = ref()
        // 数字变动
        const animationNum = () => {
            // 定义初始值和目标值
            initialValue.value = 0 // 起始金额为0
            const targetValue = 9000000000 // 目标金额为1000

            // 更新函数，每次调用时会根据当前时间计算并更新金额值
            function update() {
                requestAnimationFrame(update)

                // 清除之前的所有 tweens（如果有）
                TWEEN.update()
            }

            // 创建 tween 对象
            new TWEEN.Tween({ value: initialValue.value })
                .to({ value: targetValue }, 100000000000) // 设置过渡时长为2000ms
                .onUpdate((obj) => {
                    const amount = Number(obj.value.toFixed(2)) // 保留两位小数
                    data.currentAmount =
                        amount.toLocaleString().split('.')[1]?.length > 1
                            ? amount.toLocaleString()
                            : amount.toLocaleString() + '0'
                })
                .start()

            // 开始动画
            requestAnimationFrame(update)
        }

        const ulx = ref()
        // 左箭头
        const leftArrowClick = () => {
            ulx.value.scrollLeft -= 100
        }
        // 右箭头
        const rightArrowClick = () => {
            ulx.value.scrollLeft += 100
        }
        const name = new URL('../../assets/sweep/t2.png', import.meta.url).href
        const betClick = (e, num) => {
            e.stopPropagation()
            signs['bg'].loopPlay()
            data.curNum = num
            if (!data.STARTNUM) {
                signs['betClick'].signPlay()
            }
            if (data.clickType === 'hilo') {
                data.clickType = ''
            } else {
                data.clickType = 'hilo'
            }
        }
        // 弹窗数字点击
        const betNumClick = (e, num) => {
            e.stopPropagation()
            signs['bg'].loopPlay()
            data.betNum = num
            data.clickType = ''
            betChoose({
                idx: data.betAmount.indexOf(num) //下注额度下标
            })
        }

        const pageClick = () => {
            data.clickType = ''
            signs['bg'].loopPlay()
        }

        const pageClose = e => {
            e.stopPropagation();
            router.push({ name: "home" });
        };

        // 宝箱点击弹出弹窗
        const bxClick = () => {
            data.bxShow = true
        }
        const closeClick = (e) => {
            e.stopPropagation()
            data.bxShow = false
        }
        const index = ref(0)
        const minusClick = () => {
            if (data.STARTNUM) return
            signs['betClick'].signPlay()
            index.value = hiloData.value.indexOf(data.betNum) - 1
            if (index.value < 0) {
                index.value++
                return
            }
            if (index.value > -1) {
                data.betNum = hiloData.value[index.value]
            }
        }

        const plusClick = () => {
            if (data.STARTNUM) return
            signs['betClick'].signPlay()
            index.value = hiloData.value.indexOf(data.betNum) + 1
            if (index.value === hiloData.value.length) {
                index.value--
                data.betNum = hiloData.value[index.value]
                return
            }
            if (index.value > -1) {
                data.betNum = hiloData.value[index.value]
            }
        }

        // const STARTNUM = ref(false);
        const startClick = () => {
            start()
            setTimeout(() => {
                cardRecord.value = []
                data.handShow = false
                data.animate = true
                // data.cardNum = sampleSize(cardNum.value, 1)[0]
                // data.cardType = CardType[sampleSize(cardType.value, 1)[0]]
                data.STARTNUM = true
                // data.balance = data.balance - data.betNum
                // data.win = data.betNum * data.odds
                let card = {
                    cardNum: data.cardNum,
                    cardType: data.cardType,
                    cardMultiple: 1,
                    skip: false,
                    result: '',
                    gold: false
                }
                cardRecord.value.push(card)
            }, 500)
        }
        const cardRecord = ref([])
        const skipCount = ref(0)
        const upDownClick = async (type: string) => {
            if (data.STARTNUM) {
                if (type === 'up') {
                    PokerChoose({
                        choose: 1
                    })
                } else if (type === 'down') {
                    PokerChoose({
                        choose: 2
                    })
                } else if (type === 'eq') {
                    PokerChoose({
                        choose: 3
                    })
                } else if (type === 'skip') {
                    PokerChoose({
                        choose: 4
                    })
                }
                setTimeout(async () => {
                    // data.cardNum = sampleSize(cardNum.value, 1)[0]
                    // data.cardType = CardType[sampleSize(cardType.value, 1)[0]]
                    let card = {
                        cardNum: data.cardNum,
                        cardType: data.cardType,
                        cardMultiple: 1,
                        skip: false,
                        result: '',
                        gold: false
                    }
                    // data.animate = true

                    if (type === 'up') {
                        card.result = 'up'
                    } else if (type === 'down') {
                        card.result = 'down'
                    } else if (type === 'skip') {
                        card.skip = true
                        card.result = 'skip'
                        if (skipCount.value <= 20) {
                            skipCount.value++
                        } else {
                            showNotify({
                                type: ENotifyTypes.warning,
                                message: 'skip次数已用尽！'
                            })
                        }
                    } else if (type === 'eq') {
                        card.result = 'eq'
                    }
                    if (await isCorrect()) {
                        if (!allData.value.get(4003)) {
                            showNotify({
                                type: ENotifyTypes.danger,
                                message: '数据未返回，请重新尝试！'
                            })
                            return
                        }
                        card.cardNum = data.cardNum
                        card.cardMultiple = data.odds
                        // data.balance += data.win * data.odds
                        cardRecord.value.push(card)
                        allData.value.delete(4001)
                        allData.value.delete(4003)
                        allData.value.delete(4005)
                        setTimeout(() => {
                            let x = ulx.value.scrollWidth //获取页面最大宽度
                            ulx.value.scrollLeft = x //设置滚动条最左方位置
                            // card.cardNum = null
                        }, 0)
                    } else {
                        // card.result = 'eq'
                        card.skip = true
                        card.cardNum = data.cardNum
                        card.cardMultiple = data.odds
                        cardRecord.value.push(card)
                        data.STARTNUM = false
                        data.win = 0
                        data.odds = 0
                        allData.value.delete(4001)
                        allData.value.delete(4003)
                        allData.value.delete(4005)
                        allData.value.delete(4073)
                        setTimeout(() => {
                            let x = ulx.value.scrollWidth //获取页面最大宽度
                            ulx.value.scrollLeft = x //设置滚动条最左方位置
                            // card.cardNum = null
                        }, 0)
                    }
                }, 500)
            }
        }
        const cashoutClick = () => {
            // data.balance = data.balance + data.win
            data.STARTNUM = false
            data.handShow = true
            data.win = 0
            // data.balance = data.balance + data.win
            PokerCashOut()
        }
        // 判断大小，选错就退出
        const isCorrect = async () => {
            // const num = cardRecord.value[cardRecord.value.length - 1]?.cardNum ?? cardRecord.value[0].cardNum
            // let record = null
            // if(type === 'up') {
            //   record = switchPokerNum(data.cardNum) >= switchPokerNum(num)
            // }else if(type === 'down') {
            //   record = switchPokerNum(data.cardNum) <= switchPokerNum(num)
            // }else if(type === 'eq') {
            //   record = switchPokerNum(data.cardNum) === switchPokerNum(num)
            // }else if(type === 'skip'){
            //   record = true
            // }
            // return record
            return !data.gameFinish
        }
        watch(
            () => allData.value,
            (newVal) => {
                let msg4000s = newVal.get(4001) && newVal.get(4001).data
                if (msg4000s) {
                    data.cardNum = switchPoker(msg4000s.poker.value)
                    data.cardType = switchPokerType(msg4000s.poker.colour)
                    data.win = msg4000s.winScore
                    data.balance = parseInt(msg4000s.score)
                    data.odds = Number(msg4000s.winRate)
                    data.highRate = Number(msg4000s.bigRate)
                    data.lowRate = Number(msg4000s.minRate)
                    data.equalRate = Number(msg4000s.equalRate)
                }
                let msg4002s = newVal.get(4003) && newVal.get(4003).data
                if (msg4002s) {
                    data.cardNum = switchPoker(msg4002s.poker.value || 1)
                    data.cardType = switchPokerType(msg4002s.poker.colour)
                    data.win = msg4002s.winScore
                    data.balance = parseInt(msg4002s.score)
                    data.odds = Number(msg4002s.winRate)
                    data.gameFinish = msg4002s.finish
                }
                let msg4004s = newVal.get(4005) && newVal.get(4005).data
                if (msg4004s) {
                    data.balance = parseInt(msg4004s.score)
                }
                let msg4010s = newVal.get(4011) && newVal.get(4011).data
                if (msg4010s) {
                    data.betNum = msg4010s.betAmount
                    data.curNum = msg4010s.betAmount
                }
                let msg2000s = newVal.get(4073) && newVal.get(4073).data
                if (msg2000s) {
                    data.betAmount = msg2000s.betsAmount
                    hiloData.value = msg2000s.betsAmount
                    data.win = msg2000s.winScore
                    data.balance = parseInt(msg2000s.score)
                    data.odds = Number(msg2000s.winRate)
                    initialValue.value = Number(msg2000s.jackpotAmount)
                }
            },
            { deep: true, immediate: true }
        )

        const switchPoker = (num) => {
            if (num === 1) {
                return 'A'
            } else if (num === 11) {
                return 'J'
            } else if (num === 12) {
                return 'Q'
            } else if (num === 13) {
                return 'K'
            }
            return String(num)
        }
        const switchPokerNum = (num) => {
            if (num === 'A') {
                return 1
            } else if (num === 'J') {
                return 11
            } else if (num === 'Q') {
                return 12
            } else if (num === 'K') {
                return 13
            }
            return Number(num)
        }
        const switchPokerType = (type) => {
            if (type === 0) {
                return 'spade'
            } else if (type === 1) {
                return 'heart'
            } else if (type === 2) {
                return 'block'
            } else if (type === 3) {
                return 'club'
            }
            return type
        }
        onMounted(() => {
            loadingFunc()
            animationNum()
            signs['bg'].addSwitchState()
        })

        onUnmounted(() => {
            signs['bg'].removeSwitchState()
        })

        return {
            ...toRefs(data),
            leftArrowClick,
            rightArrowClick,
            betClick,
            pageClick,
            pageClose,
            bxClick,
            closeClick,
            name,
            minusClick,
            plusClick,
            betNumClick,
            startClick,
            upDownClick,
            cardRecord,
            cashoutClick,
            ulx,
            switchPokerNum
        }
    }
})
</script>
<style lang="less" scoped>
.hilo {
    background: url('@/assets/hilo/20.png') no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    padding-top: 10%;
    padding-bottom: 56px;
    overflow: auto;

    .overlay {
        width: 100%;
        height: 100%;
        background: url(@/assets/sweep/loading.png) no-repeat;
        background-size: 100% 100%;
        position: relative;

        .process {
            position: absolute;
            width: 40%;
            left: 30%;
            top: 72%;
            color: #ced7e5;
            font-size: 12px;

            .text {
                position: absolute;
                top: 208%;
                left: 63%;
            }

            :deep(.van-progress__portion) {
                box-shadow: inset 0 -1px 2px rgba(61, 174, 227, 1);
            }
        }
    }

    .header {
        height: 10%;

        .center {
            width: 50%;
            text-align: center;
            margin: 0 auto;

            .hilo {
                width: 65%;
                height: 2.2rem;
            }

            .img {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 1.4rem;

                .jackpot {
                    width: 75%;
                    height: 3rem;
                }

                .bx {
                    width: 2rem;
                    height: 1.8rem;
                }
            }

            .text {
                font-size: 1.5rem;
                font-weight: 900;
                letter-spacing: 0.1rem;
                margin-top: 0.5rem;
                display: block;
                color: #d9ae53;

                .amount {
                    display: inline-block;
                    width: 14px;
                }
            }

            .bxoverlay {
                width: 90%;
                height: 80%;
                background: url('@/assets/sweep/mask.png') no-repeat;
                background-size: 100% 100%;
                position: relative;
                left: 5%;
                top: 10%;

                img.close {
                    position: absolute;
                    width: 25px;
                    height: 25px;
                    right: 3%;
                    top: 1.4%;
                    z-index: 2;
                }

                .headerBac {
                    width: 96%;
                    height: 30%;
                    margin-top: 9%;
                    text-align: center;
                    // background: url('@/assets/sweep/n.png') no-repeat;
                    // background-size: 100px 100px;
                    // background-position: 0 300px;
                    position: absolute;
                    top: 0%;
                    left: 2%;
                    z-index: 0;

                    p {
                        position: absolute;
                        z-index: 1;
                        margin: 0;

                        &.f {
                            font-size: 1.8vh;
                            top: 44%;
                            left: 50%;
                            transform: translateX(-50%);
                        }

                        &.text1 {
                            font-size: 7vh;
                            top: 55%;
                            left: 50%;
                            transform: translateX(-50%);
                            letter-spacing: -5px;
                            color: #d8b42e;
                        }

                        &.score {
                            top: 88%;
                            color: #9bc1f9;
                            font-size: 1.6vh;
                            left: 50%;
                            transform: translateX(-50%);
                        }
                    }

                    img {
                        width: 80%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 50%;
                        transform: translateX(-50%);
                        z-index: 1;

                        &.letter {
                            top: 1.4%;
                            width: 38%;
                            height: 14%;
                        }
                    }
                }

                .header {
                    height: 26%;
                    position: relative;
                    z-index: 1;
                    margin-bottom: 15%;
                }

                .header img {
                    width: 80%;
                    height: 18%;
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 1;

                    &.letter {
                        top: 1.4%;
                        width: 38%;
                        height: 14%;
                    }
                }

                .content {
                    padding: 0 3% 3% 3%;
                    height: 63%;
                    overflow: auto;

                    img {
                        position: absolute;
                        left: 2%;
                        height: 63%;
                        width: 100%;
                    }

                    .tbgc {
                        border-radius: 4px;
                        width: 96%;
                    }

                    .table {
                        width: 100%;
                        overflow: auto;
                    }
                }
            }
        }
    }

    .object {
        width: 100px;
        height: 100px;
        position: relative;
        animation: zoom-shake 2s infinite;
    }

    .scrollbox {
        display: flex;
        height: 70px;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.05);
        margin-top: 30px;

        .scroll {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-top: -10px;
            width: 100%;
            height: 100%;
            margin: 0 auto;

            img {
                width: 0.8rem;
                height: 1rem;
                margin: 0 4px;
                // margin-top: 40px;
            }

            img:last-of-type {
                transform: rotate(180deg);
            }

            >div {
                // overflow: hidden;
                display: flex;
                align-items: center;
                // margin-top: 0.2rem;
                width: 100%;
                height: 100%;

                .ul {
                    width: 100%;
                    float: left;
                    overflow-x: scroll;
                    // overflow-y: hidden;
                    // padding-top: 40px;
                    position: relative;
                    height: 100%;
                    display: flex;
                }

                span {
                    // float: left;`
                    display: inline;
                    color: #8495c5;
                    font-size: 10px;
                    background-color: #173371;
                    padding: 4px 10px;
                    margin: 0 2px;
                    white-space: nowrap;
                    line-height: 2;
                }

                b {
                    position: absolute;
                    left: 0;
                    top: -40px;
                    width: 40px;
                    height: 40px;

                    img {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                    }

                    img.jbbox {
                        width: 24px;
                        height: 20px;
                        text-align: center;
                        position: absolute;
                        z-index: 1;
                        left: 8px;
                        top: 8px;
                        transform-origin: left bottom;
                        animation: zoom-scale 1s infinite;
                    }
                }
            }
        }
    }

    .info {
        .coeff {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 2%;

            .text {
                font-size: 1.2rem;
            }

            .num {
                font-size: 1.6rem;
                color: #d8b42e;
                font-weight: 700;
            }
        }

        .b00 {
            background-color: #324c79;
            padding: 4px 0;

            .Balance {
                color: #999;
                padding-left: 16px;
            }

            .huan {
                color: #d8b42e;
            }

            .huan1 {
                margin-left: 40px;
            }
        }
    }

    .game {
        width: 96%;
        height: 50%;
        min-height: 380px;
        border: 4px solid #1c3a76;
        border-radius: 10%;
        margin: 2%;
        position: relative;

        .k {
            width: 5%;
            height: 16%;
            margin: 0 auto;
            position: absolute;
            top: -3%;
            left: 50%;
            background: url(/src/assets/hilo/12.png) no-repeat;
            background-position: 23.1% 70.1%;
            background-size: 2000% 1700%;
            transform: rotateZ(-90deg);
        }

        .l {
            background: url(/src/assets/hilo/12.png) no-repeat;
            background-position: 23.1% 76.1%;
            background-size: 2000% 1900%;
            top: 86%;
        }

        .cardBox {
            position: absolute;
            left: 4%;
            top: 14%;
            width: 50%;
            height: 70%;
        }

        .bs {
            width: 40%;
            height: 70%;
            position: absolute;
            right: 0;
            top: 11%;

            .skip {
                width: 65%;
                height: 10%;
                background: url(/src/assets/hilo/12.png) no-repeat;
                background-position: 97.1% 8.1%;
                background-size: 300% 2600%;
                margin: 10% auto;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;

                &-text {
                    width: 71%;
                    height: 62%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: url(/src/assets/hilo/18.png) no-repeat;
                    background-position: 94.4% 85.1%;
                    background-size: 1400% 1200%;
                    margin: 0 auto;
                    position: relative;
                    top: 10%;
                }
            }

            .up {
                width: 80%;
                height: 34%;
                background: url(/src/assets/hilo/12.png) no-repeat;
                background-position: 97.1% 35.6%;
                background-size: 275% 1000%;
                margin: 15% auto;
                text-align: center;
                position: relative;
            }

            .upEq {
                background: url(/src/assets/hilo/12.png) no-repeat;
                background-position: 95.1% 71.1%;
                background-size: 275% 1100%;
            }

            .down {
                width: 80%;
                height: 34%;
                background: url(/src/assets/hilo/12.png) no-repeat;
                background-position: 94.1% 47.6%;
                background-size: 275% 900%;
                margin: 0 auto;
                text-align: center;
                position: relative;
            }

            .dEq {
                background: url(/src/assets/hilo/12.png) no-repeat;
                background-position: 94.1% 82.6%;
                background-size: 275% 1000%;
                height: 30%;
            }

            .t {
                width: 100%;
                font-size: 2rem;
                position: relative;
                top: 28%;
                font-weight: 700;
                color: #fff;
                margin: 0;
            }

            .L {
                top: 8%;
            }

            .num {
                width: 100%;
                height: 22%;
                position: relative;
                bottom: -30%;
                font-size: 0.86rem;
                text-align: center;
                color: #fff;
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .N {
                bottom: -7%;
                height: 25%;
            }
        }
    }

    .game1 {
        width: 96%;
        height: 50%;
        min-height: 380px;
        border: 4px solid #1c3a76;
        border-radius: 10%;
        margin: 2%;
        position: relative;

        .k {
            width: 5%;
            height: 16%;
            margin: 0 auto;
            position: absolute;
            top: -3%;
            left: 50%;
            background: url(/src/assets/hilo/12.png) no-repeat;
            background-position: 23.1% 70.1%;
            background-size: 2000% 1700%;
            transform: rotateZ(-90deg);
        }

        .l {
            background: url(/src/assets/hilo/12.png) no-repeat;
            background-position: 23.1% 76.1%;
            background-size: 2000% 1900%;
            top: 86%;
        }

        .cardBox {
            position: absolute;
            left: 4%;
            top: 14%;
            width: 50%;
            height: 70%;
        }

        .bs {
            width: 40%;
            height: 70%;
            position: absolute;
            right: 0;
            top: 11%;

            .skip {
                width: 65%;
                height: 10%;
                background: url(/src/assets/hilo/12.png) no-repeat;
                background-position: 97.1% 8.1%;
                background-size: 300% 2600%;
                margin: 10% auto;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;

                &-text {
                    width: 71%;
                    height: 62%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: url(/src/assets/hilo/18.png) no-repeat;
                    background-position: 94.4% 85.1%;
                    background-size: 1400% 1200%;
                    margin: 0 auto;
                    position: relative;
                    top: 10%;
                }
            }

            .up {
                width: 80%;
                height: 34%;
                background: url(/src/assets/hilo/12.png) no-repeat;
                background-position: 97.1% 35.6%;
                background-size: 275% 1000%;
                margin: 15% auto;
                text-align: center;
                position: relative;
            }

            .upEq {
                background: url(/src/assets/hilo/12.png) no-repeat;
                background-position: 95.1% 71.1%;
                background-size: 275% 1100%;
            }

            .down {
                width: 80%;
                height: 34%;
                background: url(/src/assets/hilo/12.png) no-repeat;
                background-position: 94.1% 47.6%;
                background-size: 275% 900%;
                margin: 0 auto;
                text-align: center;
                position: relative;
            }

            .dEq {
                background: url(/src/assets/hilo/12.png) no-repeat;
                background-position: 94.1% 82.6%;
                background-size: 275% 1000%;
                height: 30%;
            }

            .t {
                width: 100%;
                font-size: 2rem;
                position: relative;
                top: 28%;
                font-weight: 700;
                color: #fff;
                margin: 0;
            }

            .L {
                top: 8%;
            }

            .num {
                width: 100%;
                position: relative;
                bottom: -30%;
                font-size: 0.86rem;
                text-align: center;
                color: #fff;
                margin: 0;
            }

            .N {
                bottom: -7%;
            }
        }
    }

    .b0 {
        width: 94%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        margin-top: 10px;
    }

    .b1 {
        width: 44%;
        height: 40px;
        text-align: center;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        background: linear-gradient(to bottom, #3179c9, #215bad);
        position: relative;

        .j {
            position: absolute;
            left: 10%;
            top: 50%;
            color: #b8e5ff;
            font-weight: bolder;
            transform: translateY(-50%);
        }

        .betN {
            font-size: 14px;
            color: #cceafd;
        }

        .plus {
            position: absolute;
            right: 10%;
            top: 50%;
            color: #b8e5ff;
            font-weight: bolder;
            transform: translateY(-50%);
        }
    }

    .b3 {
        width: 40%;
        height: 40px;
        text-align: center;
        font-size: 16px;
        font-weight: 700;
        color: #feffc6;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        position: relative;
        background: linear-gradient(to bottom, #56bd48, #147a40);

        .hand {
            position: absolute;
            left: 70%;
            top: 70%;
            width: 50px;
            height: 34px;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .b100 {
        width: 40%;
        height: 40px;
        text-align: center;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        background-color: #78252d;
        color: #c595a3;
        font-weight: bold;
        background: linear-gradient(to bottom, #862a4f, #682546);
    }

    .butP {
        background: url('@/assets/sweep/bet.png') no-repeat;
        background-size: 100% 100%;
        width: 200px;
        height: 160px;
        position: absolute;
        left: -2%;
        top: -400%;
        // top: 0;
        animation: slowIn 0.5s;

        .betPoup {
            width: 196px;
            height: 152px;
            display: grid;
            grid-template-rows: repeat(5, 1fr);
            grid-template-columns: repeat(3, 1fr);
            justify-items: center;
            align-items: center;
            color: #8e93ab;
            font-weight: 700;
            position: relative;
            left: 3px;
            top: 1px;

            .active {
                color: #07e9ff;
                border: min(0.267vw, 2px) solid #378aa7;
                background-image: radial-gradient(circle, #15274a, #4c8ba1);
                width: 100%;
                height: 100%;
                line-height: 3;
                border-radius: min(1.6vw, 12px);
                display: flex;
                text-align: center;
                justify-content: center;
            }
        }
    }

    .minesP {
        background: url(/src/assets/hilo/12.png) no-repeat;
        background-size: 164% 490%;
        background-position: 0 22%;
        width: min(64vw, 480px);
        height: min(53.333vw, 400px);
        left: -24%;
        top: -545%;
        transform: rotate(-90deg);

        .minesPoup {
            width: 79%;
            height: 107%;
            grid-template-rows: repeat(5, 1fr);
            grid-template-columns: repeat(3, 1fr);
            transform: rotate(90deg);
            position: relative;
            left: 13%;
            top: -5%;
        }
    }
}

@keyframes zoom-shake {
    0% {
        transform: scaleX(1) scaleY(1);
        transform-origin: 50% 50%;
        top: 0;
    }

    25% {
        transform: scaleX(1.2) scaleY(1.2);
        transform-origin: 50% 50%;
        top: -10px;
    }

    50% {
        transform: scaleX(1.2) scaleY(1.2) rotateZ(15deg);
        transform-origin: 50% 50%;
        top: -10px;
    }

    55% {
        transform: scaleX(1.2) scaleY(1.2) rotateZ(-15deg);
        transform-origin: 50% 50%;
        top: -10px;
    }

    60% {
        transform: scaleX(1.2) scaleY(1.2) rotateZ(15deg);
        transform-origin: 50% 50%;
        top: -10px;
    }

    65% {
        transform: scaleX(1.2) scaleY(1.2) rotateZ(-15deg);
        transform-origin: 50% 50%;
        top: -10px;
    }

    70% {
        transform: scaleX(1) scaleY(1);
        transform-origin: 50% 50%;
        top: 0;
    }

    100% {
        transform: scaleX(1) scaleY(1);
        transform-origin: 50% 50%;
        top: 0;
    }
}
</style>
