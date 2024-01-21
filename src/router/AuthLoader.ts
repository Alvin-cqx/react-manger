import { getPermissionList } from '@/api/api'
export default async function AuthLoader() {
  const res = await getPermissionList()
  return {
    buttonList:res.buttonList,
    menuList: res.menuList
  }
}
