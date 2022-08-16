import { Button, Tag, Modal, Popover, Switch } from "antd"
import Table, { ColumnsType } from "antd/lib/table"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons"

type rightChildrenType = {
  id: string
  key: string
  title: string
  rightId: string
  grade: number
  pagepermisson?: 0 | 1
}

type rightType = {
  id: string
  key: string
  title: string
  pagepermisson: 0 | 1
  grade: number
  children?: rightChildrenType[]
}

const RightList: React.FC = () => {
  const [dataSource, setDataSource] = useState<rightType[]>([])

  const columns: ColumnsType<rightType> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: string) => <b>{id}</b>,
    },
    {
      title: "权限名称",
      dataIndex: "title",
    },
    {
      title: "权限路径",
      dataIndex: "key",
      render: (key: string) => <Tag color="orange">{key}</Tag>,
    },
    {
      title: "操作",
      render: (item: rightType) => (
        <div>
          <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmHandle(item)}></Button>

          <Popover
            content={
              <div style={{ textAlign: "center" }}>
                <Switch checked={item.pagepermisson === 1} onChange={() => switchHandle(item)}></Switch>
              </div>
            }
            title="页面配置项"
            trigger={item.pagepermisson === undefined ? "" : "click"}
          >
            <Button
              style={{ marginLeft: "10px" }}
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              disabled={item.pagepermisson === undefined}
            />
          </Popover>
        </div>
      ),
    },
  ]

  useEffect(() => {
    axios.get("http://localhost:5001/rights?_embed=children").then((res) => {
      res.data.forEach((item: rightType) => {
        if (item.children?.length === 0) delete item.children
        return item
      })
      setDataSource(res.data)
    })
  }, [])

  const confirmHandle = (item: rightType | rightChildrenType) => {
    Modal.confirm({
      title: "确定要删除吗？",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        if (item.grade === 1) {
          setDataSource(dataSource.filter((rightItem) => rightItem.id !== item.id))
          axios.delete(`http://localhost:5001/rights/${item.id}`)
        } else {
          const selectedRight = dataSource.filter((rightItem) => rightItem.id === (item as rightChildrenType).rightId)[0]
          selectedRight.children = selectedRight.children?.filter((rightChildrenItem) => rightChildrenItem.id !== item.id)
          setDataSource([...dataSource])
          axios.delete(`http://localhost:5001/children/${item.id}`)
        }
      },
      onCancel: () => {},
    })
  }

  const switchHandle = (item: rightType | rightChildrenType) => {
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
    setDataSource([...dataSource])
    if (item.grade === 1) {
      axios.patch(`http://localhost:5001/rights/${item.id}`, { pagepermisson: item.pagepermisson })
    } else {
      axios.patch(`http://localhost:5001/children/${item.id}`, { pagepermisson: item.pagepermisson })
    }
  }

  return <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 8 }} />
}

export default RightList
