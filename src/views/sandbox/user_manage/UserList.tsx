import { Button, FormInstance, Modal, Switch, Table, Tag } from "antd"
import { ColumnsType } from "antd/lib/table"
import axios from "axios"
import { DeleteOutlined, DotChartOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import React, { useEffect, useRef, useState } from "react"
import UserForm from "@/components/userForm"
import { Value } from "sass"

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

type userType = {
  id: number
  username: string
  password: string | number
  roleState: boolean
  default: boolean
  region: string
  roleId: number
  role: roleType
}

const UserList: React.FC = () => {
  const [dataSource, setDataSource] = useState<userType[]>([])
  const [roleList, setRoleList] = useState<roleType[]>([])
  const [regionList, setRegionList] = useState<regionType[]>([])
  const [addModalVisble, setAddModalVisble] = useState(false)
  const [updateModalVisble, setUpdateModalVisble] = useState(false)
  const [currentUser, setCurrentUser] = useState<userType>()
  const addForm = useRef<FormInstance>(null)
  const updateForm = useRef<FormInstance>(null)

  const [regionDisabled, setRegionDisabled] = useState(false)

  const columns: ColumnsType<userType> = [
    {
      title: "区域",
      dataIndex: "region",
      filters: [...regionList.map((region) => ({ text: region.title, value: region.value })), { text: "全球", value: "" }],
      onFilter: (value, user) => user.region === value,
      render: (region: string) => <Tag color="#f50">{region === "" ? "全球" : region}</Tag>,
    },
    {
      title: "角色名称",
      dataIndex: "role",
      render: (role: roleType) => <Tag color="cyan">{role.roleName}</Tag>,
    },
    {
      title: "用户名",
      dataIndex: "username",
      render: (username: string) => <b>{username}</b>,
    },
    {
      title: "用户状态",
      dataIndex: "roleState",
      render: (roleState: boolean, user: userType) => {
        return <Switch checked={roleState} disabled={user.default} onChange={() => updateUserRoleState(roleState, user)}></Switch>
      },
    },
    {
      title: "操作",
      render: (user: userType) => {
        return (
          <>
            <Button danger shape="circle" disabled={user.default} icon={<DeleteOutlined />} onClick={() => deleteUser(user)} />
            <Button
              style={{ marginLeft: "10px" }}
              type="primary"
              shape="circle"
              disabled={user.default}
              icon={<DotChartOutlined />}
              onClick={() => updateUser(user)}
            />
          </>
        )
      },
    },
  ]

  useEffect(() => {
    axios.get(`http://localhost:5001/users?_expand=role`).then((res) => setDataSource(res.data))
    axios.get("http://localhost:5001/roles").then((res) => setRoleList(res.data))
    axios.get("http://localhost:5001/regions").then((res) => setRegionList(res.data))
  }, [])

  /**
   * 确认添加用户处理函数
   */
  const addModalOkHandle = async () => {
    try {
      const form = await addForm.current?.validateFields()
      const res = await axios.post("http://localhost:5001/users", { ...form, roleState: true, default: false })

      // 类型断言和非空断言
      const newUser = res.data as userType
      newUser.role = roleList.find((role) => role.id === newUser.roleId)!
      setDataSource([...dataSource, newUser])
    } catch (err) {
      console.error(err)
    } finally {
      setAddModalVisble(false)
      addForm.current?.resetFields()
    }
  }

  /**
   * 确认更新用户处理函数
   */
  const updateModalOkHandle = async () => {
    const form = await updateForm.current?.validateFields()
    axios.patch(`http://localhost:5001/users/${currentUser?.id}`, form)
    setDataSource(
      dataSource.map((user) => {
        return user.id === currentUser?.id
          ? { ...user, ...form, role: roleList.find((role) => role.id === (form as userType).roleId) }
          : user
      })
    )
    setUpdateModalVisble(false)

    // 处理区域选择框禁用的bug
    setRegionDisabled(!regionDisabled)
  }

  /**
   * 删除用户
   * @param user 待删除的用户对象
   */
  const deleteUser = (user: userType) => {
    Modal.confirm({
      title: "确定要删除吗？",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        axios.delete(`http://localhost:5001/users/${user.id}`)
        setDataSource(dataSource.filter((data) => data.id !== user.id))
      },
      onCancel: () => {},
    })
  }

  /**
   * 更新用户的roleState
   * @param currentRoleState 用户的当前roleState
   * @param user 待更新的用户对象
   */
  const updateUserRoleState = (currentRoleState: boolean, user: userType) => {
    user.roleState = !currentRoleState
    axios.patch(`http://localhost:5001/users/${user.id}`, { roleState: user.roleState })
    setDataSource([...dataSource])
  }

  /**
   * 更新用户数据
   * @param user 待更新的用户对象
   */
  const updateUser = (user: userType) => {
    setTimeout(() => {
      setUpdateModalVisble(true)
      updateForm.current?.setFieldsValue(user)
      setRegionDisabled(user.roleId === 1)
    }, 0)
    setCurrentUser(user)
  }

  return (
    <>
      <Button type="primary" onClick={() => setAddModalVisble(true)}>
        添加用户
      </Button>

      {/* 用户列表 */}
      <Table dataSource={dataSource} columns={columns} rowKey={(user) => user.id} pagination={{ pageSize: 6 }} />

      {/* 添加用户模态框 */}
      <Modal
        visible={addModalVisble}
        title="添加用户"
        okText="确定"
        cancelText="取消"
        onOk={addModalOkHandle}
        onCancel={() => setAddModalVisble(false)}
      >
        <UserForm roleList={roleList} regionList={regionList} ref={addForm} />
      </Modal>

      {/* 更新用户模态框 */}
      <Modal
        visible={updateModalVisble}
        title="更新用户"
        okText="确定"
        cancelText="取消"
        onOk={updateModalOkHandle}
        onCancel={() => {
          setUpdateModalVisble(false)
          setRegionDisabled(!regionDisabled)
        }}
      >
        <UserForm roleList={roleList} regionList={regionList} regionDisabled={regionDisabled} ref={updateForm} />
      </Modal>
    </>
  )
}

export default UserList
