/*
 * @Author: 陈庆贤
 * @Date: 2023-11-02 11:42:32
 * @email: alvin9504@163.com
 * @LastEditors: 陈庆贤
 * @LastEditTime: 2023-11-03 16:29:02
 * @Description:
 */

// 还要去tsconfig.json配置
// 导入这个是为了继承
import axios from 'axios'
declare module 'axios' {
  interface AxiosRequestConfig {
    showLoading?: boolean
    errorLoading?: boolean
  }
}
