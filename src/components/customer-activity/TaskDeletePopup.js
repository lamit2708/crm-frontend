import { Modal } from "react-bootstrap";
import React, { Component } from "react";
import TaskService from "../../services/task.service";
import moment from "moment";

export default class TaskDeletePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectItem: this.props.selectItem,
    };
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleConfirm() {
    TaskService.delete(this.props.selectItem.id).then((response) => {
      this.props.onDone();
    });
  }

  render() {
    const selectItem = this.props.selectItem;
    return (
      <Modal show={this.props.visible} onHide={this.props.onDone}>
        <Modal.Header closeButton>
          <h4>Xóa nhiệm vụ</h4>
        </Modal.Header>

        <Modal.Body>
          <div>
            <div>Nhiệm vụ: {selectItem.description}</div>
            <div>Loại: {selectItem.task_type_name}</div>
            <div>
              Lịch: {moment(selectItem.task_date).format("DD/MM/YYYY HH:mm")}
            </div>
            <div>Ưu tiên: {selectItem.task_priority_name} </div>
            <div>Trạng thái: {selectItem.task_status_name} </div>
            <div>Nhân viên chăm sóc: {selectItem.user_fullname} </div>
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
