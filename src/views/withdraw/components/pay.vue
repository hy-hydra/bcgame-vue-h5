<template>
    <div class="px-10px">
        <div class="flex justify-between items-center" @click="emit('back')">
            <p class="text-14px">{{ $t("deposit.payment_method") }}</p>
            <div class="flex justify-between items-center py-2px px-8px chose-item">
                <p class=" text-#ffff mr-9px">{{ props.activeItem.method }}</p>
                <van-icon name="arrow-down" />
            </div>
        </div>
        <p class="text-14px">YO-DA Wallet ID</p>
        <div class="px-15px py-14px border-rd-8px flex justify-between items-center bg-#17181B">
            <input type="text" v-model="inputIDValue" class="text-15px bg-transparent b-none text-#ffff w-40%">
        </div>
        <div class="flex justify-between">
            <p class="text-14px">Amount (10180 ~ 800000)</p>
            <p class="text-14px">Balance: 0</p>
        </div>
        <div class="pl-15px pr-10px py-14px border-rd-8px flex justify-between items-center bg-#17181B">
            <input type="text" v-model="inputValue" class="text-15px bg-transparent b-none text-#ffff w-40%">
           <div class="flex items-center">
                <div class="bg-[#31343c] w-40px text-center py-10px border-rd-[4px_0_0_4px] mr-4px">min</div>
                <div class="bg-[#31343c] w-40px text-center py-10px  mr-4px">25%</div>
                <div class="bg-[#31343c] w-40px text-center py-10px  mr-4px">50%</div>
                <div class="bg-[#31343c] w-40px text-center py-10px border-rd-[0_4px_4px_0]">max</div>
           </div>
        </div>
        <div class="flex justify-between">
            <div><span class="text-14px">Available</span><span>$0</span></div>
            <div><span class="text-14px">Locked funds</span><span>$0</span></div>
        </div>
        <div class="flex items-center">
            <div class="mr-9px"><van-icon name="warning" color="#28A700" /></div>
            <div class="text-12px my-10px">{{ $t("get_extra") }} <b class="text-#ffff">180%</b> {{ $t('bouns_mini') }} <b
                    class="text-#ffff">10070.000003 ARS</b> {{ $t("deposit") }}</div>
        </div>
        <div class="flex justify-center items-center color-[#ffffff]  text-center text-12px">
            <div class=" flex-1 mr-6px py-22px border-rd-5px relative"
                :class="activeSelect == index ? 'active' : 'bg-[#24262B]'" v-for="(item, index) in priezList[props.activeItem.key]"
                :key="item.value" @click="() => selected(index)">
                <span class="font-bold">ARS{{ item?.label }}</span>
                <div class="absolute  px-3px py-3px text-10px right--1px top--1px border-rd-[0_0_0_5px]"
                    :class="activeSelect == index ? 'bg-[#ffe600] color-[#000000]' : 'bg-[#e1810c]'">+180%</div>
                <div v-if="activeSelect == index" class="icon absolute right--1px bottom--1px"></div>
            </div>
        </div>

        <van-button class="ml-52px mt-20px w-240px h-47px"
            color="conic-gradient(from 1turn, rgba(88, 175, 16, 1), rgba(29, 128, 58, 1))">
            {{ $t("deposit_wallet") }}<van-icon class="ml-4px" name="share-o" color="#ffffff" />
        </van-button>

        <div class="mt-20px flex items-center bg-[rgba(47,118,36,0.2)] text-[#ffffff] text-8px py-4px px-4px border-rd-8px">
            <div class="b-icon mr-10px"></div>
            <div>
                {{ $t('desc') }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const $t = key => {
    return t("pay." + key);
};
const emit = defineEmits(['back'])
const props = defineProps<{
    activeItem: { method: string, prize: string, key: string };
}>();
const activeSelect = ref(0)
const inputValue = ref("10083")
const inputIDValue = ref("")


const priezList = ref({
    wallet: [
        {
            label: "10,083",
            value: "10083"
        },
        {
            label: "80,000",
            value: "80000"
        },
        {
            label: "800,000",
            value: "800000"
        }
    ],
    astroPay: [
        {
            label: "10,129",
            value: "10129"
        },
        {
            label: "25,000",
            value: "25000"
        },
        {
            label: "250,000",
            value: "250000"
        }
    ],
});

const selected = (index) => {
    inputValue.value = priezList.value[props.activeItem.key][index]?.value
    activeSelect.value = index
}
</script>

<style lang="less" scoped>
.chose-item {
    cursor: pointer;
    border-radius: 9px;
}

.chose-item:hover {
    background-color: #25282D;
}

.active {
    background: linear-gradient(100.51deg, #2F7624 6.83%, #0B0B0C 93.94%);
    border: 4px solid #28A700;
}

.icon {
    background: url('~/wallet/check.webp') no-repeat top left / 100% 100%;
}

.b-icon {
    background: url(~/wallet/safe.webp) no-repeat;
    background-size: 50px 50px;
    width: 50px;
    height: 50px;
}
</style>