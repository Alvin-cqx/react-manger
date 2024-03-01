/*
 * @Author: 陈庆贤
 * @Date: 2023-11-20 10:16:06
 * @email: alvin9504@163.com
 * @LastEditors: 陈庆贤
 * @LastEditTime: 2023-11-29 15:54:57
 * @Description:
 */
import { MutableRefObject } from 'react'
//   const uesrRef=useRef() 看到是MutableRefObject类型
import { FormInstance } from 'antd'

import { User, FormItem, Dept, Menu ,Role} from './api'
export type IAction = 'create' | 'edit' | 'delete'
// 创建用户弹窗
export interface IModalProps {
  mRef: MutableRefObject<{ openMoal: (type: IAction, data?: User.UserItem) => void } | undefined>
  update: () => void
}
// 创建部门弹窗
export interface CreateDeptProps {
  dRef: MutableRefObject<{ openMoal: (type: IAction, data?: Dept.DeptItem) => void } | undefined>
  update: () => void
}

// 创建菜单弹窗
export interface CreateMenuProps {
  menuRef: MutableRefObject<{ openMoal: (type: IAction, data?: Menu.MenuItem) => void } | undefined>
  update: () => void
}
// 订单弹窗
export interface OrderProps {
  orderRef: MutableRefObject<{ openMoal: () => void } | undefined>
  update: () => void
}
// 订单详情弹窗
export interface OrderDetailProps {
  orderDetailRef: MutableRefObject<{ openMoal: (orderId:string) => void } | undefined>
}
// 角色弹窗
export interface roleProps{
  roleRef: MutableRefObject<{ openMoal: (type?: IAction, data?: Role.EditParams) => void } | undefined>
  update: () => void
}
// refProps类型 提取公共类型   
export interface refProps<T=Menu.MenuItem> {
  menuRef: MutableRefObject<{ openMoal: (type: IAction, data?:T) => void } | undefined>
  update: () => void
}


interface myformRefPorps {
  setFormData: (data: FormItem.UserFormItem) => void
  getFieldsForm: FormInstance<any>
  pickTypeChange?: (val: IAction) => void
}


export interface FormProps {
  myformRef: MutableRefObject<myformRefPorps | undefined>
  searchItem?: FormItem.UserFormItem
  lableList: FormItem.labelItem[]
  getFormData_: (val: FormItem.UserFormItem, form?: any) => void
  setFormData_: (val: FormItem.UserFormItem, form?: any) => void
}


