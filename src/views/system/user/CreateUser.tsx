/*
 * @Author: 陈庆贤
 * @Date: 2023-11-17 12:06:12
 * @email: alvin9504@163.com
 * @LastEditors: 陈庆贤
 * @LastEditTime: 2023-11-23 11:22:07
 * @Description:
 */
import { Modal, Form, Input, Select, Upload, App } from 'antd'
import { useImperativeHandle, useRef, useState } from 'react'
import storage from '@/utils/storage'
import { UploadOutlined, PlusOutlined } from '@ant-design/icons'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import type { UploadChangeParam } from 'antd/es/upload'
import { IAction, IModalProps } from '@/types/modal'
import { User } from '@/types/api'
import { userCreate, userEdit } from '@/api/api'
import { User as UserType } from '@/types/api'
// 处理消息提示报错

export const CreateUser = (props: IModalProps) => {
  const { message } = App.useApp()
  const [form] = Form.useForm()
  const [img, setImg] = useState('')
  const [loading, setLoading] = useState(false)
  // 控制弹窗显示
  const [open, setOpen] = useState(false)
  // 判断是否新增还是修改
  const [action, setAction] = useState<IAction>('create')
  // 弹窗
  // 可以让父组件获取并执行子组件内某些自定义函数(方法)。本质上其实是子组件将自己内部的函数(方法)通过useImperativeHandle添加到父组件中useRef定义的对象中。
  // https://blog.csdn.net/weixin_57017198/article/details/132994026
  // mRef 定义什么类型,回调函数里面就要有
  // 暴露子组件 openMoal
  useImperativeHandle(props.mRef, () => ({
    openMoal
  }))
  // 打开弹窗
  const openMoal = (type: IAction, data?: User.UserItem) => {
    // 清空表单
    form.resetFields()
    setImg('')
    if (type == 'create') {
      console.log('新建用户')
    } else if (type == 'edit' && data) {
      console.log('修改用户', data)
      form.setFieldsValue(data)
      // 设置头像
      if (data?.userImg) {
        setImg(data.userImg)
      }
    }
    setAction(type)
    setOpen(true)
  }

  // 提交
  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const params = {
        ...form.getFieldsValue(),
        userImg: img
      }

      if (action == 'create') {
        await userCreate(params)
        message.success('新建用户成功')
      } else if (action == 'edit') {
        await userEdit(params)
        message.success('修改用户成功')
      }
      // 清空
      handleCancel()
      // 调用父组件刷新列表
      props.update()
    }
  }
  // 取消
  const handleCancel = () => {
    form.resetFields()
    setOpen(false)
    console.log('取消新建用户')
  }
  // 上传头像前
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('请上传jpeg/png文件格式')
      return
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('文件必须小于2M,请重新上传')
      return
    }
    return isJpgOrPng && isLt2M
  }
  // 上传头像完成后
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    } else if (info.file.status === 'done') {
      setLoading(false)
      setImg(info.file.response.data.file)
    } else {
      setLoading(false)
      message.error('服务器异常,请稍后重试!')
    }
  }
  return (
    <Modal title='新建用户' open={open} width={800} onCancel={handleCancel} onOk={handleSubmit}>
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
        {/* 为了修改成功加的隐藏字段 */}
        <Form.Item name='userId' hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label='用户名称'
          name='userName'
          rules={[
            { required: true, message: '请输入用户名称' },
            {
              min: 5,
              max: 12,
              message: '用户名称最小5个字符，最大12个字符'
            }
          ]}
        >
          <Input placeholder='请输入用户名称'></Input>
        </Form.Item>
        <Form.Item
          label='用户邮箱'
          name='userEmail'
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '邮箱格式错误' },
            { pattern: /^\w+@mars.com$/, message: '邮箱必须以@mars.com结尾' }
          ]}
        >
          <Input placeholder='请输入邮箱' disabled={action == 'edit'}></Input>
        </Form.Item>
        <Form.Item
          label='手机号'
          name='mobile'
          rules={[
            { len: 11, message: '手机号必须为11位数字' },
            { pattern: /1[1-9]\d{9}/, message: '手机号必须为1开头的11位数字' }
          ]}
        >
          <Input type='number' placeholder='请输入手机号'></Input>
        </Form.Item>
        {/*  rules={[{ required: true, message: '请输入部门' }]} */}
        <Form.Item label='部门' name='deptId'>
          <Input placeholder='请输入部门'></Input>
        </Form.Item>
        <Form.Item label='岗位' name='job'>
          <Input placeholder='请输入岗位'></Input>
        </Form.Item>
        <Form.Item label='状态' name='state' rules={[{ required: true, message: '请选择状态' }]}>
          <Select placeholder='请选择状态' style={{ width: 120 }} allowClear>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='角色' name='roleList'>
          <Input placeholder='请输入角色'></Input>
        </Form.Item>
        <Form.Item label='用户头像'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: 10 }}>{img ? <img src={img} alt='avatar' style={{ width: 100 }} /> : ''}</div>
            <Upload
              listType='picture-circle'
              showUploadList={false}
              headers={{
                Authorization: 'Bearer ' + storage.getStorage('token'),
                icode: '392B6544B1F71F20'
              }}
              action='/api/users/upload'
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              <div>
                {loading ? <UploadOutlined></UploadOutlined> : <PlusOutlined></PlusOutlined>}
                <div style={{ marginTop: 8 }}>上传头像</div>
              </div>
            </Upload>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}
