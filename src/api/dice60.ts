import { httpPost } from '@/utils/request'
import type { EntryParam, HistoryParam, RecordParam } from './dice60Interface'
import { betAPIs, gameAPIs } from '@/const/apis'

// 当期信息
export const getLotteryEntry = async (params: EntryParam) => {
  return await httpPost(gameAPIs.lotteryEntry, params)
}


// 开奖记录
export const getLotteryHistory = async (params: HistoryParam) => {
    return await httpPost(betAPIs.lotteryHistory, params)
}

// 押注记录
export const getRecord = async (params: RecordParam) => {
  return await httpPost(betAPIs.records, params)
}

// 下注
export const lottery = async (params: {}) => {
    return await httpPost(betAPIs.lottery, params)
}
