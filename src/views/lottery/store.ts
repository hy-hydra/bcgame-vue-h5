import { defineStore } from 'pinia';

export const lotterystore = defineStore({
  id: 'lottery-store', // 每个store的id需要唯一
  state: () => ({
    select: 0,
    list:[]
  }),
  actions: {
    updateSelect(select: number) {
      this.select = select;
    },
    updateList(list) {
        this.list = list;
      },
  }
});