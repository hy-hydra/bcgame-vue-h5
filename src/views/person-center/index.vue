<template>
    <div class="person-center px-10px py-24px bg-fog-8 animate__bounceInUp animate__animated">
        <div class="person-center__bar py-10px px-13px bg-fog-1 rounded-5px">
            <div class="bar-item pb-13px flex items-center justify-between border-b-1px border-red bc-border-bottom cursor-pointer"
                @click="$router.push('/user-detail')">
                <div class="left flex">
                    <img :src="userInfo.avatar" alt="" class="h-54px rounded-50% mr-18px" />
                    <div class="desc flex flex-col justify-center">
                        <p class="m-0 text-15px text-text-3 mb-4px">
                            {{ userInfo.nickName || userInfo.account }}
                        </p>
                        <p class="m-0 text-12px mt-4px">
                            {{ $t('user_id') }}:{{ userInfo.id }}
                        </p>
                    </div>
                </div>
                <van-icon name="arrow" />
            </div>
            <div class="bar-item h-64px flex justify-between items-center pt-13px cursor-pointer"
                @click="$router.push('/vip-club')">
                <div class="flex-grow mr-12px">
                    <div class="mb-8px text-text-3 text-13px">
                        {{ $t('vip') }} {{ loginInfo.level.level }}
                    </div>
                    <div class="mb-8px">
                        <van-progress :percentage="(loginInfo.level.xp * 100) / loginInfo.level.upXp"
                            :show-pivot="false" class="person-progress" />
                    </div>
                    <div class="flex justify-between text-12px leading-18px">
                        <span>{{ $t('xp') }}</span>
                        <span>
                            <span class="text-text-3">{{ loginInfo.level.xp }}</span>
                            /{{ loginInfo.level.upXp }}
                        </span>
                    </div>
                </div>
                <van-icon name="arrow" />
            </div>
        </div>

        <div class="person-center__menu mt-13px bg-fog-1 rounded-5px">
          <div class="person-center__menu-item h-44px px-10px flex justify-between items-center cursor-pointer"
               @click="$router.push('/account-records')">
                <span class="flex items-center gap-10px">
                    <svg class="icon">
                        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Amount"></use>
                    </svg>
                    <span class="text-text-3 text-13px leading-22px">
                        {{ t('bonus.tsRecord') }}
                    </span>
                </span>
            <van-icon name="arrow" />
          </div>
            <div class="person-center__menu-item h-44px px-10px flex justify-between items-center cursor-pointer"
                @click="$router.push('/notification')">
                <span class="flex items-center gap-10px">
                    <svg class="icon">
                        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Notice"></use>
                    </svg>
                    <span class="text-text-3 text-13px leading-22px">
                        {{ $t('notiofication') }}
                    </span>
                </span>
                <van-icon name="arrow" />
            </div>
            <div class="person-center__menu-item h-44px px-10px flex justify-between items-center cursor-pointer"
                @click="showBottom = true">
                <span class="flex items-center gap-10px">
                    <svg class="icon">
                        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_AddFirend"></use>
                    </svg>
                    <span class="text-text-3 text-13px leading-22px">
                        {{ $t('refer') }}
                    </span>
                </span>
                <van-icon name="arrow" />
            </div>
            <div class="person-center__menu-item h-44px px-10px flex justify-between items-center cursor-pointer">
                <span class="flex items-center gap-10px">
                    <svg class="icon">
                        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Affiliate"></use>
                    </svg>
                    <span class="text-text-3 text-13px leading-22px">
                        {{ $t('affiliate') }}
                    </span>
                </span>
                <van-icon name="arrow" />
            </div>
        </div>
        <div class="person-center__menu mt-13px bg-fog-1 rounded-5px">
            <div class="person-center__menu-item h-44px px-10px flex justify-between items-center cursor-pointer"
                @click="$router.push('/global-setting')">
                <span class="flex items-center gap-10px">
                    <svg class="icon">
                        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Setting"></use>
                    </svg>
                    <span class="text-text-3 text-13px leading-22px">
                        {{ $t('setting') }}
                    </span>
                </span>
                <van-icon name="arrow" />
            </div>
            <div class="person-center__menu-item h-44px px-10px flex justify-between items-center cursor-pointer"
                @click="$router.push('/location')">
                <span class="flex items-center gap-10px">
                    <svg class="icon">
                        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Language"></use>
                    </svg>
                    <span class="text-text-3 text-13px leading-22px">{{
                    $t('language')
                }}</span>
                </span>
                <span class="items-center flex gap-10px">
                    <span class="text-text-4 text-13px">
                        {{ activeLauguage() }}
                    </span>
                    <van-icon name="arrow" />
                </span>
            </div>
            <!-- dy_au 隐藏了在4月1号 -->
            <!-- <div
        class="person-center__menu-item h-44px px-10px flex justify-between items-center cursor-pointer"
        @click="$router.push('/location')"
      >
        <span class="flex items-center gap-10px">
          <svg class="icon">
            <use
              xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Interests"
            ></use>
          </svg>
          <span class="text-text-3 text-13px leading-22px">
            {{ $t("currency") }}
          </span>
        </span>
        <span class="items-center flex gap-10px">
          <span class="text-text-4 text-13px">JPY</span>
          <van-icon name="arrow" />
        </span>
      </div> -->
            <div class="person-center__menu-item h-44px px-10px flex justify-between items-center cursor-pointer">
                <span class="flex items-center gap-10px">
                    <svg class="icon">
                        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Exchange"></use>
                    </svg>
                    <span class="text-text-3 text-13px leading-22px">
                        {{ $t('theme') }}
                    </span>
                </span>
                <CheckBox @update:value="updateTheme" />
            </div>
        </div>
        <div class="log-out text-center pb-24px pt-12px">
            <p class="text-text-4 text-12px font-600 cursor-pointer" @click="logout">
                {{ $t('log_out') }}
            </p>
        </div>
    </div>
    <van-popup v-model:show="showBottom" position="bottom" closeable class="bg-fog-10 rounded-t-16px"
        :style="{ height: '50%' }">
        <div class="p-14px">
            <div>
                <img src="" alt="" />
            </div>
            <div>
                <p class="text-12px">{{ $t('share') }}:</p>
                <div class="bg-fog-12 p-14px flex justify-between text-text-7 text-13px">
                    {{ inviteCode }}
                    <svg class="fill-text-6 h-22px w-22px cursor-pointer" @click="copyInviteCode">
                        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Copy"></use>
                    </svg>
                </div>
            </div>
            <div class="mt-12px copy-link p-16px text-center text-text-3 rounded-4px cursor-pointer"
                @click="copyInviteCode">
                {{ $t('copy') }}
            </div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import { type ConfigProviderTheme, showNotify, showToast } from 'vant'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useI18n as originUseI18n } from 'vue-i18n'

import { languageList } from '@/const'
import { ENotifyTypes } from '@/const/enums.d'
import { useThemeStore, useLoginStore, useUserStore } from '@/stores'
import { useClipboard } from '@vueuse/core'

const { locale, t } = originUseI18n()
const $t = (key) => t('person-center.' + key)

const router = useRouter()
const loginStore = useLoginStore()
const themeStore = useThemeStore()
const { origin } = location

const { loginInfo } = storeToRefs(loginStore)
const { userInfo } = storeToRefs(useUserStore())

const activeLauguage = () => {
    const languageMap = languageList.reduce((pre, next) => {
        pre[next.value] = next.label
        return pre
    }, {})
    return languageMap[locale.value]
}

const inviteCode: string = `${origin}/regist?inviteCode=${loginInfo.value.inviteCode}`

const copyInviteCode = async () => {
    const { copy, copied } = useClipboard({ legacy: true })
    await copy(inviteCode)
    if (copied) {
        showNotify({
            type: ENotifyTypes.success,
            message: $t('copied_code')
        })
    } else {
        showToast($t('copy_err'))
    }
}

const showBottom = ref(false)

const updateTheme = (themeType: ConfigProviderTheme) => {
    themeStore.setTheme(themeType)
}

const logout = () => {
    loginStore.setToken('')
    router.push({ name: 'login' })
}
</script>

<style lang="less" scoped>
.person-center {
    .van-icon {
        color: var(--text-6);
        font-weight: 800;
    }
}

.person-progress {
    background: var(--fog-8);
    height: 7px;

    :deep(.van-progress__portion) {
        background: var(--fog-6);
    }
}

.copy-link {
    background-image: var(--fog-5);
}
</style>
