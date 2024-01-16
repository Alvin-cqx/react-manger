/*
 * @Author: 陈庆贤
 * @Date: 2023-10-10 16:33:32
 * @email: alvin9504@163.com
 * @LastEditors: 陈庆贤
 * @LastEditTime: 2023-11-15 16:28:24
 * @Description:
 */
// import { useEffect } from 'react'
// import request from '@/utils/request'
// import { formatMoney, formatNum } from '@/utils'
// import './index.less'
import style from './index.module.less'
import { Button, Form, Input, App } from 'antd'
import { login } from '@/api/api'
import { Login } from '@/types/api'
import storage from '@/utils/storage'
import { useState } from 'react'

export default function LoginFc() {
  type FieldType = {
    userName?: string
    userPwd?: string
  }
  // 处理消息提示报错
  const { message } = App.useApp()

  const [loading, setLoading] = useState(false)

  // 登录
  const onFinish = async (values: Login.params) => {
    try {
      setLoading(true)
      const res: any = await login(values)
      storage.setStorage('token', res)
      // 存token进去store
      // store.updateToken(res)
      message.success('登录成功')
      setLoading(false)
      // 为了登录返回上次退出的页面，window.location.href会刷新页面导致状态管理数据失效
      if (window.location.href.includes('callback')) {
        const strList = window.location.href?.split('callback=') as string[]
        window.location.href = strList[strList?.length - 1] || '/'
      } else {
        window.location.href = '/'
      }
    } catch (error) {
      setLoading(false)
    }
  }
  const onFinishFailed = () => {}
  return (
    <div className={style.login}>
      <div className={style.loginWrapper}>
        <div className={style.title}>系统登录</div>
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ userName: '9549587', userPwd: '826729' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            label='账号'
            name='userName'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label='密码'
            name='userPwd'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button block type='primary' htmlType='submit' loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
