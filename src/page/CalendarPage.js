import React, { Component } from "react";
import ReactDatePicker from "react-datepicker";
import CalendarManage from "../components/CalendarManage";
import Menu from "../components/Menu";
import AppointmentService from "../services/appointment.service";

export default class CalendarPage extends Component {
  constructor(props) {
    super(props);
    //const defaultDate = new Date(2020, 10, 9);
    this.state = {
      fromDate: new Date(2020, 10, 9),
      toDate: null,
      type: "week",
      appointmentData: null,
      userData: null,
      range: null,
    };
    this.getAppointmentByDate = this.getAppointmentByDate.bind(this);
    this.getAppointmentByDate(this.state.fromDate, this.state.toDate);
    this.getAllUser = this.getAllUser.bind(this);
    this.getAllUser();
    this.handleRefresh = this.handleRefresh.bind(this);
    this.onSetFromDate = this.onSetFromDate.bind(this);
    this.getLastSunday = this.getLastSunday.bind(this);
    this.handleSelectRange = this.handleSelectRange.bind(this);
    this.assignFromToDate = this.assignFromToDate.bind(this);
  }
  searchCustomer() {}
  handleSelectRange = (selectRange) => {
    this.setState({ range: selectRange });
    this.assignFromToDate(selectRange);
  };
  assignFromToDate(selectRange) {
    if (Array.isArray(selectRange)) {
      var len = selectRange.length;
      this.setState({ fromDate: selectRange[0], toDate: selectRange[len - 1] });
    } else {
      this.setState({ fromDate: selectRange.start, toDate: selectRange.end });
    }
  }
  onSetFromDate(date) {
    if (this.state.type === "day") {
      this.setState({ fromDate: date, toDate: date });
    } else if (this.state.type === "week") {
      var LWSunday = this.getLastSunday(date);
      var Weekend = new Date();
      Weekend.setDate(LWSunday.getDate() - 7);
      this.setState({ fromDate: LWSunday, toDate: Weekend });
    }
  }
  getLastSunday(date) {
    var Sunday = new Date(date.getTime() - date.getDay() * 24 * 3600 * 1000);
    return Sunday;
  }
  handleRefresh() {
    //console.log("RUNNING REFRESH");
    this.getAppointmentByDate(this.state.fromDate, this.state.toDate);
  }
  getAppointmentByDate(from, to) {
    AppointmentService.getFilterDate(from, to).then((response) => {
      // console.log("GET ALL APPOINTMENT");
      //console.log(response.data);
      this.setState({
        appointmentData: response.data,
      });
    });
  }
  getAllUser() {
    AppointmentService.getAllUser().then((response) => {
      //console.log(response.data);
      this.setState({
        userData: response.data,
      });
    });
  }
  render() {
    return (
      <div>
        <Menu history={this.props.history} />
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav ml-3">
            <li className="nav-item" style={{ marginRight: "10px" }}>
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="#top"
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
                placeholder="Tìm Khách Hàng"
                aria-label="Search"
                onChange={(event) => {
                  this.setState({
                    filterKeyword: event.target.value,
                  });
                }}
                onKeyUp={(event) => {
                  if (event.keyCode === 13) {
                    this.searchCustomer(this.state.filterKeyword);
                  }
                }}
              />
            </li>
            {/* <button
              className="btn btn-info"
              style={{ marginLeft: "10px" }}
              onClick={this.handleCreateCustomer}
            >
              Thêm KH
            </button> */}
          </ul>

          <ul className="navbar-nav ml-auto">
            <li style={{ marginRight: "9px" }}>
              {/* <label style={{ display: "inline-block" }}>Từ ngày&nbsp;</label> */}
              <ReactDatePicker
                dateFormat="dd/MM/yyyy"
                className="form-control-navbar form-control"
                selected={this.state.fromDate}
                placeholderText="Ngày hẹn"
                onChange={(date) => {
                  this.onSetFromDate(date);
                }}
              />
            </li>
            {/* <li style={{ marginRight: "12px" }}>
              
              <ReactDatePicker
                className="form-control-navbar form-control"
                selected={this.state.toDate}
                placeholderText="Đến ngày"
                onChange={(date) => {
                  this.onSetToDate(date);
                }}
              />
            </li> */}
            <li className="nav-item" style={{ marginRight: "15px" }}>
              <button className="btn btn-info" onClick={this.handleSearchDate}>
                <i className="fas fa-search"></i>
              </button>
            </li>

            {/* <li className="nav-item" style={{ marginRight: "15px" }}>
              <button
                className="btn btn-info"
                onClick={() => {
                  this.setState({
                    fromDate: null,
                    toDate: null,
                  });
                  this.handleRefresh();
                }}
              >
                <i className="far fa-trash-alt"></i>
              </button>
            </li> */}
          </ul>
        </nav>
        <div
          className="content-wrapper"
          style={{ overflowY: "scroll", paddingTop: "20px" }}
        >
          <CalendarManage
            key={[this.state.userData, this.state.appointmentData]} // Rerender Calendar when userData or appointmentData change their values
            userData={this.state.userData}
            appointmentData={this.state.appointmentData}
            defaultDate={this.state.fromDate}
            onHandleSelectRange={this.handleSelectRange}
            onDone={() => {
              this.handleRefresh();
            }}
          />
        </div>
      </div>
    );
  }
}
