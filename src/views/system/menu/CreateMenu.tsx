import { Modal, Form, Input, Button, Select, message,TreeSelect } from 'antd'
import { CreateMenuProps } from '@/types/modal'
import { IAction } from '@/types/modal'
import { Menu } from '@/types/api'
import { getMenuList } from '@/api/api'
import React, { useState ,useImperativeHandle} from 'react'
export default function CreateMenu(props:CreateMenuProps) {
  const [visible, setVisible] = useState(false)
  const [action,setAction]=useState<IAction>()
  const [menuList,setMenuList]=useState<Menu.MenuItem[]>()
  const [form] = Form.useForm()
  // 暴露子组件 openMoal弹窗
  useImperativeHandle(props.menuRef,()=>{
    return {
      openMoal
    }
  })

   // 获取部门列表
   const getMenuListData = async () => {
    const data = await getMenuList(form.getFieldsValue())
    setMenuList(data)
  }
  // 打开弹窗
  const openMoal=(type: IAction, data?: Menu.EditParams | {parentId: string})=>{
    setAction(type)
    //获取部门列表
    getMenuListData()
    setVisible(true)
    // 编辑的时候赋值
    if(data){
      form!.setFieldsValue(data)
    }
  }
  // 取消
  const handleCancel=()=>{
    setVisible(false)
  }
  // 提交 
  const handleSubmit=()=>{
    setVisible(false)
  }
  return (
    <div>
      <Modal width={800} open={visible} onCancel={handleCancel} onOk={handleSubmit}>
        <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} labelAlign='right'>
          {/* 为了修改添加的form.item */}
          <Form.Item name='_id' hidden>
            <Input></Input>
          </Form.Item>

          <Form.Item label='上级部门' name='parentId'>
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              placeholder='请选择上级部门'
              allowClear
              treeDefaultExpandAll
              fieldNames={{ label: 'deptName', value: '_id' }}
              treeData={menuList}
            />
            </Form.Item>
          <Form.Item label='部门名称' name='deptName' rules={[{ required: true, message: '请输入部门名称' }]}>
            <Input placeholder='请输入部门名称'></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
