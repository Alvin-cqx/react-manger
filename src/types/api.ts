/*
 * @Author: 陈庆贤
 * @Date: 2023-10-19 12:04:55
 * @email: alvin9504@163.com
 * @LastEditors: 陈庆贤
 * @LastEditTime: 2023-11-29 17:00:50
 * @Description:
 */
// https://blog.51cto.com/u_16213444/7044433
// 方法一 方法二在typing.d.ts文件，还要去tsconfig.json配置
// declare module 'axios' {
//   interface AxiosRequestConfig {
//     showLoading?: boolean
//     errorLoading?: boolean
//   }
// }

import { Menu } from 'antd'

// 接口定义类型
export namespace Login {
  export interface params {
    userName: string
    userPwd: string
  }
}
// 分页参数
export interface PageParams {
  pageNum: number
  pageSize?: number
}
// 接口返回类型
export interface Result<T = any> {
  code: number
  data: T
  msg: string
}
// 列表接口返回类型
export interface ResultData<T = any> {
  list: T[]
  page: {
    pageNum: number
    sizeSize: number
    total: number | 0
  }
}
// 个人中心
export namespace User {
  export interface Params extends PageParams {
    userId?: number
    userName?: string
    state?: number
  }
  export interface UserItem {
    createId?: string
    deptId?: string
    deptName?: string
    job?: string
    mobile?: string
    role?: number
    roleList?: string[]
    state?: number
    userEmail?: string
    userId?: number
    userImg?: string
    userName?: string
    _id?: string
  }
  export interface CreateParams {
    userName: string
    userEmail: string
    mobile?: number
    job?: string
    state?: number
    roleList?: string[]
    deptId?: string[]
    userImg: string
  }
  export interface EditParams extends CreateParams {
    id: string
  }
}

// 工作台
export namespace DashboardType {
  export interface LineData {
    lable: string[]
    order: number[]
    money: number[]
  }
  export interface PieData {
    value: number
    name: string
  }
  export interface RadarData {
    indicator: { name: string; max: number }[]
    data: {
      name: string
      value: number[]
    }
  }
  export interface ReportData {
    driverCount: number
    totalMoney: number
    orderCount: number
    cityNum: number
  }
}

// 表格表单
interface options {
  value: string | number
  label: string
}
export namespace FormItem {
  export interface UserFormItem {
    userId?: string
    state?: number | string
    userName?: string
    data?: string
    dataType?: string
  }
  export interface labelItem {
    type: string
    label: string
    name: string
    placeholder?: string
    allowClear?: boolean | false
    format?: string
    option?: options[]
    defaultValue?: string | number
    onChange?: (value: any) => void
  }
}

// 部门
export namespace Dept {
  export interface Params {
    deptName?: string
  }
  export interface CreateParams {
    parentId?: string
    deptName: string
    userName: string
  }
  export interface DelParams {
    _id: string
  }
  export interface DeptItem extends CreateParams {
    _id: string
    userId?: number
    createTime?: string
    updateTime?: string
    children?: DeptItem[]
    [key: string]: any
  }
  // 修改用户参数
  export interface EditParams extends CreateParams {
    userId?: number
  }
}

// 菜单列表
export namespace Menu {
  // 搜索参数
  export interface Params {
    menuName?: string
    state?: number
  }
  // 创建参数类型
  export interface CreateParams {
    menuName: string
    icon?: string
    menuType: number
    menuState: number
    menuCode?: string
    parentId: string
    path?: string
    component?: string
    creatTime?: string
    orderBy?:number,
    
  }
  // 菜单对象
  export interface MenuItem extends CreateParams {
    _id: string
    buttons?: MenuItem[]
    children?: MenuItem[]
  }
  // 修改用户参数
  export interface EditParams extends CreateParams {
    _id: string
  }

  export interface DelParams{
    _id:string
  }
}


// 角色
export namespace Role {
  // 搜索参数
  export interface Params extends PageParams {
    roleName?: string
  }
  export interface CreateParams {
    roleName: string
    remark: string
  }
  export interface EditParams extends CreateParams {
    _id: string
  }
  export interface RoleItem extends CreateParams {
    _id: string
    permissionList: {
      checkedKeys: string[]
      halfCheckedKeys: string[]
    }
    updateTime: string
    createTime: string
  }
  export interface CreatePermission {
    _id: string
    permissionList: {
      checkedKeys: string[]
      halfCheckedKeys: string[]
    }
  }
}