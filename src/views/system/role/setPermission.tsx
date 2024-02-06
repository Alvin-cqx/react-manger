import { Modal, Form, Input, Button, Select, message, TreeSelect, InputNumber, Radio, Tree } from 'antd'

import { IAction } from '@/types/modal'
import React, { useState, useImperativeHandle, useEffect } from 'react'
import { roleProps } from '@/types/modal'
import { Menu, Role } from '@/types/api'
import { getMenuList ,updatePermission} from '@/api/api'
export default function SetPerimssion(props: roleProps) {
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  // 取消弹窗
  const handleCancel = () => {
    setVisible(false)
  }
  // 确定弹窗
  const handleSubmit = async () => {
    await updatePermission(permissionList)
    setVisible(false)
    props.update()
    message.success('操作成功')
    setCheckedKeys([])
  }
  // 暴露子组件 openMoal弹窗
  useImperativeHandle(props.roleRef, () => {
    return {
      openMoal
    }
  })
  const openMoal = (action: IAction, data?: Role.RoleItem) => {
    setVisible(true)
    if (data) {
      let list=data.permissionList.checkedKeys
      setRoleInfo(data)
      setCheckedKeys(list)
     
    }
  }
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  const [treeData, setTreeData] = useState([])
  const [roleInfo, setRoleInfo] = useState<Role.RoleItem>()
  const [permissionList, setPermissionList] = useState<Role.CreatePermission>()
  // 选中tree 方法
  const onCheck = (checkKey: string[], item: any) => {
    
    setCheckedKeys(checkKey)
    const checkKeyList=[]
    const parentKeyList=[]
    item.checkedNodes.map((node:Menu.MenuItem)=>{
      if(node.menuType===2){
        checkKeyList.push(node._id)
      }else{
        parentKeyList.push(node._id)
      }
    })
    setPermissionList({
      _id: roleInfo?._id,
      permissionList: {
        checkedKeys: checkKeyList,
        halfCheckedKeys: parentKeyList.concat(item.halfCheckedKeys)
      }
    })
   
  }
  // 获取部门列表
  const getMenuListData = async () => {
    const data = await getMenuList()
    setTreeData(data)
  }
  // 初始化树菜单
  useEffect(() => {
    getMenuListData()
  }, [])
  return (
    <div>
      <Modal title={'设置权限'} width={800} open={visible} onCancel={handleCancel} onOk={handleSubmit}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          labelAlign='right'
          initialValues={{ menuType: 1, menuState: 1 }}
        >
          {/* 为了修改添加的form.item */}
          <Form.Item name='_id' hidden>
            <Input></Input>
          </Form.Item>
          <Form.Item label='角色名称'>{roleInfo?.roleName}</Form.Item>
          <Form.Item label='权限'>
            <Tree
              fieldNames={{ title: 'menuName', key: '_id', children: 'children' }}
              checkable
              defaultExpandAll
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              treeData={treeData}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
