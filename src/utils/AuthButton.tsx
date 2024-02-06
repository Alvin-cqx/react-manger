import { IAuthLoader } from '@/router/AuthLoader'
import useStore from '@/store/zustand'
import { useRouteLoaderData } from 'react-router-dom'
import { Button } from 'antd'
export default function AuthButton(props: any) {
  //获取加载路由前hook的权限,路由加上id，加载这组件前会优先加载这个方法
  const menuData = useRouteLoaderData('layout_id') as IAuthLoader
  // 获取用户信息的角色
  const role = useStore(state => state.userInfo.role)
  if (!props.auth) return <Button {...props}>{props.children}</Button>
  if(menuData.buttonList.includes(props.auth)||role==1){
    return <Button {...props}>{props.children}</Button>
  }
  return <></>
}
