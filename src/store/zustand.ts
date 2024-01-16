/*
 * @Author: 陈庆贤
 * @Date: 2023-11-09 16:49:55
 * @email: alvin9504@163.com
 * @LastEditors: 陈庆贤
 * @LastEditTime: 2023-11-14 09:56:23
 * @Description:
 */
import { create } from 'zustand'
import { User } from '@/types/api'
const useStore = create<{
  count: number
  userInfo: User.UserItem
  increasePopulation: () => void
  updateUserInfo: (userInfo: User.UserItem) => void
  collapsed: boolean
  updateCollapsed: () => void
}>(set => ({
  count: 0,
  userInfo: {
    _id: '',
    job: ''
  },
  collapsed: false,
  increasePopulation: () => set(state => ({ count: state.count + 1 })),
  updateUserInfo: (userInfo: User.UserItem) => set({ userInfo }),
  updateCollapsed: () => set(state => ({ collapsed: !state.collapsed }))
}))

export default useStore
