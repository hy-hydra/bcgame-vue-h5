export interface sendVerifyCodeParam {
  "ip"?: string
  "region"?: string
  "serviceId"?: 0
  "reqUid"?: 0
  "reqAccount"?: string
  "reqIsSuperRole"?: true
  "reqLevel"?: 0
  "reqRootId"?: 0
  "reqRootAccount"?: string
  "reqFatherId"?: 0
  "reqFatherChain"?: string
  "reqHost"?: string
  "device"?: string
  "reqMerchantId"?: string
  "reqMerchant"?: string
}

export interface PropsType {
  [key: string]: unknown;
}
