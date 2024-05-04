<template>
    <div class="px-8px py-16px">
        <div class="add-box" @click="addCard">
            <div class="flex justify-center">
                <van-icon name="add" size="50" />
            </div>
            <p class="text-#fffff text-15px text-center mt-10px mb-0 mx-0">{{ $t("deposit.binding") }} PIX</p>
        </div>
        <van-card style="border-radius: 8px;" :title="`provident fund (${getValueByValue(item?.bankConfig?.config?.style)})`" v-for="item in userBankList">
            <template #footer>
                <div class="flex justify-between items-center">
                    <p class="m-0">{{ item?.bankConfig?.config?.account }}{{ item?.isDefault ?'(default)':'' }} </p>
                    <van-button size="mini" @click="()=>editCard(item)"><van-icon name="edit" />{{ $t("deposit.edit")
                    }}</van-button>
                </div>
            </template>
        </van-card>
        <van-dialog v-model:show="setPhoneVisible" :title="$t('withdraw.Payment_password')" show-cancel-button>
            <div class="flex justify-center">
                <input class="border-rd-8px px-10px py-12px text-15px bg-#2c2d30 b-none text-#ffff w-90% my-15px"
                    v-model="phoneValue" :placeholder="$t('withdraw.ente_password')" />
            </div>
        </van-dialog>
        <van-dialog :show-confirm-button="false" :show-cancel-button="false" v-model:show="setAddPhoneVisible"
            title="ADD  PIX">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field v-model="state.addFrom.name" :name="$t('withdraw.name')" :label="$t('withdraw.name')"
                        :placeholder="$t('withdraw.enter')" />
                    <van-field class="flex justify-center items-baseline" v-model="result" is-link readonly name="picker"
                        :label="$t('deposit.payment_method')" :placeholder="$t('withdraw.click_select')"
                        @click="showPicker = true" />
                    <van-popup v-model:show="showPicker" position="bottom">
                        <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
                    </van-popup>
                    <van-field v-model="state.addFrom.account" :name="$t('withdraw.account')"
                        :label="$t('withdraw.account')" :placeholder="$t('withdraw.account')" />
                    <van-field v-model="state.addFrom.phone" :name="$t('withdraw.phone')" :label="$t('withdraw.phone')"
                        :placeholder="$t('withdraw.enter')" />
                    <p class="mx-0 my-16px text-10px text-center">{{ $t('withdraw.check_num') }} ,
                        {{ $t('withdraw.otherwise') }}</p>
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
                    <p class="m-0 text-15px">{{ getValueByValue(selectedCardItem?.bankConfig?.config?.style) }}</p>
                    <p class="m-0 text-15px">{{selectedCardItem?.bankConfig?.config?.account}}</p>
                </div>
                <!-- <van-button type="primary" class="my-20px mx-auto w-50% flex justify-center items-center">{{
                    $t("deposit.unbind") }}</van-button> -->
                <van-button type="primary" color="#000000" class="my-20px mx-auto w-50% flex justify-center items-center" @click="setDefault">{{
                    $t("deposit.set_default") }}</van-button>
            </div>
        </van-action-sheet>
    </div>
</template>
  
<script setup lang="ts">
import { showDialog, showFailToast, showSuccessToast } from 'vant';
// import { showSuccessToast, showFailToast } from 'vant';
import { bankList, bankCreate, postBankEdit } from '@/api/wallet';

const phoneValue = ref<string>('');
const setPhoneVisible = ref(false);
const setAddPhoneVisible = ref(false);
const editVisible = ref(false);
const selectedCardItem = ref(null);

// import { useI18n } from "vue-i18n";
const state = reactive({
    addFrom: {
        name: '',
        account: '',
        phone: '',
    }
})

const userBankList = ref([])
const result = ref('');
const showPicker = ref(false);
const columns = [
    { text: 'CPF', value: 1 },
    { text: 'CNPJ', value: 2 },
    { text: 'EMAIL', value: 3 },
    { text: 'PHONE', value: 4 },
    { text: 'EVP', value: 5 },

];

function getValueByText(inputText) {
    // 查找匹配的项
    const foundItem = columns.find(item => item.text === inputText);
    // 返回找到的值，如果没找到则返回undefined
    return foundItem ? foundItem.value : undefined;
}

function getValueByValue(inputText) {
    // 查找匹配的项
    const foundItem = columns.find(item => item.value === inputText);
    // 返回找到的值，如果没找到则返回undefined
    return foundItem ? foundItem.text : undefined;
}

const editCard = (item)=>{
    selectedCardItem.value = item
    editVisible.value = true
}

const onConfirm = ({ selectedOptions }) => {
    result.value = selectedOptions[0]?.text;
    showPicker.value = false;
};

const setDefault = async ()=>{    
    if(selectedCardItem.value?.id){
        let paramsObj = {
            id: selectedCardItem.value.id,
            isDefault: 1,
            bankConfig: selectedCardItem.value.bankConfig
        }
        const res = await postBankEdit(paramsObj)
        if(res.code == 1){
            editVisible.value = false
            getData()
        }
    }
}

const hasEmptyData = (obj) => {
    const stringified = Object.values(obj);
    return stringified.includes(null) ||
        stringified.includes('') ||
        stringified.includes(undefined) ||
        stringified.includes([]) || !result.value;
}
const onSubmit = async (values) => {
    if (hasEmptyData(state.addFrom)) {
        showFailToast('请完善信息');
    } else {
        const params = { ...state.addFrom, result: result.value };
        let paramsObj = {
            account: params.account,
            address: '',
            accountName: '',
            remark: '',
            bankConfig: {
                country: 16,
                config: {
                    name: params.name,
                    style: getValueByText(params.result),
                    account: params.account,
                    bindPhone: params.phone
                }
            }
        }
        let res = await bankCreate(paramsObj)
        if (res?.code === 1) {
            showSuccessToast('success');
            setAddPhoneVisible.value = false;
            state.addFrom = {
                name: '',
                account: '',
                phone: '',
            };
            result.value = ''
            getData()
        }

        console.log(params, getValueByText(params.result), 'ppppppp')

    }
    console.log('submit', values);
};

onMounted(() => {
    getData()
})
const getData = async () => {
    let res = await bankList({
        "page": 1,
        "limit": 5
    });
    const { data, code } = res;
    if (code === 1) {
        userBankList.value = data.list || [];
    }
}
const addCard = () => {
    // noPhone();
    setAddPhoneVisible.value = true;
}
// const noPhone = () => {
//     showDialog({
//         message: '请先完善姓名，手机号并且设置交易密码',
//     }).then(() => {
//         // on close
//     });
// }
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

.is-active {
    background: #32343B;
    color: #ffffff;
}
</style>
  
  