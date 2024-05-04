<template>
  <div class="account-records bg-fog-8 animate__bounceInUp animate__animated">
    <div class="notification__header h-51px flex justify-between px-16px items-center  bg-fog-9">
      <span class="text-13px text-text-3">{{ $t('bonus.tsRecord') }}</span>
      <van-icon
        name="cross"
        class="text-text-6 font-900 text-14px"
        @click="$router.go(-1)"
      />
    </div>
    <div class="account-records__content px-10px">
      <div class="type-box">
        <div class="th">{{ $t('bonus.tsType') }}</div>
        <div class="th">{{ $t('bonus.tsAmount') }}</div>
        <div class="th item-time">{{ $t('bonus.tsTime') }}</div>
      </div>
      <van-list
        v-model:loading="isLoading"
        :finished="finished"
        :finished-text="'没有更多了'"
        @load="onLoad"
      >
        <div class="list" v-for="(item,index) in listData.list" :key="item.id">
           <div class="list-item">
              <div class="item">
                <span class="item-desc">{{item.orderTypDesc}}</span>
              </div>
              <div class="item">{{item.plusStyle==1?'+':'-'}}{{item.amount}}</div>
              <div class="item item-time">{{item.itme}}</div>
           </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import {showNotify, showToast} from 'vant';
import {useI18n} from "vue-i18n";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {getBalanceRecord} from '@/api/active'
import {gameInfoStore} from '@/stores/gameStore';
const gameStore = gameInfoStore();
const router = useRouter()
const {origin} = location;
const {t, locale} = useI18n();
const $t = key => {
  return t(key);
};
const  codeMap={
  1001:$t('bonus.xia_zhu_kou_qian'),
  1002:$t('bonus.ying_qian'),
  1003:$t('bonus.huo_dong_li_jin'),
  1004:$t('bonus.vip_li_jin'),
  1005:$t('bonus.fan_qian'),
  1006:$t('bonus.xi_ma'),
  2001:$t('bonus.chong_zhi'),
  2002:$t('bonus.ti_kuan'),
  3003:$t('bonus.hou_tai_jia_kou_kuan'),
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
  const res = await getBalanceRecord(params.value);
  if (res.code == 1) {
    isLoading.value = false;
    const skuDataReq = res.data;
    skuDataReq.list&&skuDataReq.list.map((item)=>{
       item.orderTypDesc=codeMap[item.style]
       item.itme=item.updatedTime?.substring(0, 16)
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
.account-records {
  display: flex;
  flex-direction: column;
  height: 100vh;
  &__content{
    flex: 1;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    .type-box{
      height: 40px;
      background: var(--fog-7);
      display:flex;
      font-size: 14px;
      .th{
        flex:1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .van-list{
      flex: 1;
      overflow: auto;
      .list-item{
        display:flex;
        min-height:50px;
        .item{
          overflow: hidden;
          flex:1;
          font-size:14px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
        }
        .red{
          color:var(--fog-41)
        }
      }
    }
    .item-time{
      flex: 1.5 !important;
      text-align: right;
    }
    .item-desc{
      max-width: 100%;
      display: inline-block;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
  }
}

</style>
