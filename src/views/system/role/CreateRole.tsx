import { Modal, Form, Input, Button, Select, message, TreeSelect, InputNumber, Radio } from 'antd'

import { IAction } from '@/types/modal'
import React, { useState, useImperativeHandle } from 'react'
import { roleProps } from '@/types/modal'
import { Role } from '@/types/api'
import { createRole,editRole } from '@/api/api'
export default function CreateRole(props: roleProps) {
  const [form] = Form.useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  // 取消弹窗
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }
  // 确定弹窗
  const handleSubmit =async () => {
    const vaild=await form.validateFields()
    if(vaild){
      let params=form.getFieldsValue()
      if(action=='create'){
       await createRole(params)
      }else{
        await editRole(params)
      }
      setVisible(false)
      form.resetFields()
      props.update()
      message.success('操作成功')
    }
    
  }
  // 暴露子组件 openMoal弹窗
  useImperativeHandle(props.roleRef, () => {
    return {
      openMoal
    }
  })
  const openMoal = (action: IAction,data?:Role.RoleItem) => {
    setAction(action)
    setVisible(true)
    if(data){
      form.setFieldsValue(data)
    }
  }
  return (
    <div>
      <Modal
        title={action == 'create' ? '创建角色' : '编辑角色'}
        width={800}
        open={visible}
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          labelAlign='right'
          initialValues={{ menuType: 1, menuState: 1 }}
        >
          {/* 为了修改添加的form.item */}
          <Form.Item name='_id' hidden>
            <Input></Input>
          </Form.Item>
          <Form.Item name='roleName' label='角色名称' rules={[{ required: true, message: '请输入角色名称' }]}>
            <Input placeholder='请输入角色名称'></Input>
          </Form.Item>
          <Form.Item name='remark' label='备注' >
            <Input.TextArea placeholder='请输入备注'></Input.TextArea>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
