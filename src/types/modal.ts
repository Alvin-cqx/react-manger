/*
 * @Author: 陈庆贤
 * @Date: 2023-11-20 10:16:06
 * @email: alvin9504@163.com
 * @LastEditors: 陈庆贤
 * @LastEditTime: 2023-11-29 15:54:57
 * @Description:
 */
import { MutableRefObject } from 'react'
import { FormInstance } from 'antd'
//   const uesrRef=useRef() 看到是MutableRefObject类型
import { User, FormItem, Dept, Menu } from './api'
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
