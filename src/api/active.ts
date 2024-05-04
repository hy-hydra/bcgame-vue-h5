import {httpGet, httpPost} from '@/utils/request'
import type { activityReceiveParam, logListParam } from './activeInterface'
import { activeAPIs } from '@/const/apis'

// 活动领取
export const activityReceive = async (params: activityReceiveParam) => {
 return  await httpPost(activeAPIs.receive, params)
}

// 活动列表
export const activityList = (params) => httpPost(activeAPIs.list, params)

// 活动日志列表
export const logList = async (params: logListParam) => {
  await httpPost(activeAPIs.logList, params)
}
//用户账变记录
export const getBalanceRecord = async (params: logListParam) => {
 return  await httpPost(activeAPIs.balanceRecord, params)
}

