import React from "react"
import { HashRouter, Route, Switch } from "react-router-dom"
import Login from "../views/login/Login"
import NewsSandBox from "../views/sandbox/NewsSandBox"

export default function Router() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path={"/login"} component={Login} />
          <Route path={"/"} render={() => <NewsSandBox />} />
        </Switch>
      </HashRouter>
    </div>
  )
}
