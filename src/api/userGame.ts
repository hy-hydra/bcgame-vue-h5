import {httpPost} from '@/utils/request'
import type { casinoParam, gameStyleParam, homeGameParam, homeMarqueeParam, lotteryParam } from './userGameInterface'
import { gameAPIs } from '@/const/apis'

// 用户信息
export const gameStyleList = async (params: gameStyleParam) => {
  return await httpPost(gameAPIs.gameStyleList, params)
}

// 发送验证码请求体
export const homeGameList = async (params: homeGameParam) => {
  return await httpPost(gameAPIs.homeGameList, params)
}

// 修改用户信息
export const casinoList = async (params: casinoParam) => {
  return await httpPost(gameAPIs.casinoList, params)
}

// 修改用户绑定服务
export const lotteryList = async (params: lotteryParam) => {
  return await httpPost(gameAPIs.lotteryList, params)
}

// 修改用户绑定服务
export const homeMarquee = async (params: homeMarqueeParam) => {
  return await httpPost(gameAPIs.homeMarquee, params)
}
