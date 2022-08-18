import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import AppointmentService from "../services/appointment.service";
import CustomerService from "../services/customer.service";
import UserService from "../services/user.service";
import SuggestInput from "../components/SuggestInput";
import AuthService from "../services/auth.service.js";

export default class CtxEditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: this.props.selectEvent.id,
      isTitleError: false,
      title: this.props.selectEvent.realTitle,
      selectDate: new Date(this.props.selectEvent.Start),
      start: new Date(this.props.selectEvent.start),
      end: new Date(this.props.selectEvent.end),
      start_slot: "",
      description: this.props.selectEvent.description,
      appointmentStatus: 1,
      customer: this.props.selectEvent.customer,
      user: this.props.selectEvent.resourceId,
      customerFullname: this.props.selectEvent.customerFullname,
    };
    this.selectUser = this.selectUser.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSetSelectDate = this.onSetSelectDate.bind(this);
    this.onSetStartDate = this.onSetStartDate.bind(this);
    this.onSetEndDate = this.onSetEndDate.bind(this);
    console.log(this.props.selectEvent); //todo
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
  onSave() {
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
      modified_date: new Date(),
      modified_user: currentUser.id,
    };

    AppointmentService.update(this.state.eventId, appointmentObj).then(
      (response) => {
        console.log(response);
        this.props.onDone();
      }
    );
    this.props.onClose();
  }
  selectUser(data) {
    this.setState({
      user: data.id,
    });
  }

  getTimeFrom() {
    var t = new Date(this.props.selectEvent.start);
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
          <Modal.Title>Sửa cuộc hẹn</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "5px 10px" }}>
          <div className="card-body" style={{ padding: "10px 10px" }}>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label
                    htmlFor="fullname"
                    style={{
                      color: "#212529",
                    }}
                  >
                    Khách hàng
                  </label>
                  <SuggestInput
                    className="form-control"
                    input={this.props.selectEvent.customerFullname}
                    apiFunc={CustomerService.search}
                    idName="id"
                    valueName="fullname"
                    addition={["phone", "job_title"]}
                    callBackClick={this.selectCustomer}
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="phone"
                    style={{
                      color: "#212529",
                    }}
                  >
                    Nhân viên
                  </label>
                  <SuggestInput
                    className="form-control"
                    input={this.props.selectEvent.resourceName}
                    apiFunc={UserService.search}
                    idName="id"
                    valueName="fullname"
                    addition={["username", "email"]}
                    callBackClick={this.selectUser}
                  />
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
                    className="form-control-navbar form-control"
                    selected={this.state.start}
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
                        className="form-control-navbar form-control"
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
                        className="form-control-navbar form-control"
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
                    htmlFor="fullname"
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
                    value={this.state.title}
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
                    id="appoitmentStatus"
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
                    id="description"
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
          <button className="btn btn-primary btn-sm" onClick={this.onSave}>
            Lưu
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={this.props.onClose}
          >
            Thoát
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
