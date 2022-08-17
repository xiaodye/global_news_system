import { Form, Input, Select } from "antd"
import React, { forwardRef, useEffect, useState } from "react"

type roleType = {
  id: number
  roleName: string
  roleType: number
  rights: string[]
}

type regionType = {
  id: number
  title: string
  value: string
}

const UserForm = forwardRef((props: { roleList: roleType[]; regionList: regionType[]; regionDisabled?: boolean }, ref: any) => {
  const [regionDisabled, setRegionDisabled] = useState(false)

  useEffect(() => {
    if (props.regionDisabled !== undefined) setRegionDisabled(props.regionDisabled)
  }, [props.regionDisabled])

  /**
   * 角色列表选取改变事件的处理函数
   * @param index 选取的option的索引+1
   */
  const selectedRoleChange = (index: number) => {
    setRegionDisabled(index === 1)
    index === 1 && ref.current.setFieldsValue({ region: "" })
  }

  return (
    <Form layout="vertical" ref={ref}>
      <Form.Item label="用户名" name={"username"} rules={[{ required: true, message: "Please input the title of collection!" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true, message: "Please input the title of collection!" }]}>
        <Input />
      </Form.Item>

      {/* 区域列表 */}
      <Form.Item
        name="region"
        label="区域"
        rules={regionDisabled ? [] : [{ required: true, message: "Please input the title of collection!" }]}
      >
        <Select disabled={regionDisabled}>
          {props.regionList.map((region) => {
            return (
              <Select.Option key={region.id} value={region.value}>
                {region.title}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>

      {/* 角色列表 */}
      <Form.Item name="roleId" label="角色" rules={[{ required: true, message: "Please input the title of collection!" }]}>
        <Select onChange={selectedRoleChange}>
          {props.roleList.map((role) => (
            <Select.Option value={role.id} key={role.id}>
              {role.roleName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
})

export default UserForm
