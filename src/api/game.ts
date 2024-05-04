import { httpGet, httpPost } from '@/utils/request'
import type { sendVerifyCodeParam, PropsType } from './gameInterface'
import { betAPIs, gameAPIs } from '@/const/apis';

// 获取游戏列表
export const getGameLists = (params: sendVerifyCodeParam) => httpGet(gameAPIs.gameList, params);

export const gameGameHistory = (data: PropsType) => httpPost(betAPIs.lotteryHistory, data);

export const gameLotteryEntry = (data: PropsType) => httpPost(gameAPIs.lotteryEntry, data);

export const gameBetLottery = (data: PropsType) => httpPost(betAPIs.lottery, data);

export const gameBetRecords = (data: PropsType) => httpPost(betAPIs.records, data);

export const gameBetSlot = (data: PropsType) => httpPost(betAPIs.slot, data);
