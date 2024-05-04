import { defineStore } from 'pinia';

export const pk10Store = defineStore({
  id: 'pk10-store', // 每个store的id需要唯一
  state: () => ({
    choices:[] as any,
    item:{} as any
  }),
  getters: {
    gameChoices:(state) => state.choices,
    gameItem:(state) => state.item,
  },
  actions: {
    updateGameChoices(item) {
      this.choices = item;
    },
    updateGameItem(item) {
      this.item = item;
    },
  }
});