import { getPermissionList } from '@/api/api'
import { Menu } from '@/types/api'
import { getMenuPath } from '@/utils'
export interface IAuthLoader{
  buttonList:string[],
  menuList:Menu.MenuItem[],
  menuPathList:string[],
}
export default async function AuthLoader() {
  const res = await getPermissionList()
  const menuPathList = getMenuPath(res.menuList)

  return {
    buttonList: res.buttonList,
    menuList: res.menuList,
    menuPathList
  }
}
