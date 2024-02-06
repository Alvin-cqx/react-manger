/*
 * @Author: 陈庆贤
 * @Date: 2023-11-07 16:22:09
 * @email: alvin9504@163.com
 * @LastEditors: 陈庆贤
 * @LastEditTime: 2023-11-14 10:31:24
 * @Description:
 */

import { DesktopOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'
import styles from './index.module.less'
// 使用zustand
import useStore from '@/store/zustand'
import { useEffect, useState } from 'react'
import { Menu as IMenu } from '@/types/api'
import * as Icon from '@ant-design/icons'
import React from 'react'

const SideMenu = () => {
  const navigate = useNavigate()

  // 设置菜单栏
  const [menuList, setMenuList] = useState([])

  // 点击菜单栏
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  // 展开菜单栏
  const [openKey, setOpenKey] = useState<string[]>([])
  // 定义菜单栏
  type MenuItem = Required<MenuProps>['items'][number]
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type
    } as MenuItem
  }
  //iconName是icon名字字符串
  const createAntdIcon = (iconName?: string) => {
    if (!iconName) return <></>
    const icon = Icon[iconName]
    if (!icon) return <></>
    return React.createElement(icon)
  }

  // 点击菜单栏
  const handerMenuClick = (item: any) => {
    setSelectedKeys([item.key])
    navigate(item.key)
  }
  // 展开栏
  const onOpenChange=(item)=>{
    setOpenKey([item[1] + ''])
  }

  // 根据子节点找父节点
  const getParentNodeId = (tree: any, childId: string) => {
    // 遍历树节点
    for (let node of tree) {
      // 如果当前节点就是目标节点的父节点，直接返回当前节点id
      if (node.children && node.children.some(child => child.key === childId)) {
        return node.key
      }
      // 否则继续遍历当前节点的子节点
      if (node.children) {
        const parentId = getParentNodeId(node.children, childId)
        if (parentId !== null) {
          return parentId
        }
      }
    }
    // 如果没有找到父节点，则返回null
    return null
  }
  // 树形菜单
  const getTreeMenu = (menulist: IMenu.MenuItem[], treeList: MenuItem[] = []) => {
    menulist.forEach((item, index) => {
      if (item.menuType === 1 && item.menuState === 1) {
        if (item.buttons) {
          treeList.push(getItem(item.menuName, item.path || index, createAntdIcon(item.icon)))
        } else {
          treeList.push(
            getItem(item.menuName, item.path || index, createAntdIcon(item.icon), getTreeMenu(item.children || []))
          )
        }
      }
    })
    return treeList
  }
  //获取加载路由前hook的权限,路由加上id，加载这组件前会优先加载这个方法
  const menuData: any = useRouteLoaderData('layout_id')

  // 获取路由信息
  const route = useLocation()


  useEffect(() => {
    // 获取树菜单
    let treeList = getTreeMenu(menuData.menuList)
    console.log(treeList, 'treeList')
    setMenuList(treeList)
    // // 高亮菜单
    setSelectedKeys([route.pathname])
    // 默认展开菜单栏
    let key = getParentNodeId(treeList, route.pathname)
    setOpenKey([key + ''])
  }, [route])

  // 获取菜单图标伸缩
  const collapsed = useStore(state => state.collapsed)
  // const items = [
  //   {
  //     label: '工作台',
  //     key: '1',
  //     icon: <DesktopOutlined />
  //   },
  //   {
  //     label: '系统管理',
  //     key: '2',
  //     icon: <SettingOutlined />,
  //     children: [
  //       { label: '用户管理', key: '3', icon: <TeamOutlined /> },
  //       { label: '部门管理', key: '4', icon: <TeamOutlined /> }
  //     ]
  //   }
  // ]
  // 回到首页
  const navigateTo = () => {
    navigate('/welcome') 
  }

  return (
    <div>
      <div className={styles.logo} onClick={navigateTo}>
        <img className={styles.img} src='/src/assets/logo.png' alt='' />
        {collapsed ? '' : <span className={!collapsed ? styles.animation : ''}>慕慕货运</span>}
      </div>
      <Menu
        theme='dark'
        mode='inline'
        style={{ width: collapsed ? 80 : 'auto' }}
        selectedKeys={selectedKeys}
        onClick={handerMenuClick}
        items={menuList}
        openKeys={openKey}
        onOpenChange={onOpenChange}
      />
    </div>
  )
}
export default SideMenu
