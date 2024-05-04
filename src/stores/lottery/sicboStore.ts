import { defineStore } from 'pinia';

export const sicboStore = defineStore({
  id: 'sicbo-store', // 每个store的id需要唯一
  state: () => ({
    id: 0,
    choices:[] as any,
    time:0
  }),
  getters: {
    gameId: (state) => state.id,
    gameChoices:(state) => state.choices,
  },
  actions: {
    updateGameId(id: number) {
      this.id = id;
    },
    updateTime(time: number) {
      this.time = time;
    },
    updateGameChoices(item) {
      this.choices = item;
    },
  }
});