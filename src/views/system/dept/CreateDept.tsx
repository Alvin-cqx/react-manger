import { Modal, Form, TreeSelect, Input, Select, message } from 'antd'
import { useState, useImperativeHandle, useEffect } from 'react'
import { IAction } from '@/types/modal'
import { Dept, User } from '@/types/api'
import { CreateDeptProps } from '@/types/modal'
import { getDeptList, getAllUserList, createDept, editDept } from '@/api/api'
export default function CreateDept(props: CreateDeptProps) {
  const [form] = Form.useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  const [deptList, setDeptList] = useState<Dept.DeptItem[]>()
  const [userList, setUserList] = useState<User.UserItem[]>()
  // 提交
  const handleSubmit = async () => {
    const validate = await form.validateFields()
    if (validate) {
      // 新增部门
      if (action == 'create') {
        await createDept(form.getFieldsValue())
      } else {
        await editDept(form.getFieldsValue())
      }

      message.success('操作成功!')
      handleCancel()
      // 更新父组件的列表
      props.update()
    }
  }
  // 关闭弹窗
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }
  // 暴露子组件方法
  useImperativeHandle(props.dRef, () => {
    return {
      openMoal
    }
  })
  // 打开弹窗
  const openMoal = (action: IAction, data?: Dept.DeptItem | { parentId: string }) => {
    setAction(action)
    setVisible(true)
    getDeptListData()
    // 编辑 新增
    if (data) {
      form.setFieldsValue(data)
    }
  }

  useEffect(() => {
    getDeptListData()
    getUserListData()
  }, [])
  // 获取部门列表
  const getDeptListData = async () => {
    const data = await getDeptList()
    setDeptList(data)
  }
  // 获取用户列表
  const getUserListData = async () => {
    const data = await getAllUserList()
    setUserList(data)
  }
  // const deptList = [
  //   {
  //     value: 'parent 1',
  //     title: 'parent 1',
  //     children: [
  //       {
  //         value: 'parent 1-0',
  //         title: 'parent 1-0',
  //         children: [
  //           {
  //             value: 'leaf1',
  //             title: 'leaf1'
  //           },
  //           {
  //             value: 'leaf2',
  //             title: 'leaf2'
  //           }
  //         ]
  //       },
  //       {
  //         value: 'parent 1-1',
  //         title: 'parent 1-1',
  //         children: [
  //           {
  //             value: 'leaf3',
  //             title: <b style={{ color: '#08c' }}>leaf3</b>
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ]

  return (
    <div>
      <Modal
        title={action == 'create' ? '创建部门' : '修改部门'}
        width={800}
        open={visible}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
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
              treeData={deptList}
            />
          </Form.Item>
          <Form.Item label='部门名称' name='deptName' rules={[{ required: true, message: '请输入部门名称' }]}>
            <Input placeholder='请输入部门名称'></Input>
          </Form.Item>
          <Form.Item label='负责人' name='userName' rules={[{ required: true, message: '请选中负责人' }]}>
            <Select>
              {userList?.map(item => {
                return (
                  <Select.Option value={item.userName} key={item._id}>
                    {item.userName}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
