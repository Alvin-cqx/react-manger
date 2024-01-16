/*
 * @Author: 陈庆贤
 * @Date: 2023-11-16 10:30:42
 * @email: alvin9504@163.com
 * @LastEditors: 陈庆贤
 * @LastEditTime: 2023-11-23 11:15:15
 * @Description
 */
import { PageParams, User } from '@/types/api'
import { Button, Table, Form, Input, Select, Space, Popconfirm, message, Modal } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { useEffect, useRef, useState } from 'react'
import { usersList, userDelete } from '@/api/api'
import { CreateUser } from './CreateUser'
import { IAction } from '@/types/modal'
const { confirm } = Modal
export default function UserList() {
  // 定义弹窗
  const userRef = useRef<{
    openMoal: (type: IAction, data?: User.UserItem) => void
  }>()
  const [form] = Form.useForm()
  const [tableData, setTableData] = useState<User.UserItem[]>([])
  const [selectData, setSeLectData] = useState<User.UserItem[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  })

  // 编辑用户
  const hanlderEdit = (record: User.UserItem) => {
    userRef.current?.openMoal('edit', record)
  }
  // 删除用户
  const hanlderDelete = async (userId: number) => {
    await userDelete({ userIds: [userId] })
    message.success('删除成功!')
    getUsers({
      pageNum: 1
    })
  }
  // 表格列
  const columns: ColumnsType<User.UserItem> = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail'
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
      render(role: number) {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通用户'
        }[role]
      }
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render(state: number) {
        return {
          1: '在职',
          2: '离职',
          3: '试用期'
        }[state]
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '操作',
      key: 'address',
      render(_, record) {
        return (
          <Space>
            <Button
              type='text'
              onClick={() => {
                hanlderEdit(record)
              }}
            >
              编辑
            </Button>
            {record.state === 1 ? (
              <Popconfirm
                title='确定要删除吗?'
                onConfirm={() => {
                  hanlderDelete(record.userId as number)
                }}
                okText='确定'
                cancelText='取消'
              >
                <Button type='text' danger>
                  删除
                </Button>
              </Popconfirm>
            ) : null}
          </Space>
        )
      }
    }
  ]
  useEffect(() => {
    // 获取用户列表
    getUsers({ pageNum: pagination.current, pageSize: pagination.pageSize })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.current, pagination.pageSize])
  // 获取用户列表
  const getUsers = async (parasms: PageParams) => {
    // 获取表单数据
    const values = form.getFieldsValue()
    const res = await usersList({
      ...values,
      pageNum: parasms.pageNum,
      pageSize: parasms.pageSize || pagination.pageSize
    })
    // 造数据
    // const list = Array.from({ length: 50 })
    //   .fill({})
    //   .map((item: any) => {
    //     item = { ...res.list[0] }
    //     item.userId = Math.random()
    //     return item
    //   })
    // setTableData(list)
    setTableData(res.list)
    setTotal(res.page.total)
    setPagination({
      current: res.page.pageNum,
      pageSize: res.page.sizeSize
    })
  }
  // 搜索用户列表
  const hanlderUersList = () => {
    getUsers({
      pageNum: 1
    })
  }
  // 重置用户列表
  const resetUersList = () => {
    form.resetFields()
    hanlderUersList()
  }
  // 调用子组件
  const hanlderModal = () => {
    userRef.current?.openMoal('create')
  }
  // 表格选择
  const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: any) => {
    setSelectedRowKeys(newSelectedRowKeys)
    setSeLectData(selectedRows)
  }
  // 批量删除
  const hanlderDeleteAll = () => {
    if (selectData.length === 0) {
      message.error('请选择要删除的用户!')
      return
    }
    // 判断是否离职
    const res = selectData.every((item: any) => {
      return item.state !== 2
    })
    console.log(selectData, res)
    if (!res) {
      message.error('不能删除已离职用户！')
      return
    }
    confirm({
      title: '删除',
      content: '是否确定删除选中用户',
      onOk() {
        userDelete({ userIds: selectData.map((item: any) => item.userId) })
        message.success('删除成功!')
        getUsers({
          pageNum: 1
        })
        setSelectedRowKeys([])
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }
  // 勾选框配置
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  return (
    <div className='user-list'>
      <Form form={form} className='search-form' layout='inline' initialValues={{ state: 0, userName: '', userId: '' }}>
        <Form.Item label='用户id' name='userId'>
          <Input placeholder='请输入用户id' />
        </Form.Item>
        <Form.Item label='用户名称' name='userName'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item label='状态' name='state'>
          <Select placeholder='请选择状态' style={{ width: 120 }} allowClear>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='操作'>
          <Button type='primary' className='mr10' onClick={hanlderUersList}>
            搜索
          </Button>
          <Button type='primary' danger onClick={resetUersList}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <Button type='primary' onClick={hanlderModal}>
              新增
            </Button>
            <Button type='primary' onClick={hanlderDeleteAll} danger>
              批量删除
            </Button>
          </div>
        </div>
        <Table
          rowKey={'userId'}
          bordered
          rowSelection={{ type: 'checkbox', ...rowSelection }}
          dataSource={tableData}
          columns={columns}
          pagination={{
            current: pagination.current,
            total,
            pageSize: pagination.pageSize,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total: number) => `共 ${total} 条`,
            onChange: (current, pageSize) => {
              setPagination({
                current,
                pageSize
              })
            }
          }}
        />
      </div>
      <CreateUser
        mRef={userRef}
        update={() => {
          getUsers({
            pageNum: 1
          }),
            setSelectedRowKeys([])
        }}
      />
    </div>
  )
}
