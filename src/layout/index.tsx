/*
 * @Author: 陈庆贤
 * @Date: 2023-11-03 17:30:00
 * @email: alvin9504@163.com
 * @LastEditors: 陈庆贤
 * @LastEditTime: 2023-11-20 09:38:30
 * @Description:
 */
import React, { useEffect } from 'react'

import { Layout, theme } from 'antd'
import { Watermark } from 'antd'
import { Outlet, useRouteLoaderData } from 'react-router-dom'

const { Content, Sider } = Layout
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import SideMenu from '@/components/Menu'
import styles from './index.module.less'
import { getUserInfo } from '@/api/api'
// 使用resso
import store from '@/store/resso'

// 使用zustand
import useStore from '@/store/zustand'
const App: React.FC = () => {
  const updateUserInfo = useStore((state: any) => state.updateUserInfo)
  // 获取菜单图标伸缩
  const collapsed = useStore(state => state.collapsed)
  useEffect(() => {
    // useEffect不能使用 async await
    // getUserInfo().then(res=>{
    //   console.log(res)
    // })

    getUserInfoData()
  }, [])
  const getUserInfoData = async () => {
    const res = await getUserInfo()
    // 使用resso存进去store
    store.updateUserInfo(res)

    // 使用zustand存进去store
    updateUserInfo(res)


  }

  // 获取加载路由前hook的权限,路由加上id，加载这组件前会优先加载这个方法
 const data = useRouteLoaderData('layout_id')
 console.log(data,'data')
  return (
    <Watermark content='陈庆贤'>
      <Layout>
        <Sider collapsed={collapsed}>
          <div className='demo-logo-vertical' />
          {/* 菜单栏 */}
          <SideMenu />
        </Sider>
        <Layout>
          {/* 头部 */}
          <NavHeader />
          <div className={styles.wrapper}>
            {/* 相当于vue router-view */}
            <Outlet></Outlet>
          </div>
          {/* 底部 */}
          <NavFooter />
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default App
