import { bannerAPIs, gameAPIs, userAPIs } from '@/const/apis';
import { httpPost } from '@/utils/request'

export const bannerList = (data) => httpPost(bannerAPIs.list, data);

export const homeGameList = () => httpPost(gameAPIs.homeGameList,{});

export const lotteryList = () => httpPost(gameAPIs.lotteryList,{});

export const fileConfig = () => httpPost(userAPIs.fileConfig, {});
