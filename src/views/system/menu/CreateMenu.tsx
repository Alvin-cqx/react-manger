import { Modal, Form, Input, Button, Select, message } from 'antd'
import React, { useState } from 'react'
export default function CreateMenu() {
  const [visible, setVisible] = useState(true)
  const [form] = Form.useForm()
  return (
    <div>
      <Modal width={800} open={visible}>
        <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} labelAlign='right'>
          {/* 为了修改添加的form.item */}
          <Form.Item name='_id' hidden>
            <Input></Input>
          </Form.Item>

          <Form.Item label='部门名称' name='deptName' rules={[{ required: true, message: '请输入部门名称' }]}>
            <Input placeholder='请输入部门名称'></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
