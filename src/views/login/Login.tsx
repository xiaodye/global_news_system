import { Button, Form, Input, message } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import React from "react"
import { AppName, FormContainer, LoginContainer } from "./style"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { userType } from "@/res_data_type"

const Login: React.FC = () => {
  const history = useHistory()

  /**
   * 点击登录
   * @param userInfo 用户信息
   */
  const login = async (userInfo: { username: string; password: string }) => {
    const res = await axios.get(
      `http://localhost:5001/users?username=${userInfo.username}&password=${userInfo.password}&roleState=true&_expand=role`
    )
    const userList = res.data as userType[]
    // console.log(userList)
    if (userList.length === 0) return message.error("用户名或密码错误")
    localStorage.setItem("token", JSON.stringify(userList[0]))
    message.success("登录成功")
    history.replace("/home")
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
