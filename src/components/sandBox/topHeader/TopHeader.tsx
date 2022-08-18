import { Avatar, Dropdown, Layout, Menu } from "antd"
import React, { useState } from "react"
import { MenuFoldOutlined, MenuUnfoldOutlined, SmileOutlined, LogoutOutlined } from "@ant-design/icons"
import styles from "./index.module.scss"
import { ItemType } from "antd/lib/menu/hooks/useItems"
import { useHistory } from "react-router-dom"
import { MenuInfo } from "rc-menu/lib/interface"
import { userType } from "@/res_data_type"

const TopHeader: React.FC = () => {
  const history = useHistory()
  const [userInfo] = useState<userType>(JSON.parse(localStorage.getItem("token")!) as userType)
  const [collapsed, setCollapsed] = useState(false)
  const [menuItemList] = useState<ItemType[]>([
    {
      key: "item-1",
      label: userInfo.role.roleName ?? "超级管理员",
      icon: <SmileOutlined />,
    },
    {
      key: "item-2",
      label: "退出登录",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ])

  const logout = (detail: MenuInfo) => {
    if (detail.key === "item-2") {
      history.replace("/login")
      localStorage.removeItem("token")
    }
  }

  return (
    <Layout.Header className={styles.header} style={{ padding: "0 20px", backgroundColor: "#fff" }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: styles.trigger,
        style: { fontSize: "20px" },
        onClick: () => setCollapsed(!collapsed),
      })}

      <div className={styles["header-rg"]}>
        <div className={styles["header-rg-tip"]}>欢迎{userInfo.username}回来！</div>
        <Dropdown overlay={<Menu items={menuItemList} onClick={logout} />}>
          <Avatar size={40} style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
            L
          </Avatar>
        </Dropdown>
      </div>
    </Layout.Header>
  )
}

export default TopHeader
