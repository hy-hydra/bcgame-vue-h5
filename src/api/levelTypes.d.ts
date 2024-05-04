/**
 * 文件内容：用户等级相关接口有关的数据类型
 * 创建者：dy_au
 * 创建日子：2024.04.01
 * 最后编辑：dy_au
 * 最后编辑日子：2024.04.01
 */

import { EReceiveStatusCode } from "@/const/enums.d";

declare namespace UserLevelAPITypes {
  type TVipDetailReq = {
    ip?: string; // ip
    region?: string; // 地区
    serviceId?: number; // 用户所属服务id
    reqUid?: number; // 用户id
    reqAccount: string; // 用户账号
    reqAgentId?: number; // 用户代理id
    reqIsSuperRole?: boolean; // 是否超级账号
    reqLevel?: number; // 自己层级
    reqRootId?: number; // 自己的最上层id
    reqRootAccount?: string; // 自己的最上层账号
    reqFatherId?: number; // 父级id
    reqFatherChain?: string; // 父级id链
    reqHost?: string; // 请求域名
    device?: string; // 请求设备
    reqMerchantId?: string; // 租户id
    reqMerchant?: string; // 租户
  };

  // VIP礼金
  type TVipGift = {
    style: number; // VIP礼金类型
    award: number; // 奖励
    des: string; // 描述
  };

  // 用户VIP礼金
  type TUserVipGift = {
    gift: TVipGift;
    code: EReceiveStatusCode; // 领取礼金的状态
  };

  // 用户VIP返点
  type TUserVipRebate = {
    betRebate: number; // 用户下注返点
    code: EReceiveStatusCode; // 领取状态码
  };

  // 用户等级信息
  type TUserVipInfoRes = {
    level?: number; // 用户当前等级
    upXp?: number; // 升级需要流水
    upCharge?: number; // 升级需要充值金额
    xp?: number; // 当前累计流水
    charge?: number; // 当前累计充值金额
    gifts?: Array<TUserVipGift>;
    rebates?: Array<TUserVipRebate>;
  };

  // 升级需要信息
  type TVipInfo = {
    level: number; // 等级
    bet: number; // 需要能量，下注数值
    charge: number; // 需要充直数
    keepLevelBet: number; // 3个月保级需要的
    gifts: Array<TVipGift>; // 礼金列表
    betRebate: number; // 押注返点
  };

  // 弃用，后期会考虑删除
  // VIP奖励详情
  type TVipGroupRes = {
    level: number; // VIP等级
    bonus: number; // VIP升级奖励
    luckySpin: number; // VIP幸运转盘次数
    betBonus: number; // VIP下注反水 码比反水
    weekCashBack: number; // VIP周奖励
    monthCashBack: number; // VIP月奖励
  };

  // 用户领取VIP礼金
  type TVipGiftRewardReq = {
    ip?: string; // ip
    region?: string; // 地区
    serviceId?: number; // 用户所属服务id
    reqUid?: number; // 用户id
    reqAccount?: string; // 用户账号
    reqAgentId?: number; // 用户代理id
    reqIsSuperRole?: boolean; // 是否超级账号
    reqLevel?: number; // 自己层级
    reqRootId?: number; // 自己的最上层id
    reqRootAccount?: string; // 自己的最上层账号
    reqFatherId?: number; // 父级id
    reqFatherChain?: string; // 父级id链
    reqHost?: string; // 请求域名
    device?: string; // 请求设备
    reqMerchantId?: string; // 租户id
    reqMerchant?: string; // 租户
    style?: number; // 领取的vip礼金类型
  };

  type TVipGiftRewardRes = {
    style: number; // 领取礼金类型
    amount: number; // 领取的礼金数目
    balance: number; // 最新余额
  };
}
