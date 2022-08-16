import SideMenu from "@/components/sandBox/sideMenu/SideMenu"
import TopHeader from "@/components/sandBox/topHeader/TopHeader"
import { Layout } from "antd"
import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import NoPermission from "../noPermission/NoPermission"
import Home from "./home/Home"
import RightList from "./right_manage/right-list/RightList"
import RoleList from "./right_manage/role-list/RoleList"
import UserList from "./user_manage/UserList"
import "./index.scss"

const { Content } = Layout

const NewsSandBox: React.FC = () => {
  return (
    <Layout className="sandBox">
      <SideMenu />
      <Layout className="site-layout">
        <TopHeader />

        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            overflow: "auto",
          }}
        >
          <Switch>
            <Route path={"/home"} component={Home} />
            <Route path={"/user-manage/list"} component={UserList} />
            <Route path={"/right-manage/role/list"} component={RoleList} />
            <Route path={"/right-manage/right/list"} component={RightList} />

            {/* 重定向 */}
            <Redirect from="/" to={"/home"} exact />
            {/* 403页面 */}
            <Route path={"*"} component={NoPermission} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}

export default NewsSandBox
