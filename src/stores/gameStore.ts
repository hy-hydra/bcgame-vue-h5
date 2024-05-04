import { defineStore } from "pinia";

export const gameInfoStore = defineStore({
  id: "game-store", // 每个store的id需要唯一
  state: () => ({
    id: 0,
    item:{} as any,
    fileConfig: {} as any,
    tabSelect:'Home'
  }),
  getters: {
    gameId: state => state.id,
    gameItem: state => state.item
  },
  actions: {
    setTab(tab:string){
      this.tabSelect= tab
    },
    updateGameId(id: number) {
      this.id = id;
    },
    updateGameItem(item) {
      this.item = item;
    },
    setFileConfig(config) {
      this.fileConfig = config;
    }
  },
  persist: true
});
