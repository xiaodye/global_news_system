import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import SideMenu from "../../components/snadBox/sideMenu/SideMenu"
import TopHeader from "../../components/snadBox/topHeader/TopHeader"
import NoPermission from "../noPermission/NoPermission"
import Home from "./home/Home"
import RightList from "./right_manage/right-list/RightList"
import RoleList from "./right_manage/role-list/RoleList"
import UserList from "./user_manage/UserList"

export default function NewsSandBox() {
  return (
    <div>
      <SideMenu />
      <TopHeader />
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
    </div>
  )
}
