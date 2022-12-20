import Axios, { AxiosRequestConfig } from 'axios'

Axios.interceptors.response.use(
	response => response.data,
	error => Promise.reject(error)
)

export const RestClient = {
	get: (url: string, config: AxiosRequestConfig = {}) =>
		Axios.get(url, config),
	post: (url: string, data: any, config: AxiosRequestConfig = {}) =>
		Axios.post(url, data, config),
	put: (url: string, data: any, config: AxiosRequestConfig = {}) =>
		Axios.put(url, data, config),
	delete: (url: string, config: AxiosRequestConfig = {}) =>
		Axios.delete(url, config),
}
