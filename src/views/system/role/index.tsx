import { Form, Input, Button, Space, Col, Row, Table, Modal, message, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useState, useEffect, useRef } from 'react'
import { Role } from '@/types/api'
import { ColumnsType } from 'antd/es/table'
import { getRoleList, delRoleById } from '@/api/api'
import CreateRole from './CreateRole'
import SetPerimssion from './setPermission'
import { IAction } from '@/types/modal'
export default function roleList() {
  const [form] = useForm()
  const [roleList, setRoleList] = useState<Role.RoleItem[]>([])
  interface TableParams {
    roleName: string
    pageNum: number
    pageSize: number
  }
  interface Pagination {
    pageNum?: number
    pageSize?: number
    total?: number
  }
  const [tableParams, setTableParams] = useState<TableParams>({
    roleName: form.getFieldValue('roleName'),
    pageNum: 1,
    pageSize: 10
  })
  const [pagination_, setPagination] = useState<Pagination>({})
  const columns: ColumnsType<Role.RoleItem> = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
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
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <Button type='text'  onClick={() => {
              setPermission(record)
            }}>设置权限</Button>
          <Button
            type='text'
            onClick={() => {
              editRole(record)
            }}
          >
            编辑
          </Button>
          <Button
            type='text'
            danger
            onClick={() => {
              handleDelete(record)
            }}
          >
            删除
          </Button>
        </Space>
      )
    }
  ]
  // 定义子组件——创建角色
  const roleRef = useRef<{
    openMoal: (type: IAction, params?: Role.RoleItem) => void
  }>()
  // 定义子组件--设置权限
  const permissionRef= useRef<{
    openMoal: (type: IAction, params?: Role.RoleItem) => void
  }>()
  // 查询
  const getMenuListData = () => {
    setTableParams({ ...tableParams, roleName: form.getFieldValue('roleName') })
  }

  // 重置角色列表
  const resetDeptList = () => {
    form.resetFields()
    setTableParams({ ...tableParams, roleName: form.getFieldValue('roleName'), pageNum: 1, pageSize: 10 })
  }
  // 新增角色
  const handeCreate = () => {
    roleRef.current?.openMoal('create')
  }
  // 角色列表数据
  const getRoleListData = async () => {
    let res = await getRoleList(tableParams)

    setRoleList(res.list || [])
    setPagination(res.page)
  }
  // 删除角色
  const handleDelete = (item: Role.RoleItem) => {
    console.log(item, 'item')
    let pramas = { _id: item._id }
    Modal.confirm({
      title: '删除',
      content: '确定删除吗？',
      onOk: async () => {
        await delRoleById(pramas)
        message.success('删除成功')
        resetDeptList()
      }
    })
  }
  // 编辑角色
  const editRole = (item: Role.RoleItem) => {
    roleRef.current?.openMoal('edit', item)
  }
  // 设置权限
  const setPermission= (item: Role.RoleItem) => {
    permissionRef.current?.openMoal('edit', item)
  }
  // 分页  
  const onChangePagination=(pagination)=>{
    setTableParams({ ...tableParams, pageNum: pagination.current, pageSize: pagination.pageSize })
  }
  useEffect(() => {
    getRoleListData()
  }, [tableParams])
  return (
    <div>
      <Form className='search-form' form={form}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label='角色名称' name='roleName'>
              <Input placeholder='请输入角色名称' />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item>
              <Space>
                <Button type='primary' onClick={getMenuListData}>
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
          <div className='tilte'>角色列表</div>
          <div className='action'>
            <Button type='primary' onClick={handeCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table
          bordered
          rowKey={'_id'}
          columns={columns}
          dataSource={roleList}
          pagination={{
            position: ['bottomRight'],
            total: pagination_.total,
            current: pagination_.pageNum,
            pageSize: pagination_.pageSize,
            showSizeChanger: true
          }}
          onChange={onChangePagination}
        ></Table>
      </div>
     
      {/* <CreateMenu menuRef={menuRef} update={getMenuListData}></CreateMenu> */}
       {/* 创建角色 */}
      <CreateRole roleRef={roleRef} update={resetDeptList}></CreateRole>
      {/* 设置权限 */}
      <SetPerimssion roleRef={permissionRef} update={resetDeptList}></SetPerimssion>
    </div>
  )
}
