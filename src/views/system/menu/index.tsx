import { Form, Input, Button, Space, Col, Row, Table, Modal, message, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useState, useEffect, useRef } from 'react'
import { getMenuList, deleteMenu } from '@/api/api'
import { Dept, Menu } from '@/types/api'
import CreateMenu from './CreateMenu'
import { IAction } from '@/types/modal'
import { ColumnsType } from 'antd/es/table'
import AuthButton from '@/utils/AuthButton'
export default function MenuList() {
  const [form] = useForm()
  const [deptList, setDeptList] = useState<Menu.MenuItem[]>([])
  const columns: ColumnsType<Menu.MenuItem> = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName'
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
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '状态',
      dataIndex: 'menuState',
      key: 'menuState',
      render:(text, record)=>{
   
        return {
          1: '正常',
          2: '禁用'
        }[record.menuState]
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 200,
      render: (text, record) => (
        <Space size='middle'>
          {record.children?.length?<Button
            type='text'
            onClick={() => {
              handeSubCreact(record._id,record.children?.length)
            }}
          >
            新增
          </Button>:''}
          
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
  // 创建部门弹窗
  const menuRef = useRef<{
    openMoal: (type: IAction, data?: Menu.EditParams | { parentId?: string ,orderBy?: number }) => void
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
  
    getMenuListData()
  }, [])
  // 创建菜单
  const handeCreate = () => {
    menuRef.current?.openMoal('create',{orderBy:deptList.length})
  }
  // 创建菜单
  const handeSubCreact = (id: string,orderBy:number) => {
    menuRef.current?.openMoal('create', { parentId: id,orderBy })
  }
  // 删除部门
  const handleDelete = (MenuItem: Menu.MenuItem) => {
    const tip:string={
      1:'菜单',
      2:'按钮',
      3:'页面'
    }[MenuItem.menuType]
    Modal.confirm({
      title: '删除'+tip,
      content: '确定删除该'+tip+'吗？',
      onOk: async () => {
        await deleteMenu({ _id: MenuItem._id })
        message.success('删除成功')
        getMenuListData()
      }
    })
  }
  // 编辑部门
  const handeEdit = (record: Menu.MenuItem) => {
    menuRef.current?.openMoal('edit', record)
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
            <Form.Item label='状态' name='menuState'>
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
            {/* <Button type='primary' onClick={handeCreate}>
              新增
            </Button> */}
            <AuthButton auth='menu@create' type='primary' onClick={handeCreate}>新增</AuthButton>
          </div>
        </div>
        <Table bordered rowKey={'_id'} columns={columns} dataSource={deptList} pagination={false}></Table>
      </div>
      {/* 创建菜单 */}
      <CreateMenu menuRef={menuRef} update={getMenuListData}></CreateMenu>
    </div>
  )
}
