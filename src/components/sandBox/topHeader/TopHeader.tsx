import { Avatar, Dropdown, Layout, Menu } from "antd"
import React, { useState } from "react"
import { MenuFoldOutlined, MenuUnfoldOutlined, SmileOutlined, LogoutOutlined } from "@ant-design/icons"
import styles from "./index.module.scss"
import { ItemType } from "antd/lib/menu/hooks/useItems"

const TopHeader: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [menuItemList] = useState<ItemType[]>([
    {
      key: "item-1",
      label: "超级管理员",
      icon: <SmileOutlined />,
    },
    {
      key: "item-2",
      label: "退出登录",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ])

  return (
    <Layout.Header className={styles.header} style={{ padding: "0 20px", backgroundColor: "#fff" }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: styles.trigger,
        style: { fontSize: "20px" },
        onClick: () => setCollapsed(!collapsed),
      })}

      <div className={styles["header-rg"]}>
        <div className={styles["header-rg-tip"]}>欢迎超级管理员回来！</div>
        <Dropdown overlay={<Menu items={menuItemList} />}>
          <Avatar size={40} style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
            L
          </Avatar>
        </Dropdown>
      </div>
    </Layout.Header>
  )
}

export default TopHeader
