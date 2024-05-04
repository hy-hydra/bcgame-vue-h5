import { getChatRoomList } from "@/api/chat";
import { chatRoomListStore } from "@/stores";

export function useChatRoomList() {
  const store = chatRoomListStore();
  const _getChatRoomList = async () => {
    let res = await getChatRoomList();
    if (res.success) {
      const resData = res.data.list;
      store.setChatRoomList(
        resData.map(item => ({
          value: item.id,
          label: item.name,
          style: item.style
        }))
      );
    }
  };
  if (!store.chatRoomList.length) {
    _getChatRoomList();
  }

  onUnmounted(() => {});

  return {
    chatRoomList: store.chatRoomList
  };
}
