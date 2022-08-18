import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";

export default class CtxViewEvent extends Component {
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
    };
    //onsole.log(this.props.selectEvent); //todo
  }
  onSetSelectDate(date) {
    this.setState({
      selectDate: date,
    });
  }
  onSetFromDate(date) {
    this.setState({
      start: date,
    });
  }

  onSetToDate(date) {
    this.setState({
      end: date,
    });
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onClose} size="lg">
        <Modal.Header closeButton style={{ padding: "5px 17px" }}>
          <Modal.Title>Thông tin cuộc hẹn</Modal.Title>
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
                  <input
                    disabled={true}
                    type="text"
                    id="customer"
                    className="form-control"
                    value={this.props.selectEvent.customerFullname}
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor=""
                    style={{
                      color: "#212529",
                    }}
                  >
                    Nhân viên
                  </label>
                  <input
                    disabled={true}
                    type="tel"
                    id="user"
                    className="form-control"
                    value={this.props.selectEvent.resourceName}
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
                  {/* <input
                    disabled={true}
                    type="text"
                    id="fullname"
                    className="form-control"
                    value={"aaaaa"}
                  /> */}
                  <ReactDatePicker
                    disabled
                    className="form-control"
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
                      {/* <input
                        disabled={true}
                        type="text"
                        id="fullname"
                        className="form-control"
                        value={"aaaaa"}
                      /> */}
                      <ReactDatePicker
                        disabled
                        className="form-control"
                        selected={this.state.start}
                        // onChange={(date) => setStartDate(date)}
                        onChange={(date) => {
                          this.onSetFromDate(date);
                        }}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="HH:mm"
                        timeFormat="HH:mm"
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
                      {/* <input
                        disabled={true}
                        type="tel"
                        id="phone"
                        className="form-control"
                        value={"nhaan vien"}
                      /> */}
                      <ReactDatePicker
                        disabled
                        className="form-control"
                        selected={this.state.end}
                        // onChange={(date) => setStartDate(date)}
                        onChange={(date) => {
                          this.onSetToDate(date);
                        }}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="HH:mm"
                        timeFormat="HH:mm"
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
                    disabled={true}
                    type="text"
                    id="title"
                    className="form-control"
                    value={this.state.title}
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
                    disabled={true}
                    type="tel"
                    id="phone"
                    className="form-control"
                    value={"Trạng thái"}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-12">
                  <label htmlFor="note">Nội dung</label>
                  <textarea
                    disabled
                    id="note"
                    type="text"
                    rows="3"
                    className="form-control"
                    style={{ resize: "none" }}
                    value={this.state.description}
                    onChange={(e) => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ padding: "5px 17px" }}>
          <button
            className="btn btn-primary btn-sm"
            onClick={this.props.onClose}
          >
            Đóng
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
