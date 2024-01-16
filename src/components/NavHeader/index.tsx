/*
 * @Author: 陈庆贤
 * @Date: 2023-11-06 17:40:05
 * @email: alvin9504@163.com
 * @LastEditors: 陈庆贤
 * @LastEditTime: 2023-11-14 10:14:50
 * @Description:
 */
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Dropdown, Switch, App } from 'antd'
import type { MenuProps } from 'antd'
import styles from './index.module.less'
// 使用 resso
import store from '@/store/resso'
// 使用 zustand
import useStore from '@/store/zustand'
import storage from '@/utils/storage'
import { User } from '@/types/api'
const NavHeader = () => {
  // 处理消息提示报错
  const { message } = App.useApp()
  // 使用 zustand
  // 方法1
  // 获取用户信息
  const userInfoData: User.UserItem = useStore(state => state.userInfo)
  // 获取菜单图标伸缩
  const collapsed = useStore(state => state.collapsed)
  const updateCollapsed = useStore(state => state.updateCollapsed)
  // 方法二
  const data = useStore()
  const { userInfo } = data
  const items: MenuProps['items'] = [
    {
      key: 'email',
      label: '邮箱' + store.userInfo.userEmail
    },
    {
      key: '_id',
      label: '_id:' + userInfoData._id
    },
    {
      key: 'createId',
      label: 'createId:' + userInfo._id
    },
    {
      key: 'layout',
      label: '退出'
    }
  ]
  const dropClick: MenuProps['onClick'] = ({ key }) => {
    console.log(key)
    if (key === 'layout') {
      storage.clearStorage()
      message.success('退出成功!')
      // hash路由模式要加#
      window.location.href = '#/login?callback=' + encodeURIComponent(location.href)
    }
  }
  // 菜单图标伸缩
  const changeCollapsed = () => {
    updateCollapsed()
  }
  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <div onClick={changeCollapsed} style={{ cursor: 'pointer' }}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <Breadcrumb
          style={{ marginLeft: 10 }}
          items={[
            {
              title: 'Home'
            },
            {
              title: <a href=''>Application Center</a>
            },
            {
              title: <a href=''>Application List</a>
            },
            {
              title: 'An Application'
            }
          ]}
        />
      </div>
      <div className='right'>
        <Switch checkedChildren='暗黑' unCheckedChildren='默认' style={{ marginRight: 10 }}></Switch>
        <Dropdown menu={{ items, onClick: dropClick }}>
          <span className={styles.nickName}>{store.userInfo.userName}</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
