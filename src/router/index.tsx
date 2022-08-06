import React from "react"
import { Route, Switch } from "react-router-dom"
import Login from "../views/login/Login"
import NewsSandBox from "../views/sandbox/NewsSandBox"

export default function IndexRouter() {
  return (
    <Switch>
      <Route path={"/login"} component={Login} />
      <Route path={"/"} render={() => <NewsSandBox />} />
    </Switch>
  )
}
