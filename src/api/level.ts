import {httpGet, httpPost} from '@/utils/request';
import type { ResponseBody } from './typing';
import { userAPIs } from '@/const/apis';
import type { UserLevelAPITypes } from './levelTypes.d';

// 用户等级列表
export const getUserLevelLists = async (params: {}) => {
  await httpGet(userAPIs.levelList, params);
};

export type TVipDetailRes = {
  vip: UserLevelAPITypes.TUserVipInfoRes,
  vipInfos: Array<UserLevelAPITypes.TVipInfo>
};

// 用户VIP信息
export const getLevelVip = async (params: UserLevelAPITypes.TVipDetailReq): Promise<ResponseBody<TVipDetailRes>> => {
  return await httpPost(userAPIs.levelVip, params)
};

// 用户领取vip礼金
export const getLevelRewardVipGift = async (params: UserLevelAPITypes.TVipGiftRewardReq): Promise<ResponseBody<UserLevelAPITypes.TVipGiftRewardRes>> => {
  return await httpPost(userAPIs.levelRewardVipGift, params)
};
