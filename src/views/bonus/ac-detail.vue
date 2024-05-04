<template>
  <div class="ac-detail   bg-fog-8 animate__bounceInUp animate__animated">

    <div class="notification__header h-51px flex justify-between px-16px items-center  bg-fog-9">
      <span class="text-13px text-text-3">{{ $t('bonus.ruleTitle') }}</span>
      <van-icon
        name="cross"
        class="text-text-6 font-900 text-14px"
        @click="$router.go(-1)"
      />
    </div>
    <div class="ac-detail__content px-10px">
      <div class="ac-theme">
        <div class="theme-title">{{ detailInfo.config.title }}</div>
        <div class="theme-desc">{{detailInfo.config.name}}</div>
      </div>
      <div class="ac-st">
        <van-grid :border="false" :column-num="2" :gutter="10">
          <van-grid-item v-for="(item,index) in detailInfo.config.awardConfigsItems" :key="index">
            <div class="item-cell">
              <div :class="['top-deposit',item.styleBg]">
                <p></p>
                <div class="deposit-bonus">
                  <div class="bonus-amount">
                    <!--首充都是百分比 -->
                    <template v-if="item.style==2">
                      <span>{{ item.award + '%' }}</span>
                    </template>
                    <template v-if="item.style==1">
                    <span>{{ item.activeAward == 1 ? item.award + '%' : item.award }}</span>
                    </template>
                  </div>
                  <div class="bonus-amount-tip">{{ $t('bonus.reward') }}</div>
                </div>
              </div>
              <div class="bot-deposit">
                <span class="label">{{ $t('bonus.lowestRecharge') }}</span>
                <span class="value">{{ item.gradeValue}}</span>
              </div>
            </div>
          </van-grid-item>

        </van-grid>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {showNotify, showToast} from 'vant';
import {useI18n} from "vue-i18n";
import {onBeforeMount, ref} from "vue";
import {useRouter} from "vue-router";
import {gameInfoStore} from '@/stores/gameStore';
const gameStore = gameInfoStore();
const router = useRouter()
const {origin} = location;
const {t, locale} = useI18n();
const ACTIVITY_DETAIL = "ACTIVITY_DETAIL";
const $t = key => {
  return t(key);
};
const detailInfo=ref({
  config:{}
})
const  initData=()=>{
  let data=sessionStorage.getItem(ACTIVITY_DETAIL)
   data=data?JSON.parse(data):{config:{}}
  if(router.currentRoute.value.query.id!=data.config.id)return
   data.config.awardConfigsItems = []
  if (data.config.awardConfigMap && data.config.awardConfigMap.grades) {
    data.config.awardConfigMap.grades.forEach((item, index) => {
      let grade = Number(Object.keys(item)[0])
      let gradeValue = item[grade]
      let award = data.config.awardConfigMap.awards[index]
      data.config.awardConfigsItems.push({
        grade,
        gradeValue,
        award,
        styleBg:"item-bg"+((index%4)+1),
        style: data.config.style,
        activeAward: data.config.configMap.awardStyle//奖励模式，值或者百分比
      })
    })
  }
   detailInfo.value=data
}
onBeforeMount(()=>{
  initData()
})
</script>
<style lang="less" scoped>
.ac-detail {
  display: flex;
  flex-direction: column;
  height: 100vh;
  &__content{
    flex: 1;
    overflow: auto;
     padding-bottom: 20px;
    .ac-theme {
      margin-top: 15px;

      .theme-title {
        color: var(--text-6);
        font-size: 16px;
      }

      .theme-desc {
        margin: 15px 0;
        color: var(--text-6);
        font-size: 14px;
      }
    }
    .van-grid {
      padding-left: 0 !important;

      :deep(.van-grid-item__content) {
        background: transparent;
        padding-top: 0;
        padding-bottom: 5px;
      }

      .item-cell {
        min-height: 163px;
        width: 100%;
        display: flex;
        flex-direction: column;
        background: #2D3035;
        border-radius: 5px;
      }

      .top-deposit {
        flex: 1;
        position: relative;

        .deposit-bonus {
          width: 100%;
          position: absolute;
          bottom: 15px;
          text-align: center;

          .bonus-amount {
            width: 100%;
            text-align: center;
            font-size: 20px;
            color: #000;
            font-weight: bold;
            &-tip {
              margin-top: 2px;
              color: #000;
            }
          }
        }

      }

      .bot-deposit {
        height: 34px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 8px;

        .label {
          font-size: 12px;
        }

        .value {
          font-size: 12px;
          color: #fff;
        }
      }

      .item-bg1 {
        background: url('~/bonus/icon-ac1.webp') no-repeat top left / 100% 100%;
      }

      .item-bg2 {
        background: url('~/bonus/icon-ac2.webp') no-repeat top left / 100% 100%;
      }

      .item-bg3 {
        background: url('~/bonus/icon-ac3.webp') no-repeat top left / 100% 100%;
      }

      .item-bg4 {
        background: url('~/bonus/icon-ac4.webp') no-repeat top left / 100% 100%;
      }
    }
  }
}
</style>