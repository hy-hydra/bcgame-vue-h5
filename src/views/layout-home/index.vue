<template>
  <div class="layout-view">
    <div class="layout-view__header bg-fog-9">
      <div class="layout-view__header-left cursor-pointer" @click="go('/home')">
        <img :src="icon" />
      </div>
      <template v-if="!isLogin">
        <div class="layout-view__header-right">
          <div class="layout-view__header-right__btn bg-fog-7 text-text-3 cursor-pointer"
            @click="$router.push('/login')">
            {{ $t("header.sign_in") }}
          </div>
          <div class="layout-view__header-right__btn text-text-3 cursor-pointer" @click="$router.push('/regist')">
            {{ $t("header.sign_up") }}
          </div>
          <svg class="icon">
            <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Language"></use>
          </svg>
        </div>
      </template>
      <template v-else>
        <div class="layout-view__header-account flex items-center ">
          <div class="account-item text-12px text-text-3 flex gap-4px p-12px bg-fog-10">
            <img src="@/assets/coin/USDT.webp" class="h-12px" />
            <span>{{
        DEFAULT_CURRENCY + " " + userBalance?.balance || 0
      }}</span>
            <!-- dy_au 隐藏了在4月1号 -->
            <!-- <van-icon name="arrow-down" /> -->
          </div>
          <div class="account-item" @click="go('/deposit')">
            <van-button class="bc-btn">
              <van-icon name="plus" :size="18" />
            </van-button>
          </div>
          <div class="account-item ml-12px" @click="hanldeNoticeGift">
            <van-badge :content="unReceiveCount > 0 ? (unReceiveCount > 99 ? '99+' : unReceiveCount) : ''">
              <svg class="icon fill-text-6 !h-23px !w-23px">
                <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Gift"></use>
              </svg>
            </van-badge>
          </div>
          <van-overlay class="pop-overlay" :show="showNoticePop" @click="showNoticePop = false">
            <div class="notice-box" @click.stop>
              <div class="title-notice">{{ $t("bonusReady") }}</div>
              <div class="notice-box-content">
                <div class="left">
                  <img src="@/assets/more/activity_icon.b7616940.webp" alt="">
                  <div class="notice-info">
                    <div class="notice-info-top"> {{ $t("bonus") }}</div>
                    <div class="notice-info-bottom">{{ unReceiveCount }} {{ $t("tickets") }}</div>
                  </div>
                </div>
                <div class="right">
                  <van-button block @click="handleGoBonus" native-type="submit" class="text-text-3 clain-btn">
                    {{ $t("claim") }}
                  </van-button>
                </div>
              </div>
            </div>
          </van-overlay>
        </div>
      </template>
    </div>

    <div class="layout-view__content bg-fog-9">
      <RouterView />
    </div>

    <div class="layout-view__footer bg-fog-27 h-56px flex justify-between items-center">
      <div :class="computedActiveClass('more')" class="footer-item" @click="go('/more')">
        <svg viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_3196_4399)">
            <path
              d="M24.1627 21.0329C24.0232 21.1724 23.8576 21.2832 23.6753 21.3587C23.493 21.4343 23.2976 21.4731 23.1002 21.4731C22.9029 21.4731 22.7075 21.4343 22.5251 21.3587C22.3428 21.2832 22.1772 21.1724 22.0377 21.0329L19.3856 18.3808C18.2946 19.0791 17.0051 19.4969 15.6135 19.4969C11.7401 19.4969 8.6001 16.3569 8.6001 12.4836C8.6001 8.61019 11.7401 5.47021 15.6135 5.47021C19.4868 5.47021 22.6268 8.61019 22.6268 12.4836C22.6268 13.8752 22.209 15.1647 21.5107 16.2558L24.1627 18.9078C24.3023 19.0473 24.413 19.2129 24.4886 19.3953C24.5641 19.5776 24.603 19.773 24.603 19.9703C24.603 20.1677 24.5641 20.3631 24.4886 20.5454C24.413 20.7277 24.3023 20.8933 24.1627 21.0329ZM15.6135 7.47403C12.8472 7.47403 10.6039 9.7163 10.6039 12.4836C10.6039 15.2508 12.8472 17.4931 15.6135 17.4931C18.3807 17.4931 20.623 15.2508 20.623 12.4836C20.623 9.7163 18.3807 7.47403 15.6135 7.47403Z">
            </path>
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M12.1572 16.9289C12.1988 16.3113 12.2287 15.8679 11.548 15.8679H9.46919C10.2583 17.2974 11.5318 18.4222 13.0684 19.0209H17.8995L18.027 19.0156C18.288 18.994 17.7493 18.9071 16.9057 18.771C15.1674 18.4906 12.1346 18.0013 12.1346 17.4444C12.1346 17.2638 12.1463 17.0904 12.1572 16.9289ZM9.40822 19.0209H2.15853C1.29978 19.0209 0.603027 18.3151 0.603027 17.4444C0.603027 16.6171 1.23153 15.9391 2.03028 15.8731L2.15778 15.8679H7.25701C7.74417 17.0696 8.48304 18.1424 9.40822 19.0209ZM8.60082 12.5851C9.15168 12.3426 9.53717 11.7862 9.53717 11.1384C9.53717 10.689 9.35158 10.2835 9.05392 9.99635C8.76065 10.7694 8.6001 11.6077 8.6001 12.4836C8.6001 12.5175 8.60034 12.5513 8.60082 12.5851ZM7.08419 9.56185C6.7704 10.4781 6.6001 11.461 6.6001 12.4836C6.6001 12.5609 6.60107 12.638 6.60301 12.7149H2.15853C1.29978 12.7149 0.603027 12.0091 0.603027 11.1384C0.603027 10.3111 1.23153 9.6331 2.03028 9.5671L2.15778 9.56185H7.08419ZM9.70139 5.67986H2.15853C1.29978 5.67986 0.603027 4.97411 0.603027 4.10336C0.603027 3.27611 1.23153 2.59811 2.03028 2.53211L2.15778 2.52686H17.8988C18.7575 2.52686 19.4543 3.23261 19.4543 4.10336C19.4543 4.17696 19.4493 4.24938 19.4397 4.32029C18.2782 3.77497 16.9814 3.47021 15.6135 3.47021C13.3514 3.47021 11.284 4.3035 9.70139 5.67986ZM13.9047 5.67986C14.4516 5.54292 15.024 5.47021 15.6135 5.47021C16.2029 5.47021 16.7753 5.54292 17.3222 5.67986H13.9047Z">
            </path>
          </g>
          <defs>
            <clipPath id="clip0_3196_4399">
              <rect width="24" height="24" transform="translate(0.603027)"></rect>
            </clipPath>
          </defs>
        </svg>
        <div>{{ $t("more") }}</div>
      </div>
      <div :class="computedActiveClass('home')" class="footer-item" @click="go('/home')">
        <svg viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M14.3212 2.12156L21.258 7.89881C21.8707 8.40881 22.2247 9.16481 22.2247 9.96206V19.8148C22.2247 21.2976 21.0225 22.4998 19.5397 22.4998H14.6029V18.599C14.6029 18.0467 14.1552 17.599 13.6029 17.599H11.6029C11.0507 17.599 10.6029 18.0467 10.6029 18.599V22.4998H5.6662C4.18345 22.4998 2.9812 21.2976 2.9812 19.8148V9.96206C2.9812 9.16481 3.3352 8.40881 3.94795 7.89881L10.8847 2.12156C11.88 1.29281 13.326 1.29281 14.3212 2.12156Z">
          </path>
        </svg>
        <div>{{ $t("home") }}</div>
      </div>
      <div class="footer-item"></div>
      <div class="footer-item" @click="go('/account')" :class="computedActiveClass('account')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_3205_7561)">
            <path
              d="M5.61287 12.7928C7.64364 12.8944 8.89156 13.1502 10.3367 13.1502C10.7105 13.1502 11.0524 13.1338 11.3874 13.1071C10.3694 14.3318 9.75882 15.9027 9.75882 17.6157C9.75882 19.7472 10.7044 21.6591 12.2021 22.9587C9.65289 23.0707 6.80911 22.9648 4.81193 22.6409C1.79849 22.1518 -0.379556 20.0116 0.0553641 17.0481L0.0855072 16.8647C0.555738 14.2698 2.83196 12.6533 5.61287 12.7928ZM10.2006 0.609863C13.2235 0.609863 15.6746 3.04197 15.6746 6.04335C15.6746 9.04473 13.2235 11.4768 10.2006 11.4768C7.17686 11.4768 4.7258 9.04387 4.7258 6.04335C4.7258 3.04283 7.17686 0.609863 10.2006 0.609863Z">
            </path>
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M18 23.3424C21.3137 23.3424 24 20.6561 24 17.3424C24 14.0287 21.3137 11.3424 18 11.3424C14.6863 11.3424 12 14.0287 12 17.3424C12 20.6561 14.6863 23.3424 18 23.3424ZM18.4143 14.4323V13.9928H17.6041V14.4323L17.4222 14.4561H17.4182C16.539 14.4884 15.8386 15.0724 15.8386 15.7881C15.8386 15.8181 15.8394 15.8481 15.8417 15.8737C15.8409 15.8948 15.8402 15.916 15.8402 15.9372C15.8402 16.5909 16.2778 17.1627 16.9397 17.4776C17.5121 17.769 17.8347 17.9391 17.8957 17.9828C18.1349 18.2035 18.2797 18.4917 18.2797 18.807C18.2797 18.8637 18.2749 18.9192 18.2669 18.9676C18.2669 19.2232 18.1499 19.3458 17.9151 19.3458C17.9062 19.3465 17.8974 19.3471 17.8886 19.3471C17.7956 19.3471 17.7155 19.3026 17.6794 19.2374L17.6834 19.2484C17.6233 19.0974 17.5905 18.9367 17.5905 18.7702C17.5905 18.7495 17.5913 18.7295 17.5921 18.7121V18.1352H15.8306V18.6082C15.833 18.996 15.9868 19.3548 16.2417 19.6433L16.2441 19.6452C16.5767 19.955 17.0583 20.1583 17.6041 20.1822V20.6926H18.3614V20.1538H18.5666C19.6314 19.9963 20.1638 19.4273 20.1638 18.4469V18.452C20.1678 18.4127 20.1694 18.3733 20.1694 18.3333C20.1694 17.8351 19.8929 17.3879 19.4538 17.0852L17.9094 16.2863L17.9062 16.2844C17.8141 16.2282 17.7307 16.1624 17.657 16.0875L17.6594 16.0927C17.5953 15.9856 17.56 15.8655 17.56 15.7384C17.56 15.7165 17.5616 15.6952 17.5632 15.6765C17.5632 15.4209 17.6746 15.2886 17.8918 15.2886C18.109 15.2886 18.2148 15.4306 18.2148 15.7094V16.1346H19.9763V15.6829C19.9619 15.3757 19.8176 15.095 19.5892 14.8769C19.2807 14.6349 18.8751 14.4723 18.4143 14.4323Z">
            </path>
          </g>
          <defs>
            <clipPath id="clip0_3205_7561">
              <rect width="24" height="24"></rect>
            </clipPath>
          </defs>
        </svg>
        <div>{{ $t("account") }}</div>
      </div>
      <div class="footer-item" @click="go('/chat')" :class="computedActiveClass('chat')">
        <svg class="s1ff97qc icon">
          <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Chat"></use>
        </svg>
        <div>{{ $t("chat") }}</div>
      </div>
      <div class="footer-item" @click="isLogin ? go('/deposit') : go('/promotions')">
        <div class="bg-fog-27 p-5px rounded-75px w-50px h-50px items-center justify-center mx-auto">
          <div class="bg-fog-28 rounded-75px h-40 w-40px flex items-center justify-center">
            <svg class="s1ff97qc icon">
              <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Wallet"></use>
            </svg>
          </div>
        </div>
        <div class="text">{{ isLogin ? $t("wallet") : $t("promotions") }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useConfigStore, useUserStore, useLoginStore } from "@/stores";
import { storeToRefs } from "pinia";
import { DEFAULT_CURRENCY } from "@/const";
import { activityList } from '@/api/active'
const { t } = useI18n();
const $t = key => {
  return t("layout-home." + key);
};

const loginStore = useLoginStore();
const userStore = useUserStore();
const { icon } = storeToRefs(useConfigStore())

const { userBalance } = storeToRefs(userStore);

const activeMenu = ref("home");
const router = useRouter();
const go = (path: string) => {
  router.push({ path });
};

const route = useRoute();
watch(
  () => route.path,
  () => {
    activeMenu.value = route.name as string;
  },
  {
    immediate: true
  }
);

const showNoticePop = ref(false)
const hanldeNoticeGift = () => {
  if (isLogin) {
    if (unReceiveCount.value <= 0) {
      go('/bonus')
    } else {
      if (route.name != 'bonus') {
        showNoticePop.value = true
      }
    }
  } else {
    router.push('/login')
  }
}
const handleGoBonus = () => {
  showNoticePop.value = false
  go('/bonus')
}

const computedActiveClass = (type: string) => {
  if (activeMenu.value === type) {
    return "footer-item__active";
  } else {
    return "";
  }
};

const isLogin = ref(false);
const isReceive = ref(false);
const unReceiveCount = ref(0);
const initData = async () => {
  if (isLogin) {
    const res = await activityList({ "page": 1, "limit": 10 })
    if (res.code === 1 && res.success && res.data.list) {
      unReceiveCount.value = res.data.list.filter((item) => { return item.canReceive }).length
      if (unReceiveCount.value > 0) {
        isReceive.value = true
      }
    }
  }
}
onBeforeMount(() => {
  const token = loginStore.getToken();
  if (token && token.length) {
    isLogin.value = true;
  }
  initData()
});
</script>
<style lang="less" scoped>
.layout-view {
  width: 100vw;
  height: 100vh;
  position: relative;
  padding-bottom: 55px;

  &__header {
    height: 55px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    width: 100%;
    box-shadow: 0 4px 14px 0 var(--shadow-1);
    z-index: 111;

    &-left {
      >img {
        height: 30px;
      }
    }

    &-right {
      display: flex;
      gap: 8px;
      align-items: center;

      &__btn {
        text-align: center;

        &:nth-child(2) {
          background-image: var(--fog-5);
        }

        border-radius: 4px;
        height: 34px;
        padding: 0 15px;
        font-weight: 700;
        font-size: 12px;
        width: 110px;
        line-height: 34px;
      }
    }
  }

  &__content {
    height: 100vh;
    padding-top: 55px;
    padding-bottom: 40px;
    overflow: auto;
  }

  &__footer {
    font-size: 10px;
    position: fixed;
    width: 100%;
    bottom: 0;

    .footer-item {
      text-align: center;
      cursor: pointer;
      width: 75px;

      svg {
        fill: var(--text-4);
        height: 20px;
        width: 20px;
      }

      &:last-child {
        position: absolute;
        left: 50%;
        top: -20px;
        transform: translate(-50%);

        svg {
          fill: var(--text-3);
        }

        >.text {
          margin-top: 4px;
        }
      }

      &__active {
        color: var(--text-3);

        svg {
          fill: var(--text-3);
        }
      }
    }
  }

  .pop-overlay {
    background: transparent;

    .notice-box {
      background-color: #000;
      min-height: 100px;
      margin-top: 55px;
      padding: 20px;
      display: flex;
      flex-direction: column;

      .title-notice {
        font-size: 18px;
        color: white;
        font-weight: bold;
        margin-bottom: 10px;
      }

      &-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--fog-1);
        border-radius: 10px;
        padding: 10px;

        .left {
          display: flex;
          align-items: center;

          img {
            width: 60px;
          }

          .notice-info-top {
            font-size: 14px;
            color: #fff;
            margin-bottom: 5px;
          }

          .notice-info-bottom {
            font-size: 12px;
          }
        }

        .clain-btn {
          min-width: 80px;
          height: 32px;
          font-size: 12px;
          font-weight: 700;
          border-radius: 4px;
          border: none;
          background: var(--fog-5);
        }
      }
    }
  }
}
</style>
