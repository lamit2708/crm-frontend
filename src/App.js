import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./forms/LoginForm";
import Home from "./page/Home";
import ReceptionPage from "./page/ReceptionPage";
import ConsultantPage from "./page/ConsultantPage";
import AccountantPage from "./page/AccountantPage";
import SurgeryPage from "./page/SurgeryPage";
import CustomerCarePage from "./page/CustomerCarePage";
import CustomerListPage from "./page/CustomerListPage";
import CustomerAddPage from "./page/CustomerAddPage";
import CustomerDetailPage from "./page/CustomerDetailPage";
import StaffListPage from "./page/StaffListPage";
import StaffEditPage from "./page/StaffEditPage";
import StaffAddPage from "./page/StaffAddPage";
import LeadList from "./page/LeadListPage";
import CustomerInDayList from "./page/CustomerInDayList";
import AccountPage from "./page/AccountPage";
import GroupPage from "./page/GroupPage";
import CalendarPage from "./page/CalendarPage";
//import TestPage from "./page/TestPage";
import CustomerActivityPage from "./page/CustomerActivityPage";
import ManageServicesPage from "./page/ManageServicesPage";

function App() {
  return (
    <Switch>
      <Route
        exact
        path={["/customer/activity"]}
        component={CustomerActivityPage}
      />
      <Route exact path={["/", "/login"]} component={LoginForm} />
      <Route exact path={["/home"]} component={Home} />
      <Route exact path={["/reception"]} component={ReceptionPage} />
      <Route exact path={["/consultant"]} component={ConsultantPage} />
      <Route exact path={["/accountant"]} component={AccountantPage} />
      <Route exact path={["/surgery"]} component={SurgeryPage} />
      <Route exact path={["/postoperative"]} component={CustomerCarePage} />
      <Route exact path={["/customer/list"]} component={CustomerListPage} />
      <Route exact path={["/customer/add"]} component={CustomerAddPage} />
      <Route exact path={["/customer/detail"]} component={CustomerDetailPage} />
      <Route exact path={["/lead/list"]} component={LeadList} />
      <Route exact path={["/customer-in-day"]} component={CustomerInDayList} />

      <Route exact path={["/calendar"]} component={CalendarPage} />

      <Route exact path={["/test"]} component={ManageServicesPage} />
      <Route exact path={["/system/group"]} component={GroupPage} />
      <Route exact path={["/system/account"]} component={AccountPage} />
      <Route exact path={["/system/staff"]} component={StaffListPage} />
      <Route exact path={["/system/staff-edit"]} component={StaffEditPage} />
      <Route exact path={["/system/staff-add"]} component={StaffAddPage} />
    </Switch>
  );
}

export default App;
