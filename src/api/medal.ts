import { medalAPIs } from "@/const/apis";
import { httpGet } from "@/utils/request";

// 获取游戏列表
export const getMedalLists = async (params: {}) => {
  await httpGet(medalAPIs.list, params);
};
