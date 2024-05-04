import axios from 'axios'
/* 从axios库中引入定义好的类型 */
import type { AxiosInstance } from 'axios'
import type { CustomRequestConfig } from './type'

export default class Request {
	// axios示例, request是基于axios的
	_instance: AxiosInstance
	_config: CustomRequestConfig

	constructor(config: CustomRequestConfig) {
		// 1. 初始化axios实例
		this._config = config
		this._instance = axios.create(config)
		// 2. 初始化全局拦截器
		this._initGlobalInterceptors()
		//2. 初始化局部拦截器
		this._initLocalInterceptors()

	}
	/* 初始化全局拦截器, 每个实例都有的拦截器, 是一些写死的拦截器, 每个request都具备 */
	_initGlobalInterceptors() {
		this._instance.interceptors.request.use(
			(config) => {
				return config
			},
			() => { }
		)
		this._instance.interceptors.response.use(
			(response) => {
				return response.data
			},
			() => { }
		)
	}

	/* 初始化局部(每个axios都有的)拦截器, 用户传进来就初始化, 没有传就不初始化 */
	_initLocalInterceptors() {
		const i = this._config.interceptors

		this._instance.interceptors.request.use(
			i?.request?.success,
			i?.request?.rejected
		)
		this._instance.interceptors.response.use(
			i?.response?.success,
			i?.response?.rejected
		)
	}

	/* 保留给用户发送请求的方法 */
	request<T>(config: CustomRequestConfig): Promise<T> {
		return new Promise((resolve, reject) => {

			// 1. 去掉interceptors配置并且拿到用户拦截器修改后的配置
			const interceptors = this._config.interceptors
			let config = this._config
			if (interceptors && interceptors.request?.success) {
				// 把config给用户让他执行一下
				config = interceptors.request.success(config)
			}

			// 2. 发送请求拿到data数据
			this._instance
				.request<any, T>(config)
				.then(res => {
					// 3. 拿到数据后执行响应成功拦截器
					if (interceptors && interceptors.response?.success) {
						res = interceptors.response.success(res)
					}
					// 4. 将数据给用户, 让他能在then方法后调用
					resolve(res)
				})
				.catch(e => {
					reject(e)
				})
		})
	}

	get<T>(config: CustomRequestConfig): Promise<T> {
		return this.request<T>({ ...config, method: 'GET' })
	}
	post<T>(config: CustomRequestConfig): Promise<T> {
		return this.request<T>({ ...config, method: 'POST' })
	}
	delete<T>(config: CustomRequestConfig): Promise<T> {
		return this.request<T>({ ...config, method: 'DELETE' })
	}
	put<T>(config: CustomRequestConfig): Promise<T> {
		return this.request<T>({ ...config, method: 'PUT' })
	}
}







