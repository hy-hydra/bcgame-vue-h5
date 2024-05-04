<template>
    <div>
        <div
            class="inline-flex px-20px py-10px text-[#fff] text-12px mb-12px bg-[#2D3035] border-rd-4px mt-12px ml-12px">
            <div @click="back" class="text-[#98A7B5]">{{ $t("promotions") }}</div>
            <van-icon class="mx-8px" name="arrow" />
            <div>{{ $t("details") }}</div>
        </div>
        <div class="pt-30px px-20px w-100vw">
            <img class="w-100%"
                onerror="this.onerror=null;this.src='https://bc.imgix.net/bc_event/9336c2586d.png?auto=format&amp;dpr=2&amp;w=450';"
                src="" alt="">
        </div>
        <div class="pl-20px text-[#fff] text-24px font-bold my-20px">Bet & Win</div>
        <div class="pl-20px text-[#fff] text-12px font-bold my-20px">3000</div>
        <div class="pl-20px text-[#fff] text-12px my-10px text-[#98A7B5]">📅 25th of March 2024</div>

        <van-button class=" ml-20px mb-20px w-104px h-47px"
            color="conic-gradient(from 1turn, rgba(88, 175, 16, 1), rgba(29, 128, 58, 1))">
            {{ $t('play-now') }}
        </van-button>
        <Footer />
        <van-back-top class="border-0px" right="6vw" bottom="10vh">
            <div class="text-center">
                <van-icon class="block text-[#47c737]" name="arrow-up" />
                <div class="text-14px">{{ $t('top') }}</div>
            </div>
        </van-back-top>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
//   import { userInfo } from "@/api/user";
import { onMounted } from "vue";

const router = useRouter();
const { t } = useI18n();
const $t = key => {
    return t("promotions." + key);
};

const back = () => {
    router.go(-1);
}


onMounted(() => {
    // if(isEmpty(access_token.value)) {
    //   router.push({name: 'login'})
    // }

})

</script>

<style lang="less">
.van-back-top {
    border-radius: 0;
}

:root {
    --van-back-top-background: #25272C
}
</style>