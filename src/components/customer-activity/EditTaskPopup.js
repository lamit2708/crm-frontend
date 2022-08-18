import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import customerService from "../../services/customer.service";
import taskService from "../../services/task.service";

export default class EditTaskPopup extends Component {
  constructor(props) {
    super(props);
    var listData = this.props.listData;
    var selectItem = this.props.selectItem;
    this.state = {
      taskTypeData: this.props.listData.taskTypeData,
      taskPriorityData: this.props.listData.taskPriorityData,
      taskStatusData: this.props.listData.taskStatusData,
      //selectItem: this.props.selectItem,
      description: selectItem.description,
      task_type: selectItem.task_type,
      task_status: selectItem.task_status,
      task_priority: selectItem.task_priority,
      user: selectItem.user,
      //client_id: selectItem.client_id,
      task_date: new Date(selectItem.task_date),
      isError: false,
      isDescriptionError: false,
      isUserError: false,
    };
    this.getOptionSelect = this.getOptionSelectList.bind(this);
    this.onHandleSave = this.onHandleSave.bind(this);
    this.checkTaskError = this.checkTaskError.bind(this);
    this.getErrorHtml = this.getErrorHtml.bind(this);
  }

  getOptionSelectList(data) {
    //console.log(data);
    if (data == null) return null;
    var optionList = data.map((element) => {
      return <option value={element.id}>{element.name}</option>;
    });
    return optionList;
  }
  checkTaskError() {
    var isError = this.state.user.trim() == "" || this.state.user.trim() == "";
    this.setState({
      isError: isError,
      isDescriptionError: this.state.description.trim() == "",
      isUserError: this.state.user.trim() == "",
    });

    return isError;
  }
  getErrorHtml() {
    if (this.state.isError)
      return (
        <p style={{ color: "red" }}>
          Yêu cầu: {this.state.isDescriptionError ? " *Nhiệm vụ" : ""}
          {this.state.isUserError ? " *Nhân viên" : ""}
        </p>
      );
  }
  onHandleSave() {
    if (this.checkTaskError()) {
      //console.log(this.state);
      return;
    }
    //console.log(this.state);
    var taskObj = {
      description: this.state.description,
      task_type: this.state.task_type,
      task_priority: this.state.task_priority,
      task_status: this.state.task_status,
      task_date: this.state.task_date,
      user: this.state.user,
      client_type: this.props.selectItem.client_type,
      client_id: this.props.selectItem.client_id,
      created_user: this.props.selectItem.created_user,
    };
    taskService.update(this.props.selectItem.id, taskObj).then((resposne) => {
      this.props.onDone();
    });
  }

  render() {
    return (
      <Modal show={this.props.visible} onHide={this.props.onDone} size="lg">
        <Modal.Header closeButton style={{ padding: "5px 17px" }}>
          <Modal.Title>Chỉnh sửa thông tin nhiệm vụ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card card-default">
            <div className="card-body pt-2 pb-2">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Nhiệm vụ</label>
                    <input
                      id="description"
                      value={this.state.description}
                      onChange={(e) => {
                        this.setState({ description: e.target.value });
                      }}
                      className="form-control"
                      placeholder="Nội dung"
                      type="text"
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>Loại</label>
                    <select
                      onChange={(event) => {
                        this.setState({ task_type: event.target.value });
                      }}
                      className="form-control "
                      style={{ width: "100%" }}
                      value={this.state.task_type}
                    >
                      {this.getOptionSelectList(this.state.taskTypeData)}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group f08">
                    <label>Lịch</label>
                    {/* <input className="form-control" type="date" /> */}
                    <ReactDatePicker
                      className="form-control"
                      selected={this.state.task_date}
                      //onChange={date => setStartDate(date)}
                      //timeInputLabel="Time:"
                      dateFormat="dd/MM/yyyy HH:mm"
                      //showTimeInput
                      //timeFormat="p"
                      timeFormat="HH:mm"
                      timeInputLabel="Time:"
                      //dateFormat="MM/dd/yyyy h:mm aa"
                      showTimeInput
                      //timeCaption="Time"
                      // dateFormat="h:mm aa"
                      onChange={(date) => {
                        this.setState({ task_date: date });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Ưu tiên</label>
                    <select
                      onChange={(event) => {
                        this.setState({
                          task_priority: event.target.value,
                        });
                      }}
                      value={this.state.task_priority}
                      className="form-control "
                      style={{ width: "100%" }}
                    >
                      {this.getOptionSelectList(this.state.taskPriorityData)}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Trạng thái</label>
                    <select
                      onChange={(event) => {
                        this.setState({ task_status: event.target.value });
                      }}
                      className="form-control "
                      style={{ width: "100%" }}
                      value={this.state.task_status}
                    >
                      {this.getOptionSelectList(this.state.taskStatusData)}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Nhân viên</label>
                    <input
                      id="user"
                      value={this.state.user}
                      onChange={(e) => {
                        this.setState({ user: e.target.value });
                      }}
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
            {this.getErrorHtml()}
            <div className="card-footer text-right pt-2 pb-2">
              <button
                className="btn btn-info col-md-2 mr-2"
                onClick={this.onHandleSave}
              >
                Lưu
              </button>
              <button className="btn btn-danger col-md-2">Xóa</button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }
}
