import { Breadcrumb } from 'antd'
import { useEffect, useState ,} from 'react'
import {  useRouteLoaderData ,useLocation} from 'react-router-dom'
import { IAuthLoader } from '@/router/AuthLoader'
import { findTreeNode } from '@/utils'
export default function BreadCrumb() {
  //获取加载路由前hook的权限,路由加上id，加载这组件前会优先加载这个方法
  const menuData = useRouteLoaderData('layout_id') as IAuthLoader

    // 获取路由信息
    const route = useLocation()
  console.log(menuData,'menuDatamenuData',route)
  const [breadList,setBreadList]=useState([])

  useEffect(()=>{
    let list:any=findTreeNode(menuData.menuList,route.pathname,[])
    list=list.map(item=>{
      return {'title':item}
    })
    setBreadList([{title:<a href=''>首页</a>},...list])
  },[route.pathname])
  return (
    <Breadcrumb
      style={{ marginLeft: 10 }}
      items={breadList}
    ></Breadcrumb>
  )
}
