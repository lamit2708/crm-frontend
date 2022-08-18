import React, { Component } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TaskService from "../../services/task.service";
import moment from "moment";
import TaskDeletePopup from "./TaskDeletePopup";
import EditTaskPopup from "./EditTaskPopup";
import authService from "../../services/auth.service";
// var data = [
//   {
//     //id: 1,
//     title: "Gửi hồ sơ khách hàng",
//     body:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//     status: "Đã hoàn thành",
//     start_date: "10/05/2020",
//     end_date: "20/05/2020",
//     staff_name: "Hoàng Minh Quân",
//   },
//   {
//     //id: 2,
//     title: "Hẹn khách tái khám",
//     body:
//       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
//     status: "Bắt đầu",
//     start_date: "10/05/2020",
//     end_date: "20/05/2020",
//     staff_name: "Hoàng Minh Quân",
//   },
//   {
//     //id: 3,
//     title: "Gọi hỏi thăm khách sau phẫu thuật",
//     body:
//       "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
//     status: "Chưa bắt đầu",
//     start_date: "10/05/2020",
//     end_date: "20/05/2020",
//     staff_name: "Hoàng Minh Quân",
//   },
// ];

export default class Task extends Component {
  constructor(props) {
    super(props);
    var today = new Date();
    var currentUserId = authService.getCurrentUser().id;
    this.state = {
      taskDate: today.setHours(today.getHours() + 1, 0, 0, 0),
      description: "",
      task_type: 1,
      task_status: 1,
      task_priority: 1,
      user: currentUserId,
      created_user: currentUserId,
      client_id: this.props.customer.id,
      taskData: null,
      taskTypeData: null,
      taskPriorityData: null,
      taskStatusData: null,
      showDeletePopup: false,
      selectItem: null,
      isTaskTypeError: false,
      isTaskPriorityError: false,
      isTaskStatusError: false,
      isTaskDateError: false,
      showEditTaskPopup: false,
    };
    this.getAllTask = this.getAllTask.bind(this);
    this.getAllTask();
    this.onHandleCreate = this.onHandleCreate.bind(this);
    this.onSetTaskDate = this.onSetTaskDate.bind(this);
    this.taskBuilder = this.taskBuilder.bind(this);
    this.onShowDeletePopup = this.onShowDeletePopup.bind(this);
    //this.onClickDelete = this.onHandleDelete.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.getAllTaskType = this.getAllTaskType.bind(this);
    this.getAllTaskPriority = this.getAllTaskPriority.bind(this);
    this.getAllTaskStatus = this.getAllTaskStatus.bind(this);
    this.onTaskTypeChange = this.onTaskTypeChange.bind(this);
    this.onTaskPriorityChange = this.onTaskPriorityChange.bind(this);
    this.onTaskStatusChange = this.onTaskStatusChange.bind(this);
    this.getErrorHtml = this.getErrorHtml.bind(this);
    this.onShowEditTaskPopup = this.onShowEditTaskPopup.bind(this);
  }
  onShowEditTaskPopup() {
    if (this.state.showEditTaskPopup == false) return null;
    var listData = {
      taskTypeData: this.state.taskTypeData,
      taskPriorityData: this.state.taskPriorityData,
      taskStatusData: this.state.taskStatusData,
    };
    return (
      <EditTaskPopup
        visible={this.state.showEditTaskPopup}
        onDone={() => {
          this.setState({ showEditTaskPopup: false, selectItem: null });
          this.handleRefresh();
        }}
        selectItem={this.state.selectItem}
        listData={listData}
      />
    );
  }
  onShowDeletePopup() {
    if (this.state.showDeletePopup == false) return null;
    //console.log(this.state.selectItem);

    return (
      <TaskDeletePopup
        visible={this.state.showDeletePopup}
        onDone={() => {
          this.setState({ showDeletePopup: false, selectItem: null });
          //this.getAllTask();
          this.handleRefresh();
        }}
        selectItem={this.state.selectItem}
      />
    );
    //TaskService.delete().then((response) => {});
  }
  // onHandleDelete() {
  //   this.setState({
  //     showDeletePopup: true,
  //     //selectItem: el,
  //   });
  // }
  onTaskTypeChange(event) {
    //var id = event.target.value;
    this.setState({ task_type: event.target.value });
  }
  onTaskStatusChange(event) {
    //var id = event.target.value;
    this.setState({ task_status: event.target.value });
  }
  onTaskPriorityChange(event) {
    //var id = event.target.value;
    this.setState({ task_priority: event.target.value });
  }
  getAllTaskType() {
    if (this.state.taskTypeData == null) {
      TaskService.getAllTaskType().then((response) => {
        this.setState({ taskTypeData: response.data });
      });
      return null;
    } else {
      var taskTypeList = this.state.taskTypeData.map((element) => {
        return <option value={element.id}>{element.name}</option>;
      });
      return taskTypeList;
    }
  }
  getAllTaskPriority() {
    if (this.state.taskPriorityData == null) {
      TaskService.getAllTaskPriority().then((response) => {
        this.setState({ taskPriorityData: response.data });
      });
      return null;
    } else {
      var taskPriorityList = this.state.taskPriorityData.map((element) => {
        return <option value={element.id}>{element.name}</option>;
      });
      return taskPriorityList;
    }
  }
  getAllTaskStatus() {
    if (this.state.taskStatusData == null) {
      TaskService.getAllTaskStatus().then((response) => {
        this.setState({ taskStatusData: response.data });
        return null;
      });
    } else {
      var taskStatusList = this.state.taskStatusData.map((element) => {
        return <option value={element.id}>{element.name}</option>;
      });
      return taskStatusList;
    }
  }
  getAllTask() {
    //console.log(this.state.created_user);
    TaskService.getAllBy(this.state.client_id, this.state.created_user).then(
      (response) => {
        //console.log(response);
        this.setState({ taskData: response.data });
      }
    );
  }
  getErrorHtml() {
    if (
      this.state.isDescriptionError ||
      this.state.isTaskPriorityError ||
      this.state.isTaskStatusError ||
      this.state.isTaskTypeError
    ) {
      return (
        <div style={{ color: "red" }}>
          Yêu cầu:{this.state.isDescriptionError ? " *Nhiệm vụ" : ""}
          {this.state.isTaskTypeError ? " *Loại" : ""}
          {this.state.isTaskPriorityError ? " *Ưu tiên" : ""}
          {this.state.isTaskStatusError ? " *Trạng thái" : ""}
          {this.state.isTaskDateError
            ? " *Chọn lịch sau thời điểm hiện tại"
            : ""}
        </div>
      );
    }
  }
  onHandleCreate() {
    var now = moment();
    if (
      this.state.description.trim() == "" ||
      this.state.task_type == null ||
      this.state.task_priority == null ||
      this.state.task_status == null ||
      now.isAfter(this.state.taskDate)
    ) {
      this.setState({
        isTaskTypeError: this.state.task_type == null,
        isTaskPriorityError: this.state.task_priority == null,
        isTaskStatusError: this.state.task_status == null,
        isTaskDateError: now.isAfter(this.state.taskDate),
        isDescriptionError: this.state.description.trim() == "",
      });
      return;
    }
    var taskObj = {
      task_date: moment(this.state.taskDate).format("YYYY-MM-DDTHH:mm"),
      client_id: this.state.client_id,
      client_type: true,
      description: this.state.description,
      task_type: this.state.task_type,
      task_priority: this.state.task_priority,
      task_status: this.state.task_status,
      user: this.state.user,
      created_user: this.state.created_user,
    };
    TaskService.create(taskObj).then((response) => {
      //console.log(response);
      //this.props.onDone();
      // this.props.history.push({
      //   pathname: "/task",
      //   //state: { customer: data },
      // });

      this.getAllTask();
    });
  }
  handleRefresh() {
    this.getAllTask();
  }
  onSetTaskDate(date) {
    this.setState({
      taskDate: date,
    });
  }
  taskBuilder() {
    //data.map
    if (this.state.taskData == null) return;
    return this.state.taskData.map((el) => {
      return (
        <div className="card card-default">
          {/* /.card-header */}
          <div className="card-header pt-2 pb-2 bg-warning">
            <h3 className="card-title">{el.description}</h3>
            <div className="card-tools">
              <button
                onClick={() => {
                  this.setState({ showEditTaskPopup: true, selectItem: el });
                }}
                type="button"
                className="btn btn-tool"
              >
                <i className="fas fa-edit" />
              </button>
              <button
                type="button"
                className="btn btn-tool"
                data-card-widget="collapse"
              >
                <i className="fas fa-minus" />
              </button>
              <button
                type="button"
                className="btn btn-tool"
                // data-card-widget="remove"
                onClick={() => {
                  this.setState({
                    showDeletePopup: true,
                    selectItem: el,
                  });
                  // this.handleRefresh();
                }}
              >
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
          {/* /.card-body */}
          <div className="card-body pt-2 pb-2">
            <div className="row">
              {/* <div className="col-md-12">
                <div className="form-group">
                  <strong>Nhiệm vụ</strong>
                  <p className="text-muted pl-1">{el.body}</p>
                </div>
              </div> */}
              <div className="col-md-4">
                <div className="form-group">
                  <strong>Loại</strong>
                  <p className="text-muted pl-1">{el.task_type_name}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <strong>Lịch</strong>
                  <p className="text-muted pl-1">
                    {moment(el.task_date).format("DD/MM/YYYY HH:mm")}
                  </p>
                </div>
              </div>
              {/* <div className="col-md-4">
                <div className="form-group">
                  <strong>Ngày kết thúc</strong>
                  <p className="text-muted pl-1">{el.end_date}</p>
                </div>
              </div> */}
              <div className="col-md-4">
                <div className="form-group">
                  <strong>Ưu tiên</strong>
                  <p className="text-muted pl-1">{el.task_priority_name}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <strong>Trạng thái</strong>
                  <p className="text-muted pl-1">{el.task_status_name}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <strong>Nhân viên chăm sóc</strong>
                  <p className="text-muted pl-1">{el.user_fullname}</p>
                </div>
              </div>
              {/* <div className="col-md-8">
                <div className="form-group">
                  <strong>Tập tin đính kèm</strong>
                  <div>
                    <div className="btn btn-default btn-sm btn-file mr-2">
                      <i className="fas fa-paperclip" /> Hồ sơ khách hàng
                      <input type="file" name="attachment" />
                    </div>

                    <div className="btn btn-default btn-sm btn-file">
                      <i className="fas fa-phone-volume" /> Cuộc gọi 14/10/2020
                      <input type="file" name="attachment" />
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    //console.log(this.props.customer);
    return (
      <div className="tab-pane" id="task" history={this.props.history}>
        <div className="card card-default">
          {/* /.card-header */}
          <div className="card-header pt-2 pb-2 bg-info">
            <h3 className="card-title">Tạo nhiệm vụ mới</h3>
            <div className="card-tools">
              <button
                type="button"
                className="btn btn-tool"
                data-card-widget="collapse"
              >
                <i className="fas fa-minus" />
              </button>
            </div>
          </div>
          {/* /.card-body */}
          <div className="card-body pt-2 pb-2">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Nhiệm vụ</label>
                  <input
                    id="description"
                    className="form-control"
                    placeholder="Nội dung"
                    type="text"
                    onChange={(e) => {
                      this.setState({
                        description: e.target.value,
                        isDescriptionError: false,
                      });
                    }}
                  />
                </div>
              </div>

              {/* <div className="col-md-12">
                <div className="form-group">
                  <label>Nội dung</label>
                  <textarea
                    class="form-control"
                    rows="3"
                    placeholder="Nhập nội dung ..."
                    style={{ resize: "none" }}
                  ></textarea>
                </div>
              </div> */}
              <div className="col-md-4">
                <div className="form-group">
                  <label>Loại</label>
                  <select
                    className="form-control "
                    onChange={(event) => {
                      this.setState({ task_type: event.target.value });
                    }}
                    style={{ width: "100%" }}
                    value={1}
                  >
                    {/* <option selected disabled>
                      ---
                    </option> */}
                    {this.getAllTaskType()}
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Lịch</label>
                  {/* <input className="form-control" type="date" /> */}
                  <ReactDatePicker
                    className="form-control"
                    //selected={startDate}
                    //onChange={date => setStartDate(date)}
                    //timeInputLabel="Time:"
                    dateFormat="dd/MM/yyyy HH:mm"
                    //showTimeInput
                    //timeFormat="p"
                    timeFormat="HH:mm"
                    // excludeTimes={[
                    //   setHours(setMinutes(new Date(), 0), 17),
                    //   setHours(setMinutes(new Date(), 30), 18),
                    //   setHours(setMinutes(new Date(), 30), 19),
                    //   setHours(setMinutes(new Date(), 30), 17),
                    // ]}
                    //dateFormat="MMMM d, yyyy  h:mm aa"
                    //selected={this.state.end}
                    // onChange={(date) => setStartDate(date)}
                    // onChange={(date) => {
                    //   this.onSetEndDate(date);
                    // }}

                    // showTimeSelectOnly
                    showTimeSelect
                    timeIntervals={15}
                    selected={this.state.taskDate}
                    onChange={(date) => {
                      this.onSetTaskDate(date);
                    }}
                    //timeCaption="Time"
                    // dateFormat="h:mm aa"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Ưu tiên</label>
                  <select
                    onChange={(event) => {
                      this.setState({ task_priority: event.target.value });
                    }}
                    value={1}
                    className="form-control "
                    style={{ width: "100%" }}
                  >
                    {/* <option selected disabled>
                      ---
                    </option> */}
                    {/* <option defaultValue="1">Cao</option>
                    <option value="2">Bình thường</option>
                    <option value="3">Thấp</option> */}
                    {this.getAllTaskPriority()}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Trạng thái</label>
                  <select
                    className="form-control "
                    onChange={(e) => {
                      this.setState({ task_status: e.target.value });
                    }}
                    style={{ width: "100%" }}
                    value={1}
                  >
                    {/* <option selected disabled>
                      ---
                    </option> */}
                    {this.getAllTaskStatus()}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Nhân viên</label>
                  <input
                    id="user"
                    onChange={(e) => {
                      this.setState({ user: e.target.value });
                    }}
                    className="form-control"
                    type="text"
                    value={this.state.user}
                  />
                </div>
              </div>
              {/* <div className="col-md-12">
                <div className="form-group">
                  <label>Tải file lên</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose file
                    </label>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          {this.getErrorHtml()}
          {/* /.card-footer */}
          <div className="card-footer text-right pt-2 pb-2">
            <button
              className="btn btn-info col-md-2 mr-2"
              onClick={this.onHandleCreate}
            >
              Lưu
            </button>
            <button className="btn btn-danger col-md-2">Xóa</button>
          </div>
        </div>

        {this.taskBuilder()}
        {this.onShowDeletePopup()}
        {this.onShowEditTaskPopup()}
      </div>
    );
  }
}
