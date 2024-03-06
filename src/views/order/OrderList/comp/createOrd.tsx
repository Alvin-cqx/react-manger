import { Modal, Form, Input, Button, Select, message, TreeSelect, InputNumber, Radio, Row, Col, DatePicker } from 'antd'

import { IAction } from '@/types/modal'
import React, { useState, useImperativeHandle, useEffect } from 'react'
import { OrderProps } from '@/types/modal'
import { getCityList, getVehicleList,createOrder } from '@/api/api'
import { OrderType } from '@/types/api'

export default function CreateOrder(props: OrderProps) {
  const [form] = Form.useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  // 城市列表
  const [cityList, setCityList] = useState<OrderType.DictItem[]>([])
  // 车型列表
  const [carList, setCarList] = useState<OrderType.DictItem[]>([])
  // 取消弹窗
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }
  // 确定弹窗 
  const handleSubmit = async () => {
    let valid=await form.validateFields()
    if(valid){
      let data=form.getFieldsValue()
      await createOrder(data)
      setVisible(false)
      form.resetFields()
      props.update()
    }
    
  }
  // 暴露子组件 openMoal弹窗
  useImperativeHandle(props.orderRef, () => {
    return {
      openMoal
    }
  })
  const openMoal = () => {
    setVisible(true)
  }

  useEffect(() => {
    // 获取城市列表
    getCityListData()
    // 车型列表
    getVehicleListData()
  }, [])
  // 获取城市列表
  const getCityListData = async () => {
    let res = await getCityList()
    setCityList(res)
  }
  // 获取车型列表
  const getVehicleListData = async () => {
    let res = await getVehicleList()

    setCarList(res)
  }
  return (
    <div>
      <Modal
        title={action == 'create' ? '创建订单' : '编辑订单'}
        width={800}
        open={visible}
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          labelAlign='right'
          initialValues={{ payType: 1, state: 1 }}
        >
          {/* 为了修改添加的form.item */}
          <Form.Item name='_id' hidden>
            <Input></Input>
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item label='城市名称' name='cityName' rules={[{ required: true, message: '请输入城市名称' }]}>
                <Select placeholder='请选择城市名称'>
                  {cityList.map(item => {
                    return (
                      <Select.Option value={item.id} key={item.id}>
                        {item.name}
                      </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label='车型名称' name='vehicleName' rules={[{ required: true, message: '请输入车型名称' }]}>
                <Select placeholder='请选择车型名称'>
                  {carList.map(item => {   
                    return (
                      <Select.Option value={item.id} key={item.id}>
                        {item.name}
                      </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label='用户名称' name='userName' rules={[{ required: true, message: '请输入用户名称' }]}>
                <Input placeholder='请输入用户名称'></Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label='手机号' name='mobile'>
                <Input placeholder='请输入用户手机号'></Input>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label='下单开始地址' name='startAddress'>
                <Input placeholder='请输入下单开始地址'></Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label='下单结束地址' name='endAddress'>
                <Input placeholder='请输入下单结束地址'></Input>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label='订单金额' name='orderAmount' rules={[{ required: true, message: '请输入订单金额' }]}>
                <Input type='number' placeholder='请输入订单金额'></Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label='支付金额' name='userPayAmount' rules={[{ required: true, message: '请输入支付金额' }]}>
                <Input type='number' placeholder='请输入支付金额'></Input>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label='司机名称' name='driverName' rules={[{ required: true, message: '请输入司机名称' }]}>
                <Input placeholder='请输入司机名称'></Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label='支付金额' name='driverAmount' rules={[{ required: true, message: '请输入支付金额' }]}>
                <Input type='number' placeholder='请输入支付金额'></Input>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label='支付方式' name='payType'>
                <Select placeholder='请选择支付方式'>
                  <Select.Option value={1}>微信</Select.Option>
                  <Select.Option value={2}>支付宝</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label='订单状态' name='state'>
                <Select placeholder='请选订单状态'>
                  <Select.Option value={1}>进行中</Select.Option>
                  <Select.Option value={2}>已完成</Select.Option>
                  <Select.Option value={3}>超时</Select.Option>
                  <Select.Option value={4}>取消</Select.Option>
                </Select>
              </Form.Item> 
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label='用车时间' name='useTime'>
                <DatePicker  />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label='订单结束时间' name='endTime'>
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}
