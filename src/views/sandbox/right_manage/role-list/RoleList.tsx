import { Button, Modal, Table } from "antd"
import { ColumnsType } from "antd/lib/table"
import axios from "axios"
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from "react"
import { render } from "react-dom"

type roleType = {
  id: number
  roleName: string
  roleType: number
  rights: string[]
}

export default function RoleList() {
  const [dataSource, setDataSource] = useState<roleType[]>([])

  const colums: ColumnsType<roleType> = [
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
    },
    {
      title: "操作",
      render: (role: roleType) => {
        return (
          <>
            <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmHandle(role)}></Button>
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

  const confirmHandle = (role: roleType) => {
    Modal.confirm({
      title: "确定要删除吗？",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        setDataSource(dataSource.filter((data) => data.id !== role.id))
        axios.delete(`http://localhost:5001/roles/${role.id}`)
      },
    })
  }

  return <Table dataSource={dataSource} columns={colums} rowKey={(item) => item.id} />
}
