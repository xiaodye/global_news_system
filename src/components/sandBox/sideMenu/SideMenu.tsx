import { Menu, Layout } from "antd"
import React, { ReactNode, useEffect, useState } from "react"
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons"
import styles from "./index.module.scss"
import axios from "axios"
import { useHistory } from "react-router-dom"

const { Sider } = Layout
const { SubMenu } = Menu

interface menuItemType {
  id: string
  label: string
  key: string
  pagepermisson?: number
  grade?: number
  rightId?: number
  children?: menuItemType[]
  icon?: ReactNode
}

const SideMenu: React.FC = () => {
  const [collapsed] = useState(false)
  const [menuItemList, setMenuItemList] = useState<menuItemType[]>([])
  const history = useHistory()
  const [openKeys, setOpenKeys] = useState<string[]>(["/" + history.location.pathname.split("/")[1]])

  useEffect(() => {
    axios.get("http://localhost:5001/rights?_embed=children").then((res) => {
      if (res.status !== 200) return console.error("服务器异常")
      res.data.forEach((item: menuItemType) => {
        if (item.children?.length === 0) return delete item.children
        item.children = item.children?.filter((item: menuItemType) => item.pagepermisson === 1)
      })
      console.log(res.data)
      setMenuItemList(filterMenuItemList(res.data))
    })
  }, [])

  const filterMenuItemList = (itemList: menuItemType[]) => {
    return itemList.filter((item: menuItemType) => item.pagepermisson === 1)
  }

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className={styles.logo}>
        <span>全球新闻系统</span>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[history.location.pathname]}
        openKeys={openKeys}
        items={menuItemList}
        onClick={({ key }) => history.push(key)}
        onOpenChange={(openKeys) => setOpenKeys(openKeys)}
      />
    </Sider>
  )
}

export default SideMenu
