import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import AppointmentService from "../services/appointment.service";
import CustomerService from "../services/customer.service";
import UserService from "../services/user.service";
import SuggestInput from "../components/SuggestInput";
import AuthService from "../services/auth.service.js";

export default class CtxCreateEvent extends Component {
  constructor(props) {
    super(props);
    const selectSlot = this.props.selectSlot;
    console.log(selectSlot);
    this.state = {
      title: "",
      selectDate: new Date(selectSlot.start),
      start: new Date(selectSlot.start),
      end: new Date(selectSlot.end), //new Date(selectSlot.slots[1]),
      description: "",
      appointmentStatus: 1,
      customer: null,
      user: selectSlot.resourceId,
      userFullname: selectSlot.resourceName,
      isTitleError: false,
    };
    //todo
    this.selectCustomer = this.selectCustomer.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onSetSelectDate = this.onSetSelectDate.bind(this);
    this.onSetStartDate = this.onSetStartDate.bind(this);
    this.onSetEndDate = this.onSetEndDate.bind(this);
  }
  onSetSelectDate(date) {
    console.log(date);
    this.setState({
      selectDate: date,
      start: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        this.state.start.getHours(),
        this.state.start.getMinutes(),
        0
      ),
      end: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        this.state.end.getHours(),
        this.state.end.getMinutes(),
        0
      ),
    });
  }
  onSetStartDate(date) {
    console.log(date);
    this.setState({
      start: date,
    });
  }
  onSetEndDate(date) {
    console.log(date);
    this.setState({
      end: date,
    });
  }

  selectCustomer(data) {
    this.setState({
      customer: data.id,
    });
  }
  selectUser(data) {
    this.setState({
      user: data.id,
    });
  }
  onCreate() {
    if (this.state.title.trim() == "") {
      this.setState({
        isTitleError: this.state.title.trim() == "",
      });
      return;
    }
    var currentUser = AuthService.getCurrentUser();
    var appointmentObj = {
      title: this.state.title,
      description: this.state.description,
      start_date: this.state.start,
      end_date: this.state.end,
      customer: this.state.customer,
      user: this.state.user,
      created_user: currentUser.id,
    };

    AppointmentService.create(appointmentObj).then((response) => {
      //console.log(response);
      this.props.onDone();
    });
    this.props.onClose();
  }

  getErrorHtml() {
    if (
      this.state.isFullNameError ||
      this.state.isPhoneError ||
      this.state.isGenderError
    ) {
      return (
        <p style={{ color: "red" }}>
          Trường{this.state.isFullNameError ? " *Tên đăng ký" : ""}
          {this.state.isPhoneError ? " *Số điện thoại" : ""}
          {this.state.isGenderError ? " *Giới tính" : ""} đang để trống
        </p>
      );
    }
    return null;
  }
  getTimeFrom() {
    var t = new Date(this.props.selectSlot.start);
    var rs =
      t.getHours().toString().padStart(2, "0") +
      ":" +
      t.getMinutes().toString().padStart(2, "0");
    return rs;
  }

  getTimeTo() {
    var t = new Date(this.props.selectSlot.end);
    var rs =
      t.getHours().toString().padStart(2, "0") +
      ":" +
      t.getMinutes().toString().padStart(2, "0");
    return rs;
  }

  getDate() {
    var t = new Date(this.props.selectSlot.end);
    var rs = t.getDay() + "/" + (t.getMonth() + 1) + "/" + t.getFullYear();
    return rs;
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onClose} size="lg">
        <Modal.Header closeButton style={{ padding: "5px 17px" }}>
          <Modal.Title>Tạo cuộc hẹn</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "5px 10px" }}>
          <div className="card-body" style={{ padding: "10px 10px" }}>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label
                    htmlFor="customer"
                    style={{
                      color: "#212529",
                    }}
                  >
                    Khách hàng
                  </label>
                  <SuggestInput
                    className="form-control"
                    apiFunc={CustomerService.search}
                    idName="id"
                    valueName="fullname"
                    addition={["phone", "job_title"]}
                    callBackClick={this.selectCustomer}
                  />
                  {/* <input
                    type="text"
                    id="customer"
                    className="form-control"
                    // value={"aaaaa"}
                  /> */}
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="user"
                    style={{
                      color: "#212529",
                    }}
                  >
                    Nhân viên
                  </label>
                  <SuggestInput
                    className="form-control"
                    input={this.state.userFullname}
                    apiFunc={UserService.search}
                    idName="id"
                    valueName="fullname"
                    addition={["username", "email"]}
                    callBackClick={this.selectUser}
                  />
                  {/* <input
                    type="tel"
                    id="user"
                    className="form-control"
                    //value={"nhaan vien"}
                  /> */}
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label
                    htmlFor="fullname"
                    style={{
                      color: "#212529",
                    }}
                  >
                    Ngày
                  </label>
                  <ReactDatePicker
                    className="form-control"
                    selected={this.state.selectDate}
                    // onChange={(date) => setStartDate(date)}
                    onChange={(date) => {
                      this.onSetSelectDate(date);
                    }}
                    dateFormat="dd/MM/yyyy"

                    // dateFormat="h:mm aa"
                  />
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6">
                      <label
                        htmlFor="fullname"
                        style={{
                          color: "#212529",
                        }}
                      >
                        Từ
                      </label>
                      <ReactDatePicker
                        className="form-control"
                        selected={this.state.start}
                        // onChange={(date) => setStartDate(date)}
                        onChange={(date) => {
                          this.onSetStartDate(date);
                        }}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        // dateFormat="h:mm aa"
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="phone"
                        style={{
                          color: "#212529",
                        }}
                      >
                        Đến
                      </label>
                      <ReactDatePicker
                        className="form-control"
                        selected={this.state.end}
                        // onChange={(date) => setStartDate(date)}
                        onChange={(date) => {
                          this.onSetEndDate(date);
                        }}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        // dateFormat="h:mm aa"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label
                    htmlFor="title"
                    style={{
                      color: "#212529",
                    }}
                  >
                    Tiêu đề
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    onChange={(e) => {
                      this.setState({
                        title: e.target.value,
                        isTitleError: false,
                      });
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="phone"
                    style={{
                      color: "#212529",
                    }}
                  >
                    Trạng thái
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="form-control"
                    onChange={(e) => {
                      this.setState({
                        appointmentStatus: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-12">
                  <label htmlFor="note">Nội dung</label>
                  <textarea
                    id="note"
                    type="text"
                    rows="3"
                    className="form-control"
                    style={{ resize: "none" }}
                    onChange={(e) => {
                      this.setState({
                        description: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ padding: "5px 17px" }}>
          <button className="btn btn-primary btn-sm" onClick={this.onCreate}>
            Tạo mới
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={this.props.onClose}
          >
            Thoát
          </button>
          {this.getErrorHtml()}
        </Modal.Footer>
      </Modal>
    );
  }
}
