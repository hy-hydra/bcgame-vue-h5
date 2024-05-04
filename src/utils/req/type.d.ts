import type {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosInstance
} from 'axios'

export interface AxiosRequestInterceptors {
    success?: (config: AxiosRequestConfig) => AxiosRequestConfig,
    rejected?: (error: any) => any
}

export interface AxiosResponseInterceptors {
    success?: (result: any) => any,
    rejected?: (error: any) => any
}

export interface AxiosRawInterceptors {
    request?: AxiosRequestInterceptors
    response?: AxiosResponseInterceptors
}

export interface CustomRequestConfig extends AxiosRequestConfig {
    interceptors?: AxiosRawInterceptors
    showLoading?: false
}