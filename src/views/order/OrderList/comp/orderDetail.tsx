import { Modal, Descriptions, DescriptionsProps } from 'antd'

import { IAction } from '@/types/modal'
import React, { useState, useImperativeHandle, useEffect } from 'react'
import { OrderDetailProps } from '@/types/modal'
import { getOrderDetail } from '@/api/api'

export default function OrderDetail(props: OrderDetailProps) {
  const [visible, setVisible] = useState(false)
  const [orderDetail, setOrderDetail] = useState([])
  // 取消弹窗
  const handleCancel = () => {
    setVisible(false)
  }
  // 确定弹窗
  const handleSubmit = async () => {
    setVisible(false)
  }
  // 暴露子组件 openMoal弹窗
  useImperativeHandle(props.orderDetailRef, () => {
    return {
      openMoal
    }
  })
  const openMoal = (_id: string) => {
    // 订单详情
    getOrderDetailData(_id)
    setVisible(true)
  }

  const items = [
    {
      key: 'orderId',
      label: '订单编号',
      children: ''
    },
    {
      key: 'cityName',
      label: '下单城市',
      children: ''
    },
    {
      key: 'userName',
      label: '下单用户',
      children: ''
    },
    {
      key: 'mobile',
      label: '手机号',
      children: ''
    },
    {
      key: 'startAddress',
      label: '起点',
      children: ''
    },
    {
      key: 'endAddress',
      label: '终点',
      children: ''
    }
  ]
  // 订单详情
  const getOrderDetailData = async (id: string) => {
    let res = await getOrderDetail(id)
    Object.keys(res).forEach(key => {
      items.forEach(item => {
        if (item.key == key) {
          item.children = res[key]||"-"
        }
      })
    })
    setOrderDetail(items)
  }

  return (
    <div>
      <Modal title='订单详情' width={800} open={visible} onCancel={handleCancel} onOk={handleSubmit}>
        <Descriptions items={orderDetail} />
      </Modal>
    </div>
  )
}
