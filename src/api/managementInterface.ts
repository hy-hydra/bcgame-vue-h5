export interface userListParam {
  "ip"?: string,
  "region"?: string,
  "serviceId"?: number,
  "reqUid"?: number,
  "reqAccount"?: string,
  "reqIsSuperRole"?: true,
  "reqLevel"?: number,
  "reqRootId"?: number,
  "reqRootAccount"?: string,
  "reqFatherId"?: number,
  "reqFatherChain"?: string,
  "reqHost"?: string,
  "device"?: string,
  "page"?: number,
  "limit"?: number,
  "startTime"?: string,
  "endTime"?: string,
  "start"?: number,
  "totalPage"?: number,
  "reqMerchantId"?: string,
  "reqMerchant"?: string,
  "rootAgentId"?: number,
  "agentId"?: number,
  "rootAgent"?: string,
  "agent"?: string,
  "uid"?: number,
  "account"?: string,
  "phone"?: string,
  "status"?: number,
  "level"?: number
}

export interface userKickParam {
  "ip"?: string,
  "region"?: string,
  "serviceId"?: number,
  "reqUid"?: number,
  "reqAccount"?: string,
  "reqIsSuperRole"?: true,
  "reqLevel"?: number,
  "reqRootId"?: number,
  "reqRootAccount"?: string,
  "reqFatherId"?: number,
  "reqFatherChain"?: string,
  "reqHost"?: string,
  "device"?: string,
  "reqMerchantId"?: string,
  "reqMerchant"?: string,
  "uid"?: number,
  "tagIds"?: number[],
  "status"?: number,
  "reason"?: string
}

export interface userRecordParam {
  "ip"?: string,
  "region"?: string,
  "serviceId"?: number,
  "reqUid"?: number,
  "reqAccount"?: string,
  "reqIsSuperRole"?: true,
  "reqLevel"?: number,
  "reqRootId"?: number,
  "reqRootAccount"?: string,
  "reqFatherId"?: number,
  "reqFatherChain"?: string,
  "reqHost"?: string,
  "device"?: string,
  "page"?: number,
  "limit"?: number,
  "startTime"?: string,
  "endTime"?: string,
  "start"?: number,
  "totalPage"?: number,
  "reqMerchantId"?: string,
  "reqMerchant"?: string,
  "uid"?: number,
  "agentId"?: number,
  "rootAgentId"?: number,
  "agent"?: string,
  "rootAgent"?: string,
  "fatherId"?: number,
  "rootFatherId"?: number,
  "father"?: string,
  "rootFather"?: string,
  "operation"?: number,
  "operationRole"?: number
}


export interface EditParam {
  "ip"?: string,
  "region"?: string,
  "serviceId"?: number,
  "reqUid"?: number,
  "reqAccount"?: string,
  "reqIsSuperRole"?: true,
  "reqLevel"?: number,
  "reqRootId"?: number,
  "reqRootAccount"?: string,
  "reqFatherId"?: number,
  "reqFatherChain"?: string,
  "reqHost"?: string,
  "device"?: string,
  "reqMerchantId"?: string,
  "reqMerchant"?: string,
  "id"?: number,
  "password"?: string,
  "email"?: string,
  "phone"?: string,
  "walletPass"?: string,
  "realName"?: string,
  "nickName"?: string,
  "birthday"?: string,
  "gender"?: number,
  "status"?: number,
  "tagConf"?: string
}


export interface activityLogsParam {
  "ip"?: string,
  "region"?: string,
  "serviceId"?: number,
  "reqUid"?: number,
  "reqAccount"?: string,
  "reqIsSuperRole"?: true,
  "reqLevel"?: number,
  "reqRootId"?: number,
  "reqRootAccount"?: string,
  "reqFatherId"?: number,
  "reqFatherChain"?: string,
  "reqHost"?: string,
  "device"?: string,
  "page"?: number,
  "limit"?: number,
  "startTime"?: string,
  "endTime"?: string,
  "start"?: number,
  "totalPage"?: number,
  "reqMerchantId"?: string,
  "reqMerchant"?: string,
  "userId"?: number,
  "status"?: number
}

export interface auditActiveParam {
  "ip"?: string,
  "region"?: string,
  "serviceId"?: number,
  "reqUid"?: number,
  "reqAccount"?: string,
  "reqIsSuperRole"?: true,
  "reqLevel"?: number,
  "reqRootId"?: number,
  "reqRootAccount"?: string,
  "reqFatherId"?: number,
  "reqFatherChain"?: string,
  "reqHost"?: string,
  "device"?: string,
  "reqMerchantId"?: string,
  "reqMerchant"?: string,
  "idList"?: number[],
  "status"?: number,
  "remark"?: string
}


export interface BankListParam {
  "ip"?: string,
  "region"?: string,
  "serviceId"?: number,
  "reqUid"?: number,
  "reqAccount"?: string,
  "reqIsSuperRole"?: true,
  "reqLevel"?: number,
  "reqRootId"?: number,
  "reqRootAccount"?: string,
  "reqFatherId"?: number,
  "reqFatherChain"?: string,
  "reqHost"?: string,
  "device"?: string,
  "page"?: number,
  "limit"?: number,
  "startTime"?: string,
  "endTime"?: string,
  "start"?: number,
  "totalPage"?: number,
  "reqMerchantId"?: string,
  "reqMerchant"?: string,
  "uid"?: number
}


export interface BankEditParam {
  "ip"?: string,
  "region"?: string,
  "serviceId"?: number,
  "reqUid"?: number,
  "reqAccount"?: string,
  "reqIsSuperRole"?: true,
  "reqLevel"?: number,
  "reqRootId"?: number,
  "reqRootAccount"?: string,
  "reqFatherId"?: number,
  "reqFatherChain"?: string,
  "reqHost"?: string,
  "device"?: string,
  "reqMerchantId"?: string,
  "reqMerchant"?: string,
  "id"?: number,
  "account"?: string,
  "bankStyleId"?: number,
  "config"?: string,
  "isDefault"?: number,
  "remark"?: string
}

export interface MarkingLogListParam {
  "ip"?: string,
  "region"?: string,
  "serviceId"?: number,
  "reqUid"?: number,
  "reqAccount"?: string,
  "reqIsSuperRole"?: true,
  "reqLevel"?: number,
  "reqRootId"?: number,
  "reqRootAccount"?: string,
  "reqFatherId"?: number,
  "reqFatherChain"?: string,
  "reqHost"?: string,
  "device"?: string,
  "page"?: number,
  "limit"?: number,
  "startTime"?: string,
  "endTime"?: string,
  "start"?: number,
  "totalPage"?: number,
  "reqMerchantId"?: string,
  "reqMerchant"?: string,
  "userId"?: number
}

export interface CryptoListParam {
  "ip"?: string,
  "region"?: string,
  "serviceId"?: number,
  "reqUid"?: number,
  "reqAccount"?: string,
  "reqIsSuperRole"?: true,
  "reqLevel"?: number,
  "reqRootId"?: number,
  "reqRootAccount"?: string,
  "reqFatherId"?: number,
  "reqFatherChain"?: string,
  "reqHost"?: string,
  "device"?: string,
  "page"?: number,
  "limit"?: number,
  "startTime"?: string,
  "endTime"?: string,
  "start"?: number,
  "totalPage"?: number,
  "reqMerchantId"?: string,
  "reqMerchant"?: string,
  "rootAgentId"?: number,
  "agentId"?: number,
  "uid"?: number
}

export interface CryptoEditParam {
  "ip"?: string,
  "region"?: string,
  "serviceId"?: number,
  "reqUid"?: number,
  "reqAccount"?: string,
  "reqIsSuperRole"?: true,
  "reqLevel"?: number,
  "reqRootId"?: number,
  "reqRootAccount"?: string,
  "reqFatherId"?: number,
  "reqFatherChain"?: string,
  "reqHost"?: string,
  "device"?: string,
  "reqMerchantId"?: string,
  "reqMerchant"?: string,
  "id"?: number,
  "status"?: number,
  "blockChainStyle"?: number,
  "cryptoCoinStyle"?: number,
  "address"?: string,
  "isDefault"?: number,
  "verifyCode"?: string
}

export interface CreateParam {
  "ip"?: string,
  "region"?: string,
  "serviceId"?: number,
  "reqUid"?: number,
  "reqAccount"?: string,
  "reqIsSuperRole"?: true,
  "reqLevel"?: number,
  "reqRootId"?: number,
  "reqRootAccount"?: string,
  "reqFatherId"?: number,
  "reqFatherChain"?: string,
  "reqHost"?: string,
  "device"?: string,
  "reqMerchantId"?: string,
  "reqMerchant"?: string,
  "account"?: string,
  "email"?: string,
  "area"?: number,
  "phone"?: string,
  "password"?: string,
  "walletPass"?: string,
  "status"?: number,
  "parentId"?: number,
  "agentId"?: number,
  "realName"?: string,
  "nickName"?: string,
  "birthday"?: string,
  "gender"?: number,
  "language"?: string,
  "registerDevice"?: string,
  "registerIp"?: string,
  "test"?: number
}


export interface InfoParam {
  "ip"?: string,
  "region"?: string,
  "serviceId"?: number,
  "reqUid"?: number,
  "reqAccount"?: string,
  "reqIsSuperRole"?: true,
  "reqLevel"?: number,
  "reqRootId"?: number,
  "reqRootAccount"?: string,
  "reqFatherId"?: number,
  "reqFatherChain"?: string,
  "reqHost"?: string,
  "device"?: string,
  "reqMerchantId"?: string,
  "reqMerchant"?: string,
  "uid"?: number
}
