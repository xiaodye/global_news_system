import { Menu, Layout } from "antd"
import React, { ReactNode, useEffect, useState } from "react"
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons"
import styles from "./index.module.scss"
import axios from "axios"
import { useHistory } from "react-router-dom"

interface menuItemType {
  id: string
  label: string
  title: string
  key: string
  pagepermisson?: 0 | 1
  grade?: number
  rightId?: number
  children?: menuItemType[]
}

type iconMapType = {
  [propName: string]: ReactNode
}

const iconList: iconMapType = {
  "/home": <UserOutlined />,
  "/user-manage": <VideoCameraOutlined />,
  "/user-manage/list": <UserOutlined />,
  "/right-manage": <UploadOutlined />,
  "/right-manage/role/list": <UserOutlined />,
  "/right-manage/right/list": <UserOutlined />,
  //.......
}

const SideMenu: React.FC = () => {
  const [collapsed] = useState(false)
  const [menuItemList, setMenuItemList] = useState<menuItemType[]>([])
  const history = useHistory()
  const [openKeys, setOpenKeys] = useState<string[]>([])

  useEffect(() => {
    axios.get("http://localhost:5001/rights?_embed=children").then((res) => {
      if (res.status !== 200) return console.error("服务器异常")
      console.log(res.data)
      setMenuItemList(res.data)
    })
  }, [])

  useEffect(() => {
    setOpenKeys(["/" + history.location.pathname.split("/")[1]])
  }, [history.location.pathname])

  /**
   * 检查菜单项的权限
   * @param item 菜单项
   * @returns 0 | 1 | undefined
   */
  const checkPagePermission = (item: menuItemType): 0 | 1 | undefined => item.pagepermisson

  /**
   * 渲染菜单
   * @param menuItemList 菜单项列表
   * @returns 待渲染的html
   */
  const renderMenu = (menuItemList: menuItemType[]) => {
    return menuItemList.map((item) => {
      if (!checkPagePermission(item)) return <></>
      if (item.children !== undefined && item.children.length > 0) {
        return (
          <Menu.SubMenu key={item.key} title={item.title} icon={iconList[item.key]}>
            {renderMenu(item.children)}
          </Menu.SubMenu>
        )
      }
      return (
        <Menu.Item key={item.key} icon={iconList[item.key]} onClick={() => history.push(item.key)}>
          {item.title}
        </Menu.Item>
      )
    })
  }

  return (
    <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
      <div className={styles.logo}>
        <span>全球新闻系统</span>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[history.location.pathname]}
        openKeys={openKeys}
        onOpenChange={(openKeys) => setOpenKeys(openKeys)}
      >
        {renderMenu(menuItemList)}
      </Menu>
    </Layout.Sider>
  )
}

export default SideMenu
