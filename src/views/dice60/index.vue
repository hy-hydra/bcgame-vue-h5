<template>
  <div class="dice60">
    <!-- <van-tabs v-model="currentTab" :tabs="tabs">
      <van-tab title="Dice 300" content="300"></van-tab>
      <van-tab title="Dice 180" content="180"></van-tab>
      <van-tab title="Dice 160" content="160"></van-tab>
    </van-tabs> -->
    <template v-if="!show">
      <div class="access-layout__nav relative w-[100%]">
        <svg
          class="h-12px w-12px fill-text-6 absolute right-12px" style="top: 16px;"
          @click="$router.push('/home')"
        >
          <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Close"></use>
        </svg>
      </div>
      <audio autoplay loop style="position: relative; z-index: 10000">  
        <source src="http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3" type="audio/mpeg">  
        您的浏览器不支持音频标签。  
      </audio>
      <van-row :align="`center`">
        <van-col span="16">
          <van-card
            :desc="`${entryData?.lottery?.issue} period`"
            title="Dice 60"
          >
            <template #thumb>
              <van-image
                width="100%"
                height="100%"
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
              />
            </template>
          </van-card>
        </van-col>
        <van-col span="8">
          <van-count-down :time="time" @finish="finishChange">
            <template #default="timeData">
              <span class="block">{{ timeData.hours > 9 ? timeData.hours : `0${timeData.hours}` }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.minutes > 9 ? timeData.minutes : `0${timeData.minutes}` }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.seconds > 9 ? timeData.seconds : `0${timeData.seconds}` }}</span>
            </template>
          </van-count-down>
        </van-col>
      </van-row>
      <div class="play_area bet_area">
        <van-row>
          <van-col span="8">
            <div class="banker">
              <div class="t">Banker</div>
              <div class="n">
                <img src="../../assets/dice60/r1.png" alt="">
                <img src="../../assets/dice60/r2.png" alt="">
                <img src="../../assets/dice60/r3.png" alt="">
                <img src="../../assets/dice60/r4.png" alt="">
                <img src="../../assets/dice60/r5.png" alt="">
                <img src="../../assets/dice60/r6.png" alt="">
              </div>
            </div>
          </van-col>
          <van-col span="8" class="zhong">
            <img :src="lastOpen1" alt="">
            <img :src="lastOpen2" alt="">
          </van-col>
          <van-col span="8">
            <div class="dealer">
              <div class="t">Dealer</div>
              <div class="n">
                <img src="../../assets/dice60/b1.png" alt="">
                <img src="../../assets/dice60/b2.png" alt="">
                <img src="../../assets/dice60/b3.png" alt="">
                <img src="../../assets/dice60/b4.png" alt="">
                <img src="../../assets/dice60/b5.png" alt="">
                <img src="../../assets/dice60/b6.png" alt="">
              </div>
            </div>
          </van-col>
        </van-row>
        <van-row class="wd">
          <van-col :span="24" class="t">Win/Draw</van-col>
          <van-col :span="24" class="c">
            <van-row class="c_c" align="center" >
              <van-col :span="9" class="red d" @click="startClick('Banker Win')">
                <p class="ti">Banker</p>
                <p class="ti">Win</p>
                <p class="tii">{{entryData?.lottery?.config?.betOddsMap[3]}}x</p>
              </van-col>
              <van-col :span="6" class="d" @click="startClick('Draw')">
                <p class="ti">Draw</p>
                <p class="tii">{{entryData?.lottery?.config?.betOddsMap[4]}}x</p>
              </van-col>
              <van-col :span="9" class="blue d" @click="startClick('Dealer Win')">
                <p class="ti">Dealer</p>
                <p class="ti">Win</p>
                <p class="tii">{{entryData?.lottery?.config?.betOddsMap[3]}}x</p>
              </van-col>
            </van-row>
          </van-col>
        </van-row>
        <van-row class="wd">
          <van-col :span="24" class="t">Banker</van-col>
          <van-col :span="24" class="c">
            <van-row class="c_d" :gutter="2">
              <van-col :span="6" class="even" @click="startClick('Banker Even')">
                <p class="i">
                  <img src="../../assets/dice60/r2.png" alt="">
                  <img src="../../assets/dice60/r4.png" alt="">
                  <img src="../../assets/dice60/r6.png" alt="">
                </p>
                <p class="t">Even</p>
                <p class="b">{{entryData?.lottery?.config?.betOddsMap[1]}}x</p>
              </van-col>
              <van-col :span="6" class="odd" @click="startClick('Banker Odd')">
                <p class="i">
                  <img src="../../assets/dice60/r1.png" alt="">
                  <img src="../../assets/dice60/r3.png" alt="">
                  <img src="../../assets/dice60/r5.png" alt="">
                </p>
                <p class="t">Odd</p>
                <p class="b">{{entryData?.lottery?.config?.betOddsMap[1]}}x</p>
              </van-col>
              <van-col :span="6" class="big" @click="startClick('Banker Big')">
                <p class="i">
                  <img src="../../assets/dice60/r4.png" alt="">
                  <img src="../../assets/dice60/r5.png" alt="">
                  <img src="../../assets/dice60/r6.png" alt="">
                </p>
                <p class="t">Big</p>
                <p class="b">{{entryData?.lottery?.config?.betOddsMap[1]}}x</p>
              </van-col>
              <van-col :span="6" class="small" @click="startClick('Banker Small')">
                <p class="i">
                  <img src="../../assets/dice60/r1.png" alt="">
                  <img src="../../assets/dice60/r2.png" alt="">
                  <img src="../../assets/dice60/r3.png" alt="">
                </p>
                <p class="t">Small</p>
                <p class="b">{{entryData?.lottery?.config?.betOddsMap[1]}}x</p>
              </van-col>
            </van-row>
          </van-col>
        </van-row>
        <van-row class="wd dd">
          <van-col :span="24" class="t">Dealer</van-col>
          <van-col :span="24" class="c">
            <van-row class="c_d" :gutter="2">
              <van-col :span="6" class="even" @click="startClick('Dealer Even')">
                <p class="i">
                  <img src="../../assets/dice60/b2.png" alt="">
                  <img src="../../assets/dice60/b4.png" alt="">
                  <img src="../../assets/dice60/b6.png" alt="">
                </p>
                <p class="t">Even</p>
                <p class="b">{{entryData?.lottery?.config?.betOddsMap[2]}}x</p>
              </van-col>
              <van-col :span="6" class="odd" @click="startClick('Dealer Odd')">
                <p class="i">
                  <img src="../../assets/dice60/b1.png" alt="">
                  <img src="../../assets/dice60/b3.png" alt="">
                  <img src="../../assets/dice60/b5.png" alt="">
                </p>
                <p class="t">Odd</p>
                <p class="b">{{entryData?.lottery?.config?.betOddsMap[2]}}x</p>
              </van-col>
              <van-col :span="6" class="big" @click="startClick('Dealer Big')">
                <p class="i">
                  <img src="../../assets/dice60/b4.png" alt="">
                  <img src="../../assets/dice60/b5.png" alt="">
                  <img src="../../assets/dice60/b6.png" alt="">
                </p>
                <p class="t">Big</p>
                <p class="b">{{entryData?.lottery?.config?.betOddsMap[2]}}x</p>
              </van-col>
              <van-col :span="6" class="small" @click="startClick('Dealer Small')">
                <p class="i">
                  <img src="../../assets/dice60/b1.png" alt="">
                  <img src="../../assets/dice60/b2.png" alt="">
                  <img src="../../assets/dice60/b3.png" alt="">
                </p>
                <p class="t">Small</p>
                <p class="b">{{entryData?.lottery?.config?.betOddsMap[2]}}x</p>
              </van-col>
            </van-row>
          </van-col>
        </van-row>
        <van-row class="but">
          <van-col :span="12" align="center">
            <van-button :color="type === 'record' ? '#2257a3' : '#163f77'" class="buttons" @click="recordClick">Record</van-button>
          </van-col>
          <van-col :span="12" align="center">
            <van-button :color="type === 'pro' ? '#2257a3' : '#163f77'" class="buttons" @click="proClick">Probability</van-button>
          </van-col>
        </van-row>
        <van-row class="table" v-if="type === 'record'">
          <van-col :span="24" class="header">
            <van-row>
              <van-col :span="8" align="center">Period</van-col>
              <van-col :span="8" align="center">Result</van-col>
              <van-col :span="8" align="center">Win/Loss</van-col>
            </van-row>
            <van-row v-for="item in historyData.list" :key="item.id" style="height: 40px;">
              <van-col :span="8" align="center">{{ item.issue }}</van-col>
              <van-col :span="8" align="center">{{ item.openNumber }}</van-col>
              <van-col :span="8" align="center">{{ item.winAmount }}</van-col>
            </van-row>
          </van-col>
          <van-col :span="24" align="center" class="view" @click="viewClick">
            View More<van-icon name="play" />
          </van-col>
        </van-row>
        <van-row class="list" v-if="type === 'pro'">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh" style="width: 100%;">
            <van-list
              v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <van-col :span="24" class="list-item" v-for="item in recordData" :key="item.id">
                <van-row>
                  <van-col :span="20" style="text-align: start;" ><van-badge :content="switchBet(item)" :color="switchBetColor(item)" style="width: 60px;"/></van-col>
                  <van-col :span="4" align="end">{{ item.amount }}</van-col>
                </van-row>
              </van-col>
            </van-list>
          </van-pull-refresh>
          <!-- <van-col :span="24" class="list-item">
            <van-row>
              <van-col :span="20" style="text-align: start;" ><van-badge :content="`Odd`" color="red" style="width: 60px;"/></van-col>
              <van-col :span="4" align="end">0</van-col>
            </van-row>
          </van-col>
          <van-col :span="24" class="list-item">
            <van-row>
              <van-col :span="20" style="text-align: start;" ><van-badge :content="`Dealer Win`" style="width: 60px;" /></van-col>
              <van-col :span="4" align="end">0</van-col>
            </van-row>
          </van-col>
          <van-col :span="24" class="list-item">
            <van-row>
              <van-col :span="20" style="text-align: start;" ><van-badge :content="`Big`" style="width: 60px;" /></van-col>
              <van-col :span="4" align="end">0</van-col>
            </van-row>
          </van-col>
          <van-col :span="24" class="list-item">
            <van-row>
              <van-col :span="20" style="text-align: start;" ><van-badge :content="`Small`" style="width: 60px;" /></van-col>
              <van-col :span="4" align="end">0</van-col>
            </van-row>
          </van-col>
          <van-col :span="24" class="list-item">
            <van-row>
              <van-col :span="20" style="text-align: start;" ><van-badge :content="`Banker Win`" style="width: 60px;" /></van-col>
              <van-col :span="4" align="end">0</van-col>
            </van-row>
          </van-col> -->
        </van-row>
      </div>
    </template>
    <template v-else>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" style="width: 100%;">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="history">
            <div class="title">historical lottery<van-icon name="cross" class="close" @click="close"/></div>
            <van-row style="height: 40px;">
              <van-col :span="8" align="center">Period</van-col>
              <van-col :span="8" align="center">Result</van-col>
              <van-col :span="8" align="center">Win/Loss</van-col>
            </van-row>
            <van-row v-for="item in viewHistoryData" :key="item.id" style="height: 40px;">
              <van-col :span="8" align="center">{{ item.issue }}</van-col>
              <van-col :span="8" align="center">{{ item.openNumber }}</van-col>
              <van-col :span="8" align="center">{{ item.winAmount }}</van-col>
            </van-row>
          </div>
        </van-list>
      </van-pull-refresh>
    </template>
    <!-- <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" style="width: 100%;">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="history">
              <div class="title">historical lottery<van-icon name="cross" class="close" @click="close"/></div>
              <van-row style="height: 40px;">
                <van-col :span="8" align="center">Period</van-col>
                <van-col :span="8" align="center">Result</van-col>
                <van-col :span="8" align="center">Win/Loss</van-col>
              </van-row>
              <van-row v-for="item in viewHistoryData?.list" :key="item.id" style="height: 40px;">
                <van-col :span="8" align="center">{{ item.issue }}</van-col>
                <van-col :span="8" align="center">{{ item.openNumber }}</van-col>
                <van-col :span="8" align="center">{{ item.winAmount }}</van-col>
              </van-row>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </van-overlay> -->
    <van-overlay :show="betShow" @click="betShow = false">
      <div class="wrapper" @click.stop>
        <div class="bet">
          <div class="title">
            {{ name }}
            <span>{{ entryData?.lottery?.issue }} period</span>
            <span class="cancal" @click="cancalClick">Cancal</span>
          </div>
          <div class="badge"><van-badge style="width: 40px;" :content="`1.9x`" /></div>
          <van-field v-model="value" label="Bet Money" placeholder="" >
            <template #extra>
              <span style="color: #8d9ea6;">limit ≥ {{ entryData?.lottery?.config?.minBet }} $</span>
            </template>
          </van-field>
          <van-row class="betN">
            <van-col :span="8">
              <div class="n" @click="betNClick(lstep)">+{{ lstep }}</div>
            </van-col>
            <van-col :span="8">
              <div class="n" @click="betNClick(llstep)">+{{ llstep }}</div>
            </van-col>
            <van-col :span="8">
              <div class="n" @click="betNClick(entryData?.lottery?.config?.maxBet)">+Max</div>
            </van-col>
          </van-row>
          <van-row class="quan">
            <van-col :span="8" style="color: #fff;">Quantity</van-col>
            <van-col :span="16" align="end" style="padding-right: 20px;">
              <van-stepper v-model="svalue" theme="round" button-size="22" disable-input />
            </van-col>
          </van-row>
          <div class="bs">
            <div :class="{active: svalue === 1}" @click="sClick(1)">x1</div>
            <div :class="{active: svalue === 3}" @click="sClick(3)">x3</div>
            <div :class="{active: svalue === 9}" @click="sClick(9)">x9</div>
            <div :class="{active: svalue === 27}" @click="sClick(27)">x27</div>
            <div :class="{active: svalue === 81}" @click="sClick(81)">x81</div>
            <div :class="{active: svalue === 243}" @click="sClick(243)">x243</div>
          </div>
          <van-button type="success" class="butb" @click="betClick">Bet 
            <span v-if="(svalue || 0) * (value || 0)">| {{ (svalue || 0) * (value || 0) }}</span>
          </van-button>
        </div>
      </div>
    </van-overlay>
    <van-overlay :show="tipShow" @click="tipShow = false">
      <div class="wrapper" @click.stop>
        <div class="tip">
          <div>
            <van-icon name="warning" color="yellow" size="70"/>
          </div>
          <p>{{ entryData?.lottery?.lastIssue }} has ended, the current sales lotteryperiod is {{ entryData?.lottery?.issue }}</p>
          <van-button type="success" style="width: 100%;" @click="tipShow = false">OK</van-button>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { useSearch } from './useSearch'
import { isEmpty } from 'lodash';
import { showNotify } from 'vant'
import { ENotifyTypes } from "@/const/enums.d";

export default defineComponent({
  setup() {
    const { getLotteryEntrys, getLotteryHistorys, entryData, saveLottery, getRecords } = useSearch()
    const data = reactive({
      tabs: [
        { title: 'Dice 300', content: '300' },
        { title: 'Dice 180', content: '180' },
        { title: 'Dice 160', content: '160' },
      ],
      value: '',
      currentTab: 0,
      time: 30 * 60 * 1000,
      show: false,
      type: 'record',
      betShow: false,
      name: '',
      svalue: '',
      tipShow: false,
      historyData: [],
      viewHistoryData: [],
      lastOpen1: 1,
      lastOpen2: 1,
      lstep: 0,
      llstep: 0,
      recordData: [],
      loading: false,
      finished: false,
      refreshing: true,
      page: 1,
    })

    watch(() => entryData.value, (newVal) => {
      if(!isEmpty(newVal)){
        let red = JSON.parse(newVal?.lottery?.lastOpen)[0]
        let blue = JSON.parse(newVal?.lottery?.lastOpen)[1]
        data.lastOpen1 = new URL(`../../assets/dice60/r${String(red)}.png`, import.meta.url).href
        data.lastOpen2 = new URL(`../../assets/dice60/b${String(blue)}.png`, import.meta.url).href
        let config = entryData.value?.lottery?.config
        data.lstep = config?.betChips?.slice(-2)[0] || 0
        data.llstep = config?.betChips?.slice(-1)[0] || 0
      }
    })
    
    // const lstep = computed(() => entryData.value?.lottery?.config?.betChips?.slice(-2)[0])
    // const llstep = computed(() => entryData.value?.lottery?.config?.betChips?.slice(-1)[0])
    const time = computed(() => entryData.value?.lottery?.interval*1000)
    // console.log(lstep, llstep)
    const bankerClick = () => {
      data.betShow = true
      console.log('banker')
    }

    const dealerClick = () => {
      data.betShow = true
      console.log('dealer')
    }

    const drawClick = () => {
      data.betShow = true
      console.log('draw')
    }

    const recordClick = async () => {
      data.type = 'record'
      data.historyData = await getLotteryHistorys()
    }

    const proClick = async () => {
      data.type = 'pro'
      data.recordData = await getRecords()
    }

    const viewClick = async() => {
      data.show = true
      const res = await getLotteryHistorys({
        "page":1,
        "limit":10,
      })
      data.viewHistoryData = res.list
    }

    const close = () => {
      data.show = false
      data.page = 1
    }

    const cancalClick = () => {
      data.betShow = false
      data.value = ''
    }

    const startClick = (name) => {
      data.betShow = true
      data.name = name
    }

    const betNClick = (v) => {
      data.value = data.value ? Number(data.value) + v : v
      if(Number(data.value) > entryData.value?.lottery?.config?.maxBet){
        data.value = entryData.value?.lottery?.config?.maxBet
      }
    }

    const sClick = (v) => {
      data.svalue = v
    }

    const betClick = async() => {
      let areaBetList = {}
      if(data.name === 'Banker Win') {
        areaBetList = { "3": [0] }
      }else if(data.name === 'Dealer Win'){
        areaBetList = { "3": [1] }
      }else if(data.name === 'Draw'){
        areaBetList = { "4": [0] }
      }else if(data.name === 'Banker Even'){
        areaBetList = { "1": [3] }
      }else if(data.name === 'Banker Odd'){
        areaBetList = { "1": [2] }
      }else if(data.name === 'Banker Big'){
        areaBetList = { "1": [0] }
      }else if(data.name === 'Banker Small'){
        areaBetList = { "1": [1] }
      }else if(data.name === 'Dealer Even'){
        areaBetList = { "2": [3] }
      }else if(data.name === 'Dealer Odd'){
        areaBetList = { "2": [2] }
      }else if(data.name === 'Dealer Big'){
        areaBetList = { "2": [0] }
      }else if(data.name === 'Dealer Small'){
        areaBetList = { "2": [1] }
      }
      if(await saveLottery({
          "gameId":11,
          "betInterval":((data.value || 0) * (data.svalue||0)),
          "issue":entryData.value?.lottery?.issue,
          "areaBetList": areaBetList
      })){
        data.betShow = false
        showNotify({ type: ENotifyTypes.success, message: '投注成功！' });
      } else {
        showNotify({ type: ENotifyTypes.danger, message: '投注失败！' });
      }
    }

    const finishChange = async () => {
      // data.tipShow = true
      setTimeout(async() => {
        getLotteryEntrys()
        data.historyData = await getLotteryHistorys()
        data.recordData = await getRecords()
        data.tipShow = true
      }, 1000)
      
    }

    const switchBet = (item) => {
      const key = Object.keys(JSON.parse(item.details).areaBetList)[0]
      const value = Object.values(JSON.parse(item.details).areaBetList)[0][0]
      switch (key) {
        case '1':
          if(value === 0) {
            return 'Big'
          } else if(value === 1) {
            return 'Small'
          } else if(value === 2) {
            return 'Odd'
          } else if(value === 3) {
            return 'Even'
          }
          break;
        case '2':
          if(value === 0) {
            return 'Big'
          } else if(value === 1) {
            return 'Small'
          } else if(value === 2) {
            return 'Odd'
          } else if(value === 3) {
            return 'Even'
          }
          break;
        case '3':
          if(value === 0) {
            return 'Banker Win'
          } else if(value === 1) {
            return 'Dealer Win'
          }
          break;
        case '4':
          if(value === 0) {
            return 'Draw'
          }
          break;
        default:
          break;
      }
      return ''
    }

    const switchBetColor = (item) => {
      const key = Object.keys(JSON.parse(item.details).areaBetList)[0]
      const value = Object.values(JSON.parse(item.details).areaBetList)[0][0]
      switch (key) {
        case '1':
          if(value === 0) {
            return '#c03368'
          } else if(value === 1) {
            return '#c03368'
          } else if(value === 2) {
            return '#c03368'
          } else if(value === 3) {
            return '#c03368'
          }
          break;
        case '2':
          if(value === 0) {
            return '#4a03fa'
          } else if(value === 1) {
            return '#4a03fa'
          } else if(value === 2) {
            return '#4a03fa'
          } else if(value === 3) {
            return '#4a03fa'
          }
          break;
        case '3':
          if(value === 0) {
            return '#c03368'
          } else if(value === 1) {
            return '#4a03fa'
          }
          break;
        case '4':
          if(value === 0) {
            return '#0e9762'
          }
          break;
        default:
          break;
      }
      return ''
    }

    const onLoad = async () => {
      data.recordData = []
      data.refreshing = false;
      data.page++
      let recordData = null
      if(data.show) {
        recordData = await getLotteryHistorys({page: data.page, limit: 30})
      } else {
        recordData = await getRecords({page: data.page, limit: 10})
      }
      
      
      
      if(data.page <= recordData.maxPage) {
        if(data.show) {
          data.viewHistoryData = [...data.viewHistoryData, ...recordData.list]
        } else {
          data.recordData = recordData.list
        }
      } else {
        data.finished = true;
      }
      data.loading = false;
      
    };

    const onRefresh = () => {
      data.page = 1
      // 清空列表数据
      data.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      data.loading = true;
      onLoad();
    };

    onMounted(async() => {
      getLotteryEntrys()
      data.historyData = await getLotteryHistorys()
      data.recordData = await getRecords()
    })

    return {
      ...toRefs(data),
      bankerClick,
      dealerClick,
      drawClick,
      recordClick,
      proClick,
      viewClick,
      close,
      cancalClick,
      startClick,
      betNClick,
      sClick,
      entryData,
      // lstep,
      // llstep,
      betClick,
      time,
      finishChange,
      switchBet,
      switchBetColor,
      onLoad,
      onRefresh
    }
  }
})
</script>

<style scoped lang="less">
.dice60{
  width: 100%;
  height: 100%;
  overflow: auto;
  .history{
    height: 100%;
    width: 100%;
    overflow: auto;
    background: #101626;
    .title{
      color: #fff;
      font-weight: 700;
      font-size: 14px;
      height: 34px;
      text-align: center;
      line-height: 34px;
      position: relative;
      .close{
        position: absolute;
        top: 10px;
        right: 16px;
      }
    }
  }
  .colon {
    display: inline-block;
    margin: 0 4px;
    color: #1989fa;
  }
  .block {
    display: inline-block;
    width: 22px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background-color: #3bc117;
    position: relative;
    &::after{
      position: absolute;
      content: '';
      left: 0;
      top: 48%;
      width: 100%;
      height: 0.1px;
      background-color: #fff;
    }
  }
}
:deep(.van-card__header) {
  height: 50px;
}
:deep(.van-card__thumb) {
  width: 50px;
  height: 100%;
}
:deep(.van-card) {
  background-color: transparent;
}
.van-tab {
  width: 300px;
  height: 100px;
  border-radius: 50%;
}

.van-tab-item {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ff0000;
  transform: rotateY(45deg);
  animation: rotate 4s linear infinite;
}

.van-tab-item:active {
  background-color: #00ff00;
}

@keyframes rotate {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
.colon {
  display: inline-block;
  margin: 0 4px;
  color: #1989fa;
}
.block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #3bc117;
  position: relative;
  &::after{
    position: absolute;
    content: '';
    left: 0;
    top: 48%;
    width: 100%;
    height: 0.1px;
    background-color: #fff;
  }
}
.play_area{
  width: 100%;
  // height: 100%;
  background: url('../../assets/dice60/bg.png') no-repeat;
  background-size: 100% 140%;
  .wd{
    margin: 1% 10%;
    border: 2px solid #426ca8;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    font-size: 14px;
    border-radius: 6px;
    .t {
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-weight: 700;
    }
    .c{
      height: 110px;
      .c_c{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        .d{
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          padding: 10% 0;
          box-sizing: border-box;
          background-image: linear-gradient(to right, #01e693, #0e9762);
          p{
            margin: 4px 0;
          }
          .ti{
            font-size: 16px;
            font-weight: 700;
            color: #fff;
          }
          .tii{
            font-size: 12px;
            font-weight: 300;
            color: #fff;
          }
        }
        .red{
          background-image: linear-gradient(to right, #f25f70, #c03368);
        }
        .blue{
          background-image: linear-gradient(to right, #0158c9, #4a03fa);
        }
      }
      .c_d{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        .d{
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          padding: 10% 0;
          box-sizing: border-box;
          background-image: linear-gradient(to right, #01e693, #0e9762);
          p{
            margin: 2px 0;
          }
        }
        .even{
          width: 100%;
          padding: 5% 1%;
          height: 110px;
          background-image: linear-gradient(to bottom, #364e7b, #73427a);
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          border-right: 2px solid #3d497d;
          p{
            margin: 0;
          }
          p.i{
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr;
            grid-gap: 1%;
            justify-items: center;
            align-items: center;
            img{
              width: 18px;
            }
          }
          .t{
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            width: 100%;
            text-align: center;
          }
          .b{
            font-size: 12px;
            font-weight: 300;
            color: #fff;
            width: 100%;
            text-align: center;
          }
        }
        .odd{
          width: 100%;
          padding: 5% 1%;
          height: 110px;
          background-image: linear-gradient(to bottom, #364e7b, #73427a);
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          border-right: 2px solid #3d497d;
          p{
            margin: 0;
          }
          p.i{
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr;
            grid-gap: 1%;
            justify-items: center;
            align-items: center;
            img{
              width: 18px;
            }
          }
          .t{
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            width: 100%;
            text-align: center;
          }
          .b{
            font-size: 12px;
            font-weight: 300;
            color: #fff;
            width: 100%;
            text-align: center;
          }
        }
        .big{
          width: 100%;
          padding: 5% 1%;
          height: 110px;
          background-image: linear-gradient(to bottom, #364e7b, #73427a);
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          border-right: 3px solid #3d497d;
          p{
            margin: 0;
          }
          p.i{
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr;
            grid-gap: 1%;
            justify-items: center;
            align-items: center;
            img{
              width: 18px;
            }
          }
          .t{
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            width: 100%;
            text-align: center;
          }
          .b{
            font-size: 12px;
            font-weight: 300;
            color: #fff;
            width: 100%;
            text-align: center;
          }
        }
        .small{
          width: 100%;
          padding: 5% 1%;
          height: 110px;
          background-image: linear-gradient(to bottom, #364e7b, #73427a);
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          p{
            margin: 0;
          }
          p.i{
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr;
            grid-gap: 1%;
            justify-items: center;
            align-items: center;
            img{
              width: 18px;
            }
          }
          .t{
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            width: 100%;
            text-align: center;
          }
          .b{
            font-size: 12px;
            font-weight: 300;
            color: #fff;
            width: 100%;
            text-align: center;
          }
        }
      }
    }
  }
  .dd{
    margin: 1% 10%;
    border: 2px solid #426ca8;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    font-size: 14px;
    border-radius: 6px;
    .t {
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-weight: 700;
    }
    .c{
      height: 110px;
      .c_c{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        .d{
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          padding: 10% 0;
          box-sizing: border-box;
          background-image: linear-gradient(to right, #01e693, #0e9762);
          p{
            margin: 4px 0;
          }
          .ti{
            font-size: 16px;
            font-weight: 700;
            color: #fff;
          }
          .tii{
            font-size: 12px;
            font-weight: 300;
            color: #fff;
          }
        }
        .red{
          background-image: linear-gradient(to right, #f25f70, #c03368);
        }
        .blue{
          background-image: linear-gradient(to right, #0158c9, #4a03fa);
        }
      }
      .c_d{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        .d{
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          padding: 10% 0;
          box-sizing: border-box;
          background-image: linear-gradient(to right, #01e693, #0e9762);
          p{
            margin: 2px 0;
          }
        }
        .even{
          width: 100%;
          padding: 5% 1%;
          height: 110px;
          background-image: linear-gradient(to bottom, #2c5188, #1654a5);
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          border-right: 2px solid #3d497d;
          p{
            margin: 0;
          }
          p.i{
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr;
            grid-gap: 1%;
            justify-items: center;
            align-items: center;
            img{
              width: 18px;
            }
          }
          .t{
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            width: 100%;
            text-align: center;
          }
          .b{
            font-size: 12px;
            font-weight: 300;
            color: #fff;
            width: 100%;
            text-align: center;
          }
        }
        .odd{
          width: 100%;
          padding: 5% 1%;
          height: 110px;
          background-image: linear-gradient(to bottom, #2c5188, #1654a5);
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          border-right: 2px solid #3d497d;
          p{
            margin: 0;
          }
          p.i{
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr;
            grid-gap: 1%;
            justify-items: center;
            align-items: center;
            img{
              width: 18px;
            }
          }
          .t{
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            width: 100%;
            text-align: center;
          }
          .b{
            font-size: 12px;
            font-weight: 300;
            color: #fff;
            width: 100%;
            text-align: center;
          }
        }
        .big{
          width: 100%;
          padding: 5% 1%;
          height: 110px;
          background-image: linear-gradient(to bottom, #2c5188, #1654a5);
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          border-right: 3px solid #3d497d;
          p{
            margin: 0;
          }
          p.i{
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr;
            grid-gap: 1%;
            justify-items: center;
            align-items: center;
            img{
              width: 18px;
            }
          }
          .t{
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            width: 100%;
            text-align: center;
          }
          .b{
            font-size: 12px;
            font-weight: 300;
            color: #fff;
            width: 100%;
            text-align: center;
          }
        }
        .small{
          width: 100%;
          padding: 5% 1%;
          height: 110px;
          background-image: linear-gradient(to bottom, #2c5188, #1654a5);
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          p{
            margin: 0;
          }
          p.i{
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr;
            grid-gap: 1%;
            justify-items: center;
            align-items: center;
            img{
              width: 18px;
            }
          }
          .t{
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            width: 100%;
            text-align: center;
          }
          .b{
            font-size: 12px;
            font-weight: 300;
            color: #fff;
            width: 100%;
            text-align: center;
          }
        }
      }
    }
  }
}
.bet_area{
  width: 100%;
  // height: 100%;
  background: url('../../assets/dice60/bg.png') no-repeat;
  background-size: 100% 140%;
  .wd{
    margin: 1% 10%;
    border: 2px solid #426ca8;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    font-size: 14px;
    border-radius: 6px;
    .t {
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-weight: 700;
    }
    .c{
      height: 110px;
      .c_c{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        .d{
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          padding: 10% 0;
          box-sizing: border-box;
          background-image: linear-gradient(to right, #01e693, #0e9762);
          p{
            margin: 4px 0;
          }
          .ti{
            font-size: 16px;
            font-weight: 700;
            color: #fff;
          }
          .tii{
            font-size: 12px;
            font-weight: 300;
            color: #fff;
          }
        }
        .red{
          background-image: linear-gradient(to right, #f25f70, #c03368);
        }
        .blue{
          background-image: linear-gradient(to right, #0158c9, #4a03fa);
        }
      }
      .c_d{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        .d{
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          padding: 10% 0;
          box-sizing: border-box;
          background-image: linear-gradient(to right, #01e693, #0e9762);
          p{
            margin: 2px 0;
          }
        }
        .even{
          width: 100%;
          padding: 5% 1%;
          height: 110px;
          background-image: linear-gradient(to bottom, #364e7b, #73427a);
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          border-right: 2px solid #3d497d;
          p{
            margin: 0;
          }
          p.i{
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr;
            grid-gap: 1%;
            justify-items: center;
            align-items: center;
            img{
              width: 18px;
            }
          }
          .t{
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            width: 100%;
            text-align: center;
          }
          .b{
            font-size: 12px;
            font-weight: 300;
            color: #fff;
            width: 100%;
            text-align: center;
          }
        }
        .odd{
          width: 100%;
          padding: 5% 1%;
          height: 110px;
          background-image: linear-gradient(to bottom, #364e7b, #73427a);
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          border-right: 2px solid #3d497d;
          p{
            margin: 0;
          }
          p.i{
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr;
            grid-gap: 1%;
            justify-items: center;
            align-items: center;
            img{
              width: 18px;
            }
          }
          .t{
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            width: 100%;
            text-align: center;
          }
          .b{
            font-size: 12px;
            font-weight: 300;
            color: #fff;
            width: 100%;
            text-align: center;
          }
        }
        .big{
          width: 100%;
          padding: 5% 1%;
          height: 110px;
          background-image: linear-gradient(to bottom, #364e7b, #73427a);
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          border-right: 3px solid #3d497d;
          p{
            margin: 0;
          }
          p.i{
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr;
            grid-gap: 1%;
            justify-items: center;
            align-items: center;
            img{
              width: 18px;
            }
          }
          .t{
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            width: 100%;
            text-align: center;
          }
          .b{
            font-size: 12px;
            font-weight: 300;
            color: #fff;
            width: 100%;
            text-align: center;
          }
        }
        .small{
          width: 100%;
          padding: 5% 1%;
          height: 110px;
          background-image: linear-gradient(to bottom, #364e7b, #73427a);
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          p{
            margin: 0;
          }
          p.i{
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr;
            grid-gap: 1%;
            justify-items: center;
            align-items: center;
            img{
              width: 18px;
            }
          }
          .t{
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            width: 100%;
            text-align: center;
          }
          .b{
            font-size: 12px;
            font-weight: 300;
            color: #fff;
            width: 100%;
            text-align: center;
          }
        }
      }
    }
  }
  .dd{
    margin: 1% 10%;
    border: 2px solid #426ca8;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    font-size: 14px;
    border-radius: 6px;
    .t {
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-weight: 700;
    }
    .c{
      height: 110px;
      .c_c{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        .d{
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          padding: 10% 0;
          box-sizing: border-box;
          background-image: linear-gradient(to right, #01e693, #0e9762);
          p{
            margin: 4px 0;
          }
          .ti{
            font-size: 16px;
            font-weight: 700;
            color: #fff;
          }
          .tii{
            font-size: 12px;
            font-weight: 300;
            color: #fff;
          }
        }
        .red{
          background-image: linear-gradient(to right, #f25f70, #c03368);
        }
        .blue{
          background-image: linear-gradient(to right, #0158c9, #4a03fa);
        }
      }
      .c_d{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        .d{
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          padding: 10% 0;
          box-sizing: border-box;
          background-image: linear-gradient(to right, #01e693, #0e9762);
          p{
            margin: 2px 0;
          }
        }
        .even{
          width: 100%;
          padding: 5% 1%;
          height: 110px;
          background-image: linear-gradient(to bottom, #2c5188, #1654a5);
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          border-right: 2px solid #3d497d;
          p{
            margin: 0;
          }
          p.i{
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr;
            grid-gap: 1%;
            justify-items: center;
            align-items: center;
            img{
              width: 18px;
            }
          }
          .t{
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            width: 100%;
            text-align: center;
          }
          .b{
            font-size: 12px;
            font-weight: 300;
            color: #fff;
            width: 100%;
            text-align: center;
          }
        }
        .odd{
          width: 100%;
          padding: 5% 1%;
          height: 110px;
          background-image: linear-gradient(to bottom, #2c5188, #1654a5);
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          border-right: 2px solid #3d497d;
          p{
            margin: 0;
          }
          p.i{
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr;
            grid-gap: 1%;
            justify-items: center;
            align-items: center;
            img{
              width: 18px;
            }
          }
          .t{
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            width: 100%;
            text-align: center;
          }
          .b{
            font-size: 12px;
            font-weight: 300;
            color: #fff;
            width: 100%;
            text-align: center;
          }
        }
        .big{
          width: 100%;
          padding: 5% 1%;
          height: 110px;
          background-image: linear-gradient(to bottom, #2c5188, #1654a5);
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          border-right: 3px solid #3d497d;
          p{
            margin: 0;
          }
          p.i{
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr;
            grid-gap: 1%;
            justify-items: center;
            align-items: center;
            img{
              width: 18px;
            }
          }
          .t{
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            width: 100%;
            text-align: center;
          }
          .b{
            font-size: 12px;
            font-weight: 300;
            color: #fff;
            width: 100%;
            text-align: center;
          }
        }
        .small{
          width: 100%;
          padding: 5% 1%;
          height: 110px;
          background-image: linear-gradient(to bottom, #2c5188, #1654a5);
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          p{
            margin: 0;
          }
          p.i{
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr;
            grid-gap: 1%;
            justify-items: center;
            align-items: center;
            img{
              width: 18px;
            }
          }
          .t{
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            width: 100%;
            text-align: center;
          }
          .b{
            font-size: 12px;
            font-weight: 300;
            color: #fff;
            width: 100%;
            text-align: center;
          }
        }
      }
    }
  }
}
.banker, .dealer{
  width: 100%;
  transform: scale(0.74) translateX(18%);
  .t{
    color: #fff;
    height: 26px;
    line-height: 26px;
    text-align: center;
    font-size: 14px;
    border-radius: 5px;
    background-image: linear-gradient(to right, #f25f70, #c03368);
  }
  .n{
    background-color: rgba(0, 0, 0, 0.2);
    padding: 10%;
    height: 80px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 10%;
    img{
      width: 100%;
    }
  }
}
.zhong{
  background: url('../../assets/dice60/touzhong.png') no-repeat;
  background-size: 100% 100%;
  padding: 8%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 5%;
  justify-items: center;
  align-items: center;
  img{
    width: 24px;
  }
}
.dealer{
  transform: scale(0.74) translateX(-17%);
  .t{
    background-image: linear-gradient(to right, #0158c9, #4a03fa);
  }
}
.but{
  margin-top: 14px;
  margin-bottom: 20px;
  .buttons{
    color: #80a0db;
    width: 80%
  }
  .buttons1 {
    color: #163f77;
  }
}
.table{
  width: calc(100% - 40px);
  background: #101626;
  margin: 20px;
  margin-bottom: 80px;
  border-radius: 10px;
  .header{
    // height: 40px;
    line-height: 40px;
    font-size: 14px;
  }
  .view{
    font-size: 12px;
    color: #1a5cd8;
    height: 40px;
    line-height: 40px;
  }
}
.list{
  margin: 20px;
  background: #101626;
  .list-item{
    height: 40px;
    line-height: 40px;
    border-bottom: 2px solid #fff;
    :deep(.van-badge--top-right) {
      transform: none;
      border-radius: 4px;
    }
  }
}
.wrapper {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 100%;
  padding-top: 50px;
  .history{
    height: 100%;
    width: 100%;
    overflow: auto;
    background: #101626;
    .title{
      color: #fff;
      font-weight: 700;
      font-size: 14px;
      height: 34px;
      text-align: center;
      line-height: 34px;
      position: relative;
      .close{
        position: absolute;
        top: 10px;
        right: 16px;
      }
    }
  }
  .bet{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #101626;
    padding: 0 20px;
    .title{
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color: #fff;
      span{
        color: #8d9ea6;
        font-size: 14px;
      }
      .cancal{
        float: right;
      }
    }
    .badge{
      height: 40px;
      line-height: 40px;
    }
    .betN{
      height: 40px;
      line-height: 40px;
      .n{
        background: #5c5f70;
        color: #fff;
        border-radius: 4px;
        margin: 4px 10px;
        font-size: 16px;
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
    }
    .quan{
      height: 40px;
      line-height: 40px;
      margin: 20px 0;
      background-color: var(--fog-13);
      border-radius: 4px;
      padding-left: 20px;
      :deep(.van-stepper--round .van-stepper__plus), :deep(.van-stepper--round .van-stepper__minus) {
        background: #5c5f70;
        color: #2f3034;
        border: 0px solid #fff;
      }
      :deep(.van-stepper__input) {
        width: 60%;
      }
    }
    .bs{
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
      .active{
        color: #fff;
        background: #67c23a;
      }
      div{
        background: #5c5f70;
        padding: 10px 10px;
        border-radius: 4px;
      }
    }
    .butb{
      width: 100%;
      margin-bottom: 30px;
    }
  }
  .tip{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 80%;
    margin: 0 auto;
    background: #2f3034;
    border-radius: 10px;
    text-align: center;
    padding: 20px;
    p{
      font-size: 14px;
      line-height: 1.5;
      text-align: start;
    }
  }
}


</style>