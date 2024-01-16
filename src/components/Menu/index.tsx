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
import { useNavigate } from 'react-router-dom'
import styles from './index.module.less'
// 使用zustand
import useStore from '@/store/zustand'
const SideMenu = () => {
  const navigate = useNavigate()
  // 获取菜单图标伸缩
  const collapsed = useStore(state => state.collapsed)
  const items = [
    {
      label: '工作台',
      key: '1',
      icon: <DesktopOutlined />
    },
    {
      label: '系统管理',
      key: '2',
      icon: <SettingOutlined />,
      children: [
        { label: '用户管理', key: '3', icon: <TeamOutlined /> },
        { label: '部门管理', key: '4', icon: <TeamOutlined /> }
      ]
    }
  ]
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
      <Menu theme='dark' mode='inline' style={{ width: collapsed ? 80 : 'auto' }} items={items} />
    </div>
  )
}
export default SideMenu
