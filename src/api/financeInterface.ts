export interface createChargeParam {
    "ip"?: string
    "region"?: string
    "serviceId"?: number
    "reqUid"?: number
    "reqAccount"?: string
    "reqAgentId"?: number
    "reqIsSuperRole"?: boolean
    "reqLevel"?: number
    "reqRootId"?: number
    "reqRootAccount"?: string
    "reqFatherId"?: number
    "reqFatherChain"?: string
    "reqHost"?: string
    "device"?: string
    "reqMerchantId"?: string
    "reqMerchant"?: string
    "thirdPayId"?: number
    "payCoinStyle"?: number
    "amount"?: number
  }

  export interface bankCreateParam {
    "ip"?: string
    "region"?: string
    "serviceId"?: number
    "reqUid"?: number
    "reqAccount"?: string
    "reqAgentId"?: number
    "reqIsSuperRole"?: boolean
    "reqLevel"?: number
    "reqRootId"?: number
    "reqRootAccount"?: string
    "reqFatherId"?: number
    "reqFatherChain"?: string
    "reqHost"?: string
    "device"?: string
    "reqMerchantId"?: string
    "reqMerchant"?: string
    "account"?: string
    "address"?: string
    "accountName"?: string
    "remark"?: string
    "bankConfig"?: {
      "ifsc"?: string
    }
  }

  export interface cryptoListParam {
    "ip"?: string
    "region"?: string
    "serviceId"?: number
    "reqUid"?: number
    "reqAccount"?: string
    "reqAgentId"?: number
    "reqIsSuperRole"?: boolean
    "reqLevel"?: number
    "reqRootId"?: number
    "reqRootAccount"?: string
    "reqFatherId"?: number
    "reqFatherChain"?: string
    "reqHost"?: string
    "device"?: string
    "page"?: number
    "limit"?: number
    "startTime"?: string,
    "endTime"?: string,
    "start"?: number
    "totalPage"?: number
    "reqMerchantId"?: string
    "reqMerchant"?: string
    "rootAgentId"?: number
    "agentId"?: number
    "uid"?: number
  }

  export interface cryptoEditParam {
    "ip"?: string
    "region"?: string
    "serviceId"?: number
    "reqUid"?: number
    "reqAccount"?: string
    "reqAgentId"?: number
    "reqIsSuperRole"?: boolean
    "reqLevel"?: number
    "reqRootId"?: number
    "reqRootAccount"?: string
    "reqFatherId"?: number
    "reqFatherChain"?: string
    "reqHost"?: string
    "device"?: string
    "reqMerchantId"?: string
    "reqMerchant"?: string
    "id"?: number
    "status"?: number
    "blockChainStyle"?: number
    "cryptoCoinStyle"?: number
    "address"?: string
    "isDefault"?: number
    "verifyCode"?: string
  }

  export interface cryptoCreateParam {
    "ip"?: string
    "region"?: string
    "serviceId"?: number
    "reqUid"?: number
    "reqAccount"?: string
    "reqAgentId"?: number
    "reqIsSuperRole"?: boolean
    "reqLevel"?: number
    "reqRootId"?: number
    "reqRootAccount"?: string
    "reqFatherId"?: number
    "reqFatherChain"?: string
    "reqHost"?: string
    "device"?: string
    "reqMerchantId"?: string
    "reqMerchant"?: string
    "cryptoStyle"?: number
    "cryptoBlockchainStyle"?: number
    "address"?: string
    "config"?: string
    "remark"?: string
  }


  export interface createWithdrawParam {
    "ip"?: string
    "region"?: string
    "serviceId"?: number
    "reqUid"?: number
    "reqAccount"?: string
    "reqAgentId"?: number
    "reqIsSuperRole"?: boolean
    "reqLevel"?: number
    "reqRootId"?: number
    "reqRootAccount"?: string
    "reqFatherId"?: number
    "reqFatherChain"?: string
    "reqHost"?: string
    "device"?: string
    "reqMerchantId"?: string
    "reqMerchant"?: string
    "thirdId"?: number
    "thirdStyle"?: number
    "amount"?: number
    "holder"?: string
    "account"?: string
    "bank"?: number
    "bankName"?: string
    "withdrawCurrencyStyle"?: number
    "withdrawCurrency"?: string
  }

  export interface bankListParam {
    "ip"?: string
    "region"?: string
    "serviceId"?: number
    "reqUid"?: number
    "reqAccount"?: string
    "reqAgentId"?: number
    "reqIsSuperRole"?: boolean
    "reqLevel"?: number
    "reqRootId"?: number
    "reqRootAccount"?: string
    "reqFatherId"?: number
    "reqFatherChain"?: string
    "reqHost"?: string
    "device"?: string
    "page"?: number
    "limit"?: number
    "startTime"?: "2number24-number3-19T12?:53?:number3.number45Z",
    "endTime"?: "2number24-number3-19T12?:53?:number3.number45Z",
    "start"?: number
    "totalPage"?: number
    "reqMerchantId"?: string
    "reqMerchant"?: string
    "uid"?: number
  }

  export interface bankEditParam {
    "ip"?: string
    "region"?: string
    "serviceId"?: number
    "reqUid"?: number
    "reqAccount"?: string
    "reqAgentId"?: number
    "reqIsSuperRole"?: boolean
    "reqLevel"?: number
    "reqRootId"?: number
    "reqRootAccount"?: string
    "reqFatherId"?: number
    "reqFatherChain"?: string
    "reqHost"?: string
    "device"?: string
    "reqMerchantId"?: string
    "reqMerchant"?: string
    "id"?: number
    "account"?: string
    "bankStyleId"?: number
    "config"?: string
    "isDefault"?: number
    "remark"?: string
  }