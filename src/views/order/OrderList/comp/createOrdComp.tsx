import { Modal, Form, Input, Button, Select, message, TreeSelect, InputNumber, Radio, Row, Col, DatePicker } from 'antd'

import { IAction } from '@/types/modal'
import React, { useState, useImperativeHandle, useEffect } from 'react'
import { OrderProps } from '@/types/modal'
import { getCityList, getVehicleList, createOrder } from '@/api/api'
import { OrderType } from '@/types/api'
import FormRender, { useForm } from 'form-render'
export default function CreateOrdComp(props: OrderProps) {
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
    let valid = await form.validateFields()
    if (valid) {
      let getValues = form.getValues()
      console.log(getValues)
      await createOrder(getValues)
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
  const form = useForm()

  const schema = {
    type: 'object',
    column: 2,
    displayType: 'row',
    properties: {
      cityName: {
        title: '城市名称',
        placeholder: '请选择城市名称',
        type: 'number',
        widget: 'select',
        required: true,
        props: {
          options: []
        }
      },
      vehicleName: {
        title: '车型名称',
        placeholder: '请选择车型名称',
        type: 'number',
        widget: 'select',
        required: true,
        props: {
          options: []
        }
      },
      userName: {
        title: '用户名称',
        placeholder: '请输入用户名称',
        type: 'string',
        widget: 'input'
      },
      mobile: {
        title: '手机号',
        placeholder: '请输入手机号',
        type: 'string',
        widget: 'input'
      },
      startAddress: {
        title: '下单开始地址',
        placeholder: '请输入下单开始地址',
        type: 'string',
        widget: 'input'
      },
      endAddress: {
        title: '下单结束地址',
        placeholder: '请输入下单结束地址',
        type: 'string',
        widget: 'input'
      },
      orderAmount: {
        title: '订单金额',
        type: 'string',
        widget: 'orderAmount'
      },
      userPayAmount: {
        title: '支付金额',
        type: 'string',
        widget: 'userPayAmount'
      },
      driverName: {
        title: '司机名称',
        placeholder: '请输入司机名称',
        type: 'string',
        widget: 'input'
      },
      driverAmount: {
        title: '司机支付金额',
        type: 'string',
        widget: 'driverAmount'
      },
      payType: {
        title: '支付方式',
        placeholder: '请选择支付方式',
        type: 'number',
        widget: 'select',
        required: true,
        props: {
          options: [
            { label: '微信', value: 1 },
            { label: '支付宝', value: 2 }
          ]
        }
      },
      state: {
        title: '订单状态',
        placeholder: '请选择订单状态',
        type: 'number',
        widget: 'select',
        required: true,
        props: {
          options: [
            { label: '进行中', value: 1 },
            { label: '已完成', value: 2 },
            { label: '超时', value: 3 },
            { label: '取消', value: 4 }
          ]
        }
      },
      useTime: {
        title: '用车时间',
        type: 'string',
        widget: 'datePicker'
      },
      endTime: {
        title: '订单结束时间',
        type: 'string',
        widget: 'datePicker'
      }
    }
  }
  const validateMessages = {
    required: '${label}不能为空'
  }
  const orderAmount = (props: any) => {
    const { value, onChange } = props
    return (
      <Input type='number' value={value} onChange={e => onChange(e.target.value)} placeholder='请输入订单金额'></Input>
    )
  }
  const userPayAmount = (props: any) => {
    const { value, onChange } = props
    return <Input type='number' value={value} onChange={e => onChange(e.target.value)} placeholder='请输入支付金额'></Input>
  }
  const driverAmount = (props: any) => {
    const { value, onChange } = props
    return <Input type='number' value={value} onChange={e => onChange(e.target.value)} placeholder='请输入司机支付金额'></Input>
  }
  // 异步加载form
  const onMount = async () => {
    let cityRes = await getCityList()
    let cityList = cityRes.map(item => {
      return {
        label: item.name,
        value: item.id
      } 
    })
    let vehicleRes = await getVehicleList()
    let vehicleist = vehicleRes.map(item => { 
      return {
        label: item.name,
        value: item.id
      }
    })
    // 根据服务端下发内容，重置下拉选项
    form.setSchemaByPath('cityName', {
      props: {
        options: cityList
      }
    })
    // 根据服务端下发内容，重置下拉选项
    form.setSchemaByPath('vehicleName', { 
      props: {
        options: vehicleist
      }
    })
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
        <FormRender
          validateMessages={validateMessages}
          labelCol={{ span: 8 }}
          fieldCol={14}
          form={form}
          schema={schema}
          onMount={onMount}
          maxWidth={360}
          widgets={{ orderAmount, userPayAmount, driverAmount }}
        />
      </Modal>
    </div>
  )
}
