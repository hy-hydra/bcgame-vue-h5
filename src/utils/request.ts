import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { showNotify } from 'vant'
import { localStorage } from '@/utils/local-storage'
import { STORAGE_TOKEN_KEY, TEST_URL } from '@/const/mutation-type'
import type { ResponseData } from '@/interface-desc'
import router from '@/router/index';
import { ENotifyTypes } from '@/const/enums.d'
import { indexOf } from 'lodash-es'
import commonAPIs from './commonAPIs'
import { throttle } from "@/utils/index"

// 这里是用于设定请求后端时，所用的 Token KEY
// 可以根据自己的需要修改，常见的如 Access-Token，Authorization
// 需要注意的是，请尽量保证使用中横线`-` 来作为分隔符，
// 避免被 nginx 等负载均衡器丢弃了自定义的请求头
export const REQUEST_TOKEN_KEY = 'token'
export const BROWSERID_KEY = 'device'
// 需要跳转登录页的code值
const LOGIN_REQUIRED_CODE = 10;

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  // eslint-disable-next-line node/prefer-global/process
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000, // 请求超时时间
  headers: {'content-type': 'application/json'},
  // responseType: 'json',
})

export type RequestError = AxiosError<{
  message?: string
  result?: any
  errorMessage?: string
}>

// 异常拦截处理器
function errorHandler(error: RequestError): Promise<any> {
  if (error.response) {
    const { data = {}, status, statusText } = error.response
    // 403 无权限
    if (status === 403) {
      showNotify({
        type: ENotifyTypes.danger,
        message: (data && data.message) || statusText,
      })
    }
    // 401 未登录/未授权
    if (status === 401 && data.result && data.result.isLogin) {
      showNotify({
        type: ENotifyTypes.danger,
        message: 'Authorization verification failed',
      })
      // 如果你需要直接跳转登录页面
      // location.replace(loginRoutePath)
    }
  }
  return Promise.reject(error)
}

// 请求拦截器
function requestHandler(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> {
  const savedToken = localStorage.get(STORAGE_TOKEN_KEY)
  const device = localStorage.get(BROWSERID_KEY)
  // 如果 token 存在
  // 让每个请求携带自定义 token, 请根据实际情况修改
  config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  if(device){
    config.headers['CustomHost'] = TEST_URL;

    config.headers[BROWSERID_KEY] = device
  }

  if (indexOf(commonAPIs, config.url) < 0 && savedToken) {
    // 接口需要token
    config.headers[REQUEST_TOKEN_KEY] = `${savedToken}`;
  }

  return config;
}

// Add a request interceptor
request.interceptors.request.use(requestHandler, errorHandler)

// 响应拦截器
function responseHandler(response: { data: any }) {
  // console.log(response.data)
  if (response.data.code == LOGIN_REQUIRED_CODE) {
    jump()
    // return Promise.reject('Session expired. Redirecting to login page...');
  }
  return response.data
}

const jump = throttle(()=>{
  localStorage.set(STORAGE_TOKEN_KEY, '')
  router && router.push({ name: "login" });
},1000)

// Add a response interceptor
request.interceptors.response.use(responseHandler, errorHandler)

// 封装post请求方法
export const httpPost = async (url: string, params = {}): Promise<ResponseData> => await request.post(url, params);

// 封装get请求方法
export const httpGet = async (url: string, params = {}): Promise<ResponseData> => await request.get(url, { params })

// 封装delete请求方法
export const httpDelete = async (url: string, params = {}): Promise<ResponseData> => await request.delete(url, { params })

// 封装put请求方法
export const httpPut = async (url: string, params = {}): Promise<ResponseData> => await request.put(url, params)  

export default request
