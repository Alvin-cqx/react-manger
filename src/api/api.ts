/*
 * @Author: 陈庆贤
 * @Date: 2023-10-19 11:59:09
 * @email: alvin9504@163.com
 * @LastEditors: 陈庆贤
 * @LastEditTime: 2023-11-22 17:57:50
 * @Description:
 */
import request from '@/utils/request'
import { Login, User, DashboardType, ResultData, Dept, Menu } from '@/types/api'
// 登录
export const login = (params: Login.params) => {
  return request.post<string>('/users/login', params)
}
// 获取用户信息
export const getUserInfo = () => {
  return request.get<User.UserItem>('/users/getUserInfo')
}
// 获取报表数据
export const getReportData = () => {
  return request.get<DashboardType.ReportData>('/order/dashboard/getReportData')
}
// 获取折线图
export const getLineData = () => {
  return request.get<DashboardType.LineData>('/order/dashboard/getLineData')
}
// 获取饼图
export const getPieCityData = () => {
  return request.get<DashboardType.PieData>('/order/dashboard/getPieCityData')
}
// 获取折线图
export const getPieAgeData = () => {
  return request.get<DashboardType.PieData>('/order/dashboard/getPieAgeData')
}
// 获取雷达图
export const getRadarData = () => {
  return request.get<DashboardType.RadarData>('/order/dashboard/getRadarData')
}
// 获取用户列表
export const usersList = (params?: User.Params) => {
  return request.get<ResultData<User.UserItem>>('/users/list', params)
}

// 用户添加
export const userCreate = (params: User.CreateParams) => {
  return request.post('/users/create', params)
}
// 编辑用户
export const userEdit = (params: User.EditParams) => {
  return request.post('/users/edit', params)
}
// 删除用户
export const userDelete = (params: { userIds: number[] }) => {
  return request.post('/users/delete', params)
}

// 部门管理列表
export const getDeptList = (params?: Dept.Params) => {
  return request.get<Dept.DeptItem[]>('/dept/list', params)
}

// 获取全量用户列表
export const getAllUserList = () => {
  return request.get<User.UserItem[]>('/users/all/list')
}

// 创建部门
export const createDept = (params: Dept.CreateParams) => {
  return request.post('/dept/create', params)
}
// 编辑部门
export const editDept = (params: Dept.EditParams) => {
  return request.post('/dept/edit', params)
}
// 删除部门
export const deleteDept = (params: Dept.DelParams) => {
  return request.post('/dept/delete', params)
}
// 菜单列表
export const getMenuList = (params: Menu.Params = {}) => {
  return request.get<Menu.MenuItem[]>('/menu/list', params)
}

// 创建菜单
export const creatMenu = (params: Menu.CreateParams) => {
  return request.post('/menu/create', params)
}
// 编辑菜单
export const editMenu = (params: Menu.EditParams) => {
  return request.post('/menu/edit', params)
}
// 删除菜单
export const deleteMenu = (params: Menu.DelParams) => {
  return request.post('/menu/delete', params)
}

// // 获取用户权限列表
export const getPermissionList = () => {
  return request.get<{ buttonList: string[]; menuList: Menu.MenuItem }>('/users/getPermissionList')
}
