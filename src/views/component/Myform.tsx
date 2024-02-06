import { Button, Form, Input, Select, DatePicker, TimePicker, Space } from 'antd'
import { useEffect, useImperativeHandle, useState } from 'react'
import { FormItem } from '@/types/api'
import { FormProps } from '@/types/modal'

export const Myform = (props: FormProps) => {

  const [form] = Form.useForm()
  // 设置表单默认数据
  const [initialValues, setInitialValues] = useState<FormItem.UserFormItem>(props.searchItem as FormItem.UserFormItem)
  // 向父组件传递数据
  const sendFormData_ = () => {
    props.getFormData_(form.getFieldsValue() as FormItem.UserFormItem)
  }
  // 置空表单
  const setFormData_ = () => {
    form.resetFields()
    props.setFormData_(form.getFieldsValue() as FormItem.UserFormItem)
  }
  // 暴露子组件 表单的方法
  useImperativeHandle(props.myformRef, () => ({
    setFormData,
    pickTypeChange,
    getFieldsForm: form
  }))
  // 设置表单数据
  const setFormData = (val: any) => {
    form.setFieldsValue(val)
  }

  // 下拉框联动事件 组件
  const [type, setType] = useState('time')
  // 选中范围下拉框
  const pickTypeChange = (value: string) => {
    setType(value)
  }
  // 获取每个时间选择器时间
  const pickTypeDataChange = (value: any) => {
    console.log('PickerWithTypeChange', value)
    form.setFieldValue('year', value)
  }
  const PickerWithType = ({ type, change, name }: { type: any; change: any; name: string }) => {
    if (type === 'time')
      return (
        <Form.Item name={name}>
          <TimePicker onChange={change} />
        </Form.Item>
      )
    if (type === 'date')
      return (
        <Form.Item name={name}>
          <DatePicker onChange={change} />
        </Form.Item>
      )
    return (
      <Form.Item name={name}>
        <DatePicker picker={type} onChange={change} />
      </Form.Item>
    )
  }

  // 渲染表单item
  const renderFormItem = (item: FormItem.labelItem) => {
    switch (item.type) {
      case 'input':
        return (
          <Form.Item label={item.label} name={item.name} key={item.name}>
            <Input placeholder={item.placeholder} allowClear={item.allowClear} />
          </Form.Item>
        )
      case 'DatePicker':
        return (
          <Form.Item label={item.label} name={item.name} key={item.name}>
            <DatePicker format={'YYYY-MM-DD'} />
          </Form.Item>
        )
      case 'PickerType':
        return (
          <Form.Item label={item.label} key={item.name}>
            <Space>
              <Select
                placeholder={item.placeholder}
                onChange={item.onChange}
                allowClear={item.allowClear}
                defaultValue={item.defaultValue}
                style={{ width: 120 }}
              >
                {(item.option as any[]).length ? (
                  (item.option as any[]).map((select, index) => {
                    return (
                      <Select.Option key={index} value={select.value}>
                        {select.label}
                      </Select.Option>
                    )
                  })
                ) : (
                  <>
                    return (
                    <Select.Option key='none' value=''>
                      暂无数据
                    </Select.Option>
                    )
                  </>
                )}
              </Select>

              <PickerWithType type={type} name={item.name} change={pickTypeDataChange} />
            </Space>
          </Form.Item>
        )
      case 'select':
        return (
          <Form.Item label={item.label} name={item.name} key={item.name}>
            <Select
              placeholder={item.placeholder}
              onChange={item.onChange}
              allowClear={item.allowClear}
              style={{ width: 120 }}
            >
              {(item.option as any[]).length ? (
                (item.option as any[]).map((select, index) => {
                  return (
                    <Select.Option key={index} value={select.value}>
                      {select.label}
                    </Select.Option>
                  )
                })
              ) : (
                <>
                  return (
                  <Select.Option key='none' value=''>
                    暂无数据
                  </Select.Option>
                  )
                </>
              )}
            </Select>
          </Form.Item>
        )
      default:
        return <></>
    }
  }
  return (
    <Form form={form} className='search-form' layout='inline' initialValues={initialValues}>
      {props.lableList.map(item => {
        return renderFormItem(item)
      })}
      {/* <Form.Item label='用户id' name='userId'>
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
      </Form.Item> */}
      <Form.Item label='操作'>
        <Button type='primary' className='mr10' onClick={sendFormData_}>
          搜索
        </Button>
        <Button type='primary' className='mr10' onClick={setFormData_}>
          重置
        </Button>
      </Form.Item>
    </Form>
  )
}
