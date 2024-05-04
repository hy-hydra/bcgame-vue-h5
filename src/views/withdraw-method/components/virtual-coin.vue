<template>
    <div class="px-8px py-16px">
        <div class="add-box" @click="addCard">
            <div class="flex justify-center">
                <van-icon name="add" size="50" />
            </div>
            <p class="text-#fffff text-15px text-center mt-10px mb-0 mx-0">{{ $t("deposit.bind") }} USDT
                {{ $t("deposit.address") }}</p>
        </div>
        <van-card v-for="item in cardList" style="border-radius: 8px;"
            :title="`USDT (${getProtocolText(item?.cryptoBlockchainStyle)})`">
            <template #footer>
                <div class="flex justify-between items-center">
                    <p class="m-0">{{ item?.address }}{{ item?.isDefault ?'(default)':'' }}</p>
                    <van-button size="mini" @click="()=>editCard(item)"><van-icon name="edit" />{{ $t("deposit.edit")
                    }}</van-button>
                </div>
            </template>
        </van-card>
        <van-dialog v-model:show="setPhoneVisible" :title="$t('withdraw.Payment_password')" show-cancel-button>
            <div class="flex justify-center">
                <input class="border-rd-8px px-15px py-12px text-15px bg-#2c2d30 b-none text-#ffff w-90% my-15px"
                    v-model="phoneValue" :placeholder="$t('withdraw.ente_password')" />
            </div>
        </van-dialog>
        <van-dialog :show-confirm-button="false" :show-cancel-button="false" v-model:show="setAddVisible"
            :title="$t('withdraw.add_virtual')">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <p class="ml-16px mt-10px mb-0 text-15px text-#ffffff">{{ $t('withdraw.type_currency') }}</p>
                    <van-field name="type" class="form-protocol">
                        <template #input>
                            <van-radio-group class="w-50vw flex justify-between items-center mt-10px"
                                v-model="state.addFrom.type" direction="horizontal">
                                <van-radio name="1">USDT</van-radio>
                            </van-radio-group>
                        </template>
                    </van-field>
                    <p class="ml-16px mt-10px mb-0 text-15px text-#ffffff">{{ $t('withdraw.virtual_protocol') }}</p>
                    <van-field name="protocol" class="form-protocol">
                        <template #input>
                            <van-radio-group class="w-50vw flex justify-between items-center mt-10px"
                                v-model="state.addFrom.protocol" direction="horizontal">
                                <van-radio name="1">TRC-20</van-radio>
                                <van-radio name="2">ERC-20</van-radio>
                            </van-radio-group>
                        </template>
                    </van-field>
                    <p class="ml-16px mt-10px mb-0 text-15px text-#ffffff">{{ $t('withdraw.virtual_address') }}</p>
                    <van-field v-model="state.addFrom.address" :name="$t('withdraw.address')"
                        :placeholder="$t('withdraw.place_enter_address')" />
                    <!-- <p class="ml-16px mt-10px mb-0 text-15px text-#ffffff">{{ $t('withdraw.set_default_address') }}</p>
                    <van-field name="switch">
                        <template #input>
                            <van-switch v-model="state.addFrom.checked" />
                        </template>
                    </van-field> -->
                    <p class="mx-0 my-16px text-10px text-center">
                        {{ $t("deposit.in_order_sec") }}，{{ $t("deposit.after_confirm") }}</p>
                    <div style="margin: 16px;">
                        <van-button round block type="primary" native-type="submit">
                            提交
                        </van-button>
                    </div>
                </van-cell-group>
            </van-form>
        </van-dialog>
        <van-action-sheet v-model:show="editVisible">
            <div class="h-25vh px-20px pt-25px">
                <div class="flex justify-between items-center mb-20px">
                    <p class="m-0 text-15px">CPF</p>
                    <p class="m-0 text-15px">533212</p>
                </div>
                <!-- <van-button type="primary" class="my-20px mx-auto w-50% flex justify-center items-center">{{
                    $t("deposit.unbind") }}</van-button> -->
                <van-button type="primary" color="#000000"  class="my-20px mx-auto w-50% flex justify-center items-center" @click="setDefault">{{
                    $t("deposit.set_default") }}</van-button>
            </div>
        </van-action-sheet>
    </div>
</template>
  
<script setup lang="ts">
import { showFailToast, showSuccessToast } from 'vant';
import { postCryptoList,postCreateCrypto,postCryptoEdit } from '@/api/wallet';
const phoneValue = ref<string>('');
const setPhoneVisible = ref(false);
const setAddVisible = ref(false);
const editVisible = ref(false);
const cardList = ref([])
const selectedCardItem = ref(null);

const state = reactive({
    addFrom: {
        type: '',
        protocol: '',
        address: '',
        // checked: null
    }
})

const getProtocolText = (id)=>{
    if(id==1){
        return 'TRC'
    }
    if(id==2){
        return 'ERC'
    }
    return ''
}

const editCard = (item)=>{
    selectedCardItem.value = item
    editVisible.value = true
}


const setDefault = async ()=>{    
    if(selectedCardItem.value?.id){
        let paramsObj = {
            id: selectedCardItem.value.id,
            isDefault: 1,
            config: "{}"
        }
        const res = await postCryptoEdit(paramsObj)
        if(res.code == 1){
            editVisible.value = false
            getData()
        }
    }
}

const onSubmit = async (values) => {
    if (hasEmptyData(state.addFrom)) {
        showFailToast('请完善信息');
    } else {
        const params = { ...state.addFrom };
        console.log(params, 'ppppppp')

        let paramsObj = {
            address:params.address,
            cryptoStyle:1,
            cryptoBlockchainStyle:Number(params.protocol),
            remark:'' ,
            config:'{}'
        }
        let res = await postCreateCrypto(paramsObj)
        if (res?.code === 1) {
            showSuccessToast('success');
            setAddVisible.value = false;
            state.addFrom = {
                type: '',
                protocol: '',
                address: '',
                // checked: null
            };
            getData()
        }

    }
    console.log('submit', values);
};

const hasEmptyData = (obj) => {
    const stringified = Object.values(obj);
    return stringified.includes(null) ||
        stringified.includes('') ||
        stringified.includes(undefined) ||
        stringified.includes([]);
}

onMounted(() => {
    getData()
})
const getData = async () => {
    let res = await postCryptoList({
        "page": 1,
        "limit": 5
    });
    const { data, code } = res;
    if (code === 1) {
        console.log(data, '------bank')
        cardList.value = data.list || [];
    }
}
const addCard = () => {
    setAddVisible.value = true;
}
</script>
  
  
<style lang="less" scoped>
.add-box {
    border-radius: 8px;
    position: relative;
    box-sizing: border-box;
    padding: 10px 12px;
    color: #f5f5f5;
    background: #000;
}

.form-protocol {
    div {
        margin: 0;
    }
}

.is-active {
    background: #32343B;
    color: #ffffff;
}
</style>
  
  