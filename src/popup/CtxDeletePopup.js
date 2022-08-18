import { Modal } from "react-bootstrap";
import React, { Component } from "react";
import AppointmentService from "../services/appointment.service";
import moment from "moment";

export default class CtxDeletePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectEvent: this.props.selectEvent,
    };
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleConfirm() {
    AppointmentService.delete(this.props.selectEvent.id).then((response) => {
      this.props.onDone();
    });
  }

  render() {
    const selectEvent = this.props.selectEvent;
    return (
      <Modal show={this.props.visible} onHide={this.props.onDone}>
        <Modal.Header closeButton>
          <h4>Xóa lịch hẹn</h4>
        </Modal.Header>

        <Modal.Body>
          <div>
            <div>Hẹn: {selectEvent.realTitle}</div>
            <div>Khách: {selectEvent.customerFullname}</div>
            <div>Nhân viên:{selectEvent.resourceName}</div>
            <div>Ngày: {moment(selectEvent.start).format("DD/MM/YYYY")} </div>
            <div>
              Từ {moment(selectEvent.start).format("LT")} đến{" "}
              {moment(selectEvent.end).format("LT")}
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-danger col-4" onClick={this.handleConfirm}>
            Xóa
          </button>

          <button
            className="btn btn-secondary col-4"
            onClick={this.props.onDone}
          >
            Đóng
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
