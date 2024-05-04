import { fakeDataAPIs } from '@/const/apis'
import {  httpPost} from '@/utils/request'

// 数据创建
export const dataCreate = async (params: {}) => {
  await httpPost(fakeDataAPIs.dataCreate, params)
}