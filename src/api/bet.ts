import { betAPIs, userAPIs } from '@/const/apis'
import { httpPost } from '@/utils/request'

// 租金历史
export const openHistory = async (params: {}) => {
  await httpPost(userAPIs.openHistory, params)
}

// 彩票投注
export const lotteryBet = async (params: {}) => {
  await httpPost(betAPIs.lotteryBet, params)
}

// 投注记录
export const betRecords = async (params: {}) => {
  await httpPost(betAPIs.betRecords, params)
}