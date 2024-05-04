export enum style {
  phone = 1,
  email = 2,
  ws = 3,
  tel = 4
}

export interface sendVerifyCodeParam {
  device?: string;
  scene?: string;
  style?: style;
  serviceAccount?: style;
  serviceId?: string;
  reqUid?: string;
  reqAccount?: string;
}

export interface userEditParam {
  ip?: string;
  region?: string;
  serviceId?: number;
  reqUid?: number;
  reqAccount?: string;
  reqIsSuperRole?: true;
  reqLevel?: number;
  reqRootId?: number;
  reqRootAccount?: string;
  reqFatherId?: number;
  reqFatherChain?: string;
  reqHost?: string;
  device?: string;
  reqMerchantId?: string;
  reqMerchant?: string;
  verifyCode?: string;
  password?: string;
  email?: string;
  phone?: string;
  walletPass?: string;
  realName?: string;
  nickName?: string;
  birthday?: string;
  gender?: number;
  status?: number;
}

export interface bindServiceParam {
  ip?: string;
  region?: string;
  serviceId?: number;
  reqUid?: number;
  reqAccount?: string;
  reqIsSuperRole?: true;
  reqLevel?: number;
  reqRootId?: number;
  reqRootAccount?: string;
  reqFatherId?: number;
  reqFatherChain?: string;
  reqHost?: string;
  device?: string;
  reqMerchantId?: string;
  reqMerchant?: string;
  style?: number;
  serviceStyle?: string;
}

export interface webConfigParam {
  ip?: "string";
  region?: "string";
  serviceId?: 0;
  reqUid?: 0;
  reqAccount?: "string";
  reqAgentId?: 0;
  reqIsSuperRole?: true;
  reqLevel?: 0;
  reqRootId?: 0;
  reqRootAccount?: "string";
  reqFatherId?: 0;
  reqFatherChain?: "string";
  reqHost?: "string";
  device?: "string";
  reqMerchantId?: "string";
  reqMerchant?: "string";
}
