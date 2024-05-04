import { tableAPIs } from "@/const/apis";
import { httpPost } from "@/utils/request";

// 创建运营商
export const create = async (params: {}) => {
  await httpPost(tableAPIs.create, params);
};
