<template>
    <div>
        <div class="flex justify-between">
            <div class="select w-48%">
                <div class="my-10px">Withdraw Currency</div>
                <BcSelect :options="optionsList">
                    <template #option="{ data }">
                        <div class="custom-option flex justify-between items-center h-[100%] ">
                            <div class="left flex items-center gap-14px">
                                <img :src="data.icon" class="h-23px w-23px" />
                                <span class="text-14px text-text-3 font-800">{{
                                    data.label
                                }}</span>
                            </div>
                            <div class="right text-right ">
                                <p class="text-12px text-text-3 font-800">JP￥0</p>
                                <p class="text-10px text-text-8 !mt-4px">0</p>
                            </div>
                        </div>
                    </template>
                    <template #trigger="{ data }">
                        <div class="custom-trigger flex justify-between items-center pr-8px">
                            <div class="left flex items-center gap-14px">
                                <img :src="data.icon" class="h-23px w-23px" />
                                <span class="text-14px">{{ data.label }}</span>
                            </div>
                            <div class="right flex items-center gap-4px">
                                <span class="text-text-4">Balance</span>
                                <span class="text-text-3">0</span>
                            </div>
                        </div>
                    </template>
                </BcSelect>
            </div>
            <div class="w-48%">
                <div class="my-10px">Choose Network</div>
                <BcSelect :options="blockList">
                    <template #option="{ data }">
                        <div class="custom-option flex justify-between items-center h-[100%] ">
                            {{ data?.name }}
                        </div>
                    </template>
                    <template #trigger="{ data }">
                        <div class="custom-trigger flex justify-between items-center pr-8px">
                            <div class="left flex items-center gap-14px">
                                <span class="text-14px">{{ data.name }}</span>
                            </div>
                        </div>
                    </template>
                </BcSelect>
            </div>
        </div>
        <div class="mb-10px mt-15px">Withdrawal Address</div>
        <input type="text" v-model="addressValue" placeholder="Fill in carefully according to the specific currency"
            class="text-12px bg-#1E2024 b-none text-#ffff w-100% p-15px border-rd-4px">
        <div class="mb-10px mt-15px flex justify-between items-center">
            <p class="m-0">Withdraw amount</p>
            <p class="m-0">Min:204 BCD</p>
        </div>
        <input type="text" v-model="amountValue" placeholder="Fill in carefully according to the specific currency"
            class="text-12px bg-#1E2024 b-none text-#ffff w-100% p-15px border-rd-4px">
        <div class="mb-10px mt-15px flex justify-between items-center">
            <span class="flex justify-center items-center">Available: <p class="m-0 text-#ffff">￥0</p></span>
            <a class="flex justify-center items-center">
                <p class="m-0 decoration-underline">Locked funds: </p>
                <p class="m-0 text-#ffff">￥0</p>
            </a>
        </div>
        <div class="bg-#26282C border-rd-4px w--100% mt-20px">
            <div class="flex justify-between items-center px-14px py-10px">
                <div class="flex justify-between items-center">Withdraw amount:</div>
                <div class="flex justify-flex-end flex-wrap items-center text-#ffff">
                    <div>
                        <div>0.00</div>
                    </div> BCD
                </div>
            </div>
            <div class="py-10px px-14px flex justify-between items-center">
                <div class="flex justify-center items-center">Fee:
                    <van-icon name="question-o" color="#3BC117" />
                </div>
                <div class="flex justify-flex-end flex-wrap items-center text-#ffff">4 BCD</div>
            </div>
            <div class="py-10px px-14px flex justify-between items-center">
                <div class="flex justify-center items-center">Total withdrawal amount:</div>
                <div class="flex justify-flex-end flex-wrap items-center text-#ffff">
                    <div>
                        <div>0.00</div>
                    </div> BCD
                </div>
            </div>
        </div>
        <div class="bg-#3ac9481a px-14px py-10px text-#ffff mt-15px">
            <div>
                <p class="m-0 text-#3BC117 inline">Notice: </p>We do not support inactive addresses
            </div>
            <p class="m-0 text-#3BC117 inline">Notice: </p>For security purposes, large or suspicious withdrawal may take
            1-6 hours for audit process. We appreciate your patience!
        </div>

        <van-button class="ml-52px mt-20px w-240px h-47px"
            color="conic-gradient(from 1turn, rgba(88, 175, 16, 1), rgba(29, 128, 58, 1))">
            Confirm
        </van-button>
    </div>
</template>
<script setup lang="ts">
import BcSelect from "@/components/bc-select/index.vue";
import { getEnums } from "@/api/wallet";

const addressValue = ref<number>(null);
const amountValue = ref<number>(null);

const optionsList = ref([
    {
        icon: "/src/assets/coin/USDT.webp",
        label: "USDT",
        value: "USDT"
    },
    {
        icon: "/src/assets/coin/XRP.webp",
        label: "XRP",
        value: "XRP"
    },
    {
        icon: "/src/assets/coin/LTC.webp",
        label: "LTC",
        value: "LTC"
    },
    {
        icon: "/src/assets/coin/ETH.webp",
        label: "ETH",
        value: "ETH"
    },
    {
        icon: "/src/assets/coin/TRX.webp",
        value: "TRX",
        label: "TRX"
    }
]);
const blockList = ref([])

const getOptions = async () => {
    const res = await getEnums()
    if (res?.code == 1) {
        blockList.value = res?.data?.blockChain.map(obj => {
            return {
                ...obj,
                value: obj.name
            };
        });
    }
}
onMounted(() => {
    getOptions()
})
</script>