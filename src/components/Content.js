import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import Widgets from "../pages/admin/Widgets";
export default function Content() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard}></Route>
      <Route path="/dashboard" component={Dashboard}></Route>
      <Route path="/widgets" component={Widgets}></Route>
    </Switch>
  );
}
