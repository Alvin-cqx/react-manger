/*
 * @Author: 陈庆贤
 * @Date: 2023-09-09 15:24:48
 * @email: alvin9504@163.com
 * @LastEditors: 陈庆贤
 * @LastEditTime: 2023-11-17 14:57:25
 * @Description:
 */

import { RouterProvider, BrowserRouter } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
// 改变主题
// App as AntdApp 为了处理message在ConfigProvider下控制台报错
import { ConfigProvider, App as AntdApp } from 'antd'

// 路由方式一
import router from './router/index'

// 路由方式二
// import Router from './router/index'
import './App.less'
// 处理message
import AntdGlobal from './utils/AntdGlobal'
import zhCN from 'antd/es/locale/zh_CN'
function App() {
  // 路由方式一
  // return <RouterProvider router={router}></RouterProvider>

  // 路由方式二
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#00b96b'
        }
      }}
    >
      <AntdApp>
        <AntdGlobal />
        {/* 路由方式2 */}
        {/* <HashRouter>
          <Router></Router>
        </HashRouter> */}
        {/* 路由方式1 */}
        <RouterProvider router={router}></RouterProvider>

      </AntdApp>
    </ConfigProvider>
  )
}

export default App
