import { userAPIs } from "@/const/apis";
import { httpPost } from "@/utils/request";

// 获取聊天室列表
export const getChatRoomList = async () => {
  return await httpPost(userAPIs.chatRoomList, {});
};
