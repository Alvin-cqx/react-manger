import { Form, Input, Button, Space, Col, Row, Table, Modal, message, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useState, useEffect, useRef } from 'react'
import { getMenuList, deleteDept } from '@/api/api'
import { Dept, Menu } from '@/types/api'
import CreateMenu from './CreateMenu'
import { IAction } from '@/types/modal'
import { ColumnsType } from 'antd/es/table'
export default function MenuList() {
  const [form] = useForm()
  const [deptList, setDeptList] = useState<Menu.MenuItem[]>([])
  const columns: ColumnsType<Menu.MenuItem> = [
    {
      title: '菜单名称',
      dataIndex: 'menunName',
      key: 'menunName'
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      key: 'icon'
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render(menuType: number) {
        return {
          1: '菜单',
          2: '按钮',
          3: '页面'
        }[menuType]
      }
    },
    {
      title: '权限标识',
      dataIndex: 'menuCode',
      key: 'menuCode'
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: '组件名称',
      dataIndex: 'component',
      key: 'component'
    },
    {
      title: '创建时间',
      dataIndex: 'creatTime',
      key: 'creatTime'
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
  const getMenuListData = async () => {
    const data = await getMenuList(form.getFieldsValue())
    setDeptList(data)
  }
  // 重置部门列表
  const resetDeptList = () => {
    form.resetFields()
    getMenuListData()
  }
  useEffect(() => {
    // const params = {
    //   deptName: form.getFieldValue('deptName')
    // }
    // console.log(params, 'form')
    getMenuListData()
  }, [])
  // 创建部门
  const handeCreate = () => {
    deptRef.current?.openMoal('create')
    getMenuListData()
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
        getMenuListData()
      }
    })
  }
  // 编辑部门
  const handeEdit = (record: Menu.MenuItem) => {
    deptRef.current?.openMoal('edit', record)
  }
  return (
    <div>
      <Form className='search-form' form={form}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label='菜单名称' name='menuName'>
              <Input placeholder='请输入菜单名称' />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item label='状态' name='state'>
              <Select placeholder='请选择状态' allowClear>
                <Select.Option value='1'>正常</Select.Option>
                <Select.Option value='2'>停用</Select.Option>
              </Select>
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
          <div className='tilte'>菜单列表</div>
          <div className='action'>
            <Button type='primary' onClick={handeCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey={'_id'} columns={columns} dataSource={deptList} pagination={false}></Table>
      </div>
      {/* 创建菜单 */}
      <CreateMenu></CreateMenu>
    </div>
  )
}
