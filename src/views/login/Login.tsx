import { Button, Form, Input } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import React from "react"
import { AppName, FormContainer, LoginContainer } from "./style"

const Login: React.FC = () => {
  const login = (detail: { username: string; password: string }) => {
    console.log(detail)
  }

  return (
    <LoginContainer>
      <FormContainer>
        <AppName>全球新闻发布管理系统</AppName>

        <Form autoComplete="off" onFinish={login} style={{ width: "100%", flex: 1, display: "flex", flexDirection: "column" }}>
          <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>
          <Form.Item style={{ marginTop: "auto" }}>
            <Button type="primary" htmlType="submit" size="large" block>
              立即登录
            </Button>
          </Form.Item>
        </Form>
      </FormContainer>
    </LoginContainer>
  )
}

export default Login
