// import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

function Error403() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }
  return (
    <Result
      status='403'
      title='403'
      subTitle='Sorry,你暂无权限访问!'
      extra={
        <Button type='primary' onClick={handleClick}>
          Back Home
        </Button>
      }
    />
  )
}
export default Error403
