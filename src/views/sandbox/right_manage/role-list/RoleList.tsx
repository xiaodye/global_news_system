import { Button, Modal, Table, Tag, Tree } from "antd"
import { ColumnsType } from "antd/lib/table"
import axios from "axios"
import { DeleteOutlined, UnorderedListOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from "react"

type roleType = {
  id: number
  roleName: string
  roleType: number
  rights: string[]
}

const RoleList: React.FC = () => {
  const [dataSource, setDataSource] = useState<roleType[]>([])
  const [modalVisible, setModalVisible] = useState(false)
  const [rightList, setRightList] = useState([])
  const [currentRights, setCurrentRights] = useState<string[]>([])
  const [currentRoleId, setCurrentRoleId] = useState(0)

  const columns: ColumnsType<roleType> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: string) => {
        return <b>{id}</b>
      },
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
      render: (roleName: string) => <Tag color="#87d068">{roleName}</Tag>,
    },
    {
      title: "操作",
      render: (role: roleType) => {
        return (
          <>
            <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmHandle(role)} />
            <Button
              style={{ marginLeft: "10px" }}
              type="primary"
              shape="circle"
              icon={<UnorderedListOutlined />}
              onClick={() => editHandle(role)}
            />
          </>
        )
      },
    },
  ]

  useEffect(() => {
    axios.get("http://localhost:5001/roles").then((res) => {
      console.log(res.data)
      setDataSource(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:5001/rights?_embed=children").then((res) => {
      console.log(res.data)
      setRightList(res.data)
    })
  }, [])

  const confirmHandle = (role: roleType) => {
    Modal.confirm({
      title: "确定要删除吗？",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        setDataSource(dataSource.filter((data) => data.id !== role.id))
        axios.delete(`http://localhost:5001/roles/${role.id}`)
      },
      onCancel: () => {},
    })
  }

  const editHandle = (role: roleType) => {
    setCurrentRights(role.rights)
    setCurrentRoleId(role.id)
    setModalVisible(true)
  }

  const modalOkHandle = () => {
    setDataSource(dataSource.map((role) => (role.id === currentRoleId ? { ...role, rights: currentRights } : role)))
    axios.patch(`http://localhost:5001/roles/${currentRoleId}`, { rights: currentRights })
    setModalVisible(false)
  }

  const onCheck = (checkedKeys: any) => setCurrentRights(checkedKeys)

  return (
    <>
      <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id} pagination={{ pageSize: 8 }} />
      <Modal visible={modalVisible} title="权限分配" onOk={modalOkHandle} onCancel={() => setModalVisible(false)}>
        <Tree
          checkable
          checkedKeys={currentRights}
          checkStrictly
          onCheck={(checkedKeys) => onCheck(checkedKeys)}
          treeData={rightList}
        />
      </Modal>
    </>
  )
}

export default RoleList
