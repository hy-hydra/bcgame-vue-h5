import type { UserLoginAPITypes } from "@/api/loginTypes.d";
import { defineStore } from "pinia";

export type TUserLoginStore = {
  access_token: string;
  loginInfo: UserLoginAPITypes.TUserLoginRes;
};

export const useLoginStore = defineStore({
  id: "login",
  persist: true,
  state: (): TUserLoginStore => ({
    access_token: "",
    loginInfo: {}
  }),
  actions: {
    setToken(token: string) {
      this.access_token = token;
      localStorage.setItem("access_token", token);
    },
    setLoginInfo(loginInfo: any) {
      this.loginInfo = loginInfo;
    },
    getToken() {
      return this.access_token || localStorage.getItem("access_token");
    }
  }
});
