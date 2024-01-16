/*
 * @Author: 陈庆贤
 * @Date: 2023-11-08 16:08:07
 * @email: alvin9504@163.com
 * @LastEditors: 陈庆贤
 * @LastEditTime: 2023-11-08 17:01:16
 * @Description:
 */
import resso from 'resso'
import { User } from '@/types/api'
const store = resso({
  token: '',
  userInfo: {
    userName: '',
    userEmail: ''
  },
  updateUserInfo(userInfo: any) {
    store.userInfo = userInfo
  },
  updateToken(token: string) {
    store.token = token
  }
})

export default store
