import { defineStore } from "pinia";

export const useSocketStore = defineStore({
  id: "useSocketStore",
  persist: false,
  state: () => ({
    socket: null,
  }),
  actions: {
    setSocket(socket) {
      this.socket = socket;
    }
  },
});
