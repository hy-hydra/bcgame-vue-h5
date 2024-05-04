import { defineStore } from 'pinia';

export const promotionStore = defineStore({
    id: 'promotion-store', // 每个store的id需要唯一
    state: () => ({
        detail: {} as any,
    }),
    getters: {
        gameDetail: (state) => state.detail,
    },
    actions: {
        updateGameDetail(detail) {
            this.detail = detail;
        },
    },
    persist: true,
});