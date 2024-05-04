import { defineStore } from "pinia";

export const useLoadStore = defineStore({
  id: "loading",
  persist: true,
  state: () => ({
    LOADING: false
  }),
  actions: {
    showLoading() {
        this.LOADING = true
    },
    hideLoading() {
        this.LOADING = false
    }
  }
});
