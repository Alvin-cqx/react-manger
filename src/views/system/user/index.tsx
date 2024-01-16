/*
 * @Author: 陈庆贤
 * @Date: 2023-11-16 10:30:42
 * @email: alvin9504@163.com
 * @LastEditors: 陈庆贤
 * @LastEditTime: 2023-11-30 09:23:37
 * @Description
 */

// ahooks  useAntdTable版本 封装搜索栏后
import { User, FormItem } from '@/types/api'
import { Button, Table, Space, Popconfirm, message, Modal, FormInstance } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { useEffect, useRef, useState } from 'react'
import { usersList, userDelete } from '@/api/api'
import { CreateUser } from './CreateUser'
import { Myform } from '@/views/component/Myform'
import { IAction } from '@/types/modal'
import { useAntdTable } from 'ahooks'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
const { confirm } = Modal

export default function UserList() {
  const dateFormat = 'YYYY-MM-DD'
  // 定义弹窗
  const userRef = useRef<{
    openMoal: (type: IAction, data?: User.UserItem) => void
  }>()
  // 定义表单
  const myformRef = useRef<{
    setFormData: (data: FormItem.UserFormItem) => void
    getFieldsForm: FormInstance
    pickTypeChange: (type: string) => void
  }>()

  const [selectData, setSeLectData] = useState<User.UserItem[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  // 编辑用户
  const hanlderEdit = (record: User.UserItem) => {
    userRef.current?.openMoal('edit', record)
  }
  // 删除用户
  const hanlderDelete = async (userId: number) => {
    await userDelete({ userIds: [userId] })
    message.success('删除成功!')
    submit()
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

  // 使用ahooks
  interface Result {
    total: number
    list: User.UserItem[]
  }
  const getTableData = (
    { current, pageSize }: { current: number; pageSize: number },
    formData: any
  ): Promise<Result> => {
    if (formData?.data) {
      const data = dayjs(formData.data).format(dateFormat)
      formData.data = data
    }
    return usersList({ ...formData, pageNum: current, pageSize: pageSize }).then(res => {
      return {
        total: res.page.total,
        list: res.list
      }
    })
  }

  // 封装搜索栏后 使用ahooks
  const { tableProps, search, run } = useAntdTable(getTableData, {
    form: myformRef.current?.getFieldsForm
  })

  const { submit, reset } = search

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
        submit()
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
  // 获取子组件数据
  const getFormData_ = (val: FormItem.UserFormItem) => {
    console.log('获取子组件表单数据', val)
    submit()
  }
  // 获取子组件数据
  const setFormData_ = (val: FormItem.UserFormItem) => {
    console.log('清空子组件表单数据', val)
    submit()
  }

  // 设置表单数据
  const [lableList, setLableList] = useState<FormItem.labelItem[]>([
    { type: 'input', name: 'userId', label: '用户id', placeholder: '请输入用户id' },
    { type: 'input', name: 'userName', label: '用户名称', placeholder: '请输入用户名称' },
    {
      type: 'select',
      name: 'state',
      label: '状态',
      placeholder: '请选择状态',
      allowClear: true,
      option: []
    }
    // {
    //   type: 'DatePicker',
    //   name: 'data',
    //   label: '提交时间',
    //   allowClear: true
    // }
    // {
    //   type: 'PickerType',
    //   option: [
    //     { value: 'time', label: '时间' },
    //     { value: 'date', label: '日期' },
    //     { value: 'week', label: '星期' },
    //     { value: 'month', label: '月份' }
    //   ],
    //   name: 'dataType',
    //   label: '选中范围',
    //   allowClear: false,
    //   defaultValue: 'time',
    //   onChange(val: any) {
    //     // 触发子组件下拉框
    //     myformRef.current?.pickTypeChange(val)
    //   }
    // }
  ])

  // 模拟调用接口
  const getStateOption = async () => {
    const Res = new Promise((resolve, reject) => {
      resolve([
        // { value: 0, label: '所有' },
        { value: 1, label: '在职' },
        { value: 2, label: '离职' },
        { value: 3, label: '试用期' }
      ])
    })
    const data: any = await Res
    lableList.forEach(item => {
      if (item.name == 'state') {
        item.option = data
      }
    })
    setLableList([...lableList])
    // 设置表单数据
    // myformRef.current?.setFormData({ state: '', userName: '', userId: '' })
  }

  useEffect(() => {
    getStateOption()
  }, [])

  return (
    <div className='user-list'>
      {/* 自定义表单 */}
      <Myform
        getFormData_={(val: FormItem.UserFormItem) => {
          getFormData_(val)
        }}
        // searchItem={{ state: 3, userName: '', userId: '' }}
        lableList={lableList}
        myformRef={myformRef}
        setFormData_={(val: FormItem.UserFormItem) => {
          setFormData_(val)
        }}
      ></Myform>

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
          columns={columns}
          {...tableProps}
        />
      </div>
      <CreateUser
        mRef={userRef}
        update={() => {
          // getUsers({
          //   pageNum: 1
          // }),
          // 停留在当前页
          run(
            { current: tableProps.pagination.current, pageSize: 10 },
            myformRef.current?.getFieldsForm.getFieldsValue()
          )
          setSelectedRowKeys([])
        }}
      />
    </div>
  )
}
