import {httpPost} from '@/utils/request'
import type { bindServiceParam, sendVerifyCodeParam, webConfigParam } from './userInterface'
import type { ResponseBody } from './typing'
import { userAPIs } from '@/const/apis'

// 用户信息
export const userInfo = async (params?: UserInfoAPITypes.TUserInfoReq): Promise<ResponseBody<UserInfoAPITypes.TUserInfoRes>> => {
  return await httpPost(userAPIs.info, params)
}

// 发送验证码请求体
export const sendVerifyCode = async (params: sendVerifyCodeParam) => {
  return await httpPost(userAPIs.sendVerifyCode, params)
}

// 修改用户信息
export const userEdit = async (params: UserEditAPITypes.TUserEditReq): Promise<ResponseBody<UserEditAPITypes.TUserEditRes>> => {
  return await httpPost(userAPIs.edit, params)
}

// 修改用户绑定服务
export const bindService = async (params: bindServiceParam) => {
  return await httpPost(userAPIs.bindService, params)
}

export const webConfig = async (params?: webConfigParam)=> {
  return await httpPost(userAPIs.webConfig, params);
}

// 用户投注统计
export const userStatics = async (params: UserStaticsAPITypes.TBaseMerchantReq): Promise<ResponseBody<UserStaticsAPITypes.TUserStaticsRes>> => {
  return await httpPost(userAPIs.userStatics, params);
}

// 用户头像列表
export const userAvatarList = async (params: UserAvatarListAPITypes.TUserAvatarListReq): Promise<ResponseBody<UserAvatarListAPITypes.TUserAvatarListRes>> => {
  return await httpPost(userAPIs.avatarList, params);
}
