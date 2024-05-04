import { UserLevelAPITypes } from "./levelTypes.d";

declare namespace UserLoginAPITypes {
  type TUserLoginReq = {
    account: string;
    loginStyle: number;
    device: string;
    password: string;
  };

  type TUserLoginRes = {
    id?: string; // 用户id
    avatar?: string; // 用户头像
    account?: string; // 账号
    gender?: string; // 性别
    birthday?: string; // 生日
    phone?: string; // 手机号
    balance?: number; // 余额
    nickName?: string; // 昵称
    inviteCode?: string; // 邀请码
    token?: string; // token口令
    domain?: string; // 前端域名
    level?: UserLevelAPITypes.TUserVipInfoRes;
    total?: UserInfoAPITypes.TUserTotal;
  };
}
