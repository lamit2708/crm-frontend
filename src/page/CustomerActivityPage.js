import React, { Component } from "react";
import Menu from "../components/Menu";
//import Edit from "../components/customer-activity/Edit";
import Email from "../components/customer-activity/Email";
import GeneralInfo from "../components/customer-activity/GeneralInfo";
import Task from "../components/customer-activity/Task";
import Timeline from "../components/customer-activity/Timeline";
//import TaskService from "../services/task.service";
export default class CustomerActivityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: this.props.location.state.customer,
      //taskData: null,
    };
  }
  // handleTaskRefresh() {
  //   TaskService.getAll().then((response) => {
  //     console.log(response);
  //   });
  // }
  render() {
    return (
      <div>
        <Menu history={this.props.history} />
        {/* Nav bar */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav ml-3">
            <li className="nav-item" style={{ marginRight: "10px" }}>
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="#"
                role="button"
              >
                <i className="fas fa-bars" />
              </a>
            </li>
            {/* SEARCH FORM */}
            <li className="nav-item" style={{ marginRight: "10px" }}>
              <input
                className="form-control form-control-navbar"
                type="search"
                placeholder="Tìm tài khoản"
                aria-label="Search"
                onChange={(event) => {
                  this.setState({
                    filterKeyword: event.target.value,
                  });
                }}
                onKeyUp={(event) => {
                  if (event.keyCode == 13) {
                    this.searchAccount(this.state.filterKeyword);
                  }
                }}
              />
            </li>
            <button
              className="btn btn-info"
              style={{ marginLeft: "10px" }}
              onClick={this.handleCreateCustomer}
            >
              Tạo tài khoản
            </button>
          </ul>
        </nav>

        {/* Main content */}
        <div className="content-wrapper pt-3">
          {/* Main content */}
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                {/* Tab content */}
                <div className="col-md-9">
                  <div className="card">
                    {/* Tab header */}
                    <div className="card-header p-2">
                      <ul className="nav nav-pills">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            href="#timeline"
                            data-toggle="tab"
                          >
                            Dòng hoạt động
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#task"
                            data-toggle="tab"
                          >
                            Nhiệm vụ
                          </a>
                        </li>
                        {/* <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#email"
                            data-toggle="tab"
                          >
                            Email
                          </a>
                        </li> */}
                        {/* <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#edit"
                            data-toggle="tab"
                          >
                            Chỉnh sửa
                          </a>
                        </li> */}
                      </ul>
                    </div>
                    {/* Tab body*/}
                    <div className="card-body">
                      <div className="tab-content">
                        <Timeline customer={this.state.customer} />

                        <Task
                          customer={this.state.customer}
                          //data={this.state.taskData}
                          //key={this.state.taskData}
                          //onTaskRefresh={this.handleTaskRefresh}
                        />

                        <Email />

                        {/* <Edit /> */}
                      </div>
                      {/* /.tab-content */}
                    </div>
                    {/* /.card-body */}
                  </div>
                  {/* /.nav-tabs-custom */}
                </div>

                {/* Customer  content */}
                <GeneralInfo customer={this.state.customer} />
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </section>
          {/* /.content */}
        </div>
      </div>
    );
  }
}
