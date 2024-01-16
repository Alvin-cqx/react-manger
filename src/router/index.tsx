/*
 * @Author: 陈庆贤
 * @Date: 2023-10-10 16:05:13
 * @email: alvin9504@163.com
 * @LastEditors: 陈庆贤
 * @LastEditTime: 2023-11-16 10:34:05
 * @Description:
 */
/* eslint-disable react-refresh/only-export-components */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createHashRouter, Navigate, useRoutes } from 'react-router-dom'
import Welcome from '@/views/welcome/index'
import Login from '@/views/login/Login'
import Error404 from '@/views/Error404'
import Error403 from '@/views/Error403'
import Dashboard from '@/views/dashboard'
import User from '@/views/system/user'
import DeptList from '@/views/system/dept'
import MenuList from '@/views/system/menu'
import Layout from '@/layout'
const router = [
  {
    path: '/',
    element: <Navigate to='/welcome'></Navigate>
  },
  // {
  //   path: '/welcome',
  //   element: <Welcome />
  // },
  {
    element: <Layout />,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/userList',
        element: <User />
      },
      {
        path: '/deptList',
        element: <DeptList />
      },
      {
        path: '/menuList',
        element: <MenuList />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <Navigate to='/404'></Navigate>
  },
  {
    path: '/404',
    element: <Error404 />
  },
  {
    path: '/403',
    element: <Error403 />
  }
]
// 路由方式二
export default function Router() {
  return useRoutes(router)
}
// 路由方式一
// export default createHashRouter(router)
