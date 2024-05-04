import { managementAPIs } from "@/const/apis";
import { httpPost } from "@/utils/request";

// 用户列表
export const userList = async (params: {}) => {
  await httpPost(managementAPIs.userList, params);
};

// 用户kick
export const userKick = async (params: {}) => {
  await httpPost(managementAPIs.userKick, params);
};

// 用户记录 所有非余额对用户的操作记录
export const userRecord = async (params: {}) => {
  await httpPost(managementAPIs.userRecord, params);
};

// 用户编辑
export const userEdit = async (params: {}) => {
  await httpPost(managementAPIs.userEdit, params);
};

// 	同意/拒绝活动
export const activityLogs = async (params: {}) => {
  await httpPost(managementAPIs.activityLogs, params);
};

// 用户记录 所有非余额对用户的操作记录
export const auditActive = async (params: {}) => {
  await httpPost(managementAPIs.auditActive, params);
};

// 用户银行卡列表
export const userBankList = async (params: {}) => {
  await httpPost(managementAPIs.userBankList, params);
};

// 用户银行卡编辑
export const userBankEdit = async (params: {}) => {
  await httpPost(managementAPIs.userBankEdit, params);
};

// 用户消费记录
export const userMarkingLogList = async (params: {}) => {
  await httpPost(managementAPIs.userMarkingLogList, params);
};

// 	加密货币列表
export const userCryptoList = async (params: {}) => {
  await httpPost(managementAPIs.userCryptoList, params);
};

// 加密货币更改
export const userCryptoEdit = async (params: {}) => {
  await httpPost(managementAPIs.userCryptoEdit, params);
};

// 	创建用户
export const userCreate = async (params: {}) => {
  await httpPost(managementAPIs.userCreate, params);
};

// 用户信息
export const userInfo = async (params: {}) => {
  await httpPost(managementAPIs.userInfo, params);
};
