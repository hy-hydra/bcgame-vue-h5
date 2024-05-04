<template>
  <div class="bonus-center px-10px py-24px bg-fog-8 animate__bounceInUp animate__animated">
    <van-list
      v-model:loading="isLoading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="vip-bonus-box">
        <div class="vip-bonus-title">
          <span>{{ $t("vip") }}</span> {{ $t("bonus") }}
        </div>

        <div class="quests-box" v-for="(item,index) in listData.list" :key="index">
          <div>
            <div class="top">
              <div class="top-title">
                <span class="ac-title">{{ item.config.title }}</span>
                <span class="ac-detail" @click="handleDetailClick(item)">{{ $t("view") }}</span>
              </div>
            </div>
            <div class="quests-box-content">
              <div :class="['item-cell','mb20']">
                <span class="label ac-name">{{ item.config.name }}</span>
              </div>


              <div class="item-box">
                <div :class="['item-cell']">
                  <span class="label">{{ $t('wagering') }}</span>
                  <span class="value">{{ item.config?.configMap?.auditMultiple }}</span>
                </div>
                <div :class="['item-cell']" v-for="(item,index) in item.config.awardConfigsItems" :key="index">
                  <span class="label">{{ $t('recharge') }} {{ item.gradeValue }} </span>
                  <!--首充都是百分比 -->
                  <template v-if="item.style==2">
                    <span class="value">{{ $t('bonus') }} {{ item.award + '%' }}</span>
                  </template>
                  <template v-if="item.style==1">
                    <span
                      class="value">{{ $t('bonus') }} {{ item.activeAward == 1 ? item.award + '%' : item.award }}</span>
                  </template>
                </div>
                <div :class="['item-cell']">
                  <span class="label">{{ $t('startTime') }}</span>
                  <span class="value">{{ item.config.startTime }}</span>
                </div>
                <div :class="['item-cell']">
                  <span class="label">{{ $t('endTime') }}</span>
                  <span class="value">{{ item.config.endTime }}</span>
                </div>

                <div class="activity-scope" v-if="getVipScope(item.config?.configMap?.vipLevel)">
                  <span class="label">{{ $t('participants') }}</span>
                  <span class="value"> {{ getVipScope(item.config?.configMap?.vipLevel) }}</span>
                </div>
              </div>


              <van-button
                block
                :disabled="!item.canReceive"
                native-type="submit"
                class="text-text-3"
                @click="handleReceive(item)"
                :class="[item.canReceive?'clain-btn':'']"
              >
                {{ item.canReceive ? $t("claim") : $t("disClaim") }}
              </van-button>
            </div>
          </div>
          <div class="bonus-bg-wrap">
            <div class="bg-inner">
            </div>
            <img
              onerror="this.onerror=null;this.src='https://bc.imgix.net/game/image/8cfca271-4759-45b4-a578-4052d04cc5a5.png?auto=format&dpr=2&w=200';"
              :src="gameStore?.fileConfig?.domainConfPrefix + item.config.wapPic"/>

          </div>
        </div>

      </div>
    </van-list>
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import {showNotify, showToast} from 'vant';
import {useI18n} from "vue-i18n";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {activityReceive, activityList} from '@/api/active'
import {gameInfoStore} from '@/stores/gameStore';
const ACTIVITY_DETAIL = "ACTIVITY_DETAIL";
const gameStore = gameInfoStore();
const router = useRouter()
const {origin} = location;
const {t, locale} = useI18n();
const $t = key => {
  return t("bonus." + key);
};
const getVipScope = (vips) => {
  let str = ""
  vips && vips.map((item, index) => {
    if (index != vips.length - 1) {
      str += `${$t('vip')}` + item + ","
    } else {
      str += `${$t('vip')}` + item
    }
  })
  return str
}
const handleReceive = async (item) => {
  const res = await activityReceive({activityId: item.config.id, platformActiveId: item.config.platformActiveId});
  if (res && res.code == 1) {
    item.canReceive = false
    showToast({
      message: $t('claimedSuccessfully')
    })
  } else {
    showToast({
      message: res?.msg
    })
  }
}
const  handleDetailClick=(item)=>{
  sessionStorage.setItem(ACTIVITY_DETAIL,JSON.stringify(item))
  router.push({ path: '/ac-detail', query: { id: item.config.id } });
}
const isLoading = ref(false);
const finished = ref(false);
const params = ref({"page": 0, "limit": 50});
const listData = ref({
  list: [],
  page: 1,
  limit: 50,
  total: 0,
  totalPage: 0,
});
const onLoad = () => {
  isLoading.value = true;
  params.value.page++;
  fetchListData();
};
const fetchListData = async () => {
  if (listData.value.totalPage < params.value.page && params.value.page !== 1) {
    finished.value = true;
    isLoading.value = false;
    return;
  }
  const res = await activityList(params.value);
  if (res.code == 1) {
    isLoading.value = false;
    const skuDataReq = res.data;
    res.data.list.map((data) => {
      data.config.awardConfigsItems = []
      if (data.config.awardConfigMap && data.config.awardConfigMap.grades) {
        data.config.awardConfigMap.grades.forEach((item, index) => {
          let grade = Number(Object.keys(item)[0])
          let gradeValue = item[grade]
          let award = data.config.awardConfigMap.awards[index]
          //列表最大只显示3条，更多的去详情查看
          if(index<3){
            data.config.awardConfigsItems.push({
              grade,
              gradeValue,
              award,
              style: data.config.style,
              activeAward: data.config.configMap.awardStyle//奖励模式，值或者百分比
            })
          }
        })
      }
    })
    skuDataReq.list = (params.value.page === 1 ? [] : listData.value.list
    ).concat(skuDataReq.list);
    skuDataReq.totalPage = Math.ceil(skuDataReq.total / 50);
    listData.value = {
      ...skuDataReq,
    };
  }
};

</script>

<style lang="less" scoped>
.bonus-center {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;

  .van-icon {
    color: var(--text-6);
    font-weight: 800;
  }

  .clain-btn {
    margin-top: 5px;
    width: 100%;
    height: 40px;
    font-size: 12px;
    font-weight: 700;
    border-radius: 4px;
    border: none;
    background: var(--fog-5);
  }

  .vip-bonus-box {
    .vip-bonus-title {
      font-size: 18px;
      color: #fff;
      font-weight: bold;
      margin-top: 20px;
      margin-bottom: 15px;

      span {
        color: #FFBF39;
        padding-right: 5px;
      }
    }

    .quests-box {
      background: var(--fog-13);
      display: block;
      margin-bottom: 10px;
      padding: 15px;
      border-radius: 5px;
      position: relative;
      min-height: 207px;

      .top {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .top-title {
          width: 100%;
          font-size: 16px;
          color: #fff;
          font-weight: bold;
          display: flex;
          justify-content: flex-start;
          align-items: center;

          i {
            margin-left: 10px;
          }

          .refresh {
            color: var(--fog-6);
            font-size: 12px;
            background: #3bc1171a;
            padding: 5px 10px;
            margin-left: 10px;
            border-radius: 20px;

            i {
              margin-left: 0;
            }

            &-log {
              padding-left: 5px;
            }
          }
        }

        .ac-title {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .ac-detail {
          min-width: 80px;
          height: 26px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          color: var(--text-1);
          position: relative;
          z-index: 9;
          border-radius: 20px;
          font-size: 12px;
        }

      }

      &-content {
        padding-top: 8px;
        .ac-name{
          word-wrap: break-word;   //自动换行
          word-break: break-all;    //自动换行（兼容字母）
          overflow: hidden;       //超出隐藏
          text-overflow: ellipsis;   //溢出显示省略号
          display: -webkit-box;
          -webkit-line-clamp: 3;   //显示3行
          -webkit-box-orient: vertical;
        }

        .item-cell {
          padding-right: 35%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;

          .label, .value {
            font-size: 12px;
          }
        }

        .mb20 {
          margin-bottom: 20px;
        }

        .van-button--primary {
          background: #2D3035;
          color: var(--fog-6);
          border: none;
          height: 40px;
          min-width: 100px;
          position: absolute;
          z-index: 99;
          width: 90%;
          bottom: 20px;
        }

        .activity-scope {
          font-size: 12px;
          display: flex;
          width: 95%;

          .label {
            margin-right: 5px;
          }

          .value {
            flex: 1;
            display: inline-block;
            word-break: break-word;
          }
        }
      }

      .bonus-bg-wrap {
        position: absolute;
        z-index: 1;
        width: 35%;
        height: 100%;
        right: 0;
        top: 0;
        overflow: hidden;
      }

      .bg-inner {
        width: 16.75rem;
        height: 100%;
        background: radial-gradient(50% 50% at 50% 50%, rgba(118, 54, 255, .7) 0%, rgba(118, 54, 255, 0) 100%);;
        display: flex;
        align-items: center;
      }

      img {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        width: 80%;
      }

      .item-box {
        min-height: 100px;
      }
    }
  }
}

</style>
