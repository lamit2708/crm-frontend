import React, { Component } from "react";
//import ReactDatePicker from "react-datepicker";
//import StaffList from "../components/StaffList";
import Menu from "../components/Menu";
import Select from "react-select";
//import AsyncSelect from "react-select/async";
import HelperService from "../services/helper.service";
import StaffService from "../services/staff.service";
import autoBind from "react-autobind";
export default class StaffEditPage extends Component {
  constructor(props) {
    super(props);
    const data = this.props.location.state.data;
    autoBind(this);
    this.state = {
      code: data.code,
      last_name: data.last_name,
      first_name: data.first_name,
      email: data.email,
      department: { value: data.department, label: data.department_name },
      departments: null,
      job_title: { value: data.job_title, label: data.job_title_name },
      //job_titles: null,
      staff_group: { value: data.staff_group, label: data.staff_group_name },
      codeError: "",
      lastNameError: "",
      firstNameError: "",
      emailError: "",
      showPopupDelete: false,
    };
  }
  componentDidMount() {
    //this.getJobTitles();
    this.getDepartments();
    this.getStaffGroups();
    this.getJobTitles();
  }
  getPopupDelete() {
    if (this.state.showPopupDelete) {
      const staff = this.props.location.state.data;

      StaffService.delete(this.props.location.state.data.id).then(
        (response) => {
          this.props.history.push({
            pathname: "/system/staff/",
          });
        }
      );
      return (
        <ConfirmDeletePopup
          //visible={this.state.showPopupDelete}
          handleCancel={() => {
            //this.props.onRefresh();
            this.setState({ showPopupDelete: false });
          }}
          handleConfirm={() => {
            StaffService.delete(staff.id).then((response) => {
              this.props.history.push({
                pathname: "/system/staff/",
              });
              //this.setState({ sheowPopupDelete: false });
            });
          }}
          title="Xác nhận"
          body={
            "Xóa thông tin hồ sơ của nhân viên " +
            staff.code +
            " - " +
            staff.full_name
          }
          //customerData={this.props.data[this.state.seletedIndex]}
          //buttonText="Xóa"
        />
      );
    }
  }
  handleCreateStaff() {
    this.props.history.push({
      pathname: "/system/staff-add",
    });
  }
  getDepartments() {
    HelperService.getDepartments().then((response) => {
      const departments = response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      this.setState({ departments: departments });
    });
  }
  getJobTitles() {
    HelperService.getJobTitles().then((response) => {
      const data = response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      this.setState({ job_titles: data });
    });
  }
  getStaffGroups() {
    HelperService.getStaffGroups().then((response) => {
      const data = response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      this.setState({ staff_groups: data });
    });
  }
  handleChangeJobTitle(value) {
    this.setState({ job_title: value });
  }
  handleChangeDepartment(value) {
    this.setState({ department: value });
  }
  handleChangeStaffGroup(value) {
    this.setState({ staff_group: value });
  }
  handleChangeCode(e) {
    const value = e.target.value;
    let error = "";
    if (value == "") {
      error = "Vui lòng nhập *Code";
    } else if (!this.validateCode(value)) {
      error = "*Code không được có khoảng trắng và kí tự đặc biệt";
    }
    this.setState({ code: value, codeError: error });
  }
  handleChangeLastName(e) {
    const value = e.target.value;
    let error = "";
    if (value == "") {
      error = "Vui lòng nhập *Họ";
    } else if (!this.validateName(value)) {
      error = "Sai định dạng *Họ";
    }
    this.setState({ last_name: value, lastNameError: error });
  }
  validateCode(value) {
    const re = /^[a-z0-9\-\_]+$/;
    return re.test(String(value).toLowerCase());
  }
  handleChangeFirstName(e) {
    const value = e.target.value;
    let error = "";
    if (value == "") {
      error = "Vui lòng nhập *Tên";
    } else if (!this.validateName(value)) {
      error = "Sai định dạng *Tên";
    }
    this.setState({ first_name: value, firstNameError: error });
  }

  handleChangeEmail(e) {
    const value = e.target.value;
    let error = "";
    if (value == "") {
      error = "Vui lòng nhập *Email";
    } else if (!this.validateEmail(value)) {
      error = "Sai định dạng email";
    }
    this.setState({ email: value, emailError: error });
  }

  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  validateName(name) {
    const re = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm;
    return re.test(String(name).toLowerCase());
  }
  getErrorHtml() {
    let errorHtml = "";
    if (this.state.errorMessage != null)
      errorHtml = this.state.errorMessage.map((error) => {
        return <p style={{ color: "red" }}>{error}</p>;
      });

    return errorHtml;
  }
  handleSave() {
    if (
      this.state.codeError != "" ||
      this.state.lastNameError != "" ||
      this.state.firstNameError != "" ||
      this.state.emailError != ""
    )
      return;

    var obj = {
      code: this.state.code,
      last_name: this.state.last_name,
      first_name: this.state.first_name,
      email: this.state.email,
      job_title: this.state.job_title.value,
      department: this.state.department.value,
      staff_group: this.state.staff_group.value,
    };

    //Save=>(Add,Edit,List)
    StaffService.update(this.props.location.state.data.id, obj).then(
      (response) => {
        //this.props.onDone();
        this.props.history.push({
          pathname: "/system/staff/",
        });
      }
    );
  }
  handleCancel() {
    this.props.history.push({
      pathname: "/system/staff/",
    });
  }
  handleDelete() {
    StaffService.delete(this.props.location.state.data.id).then((response) => {
      this.props.history.push({
        pathname: "/system/staff/",
      });
    });
  }
  render() {
    const data = this.state.data;

    const customSelectStyle = {
      menu: (provided, state) => ({
        ...provided,

        // override border radius to match the box
        borderRadius: 0,
        // kill the gap
        marginTop: 0,
        backgroundColor: "#34495e",
      }),
      option: (provided, state) => ({
        ...provided,
        borderBottom: "1px solid #ddd",
        //color: "#2c3e50",
        color: "#ecf0f1",
        fontSize: "18px",
        //backgroundColor: "#22a6b3","17a2b8" 107a8b
        backgroundColor: state.isSelected
          ? "#107a8b"
          : state.isFocused
          ? "#34495e"
          : undefined,

        "&:hover": {
          backgroundColor: "#17a2b8",
          borderBottom: "1px solid #2fe1f1",
        },
      }),
      control: (base, state) => ({
        ...base,
        border: state.isFocused ? "1px solid #26c6d4" : "1px solid #ced4da",
        height: "calc(1.8125rem + 2px)",
        backgroundColor: "#f9f9f9",
        // Removes weird border around container
        boxShadow: state.isFocused ? null : null,
        // match with the menu
        borderRadius: "4px",
        "&:hover": {
          // Overwrittes the different states of border
          borderColor: state.isFocused ? "#26c6d4" : "#26c6d4",
          backgroundColor: state.isFocused ? "#f4f4f4" : "#f4f4f4",
        },
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";

        return { ...provided, opacity, transition };
      },
      menuList: (base) => ({
        ...base,
        // kill the white space on first and last option
        padding: 0,
      }),
    };

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
                href="#"
                role="button"
              >
                <i className="fas fa-bars" />
              </a>
            </li>

            <li className="nav-item" style={{ marginRight: "15px" }}>
              <button
                className="btn btn-info btn-sm"
                style={{ marginLeft: "10px" }}
                onClick={this.handleCreateStaff}
              >
                <i className="fas fa-user-plus"></i>
              </button>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item" style={{ marginRight: "15px" }}>
              {/* <button
                className="btn btn-info btn-sm"
                onClick={() => {
                  this.setState({
                    fromDate: null,
                    toDate: null,
                  });
                  this.handleRefresh();
                }}
              >
                ALL
              </button> */}
            </li>
          </ul>
        </nav>
        <div className="content-wrapper" style={{ overflowY: "scroll" }}>
          <section className="content-header">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  <h6>Change Staff</h6>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#">System</a>
                    </li>
                    <li className="breadcrumb-item active">
                      {this.props.location.pathname.match(/[a-z0-9\-\_]*$/i)}
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          <div className="card card-info ml-1">
            <div className="card-header">
              <h4 className="card-title">
                {this.state.code +
                  " - " +
                  this.state.last_name +
                  " " +
                  this.state.first_name}
              </h4>

              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                >
                  <i className="fas fa-minus"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="remove"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>

            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label" htmlFor="code">
                      Code
                    </label>
                    <input
                      type="text"
                      className={`col-sm-8 form-control form-control-sm ${
                        this.state.codeError != "" ? "is-invalid" : ""
                      }`}
                      id="code"
                      placeholder="Code"
                      value={this.state.code}
                      onChange={this.handleChangeCode}
                    />
                    <span
                      className="error invalid-feedback"
                      style={
                        this.state.codeError == ""
                          ? { display: "none" }
                          : { display: "block" }
                      }
                    >
                      {this.state.codeError}
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row">
                    <label
                      className="col-form-label pl-3 col-sm-4"
                      htmlFor="code"
                    >
                      Vị trí
                    </label>
                    <Select
                      //classNamePrefix="filter"
                      //cacheOptions
                      //defaultOptions
                      className="col-sm-8"
                      defaultValue={this.state.job_title}
                      classNamePrefix="mySelect"
                      styles={customSelectStyle}
                      value={this.state.job_title}
                      //loadOptions={this.getJobTitles}
                      options={this.state.job_titles}
                      onChange={this.handleChangeJobTitle}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label
                      className="col-sm-4 col-form-label"
                      htmlFor="last_name"
                    >
                      Họ
                    </label>
                    <input
                      type="text"
                      className={`col-sm-8 form-control form-control-sm ${
                        this.state.lastNameError != "" ? "is-invalid" : ""
                      }`}
                      id="last_name"
                      placeholder="Họ"
                      value={this.state.last_name}
                      onChange={this.handleChangeLastName.bind(this)}
                    />
                    <span
                      className="error invalid-feedback"
                      style={
                        this.state.lastNameError == ""
                          ? { display: "none" }
                          : { display: "block" }
                      }
                    >
                      {this.state.lastNameError}
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row">
                    <label
                      className="col-form-label col-sm-4  pl-3"
                      htmlFor="department"
                    >
                      Phòng ban
                    </label>
                    <Select
                      //classNamePrefix="filter"
                      defaultValue={this.state.department}
                      classNamePrefix="mySelect"
                      className="col-sm-8"
                      styles={customSelectStyle}
                      value={this.state.department}
                      //loadOptions={this.getDepartments}
                      options={this.state.departments}
                      onChange={this.handleChangeDepartment}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label
                      htmlFor="first_name"
                      className="col-form-label col-sm-4"
                    >
                      Tên
                    </label>
                    <input
                      type="text"
                      className={`col-sm-8 form-control form-control-sm ${
                        this.state.firstNameError != "" ? "is-invalid" : ""
                      }`}
                      id="first_name"
                      placeholder="Tên"
                      value={this.state.first_name}
                      onChange={this.handleChangeFirstName.bind(this)}
                    />
                    <span
                      className="error invalid-feedback"
                      style={
                        this.state.firstNameError == ""
                          ? { display: "none" }
                          : { display: "block" }
                      }
                    >
                      {this.state.firstNameError}
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row">
                    <label
                      className="col-sm-4 col-form-label pl-3"
                      htmlFor="staff_group"
                    >
                      Nhóm nhân viên
                    </label>
                    <Select
                      classNamePrefix="mySelect"
                      className="col-sm-8"
                      styles={customSelectStyle}
                      value={this.state.staff_group}
                      //loadOptions={this.getStaffGroups}
                      options={this.state.staff_groups}
                      onChange={this.handleChangeStaffGroup}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`col-sm-8 form-control form-control-sm ${
                        this.state.emailError != "" ? "is-invalid" : ""
                      }`}
                      id="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleChangeEmail.bind(this)}
                    />
                    <span
                      className="error invalid-feedback"
                      style={
                        this.state.emailError == ""
                          ? { display: "none" }
                          : { display: "block" }
                      }
                    >
                      {this.state.emailError}
                    </span>
                  </div>
                </div>
                <div className="col-md-6"></div>
              </div>
              <div>{this.getErrorHtml()}</div>
            </div>

            <div className="card-footer d-flex">
              <button
                type="submit"
                className="btn btn-danger btn-sm pl-3 pr-3 mr-auto"
                onClick={() => {
                  this.setState({
                    showPopupDelete: true,
                    //seletedIndex: index,
                  });
                }}
              >
                Delete
              </button>
              <button
                type="submit"
                className="btn btn-info btn-sm  pl-3 pr-3"
                onClick={this.handleSave.bind(this)}
              >
                Save
              </button>
              <button
                type="submit"
                className="btn btn-default btn-sm  pl-3 pr-3 ml-5 "
                onClick={this.handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        {this.getPopupDelete()}
      </div>
    );
  }
}
//$(".select2").select2();
