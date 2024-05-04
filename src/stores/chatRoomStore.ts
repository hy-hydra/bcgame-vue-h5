import { defineStore } from "pinia";

export const chatRoomListStore = defineStore({
  id: "chatRoomListStore",
  persist: true,
  state: () => ({
    chatRoomList: []
  }),
  actions: {
    setChatRoomList(chatRoomList: {
      value: string;
      label: number;
      style: number;
    }) {
      this.chatRoomList = chatRoomList;
    }
  }
});
