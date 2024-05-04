import { questAPIs } from "@/const/apis";
import { httpGet } from "@/utils/request";

// 获取探索列表
export const getQuestLists = async (params: {}) => {
  await httpGet(questAPIs.list, params);
};
