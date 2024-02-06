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
import { createHashRouter, Navigate, useRoutes,createBrowserRouter } from 'react-router-dom'
import Welcome from '@/views/welcome/index'
import Login from '@/views/login/Login'
import Error404 from '@/views/Error404'
import Error403 from '@/views/Error403'
import Dashboard from '@/views/dashboard'
import User from '@/views/system/user'
import DeptList from '@/views/system/dept'
import MenuList from '@/views/system/menu'
import RoleList from '@/views/system/role'
import Layout from '@/layout'
import AuthLoader from './AuthLoader'
export const router = [
  {
    path: '/',
    element: <Navigate to='/welcome'></Navigate>
  },
  // {
  //   path: '/welcome',
  //   element: <Welcome />
  // },
  {
    id:'layout_id',
    element: <Layout />,

    loader: AuthLoader,
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
        element: <MenuList />,
        meta:{ 
          auth:false
        }
      },
      {
        path: '/roleList',
        element: <RoleList />
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
// export default function Router() {
//   return useRoutes(router)
// }
//export default router
// 路由方式一
export default createHashRouter(router)

