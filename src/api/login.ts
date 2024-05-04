import {  httpPost} from '@/utils/request'
import type { loginParam, registerParam } from "./loginInterface"
import { userAPIs } from '@/const/apis'


// 登录
export const login = async (params: loginParam) => {
 return await httpPost(userAPIs.login, params)
}

// 注册
export const register = async (params: registerParam) => {
    return await httpPost(userAPIs.register, params)
}
