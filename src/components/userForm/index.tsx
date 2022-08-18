import { regionType, roleType, userType } from "@/res_data_type"
import { Form, Input, Select } from "antd"
import React, { forwardRef, useEffect, useState } from "react"

const UserForm = forwardRef(
  (props: { roleList: roleType[]; regionList: regionType[]; regionDisabled?: boolean; formType: "add" | "update" }, ref: any) => {
    const [regionDisabled, setRegionDisabled] = useState(false)

    const userInfo: userType = JSON.parse(localStorage.getItem("token")!)

    useEffect(() => {
      if (props.regionDisabled !== undefined) setRegionDisabled(props.regionDisabled)
    }, [props.regionDisabled])

    /**
     * 检查区域选项的禁用。1:超级管理员;2:区域管理员;3:区域编辑
     * @param region 当前选项区域
     * @returns boolan
     */
    const checkRegionDisabled = (region: regionType) => {
      if (props.formType === "update") {
        return userInfo.roleId === 1 ? false : true
      } else if (props.formType === "add") {
        return userInfo.roleId === 1 ? false : userInfo.region !== region.value
      }
    }

    /**
     * 检查角色选项的禁用。1:超级管理员;2:区域管理员;3:区域编辑
     * @param role 当前选项角色
     * @returns boolan
     */
    const checkRoleDisabled = (role: roleType) => {
      if (props.formType === "update") {
        return userInfo.roleId === 1 ? false : true
      } else if (props.formType === "add") {
        return userInfo.roleId === 1 ? false : role.id !== 3
      }
    }

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
        <Form.Item
          label="用户名"
          name={"username"}
          rules={[{ required: true, message: "Please input the title of collection!" }]}
        >
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
                <Select.Option key={region.id} value={region.value} disabled={checkRegionDisabled(region)}>
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
              <Select.Option value={role.id} key={role.id} disabled={checkRoleDisabled(role)}>
                {role.roleName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    )
  }
)

export default UserForm
