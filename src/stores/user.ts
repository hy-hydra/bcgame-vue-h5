import { defineStore } from "pinia";

interface IUserBalance {
  id?: number;
  uid?: number; // 用户id
  account?: string; // 用户账号
  balance?: number; // 用户余额
  giftBalance?: number; // 用户活动礼金
  status?: number; // 余额状态
}

type TUserStore = {
  userInfo: UserInfoAPITypes.TUser;
  userVip: UserInfoAPITypes.TUserVip;
  userTotal: UserInfoAPITypes.TUserTotal;
  userBalance: UserInfoAPITypes.TUserBalance;
};

export const useUserStore = defineStore({
  id: "user",
  persist: true,
  state: (): TUserStore => ({
    userInfo: {},
    userVip: {},
    userTotal: {},
    userBalance: {}
  }),
  actions: {
    setUserInfo(info) {
      this.userInfo = info;
    },
    setUserVip(vip) {
      this.userVip = vip;
    },
    setUserTotal(total) {
      this.userTotal = total;
    },
    setUserBalance(balance: IUserBalance) {
      this.userBalance = balance;
    },
    setUser(user) {
      this.userInfo = user.user;
      this.userVip = user.vip;
      this.userTotal = user.report;
      this.userBalance = user.balance;
    }
  }
});
