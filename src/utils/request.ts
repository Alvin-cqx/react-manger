/*
 * @Author: 陈庆贤
 * @Date: 2023-10-11 17:58:11
 * @email: alvin9504@163.com
 * @LastEditors: 陈庆贤
 * @LastEditTime: 2023-11-21 17:29:09
 * @Description:
 */
import axios, { AxiosError } from 'axios'

// import { message } from 'antd'
import { showLoading, hideLoading } from './loading'
import storage from './storage'
import env from '@/config'
import { Result } from '@/types/api'
// 为了处理请求message控制台报错
import { message } from './AntdGlobal'
// 创建实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 8000,
  timeoutErrorMessage: '请求超时,请稍后再试',
  withCredentials: true //跨域
})
// 请求拦截器
instance.interceptors.request.use(
  config => {
    // if (config.showLoading) showLoading()
    const token = storage.getStorage('token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    config.headers.icode = 'F69460029755E8C8'
    // 用来更换测试，开发环境
    console.log(env, 'envenvenv')
    return {
      ...config
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)
let isRefreshing = false
// 响应拦截器
instance.interceptors.response.use(
  response => {
    const data: Result = response.data
    // hideLoading()

    // 对于文件下载的处理
    if (response.config.responseType === 'blob') return response

    if (data.code === 500001) {
      if (!isRefreshing) {
        isRefreshing = true
        message.error(data.msg)
        storage.delStorage('token')
        // hash路由模式要加#
        location.href = '#/login?callback=' + location.hash
      }
    } else if (data.code != 0) {
      console.log(data, response.config.showLoading, 'datadatadata')
      // 方法1
      if (response.config.showLoading === true) {
        return Promise.resolve(data)
      } else {
        message.error(data.msg)
        return Promise.reject(data)
      }
      // 方法2
      // return Promise.resolve(data)
      // 方法3
      // message.error(data.msg)
      // return Promise.reject(data)
    }
    return data.data
  },
  error => {
    // hideLoading()
    message.error(error.message)
    return Promise.reject(error.message)
  }
)
// https://blog.51cto.com/u_16213444/7044433
// 对Axios库进行扩展
// 在types api.ts文件下
interface IConfig {
  showLoading?: boolean
  errorLoading?: boolean
}
export default {
  get<T>(url: string, params?: object, options: IConfig = { showLoading: false, errorLoading: true }): Promise<T> {
    return instance.get(url, { params, ...options })
  },
  post<T>(url: string, params?: object, options: IConfig = { showLoading: false, errorLoading: true }): Promise<T> {
    return instance.post(url, params, options)
  },
  downloadFile(url: string, data: any, fileName = 'fileName.xlsx') {
    instance({
      url,
      data,
      method: 'post',
      responseType: 'blob'
    }).then(res => {
      const blob = new Blob([res.data], {
        type: res.data.type
      })
      const name = (res.headers['file-name'] as string) || fileName
      const link = document.createElement('a')
      link.download = decodeURIComponent(name)
      link.href = URL.createObjectURL(blob)
      document.body.append(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(link.href)
    })
  }
}
