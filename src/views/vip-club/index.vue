<template>
  <div class="vip-club h-100vh ralative">
    <van-icon
      name="cross"
      class="absolute right-12px top-12px z-11 text-text-6 font-bold"
      @click="$router.go(-1)"
    />
    <div
      class="vip-club__header bg-fog-14 h-85px flex items-center justify-between px-16px relative"
    >
      <span
        class="text-text-3 z-1 text-13px absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2"
        >{{ $t("title") }}</span
      >

      <!-- <img
        src="https://bc.game/assets/ribbon.0a768b9e.png"
        class="h-40px absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2"
      /> -->
    </div>
    <div class="vip-club__body bg-fog-9 p-8px">
      <div class="body-title bg-fog-10 p-10px text-10px">
        <p class="m-0 leading-14px text-center">
          {{ $t("desc") }}
          <span class="text-text-5">{{ $t("desc_view") }}</span>
        </p>
      </div>
      <div
        class="body-progress rounded-8px mt-12px flex gap-16px h-140px px-16px"
      >
        <div class="left relative">
          <img src="@/assets/vip-club/1.png" alt="" class="w-110px" />
          <!-- <img
            src="https://bc.game/assets/light.11b6df26.svg"
            class="absolute left-0 top-0"
          /> -->
          <div
            class="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 text-center"
          >
            <div class="mint">{{ $t("bronze") }}</div>
            <span class="text-text-3 text-11px">
              {{ $t("vip") }}
              <span class="font-bold text-17px">{{ vipInfo.level }}</span>
            </span>
          </div>
        </div>
        <div class="right text-12px flex-grow">
          <p class="text-text-3 text-13px pt-12px font-600">
            {{ $t("progress") }}
          </p>
          <p class="text-text-3 m-0 mb-6px flex items-center gap-4px">
            {{ vipInfo.xp }} XP
            <svg class="w-15px h-18px fill-text-10">
              <use
                xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Inform"
              ></use>
            </svg>
          </p>
          <van-progress
            :percentage="vipInfo.xp / vipInfo.upXp"
            :show-pivot="false"
            stroke-width="10px"
            class="vip-club-progress"
          />
          <p class="text-text-3">
            {{ vipInfo.upXp - vipInfo.xp }} XP {{ $t("until") }} VIP
            {{ vipInfo.level + 1 }}
          </p>
        </div>
      </div>
      <!-- <div class="body-host pt-6px bg-fog-18 rounded-8px mt-12px">
                <div class="host-title flex justify-between p-r-10px">
                    <div class="text-10px leading-18px bg-fog-19 text-text-3 px-4px">
                        {{ $t('host') }}
                    </div>
                    <svg class="w-15px h-18px fill-text-10">
                        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Inform"></use>
                    </svg>
                </div>
                <div class="text-center text-12px pb-20px">
                    <div>
                        <img src="@/assets/vip-club/2.webp" class="h-34px" />
                    </div>
                    <div>
                        <p>{{ $t('host_desc') }}</p>
                        <p>
                            {{ $t('host_at') }}
                            <span class="font-700 italic text-text-3">{{ $t('vip') }} 38</span>
                        </p>
                    </div>
                </div>
            </div> -->
      <div class="vip-list p-12px bg-fog-10 mt-12px">
        <p class="text-center text-12px text-text-4">
          {{ $t("discover_desc") }}
        </p>
        <div class="bonus-tag-list flex justify-between">
          <span
            v-for="tag in bonusTagList"
            :key="tag.key"
            @click="setActive(tag.key)"
            :class="[[tag.key], { active: activeKey === tag.key }]"
            class="bonus-tag flex-none flex flex-col justify-center items-center opacity-50"
          >
            <img :src="tag.src" alt="" width="32px" />
            <span>{{ $t(tag.key) }}</span>
          </span>
        </div>
        <div class="bonus-area">
          <div class="level-name flex items-center relative">
            <div
              class="level-title flex flex-none w-auto items-center justify-center relative"
              :class="activeKey"
            >
              {{ $t(activeKey) }}
            </div>
            <p class="level-desc">
              <span>VIP 1</span>
              <span v-if="activeKey !== 'bronze'" class="level-more">{{
                $t("level-more")
              }}</span>
            </p>
          </div>
          <div v-if="!!activeBonus.key" class="bonus-list">
            <div class="benefits-item-wrap">
              <div class="left-img">
                <img alt="img" src="@/assets/vip-club/lock.png" />
              </div>
              <div class="right-wrap">
                <div class="tit-wrap">
                  <p class="tit">{{ $t("level-up-bonus") }}</p>
                </div>
                <div class="desc">
                  <span>{{ $t("total-prize") }}</span>
                  <span class="prize-value">{{
                    DEFAULT_CURRENCY + activeBonus.keepLevelBet
                  }}</span>
                </div>
              </div>
            </div>
            <div
              class="cashback benefits-item-wrap"
              v-for="cash in activeBonus.gifts"
              :key="cash.style"
            >
              <div class="left-img">
                <img src="@/assets/vip-club/lock.png" alt="img" />
              </div>
              <div class="right-wrap">
                <div class="tit-wrap">
                  <p class="tit">{{ $t(`cashback${cash.style}`) }}</p>
                </div>
                <div class="desc">
                  <span>{{ $t(`cash-desc${cash.style}`) }}</span>
                  <span class="prize-value">Wager*1%*{{ cash.award }}%</span>
                  <span>{{ $t("cash-desc-tail") }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { drop, filter, map } from 'lodash-es';

import { useLoginStore } from '@/stores'
import type { UserLevelAPITypes } from '@/api/levelTypes.d'
import { getLevelVip } from '@/api/level'
import useI18n from '@/utils/hooks/useI18n'
import { DEFAULT_CURRENCY } from '@/const';


const $t = (key) => useI18n('vip-club', key)

const { loginInfo } = storeToRefs(useLoginStore())

const vipInfo = ref<UserLevelAPITypes.TUserVipInfoRes>({
    charge: 0,
    level: 0,
    rebates: null,
    upCharge: 200,
    upXp: 3000,
    xp: 0
})
const vipInfos = ref<Array<UserLevelAPITypes.TVipInfo>>([])

const activeKey: Ref<string> = ref('bronze')
const bonusTags = ref([])
const activeBonus = ref<{ key?: string } & UserLevelAPITypes.TVipInfo>({
    key: 'bronze',
    bet: 22,
    betRebate: 0.1,
    charge: 2001,
    gifts: [
        { style: 1, award: 8, des: '' },
        { style: 2, award: 8, des: '' },
        { style: 3, award: 8, des: '月礼金' },
        { style: 4, award: 8, des: '年礼金' }],
    keepLevelBet: 5000,
    level: 1
})

const bonusTagList = [
    { key: 'bronze', src: ('/src/assets/vip-club/bronze.png') },
    { key: 'silver', src: ('/src/assets/vip-club/silver.png') },
    { key: 'gold1', src: ('/src/assets/vip-club/gold.png') },
    { key: 'gold2', src: ('/src/assets/vip-club/gold.png') },
    { key: 'platinum1', src: ('/src/assets/vip-club/platinum.png') },
    { key: 'platinum2', src: ('/src/assets/vip-club/platinum.png') },
    { key: 'diamond1', src: ('/src/assets/vip-club/diamond.png') },
    { key: 'diamond2', src: ('/src/assets/vip-club/diamond.png') },
    { key: 'diamond3', src: ('/src/assets/vip-club/diamond.png') },
]


watch(() => activeKey.value, () => {
    activeBonus.value = filter(bonusTags.value, tag => tag.key === activeKey.value)[0]
})

const setActive = key => {
    activeKey.value = key
}

const getLevelVipData = async () => {
    const res = await getLevelVip({ reqAccount: loginInfo.value.account })
    if (res.code === 1 && res.success) {
        vipInfo.value = res.data.vip
        vipInfos.value = res.data.vipInfos

        bonusTags.value = map(drop(vipInfos.value), (tag, idx) => {
            return { key: bonusTagList[idx].key, ...tag }
        })
        activeBonus.value = filter(bonusTags.value, tag => tag.key === 'bronze')[0]
    }
}

onMounted(() => {
    getLevelVipData()
})
</script>

<style lang="less" scoped>
.vip-club {
  &__body {
    .body-progress {
      background: var(--fog-15);

      .vip-club-progress {
        background: var(--fog-17);

        :deep(.van-progress__portion) {
          background: var(--fog-16);
        }
      }
    }

    .vip-list {
      div.bonus-tag-list {
        overflow-x: scroll;
        scrollbar-width: thin;
        scrollbar-color: #20313d transparent;

        > span.bonus-tag {
          width: 5.75rem;
          height: 5.5rem;

          &.active {
            opacity: 100;
            background: var(--fog-9);

            &.bronze {
              color: var(--bronze);
            }

            &.silver {
              color: var(--silver);
            }

            &.gold1,
            &.gold2 {
              color: var(--gold);
            }

            &.platinum1,
            &.platinum2 {
              color: var(--platinum);
            }

            &.diamond1,
            &.diamond2,
            &.diamond3 {
              color: var(--diamond);
            }

            span {
              font-weight: 700;
            }
          }

          > span {
            margin-top: 0.5rem;
            font-size: 0.75rem;
            white-space: nowrap;
            overflow: hidden;
            text-align: center;
          }
        }
      }

      div.bonus-area {
        background: var(--fog-9);
        padding: 0.75rem 0.625rem;
        border-bottom-left-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;

        div.level-name {
          padding-bottom: 1.5rem;

          div.level-title {
            &.bronze {
              background: var(--bronze);
            }

            &.silver {
              background: var(--silver);
            }

            &.gold1,
            &.gold2 {
              background: var(--gold);
            }

            &.platinum1,
            &.platinum2 {
              background: var(--platinum);
            }

            &.diamond1,
            &.diamond2,
            &.diamond3 {
              background: var(--diamond);
            }

            height: 1.25rem;
            padding: 0 0.75rem 0 0.375rem;
            font-size: 0.75rem;
            font-weight: 600;
            color: #533f37;

            &::after {
              content: "";
              position: absolute;
              width: 0;
              height: 0;
              border: 0.625rem solid transparent;
              border-right: 0.25rem solid var(--fog-9);
              right: 0;
              top: 0;
            }
          }

          p.level-desc {
            margin: 0 0 0 0.5rem;
            line-height: 1.125rem;
            font-size: 0.75rem;

            span.level-more {
              position: absolute;
              width: 100%;
              left: 0;
              bottom: -0.5rem;
              text-align: center;
              height: 1.5rem;
              line-height: 1.5rem;
              margin: 0;
              white-space: nowrap;
              overflow: hidden;
            }
          }
        }
      }

      div.bonus-list {
        padding-top: 0.625rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        div.benefits-item-wrap {
          display: flex;
          align-items: center;
          width: 100%;
          height: 6.25rem;
          border-radius: 0.25rem;
          border: 1px solid #42454966;
          margin-top: 0.5rem;
          padding-left: 0.75rem;

          div.left-img {
            display: flex;
            flex: none;
            justify-content: center;
            align-items: center;
            width: 4.375rem;
            height: 4.375rem;
            border-radius: 50%;
            overflow: hidden;
            background: #2d3035;
            border: 1px solid #ffffff1a;

            img {
              width: auto;
              height: 80%;
            }
          }

          div.right-wrap {
            flex: 1;
            padding-left: 0.875rem;

            div.tit-wrap {
              display: flex;
              align-items: center;

              p.tit {
                line-height: 1rem;
                color: #ffffff;
                font-size: 0.875rem;
                font-weight: 600;
                margin: 0;
              }
            }

            div.desc {
              margin: 0.375rem 0 0;
              font-size: 0.75rem;
              padding-right: 0.75rem;
              line-height: 0.875rem;

              > span {
                &.prize-value {
                  color: #efc94c;
                  font-weight: 600;
                }
              }
            }
          }
        }
      }
    }
  }

  .mint {
    color: var(--text-9);
    background: var(--fog-38);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: var(--shadow-3);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: -0.5px;
    font-weight: 800;
  }
}
</style>
