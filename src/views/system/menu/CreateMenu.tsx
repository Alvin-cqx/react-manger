import { Modal, Form, Input, Button, Select, message, TreeSelect, InputNumber, Radio } from 'antd'
import { CreateMenuProps, refProps } from '@/types/modal'
import { IAction } from '@/types/modal'
import { Menu } from '@/types/api'
import { getMenuList,creatMenu ,editMenu} from '@/api/api'
import React, { useState, useImperativeHandle } from 'react'
export default function CreateMenu(props: refProps<Menu.EditParams>) {
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>()
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>()
  const [form] = Form.useForm()
  // 暴露子组件 openMoal弹窗
  useImperativeHandle(props.menuRef, () => {
    return {
      openMoal
    }
  })

  // 获取部门列表
  const getMenuListData = async () => {
    const data = await getMenuList()
    setMenuList(data)
  }
  // 打开弹窗
  const openMoal = (type: IAction, data?: Menu.EditParams | { parentId: string,orderBy:number }) => {
    setAction(type)
    //获取部门列表
    getMenuListData()
    setVisible(true)
    // 编辑的时候赋值
    if (data) {
      form.setFieldsValue(data)
    }

  }
  // 取消
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }
  // 提交 
  const handleSubmit = async() => {
    const vaild= await form.validateFields()
    if(vaild){
      // 新增
      if(action=='create'){
        await creatMenu(form.getFieldsValue())
      }else{
       
        await editMenu(form.getFieldsValue())
      }
      message.success('操作成功')
      handleCancel()
      props.update()
    }
  
  }
  return (
    <div>
      <Modal title={action == 'create' ? '创建菜单' : '编辑菜单'} width={800} open={visible} onCancel={handleCancel} onOk={handleSubmit}>
        <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} labelAlign='right' initialValues={{ menuType: 1, menuState: 1 }}>
          {/* 为了修改添加的form.item */}
          <Form.Item name='_id' hidden>
            <Input></Input>
          </Form.Item>
          

          <Form.Item label='上级菜单' name='parentId'>
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              placeholder='请选择上级菜单'
              allowClear
              treeDefaultExpandAll
              fieldNames={{ label: 'menuName', value: '_id' }}
              treeData={menuList}
            />
          </Form.Item>
          <Form.Item label='菜单类型' name='menuType' >
            <Radio.Group>
              <Radio value={1}>菜单</Radio>
              <Radio value={2}>按钮</Radio>
              <Radio value={3}>页面</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='菜单名称' name='menuName' rules={[{ required: true, message: '请输入菜单名称' }]}>
            <Input placeholder='请输入菜单名称'></Input>
          </Form.Item>

          <Form.Item shouldUpdate noStyle>
            {() => {
              return form.getFieldValue('menuType') === 2 ? (<Form.Item label='权限标识' name='menuCode' >
                <Input placeholder='请输入权限标识'></Input>
              </Form.Item>) : (<><Form.Item label='菜单图标' name='icon' >
                <Input placeholder='请输入菜单图标'></Input>
              </Form.Item>
                <Form.Item label='路由地址' name='path' >
                  <Input placeholder='请输入路由地址'></Input>
                </Form.Item></>)
            }}
          </Form.Item>

          <Form.Item label='组件名称' name='component' >
            <Input placeholder='请输入组件名称'></Input>
          </Form.Item>
          <Form.Item label='排序' name='orderBy' >
            <InputNumber placeholder='请输入排序'></InputNumber>
          </Form.Item>
          <Form.Item label='菜单状态' name='menuState' >
            <Radio.Group>
              <Radio value={1}>启用</Radio>
              <Radio value={2}>停用</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
