import { Dropdown, Layout, Menu } from "antd"
import React, { ReactNode, useState } from "react"
import { MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined, SmileOutlined } from "@ant-design/icons"
import styles from "./index.module.scss"

const { Header } = Layout

/**
 * menuItemType
 */
interface menuItemType {
  key: string
  label: string
  danger?: boolean
  disabled?: boolean
  icon?: ReactNode
  title?: string
}

const TopHeader: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [menuItemList] = useState<menuItemType[]>([
    {
      key: "item-1",
      label: "1st menu item",
    },
    {
      key: "item-2",
      label: "menu item(disabled)",
      disabled: true,
    },
    {
      key: "item-3",
      label: "menu item icon",
      icon: <SmileOutlined />,
    },
    {
      key: "item-4",
      label: "退出登录",
      danger: true,
    },
  ])

  return (
    <Header className={styles.header} style={{ padding: "0 20px", backgroundColor: "#fff" }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: styles.trigger,
        style: { fontSize: "20px" },
        onClick: () => setCollapsed(!collapsed),
      })}

      <div className={styles.header_rg}>
        <div>欢迎admin回来</div>
        <Dropdown overlay={<Menu items={menuItemList} />}>
          <span>Hover me</span>
        </Dropdown>
      </div>
    </Header>
  )
}

export default TopHeader
