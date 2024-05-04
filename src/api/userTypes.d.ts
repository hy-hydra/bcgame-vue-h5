/**
 * 文件内容：用户信息相关接口有关的数据类型
 * 创建者：dy_au
 * 创建日子：2024.04.02
 * 最后编辑：dy_au
 * 最后编辑日子：2024.04.15
 */

declare namespace UserInfoAPITypes {
  // 用户信息请求
  type TUserInfoReq = {
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
    uid?: number; // 不用填写
  };

  // 用户信息
  type TUser = {
    id?: number;
    phone?: string;
    account?: string;
    realName?: string;
    nickName?: string;
    email?: string;
    phone?: string;
    avatar?: string;
    tagDes?: string;
    status?: number;
    rootAgentId?: number;
    rootAgentAccount?: string;
    agentId?: number;
    agentAccount?: string;
    fatherUid?: number;
    fatherAccount?: string;
    rootUid?: number;
    rootAccount?: string;
    lastChargeTime?: string | null;
    totalCharge?: number;
    lastWithdrawTime?: string | null;
    totalWithdraw?: number;
    registerIp?: string;
    registerRegion?: string;
    registerHost?: string;
    registerDevice?: string;
    firstChargeTime?: string | null;
    loginIp?: string;
    loginTime?: string;
    loginRegion?: string;
    test?: number;
  };

  // 用户汇总信息
  type TUserTotal = {
    id?: number;
    uid?: number; // 用户id
    agentId?: number; // 上级代理id
    agentLevel?: number; // 代理所在层级
    userLevel?: number; // 用户层级
    betTimes?: number; // 用户总下注次数
    betAmount?: number; // 用户总下注金额
    winTimes?: number; // 用户赢钱次数
    winAmount?: number; // 用户赢钱金额
    loseTimes?: number; // 用户输钱次数
    loseAmount?: number; // 用户输钱金额
    gameDetail?: string; // 游戏详情
    chargeTimes?: number; // 总充值次数
    chargeAmount?: number; // 总充值金额
    withdrawTimes?: number; // 总提现次数
    withdrawAmount?: number; // 总提现金额
    firstChargeAmount?: number; // 用户首充金额
    registerTime?: string; // 用户注册次数
    registerIp?: string; // 用户注册ip
    registerRegion?: string; // 用户注册地区
    inviteUser?: number; // 用户直属下级
    inviteTotalUser?: number; // 用户所有下级
    rebateTimes?: number; // 用户反佣次数
    rebateAmount?: number; // 用户返佣金额
    rebateFatherTimes?: number; // 上级返佣次数
    rebateFatherAmount?: number; // 上级反佣金额
    maxKeepLoginDays?: number; // 最大连续登陆次数
    loginDays?: number; // 登陆天数
    loginTimes?: number; // 登陆次数
    activeAwardDetail?: string; // 活动领取详情
    firstChargeTime?: string; // 首充时间
    lastChargeTime?: string; // 最后充值时间
    firstWithdrawTime?: string; // 第一次取现时间
    lastWithdrawTime?: string; // 最后取现时间
    createdTime?: string; // 创建时间
    updatedTime?: string; // 更改时间
    pagentId?: number;
    ragentId?: number;
    puid?: number;
    ruid?: number;
  };

  // 用户vip
  type TUserVip = {
    id?: number;
    userId?: number;
    vipLevel?: number;
    chargeAmount?: number;
    betAmount?: number;
    createdTime?: string;
    updatedTime?: string;
  };

  // 用户余额
  type TUserBalance = {
    id?: number; // id 与用户id一致
    uid?: number; // 用户id
    account?: string; // 用户账号
    balance?: number; // 用户余额
    giftBalance?: number; // 用户活动礼金
    status?: number; // 余额状态
    registerTime?: string;
    updatedTime?: string;
  };

  // 用户银行卡列表
  type TUserBank = {
    id: number;
    userId: number; // 用户id
    account: string; // 银行账号
    address: string; // 银行地址
    accountName: string; // 持有者
    config: string; // 配置 忽略
    remark: string; // 备注
    createdTime: string;
    updatedTime: string;
    bankConfig: {
      // 银行配置
      [key: any]: string;
    };
    isDefault: number; // 是否默认银行
  };

  // 用户加密货币列表
  type TUserCrypto = {
    id: number;
    userId: number; // 用户id
    cryptoStyle: number; // 加密货币类型
    cryptoBlockchainStyle: number; // 区块链类型
    address: string; // 加密货币地址
    config: string; // 配置
    remark: string; // 备注
    createdTime: string;
    updatedTime: string;
    isDefault: number; // 是否默认
  };

  // 用户信息返回值
  type TUserInfoRes = {
    user: TUser;
    report: TUserTotal;
    vip: TUserVip;
    balance: TUserBalance;
    bankList: Array<TUserBank>;
    cryptoList: Array<TUserCrypto>;
  };
}

declare namespace UserStaticsAPITypes {
  type TBaseMerchantReq = {
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
  };

  // 响应数据
  type TUserStaticsRes = {
    uid: number;
    betTimes: number;
    winTimes: number;
    winAmount: number;
  };
}

declare namespace UserEditAPITypes {
  type TUserEditReq = {
    verifyCode?: string;
    oriPass?: string;
    password?: string;
    email?: string;
    phone?: string;
    oriWalletPass?: string;
    walletPass?: string;
    realName?: string;
    nickName?: string;
    birthday?: string;
    gender?: string;
    avatar?: string;
    status?: number;
  };

  type TUserEditRes = { user: UserInfoAPITypes.TUser };
}

declare namespace UserAvatarListAPITypes {
  type TUserAvatarListReq = {
    page: number;
    pageSize: number;
  };

  type TUserAvatarConfig = {
    id: number;
    avatar: string;
    sort: number;
  };

  type TUserAvatarListRes = {
    maxPage: number;
    page: number;
    total: number;
    limit: number;
    avatars: Array<TUserAvatarConfig>;
  };
}
