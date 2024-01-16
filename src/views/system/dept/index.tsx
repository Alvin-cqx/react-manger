import { Form, Input, Button, Space, Col, Row, Table, Modal, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useState, useEffect, useRef } from 'react'
import { getDeptList, deleteDept } from '@/api/api'
import { Dept } from '@/types/api'
import CreateDept from './CreateDept'
import { IAction } from '@/types/modal'
import { ColumnsType } from 'antd/es/table'
export default function DeptList() {
  const [form] = useForm()
  const [deptList, setDeptList] = useState<Dept.DeptItem[]>([])
  const columns: ColumnsType<Dept.DeptItem> = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
      key: 'deptName',
      width: 200
    },
    {
      title: '负责人',
      dataIndex: 'userName',
      key: 'userName',
      width: 150
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 200,
      render: (text, record) => (
        <Space size='middle'>
          <Button
            type='text'
            onClick={() => {
              handeSubCreact(record._id)
            }}
          >
            新增
          </Button>
          <Button
            type='text'
            onClick={() => {
              handeEdit(record)
            }}
          >
            编辑
          </Button>
          <Button
            type='text'
            onClick={() => {
              handleDelete(record._id)
            }}
          >
            删除
          </Button>
        </Space>
      )
    }
  ]
  // 创建部门弹窗
  const deptRef = useRef<{
    openMoal: (type: IAction, data?: Dept.DeptItem | { parentId: string }) => void
  }>()
  // 获取部门列表
  const getDeptListData = async () => {
    const params = {
      deptName: form.getFieldValue('deptName')
    }

    const data = await getDeptList(params)
    setDeptList(data)
  }
  // 重置部门列表
  const resetDeptList = () => {
    form.resetFields()
    getDeptListData()
  }
  useEffect(() => {
    // const params = {
    //   deptName: form.getFieldValue('deptName')
    // }
    // console.log(params, 'form')
    getDeptListData()
  }, [])
  // 创建部门
  const handeCreate = () => {
    deptRef.current?.openMoal('create')
    getDeptListData()
  }
  // 创建子部门
  const handeSubCreact = (id: string) => {
    deptRef.current?.openMoal('create', { parentId: id })
  }
  // 删除部门
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '删除部门',
      content: '确定删除该部门吗？',
      onOk: async () => {
        await deleteDept({ _id: id })
        message.success('删除成功')
        getDeptListData()
      }
    })
  }
  // 编辑部门
  const handeEdit = (record: Dept.DeptItem) => {
    deptRef.current?.openMoal('edit', record)
  }
  return (
    <div>
      <Form className='search-form' form={form}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label='部门名称' name='deptName'>
              <Input placeholder='请输入部门名称' />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item>
              <Space>
                <Button type='primary' onClick={getDeptListData}>
                  查询
                </Button>
                <Button onClick={resetDeptList}>重置</Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='tilte'>部门列表</div>
          <div className='action'>
            <Button type='primary' onClick={handeCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey={'_id'} columns={columns} dataSource={deptList} pagination={false}></Table>
      </div>
      {/* 创建部门 */}
      <CreateDept dRef={deptRef} update={getDeptListData}></CreateDept>
    </div>
  )
}
