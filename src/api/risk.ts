import { httpPost } from "@/utils/request";
import { type blackCleanParam } from "./riskInterface";
import { riskAPIs } from "@/const/apis";

// 删除风控黑名单
export const blackClean = async (params: blackCleanParam) => {
  await httpPost(riskAPIs.blackClean, params);
};

// 	清空黑名单
export const blackBan = async (params: {}) => {
  await httpPost(riskAPIs.blackBan, params);
};

// 黑名单列表
export const blackList = async (params: {}) => {
  await httpPost(riskAPIs.blackList, params);
};
