import { Form, Input, Button, Space, Col, Row, Table, Modal, message, Select } from 'antd'
import { useState, useEffect, useRef } from 'react'
import { useForm } from 'antd/es/form/Form'
import { ColumnsType } from 'antd/es/table'
import { OrderType } from '@/types/api'
import { getOrderList, deleteOrder, orderExport } from '@/api/api'
import CreateOrder from './comp/createOrd'
import OrderDetail from './comp/orderDetail'
export default function OrderList() {
  const [form] = useForm()
  const orderRef = useRef<{ openMoal: () => void }>()
  const orderDetailRef = useRef<{ openMoal: (orderId: string) => void }>()
  interface Pagination {
    pageNum?: number
    pageSize?: number
    total?: number
  }
  interface TableParams {
    orderId: string
    userName: string
    state: number
    pageNum: number
    pageSize: number
  }
  const [tableParams, setTableParams] = useState<TableParams>({
    orderId: form.getFieldValue('orderId'),
    userName: form.getFieldValue('userName'),
    state: form.getFieldValue('state'),
    pageNum: 1,
    pageSize: 10
  })
  // 查询
  const getMenuListData = () => {
    setTableParams({
      ...tableParams,
      ...form.getFieldsValue()
    })
  }
  // 重置
  const resetDeptList = () => {
    form.resetFields()
    setTableParams({
      ...tableParams,
      ...form.getFieldsValue()
    })
  }
  // 新增
  const handeCreate = () => {
    orderRef.current?.openMoal()
  }
  // 分页
  const onChangePagination = () => {}
  const [orderList, setOrderList] = useState([])
  const [pagination_, setPagination] = useState<Pagination>({})
  const columns: ColumnsType<OrderType.OrderItem> = [
    {
      title: '订单编号',
      dataIndex: 'orderId',
      key: 'orderId'
    },
    {
      title: '城市',
      dataIndex: 'cityName',
      key: 'cityName'
    },
    {
      title: '下单地址',
      key: 'address',
      render: (text, record) => record.startAddress + '-' + record.endAddress
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '订单价格',
      dataIndex: 'orderAmount',
      key: 'orderAmount'
    },
    {
      title: '订单状态',
      key: 'state',
      render: (text, record) => {
        return {
          1: '进行中',
          2: '已完成',
          3: '超时',
          4: '取消'
        }[record.state]
      }
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '司机名称',
      dataIndex: 'driverName',
      key: 'driverName'
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <Button
            type='text'
            onClick={() => {
              getOrderDetail(record.orderId)
            }}
          >
            详情
          </Button>
          <Button type='text'>打点</Button>
          <Button type='text'>轨迹</Button>
          <Button
            type='text'
            danger
            onClick={() => {
              deleteOrderData(record._id)
            }}
          >
            删除
          </Button>
        </Space>
      )
    }
  ]

  // 获取订单列表
  const getOrderListData = async () => {
    let res = await getOrderList(tableParams)
    setOrderList(res?.list || [])
    setPagination(res.page)
  }
  // 订单详情
  const getOrderDetail = (id: string) => {
    orderDetailRef.current?.openMoal(id)
  }
  // 删除订单
  const deleteOrderData = (id: string) => {
    Modal.confirm({
      title: '删除订单',
      content: '确定删除该订单吗？',
      onOk: async () => {
        await deleteOrder({ _id: id })
        message.success('删除成功')
        getOrderListData()
      }
    })
  }
  // 导出
  const handeExport = async () => {
    await orderExport(form.getFieldsValue())
  }
  useEffect(() => {
    getOrderListData()
  }, [tableParams])
  return (
    <div>
      <Form className='search-form' form={form}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label='订单ID' name='orderId'>
              <Input placeholder='请输入订单ID' />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label='用户名称' name='userName'>
              <Input placeholder='请输入用户名称' />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label='订单状态' name='state'>
              <Select style={{ width: 120 }}>
                <Select.Option value='0'>进行中</Select.Option>
                <Select.Option value='1'>已完成</Select.Option>
                <Select.Option value='2'>超时</Select.Option>
                <Select.Option value='3'>取消</Select.Option>
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
          <div className='tilte'>订单列表</div>
          <div className='action'>
            <Button type='primary' onClick={handeCreate}>
              新增
            </Button>
            <Button onClick={handeExport}>导出</Button>
          </div>
        </div>
        <Table
          bordered
          rowKey={'_id'}
          columns={columns}
          dataSource={orderList}
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

      {/* 创建角色 */}
      <CreateOrder orderRef={orderRef} update={resetDeptList}></CreateOrder>
      {/* 设置权限 */}
      <OrderDetail orderDetailRef={orderDetailRef}></OrderDetail>
    </div>
  )
}
