import { httpPost } from '@/utils/request'
import type { bankCreateParam, bankEditParam, bankListParam, createChargeParam, createWithdrawParam, cryptoCreateParam, cryptoEditParam, cryptoListParam } from './financeInterface'
import { financeAPIs } from '@/const/apis'

// 创建充值订单请求
export const createCharge = async (params: createChargeParam) => {
  await httpPost(financeAPIs.createCharge, params)
}

// 	用户银行卡创建请求
export const bankCreate = async (params: bankCreateParam) => {
  await httpPost(financeAPIs.bankCreate, params)
}

// 加密货币列表请求
export const cryptoList = async (params: cryptoListParam) => {
  await httpPost(financeAPIs.cryptoList, params)
}

// 加密货币更改请求
export const cryptoEdit = async (params: cryptoEditParam) => {
  await httpPost(financeAPIs.cryptoEdit, params)
}

// 加密货币地址创建请求
export const cryptoCreate = async (params: cryptoCreateParam) => {
  await httpPost(financeAPIs.cryptoCreate, params)
}

// 创建提款
export const createWithdraw = async (params: createWithdrawParam) => {
  await httpPost(financeAPIs.createWithdraw, params)
}

// 获取银行卡列表
export const bankList = async (params: bankListParam) => {
  await httpPost(financeAPIs.bankList, params)
}

// 银行卡修改
export const bankEdit = async (params: bankEditParam) => {
  await httpPost(financeAPIs.bankEdit, params)
}
