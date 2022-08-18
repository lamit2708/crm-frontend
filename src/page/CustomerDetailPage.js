import React, { Component } from "react";
import Menu from "../components/Menu";
import Select from "react-select";
import HelperService from "../services/helper.service";
//import StaffService from "../services/staff.service";
import autoBind from "react-autobind";
//import { Modal } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AreaService from "../services/area.service";
import CustomerService from "../services/customer.service";

export default class CustomerDetailPage extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    const customer = this.props.location.state.customer;
    //console.log(customer);
    //console.log(this.props.location);
    this.state = {
      id: customer.id,
      defaultDate: new Date(1990, 0, 1),
      fullname: customer.fullname,
      phone: customer.phone,
      email: customer.email,
      birthDate: customer.birth_date,
      gender: {
        value: customer.gender,
        label: customer.gender == "F" ? "Nữ" : "Nam",
      },
      fb: customer.facebook_link,
      address: customer.address,

      gender: { value: "M", label: "Nam" },

      ward: { value: customer.ward, label: customer.ward_name },
      district: {
        value: customer.district,
        label: customer.district_name,
      },
      province: {
        value: customer.province,
        label: customer.province_name,
      },
      source: {
        value: customer.customer_source,
        label: customer.customer_source_name,
      },
      code: customer.code,
      note: customer.note,
      fullname_relative: customer.emergency_contact_person,
      job: customer.job_title,
      phone_relative: customer.emergency_contact_phone,
      customerType: {
        value: customer.customer_type,
        label: customer.customer_type_name,
      },
      customerTypes: [],
      phoneError: "",
      //isGenderError: false,
      provinces: [],
      districts: [],
      wards: [],
      sources: [],
      codeError: "",
      fullnameError: "",
      emailError: "",
      provinceError: "",
      districtError: "",
      wardError: "",
      addressError: "",
    };
    this.timer = null;
  }
  componentDidMount() {
    this.loadProvinces();
    this.loadCustomerSources();
    //this.getHintCode();
    this.loadCustomerTypes();
  }
  // getHintCode() {
  //   CustomerService.getLastCustomer().then((response) => {
  //     if (response.data.count == 0) return;
  //     const last_customer = response.data.results[0];

  //     const last_code = last_customer.code;

  //     const theNum = last_code.match(/\d*$/)[0];
  //     const theHeader = last_code.replace(theNum, "");
  //     const increaseNum = this.increaseNumInString(theNum);
  //     this.setState({ code: theHeader + increaseNum });
  //   });
  // }
  increaseNumInString(num1) {
    const num2 = (parseInt(num1) + 1).toString();
    const len1 = num1.length;
    const len2 = num2.length;

    let lenAddZero = 0;
    if (len1 > len2) lenAddZero = len1 - len2;
    //else if(len2<len1) lenAddZero =0;
    //else if(len2==len1) lenAddZero=0;
    let result = "";
    for (let i = 0; i < lenAddZero; i++) {
      result += "0";
    }
    result += num2;
    return result;
  }
  loadCustomerTypes() {
    HelperService.getCustomerTypes().then((response) => {
      let data = response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      this.setState({ customerTypes: data });
    });
  }
  loadCustomerSources() {
    HelperService.getCustomerSources().then((response) => {
      let data = response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      this.setState({ sources: data });
    });
  }
  loadProvinces() {
    AreaService.getProvinces().then((response) => {
      let data = response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      this.setState({ provinces: data });
    });
  }
  loadDistricts(idProvince) {
    AreaService.getDistricts(idProvince).then((response) => {
      let data = response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      this.setState({ district: null, ward: null, districts: data });
    });
  }
  loadWards(idDistrict) {
    AreaService.getWards(idDistrict).then((response) => {
      let data = response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      this.setState({ wards: data, ward: null });
    });
  }

  onChangeProvince(option) {
    this.setState({ province: option }, this.handleProvinceError);
    this.loadDistricts(option.value);
  }
  onChangeDistrict(option) {
    this.setState({ district: option }, this.handleDistrictError);
    this.loadWards(option.value);
  }

  onChangeWard(option) {
    if (option.value == -1) return;
    this.setState({ ward: option });
  }

  onChangeBirthDate(date) {
    if (date == null) date = this.state.defaultDate;
    const formated =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    this.setState({
      startDate: date,
      birthDay: date.getDate(),
      birthMonth: date.getMonth() + 1,
      birthYear: date.getFullYear(),
      birthDate: formated,
    });
  }

  handleFullNameError() {
    const value = this.state.fullname.trim();
    let error = "";
    if (value == "") {
      error = "Vui lòng nhập *Họ Tên";
    } else if (!this.validateName(value)) {
      error = "Sai định dạng Họ Tên";
    }
    this.setState({ fullnameError: error });
  }
  handleCodeError() {
    const value = this.state.code;
    let error = "";
    if (value == "") {
      error = "Vui lòng nhập *Mã khách hàng";
    } else {
      this.checkDuplicateCode(value);
      //this.setState({ code: value });
    }
    this.setState({ codeError: error });
  }
  checkDuplicateCode(code) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      CustomerService.getCustomerByCode(code).then((response) => {
        if (response.data.count == 1) {
          const currentCustomerId = this.state.id;

          const loadedCustomerId = response.data.results[0].id;
          if (currentCustomerId != loadedCustomerId)
            this.setState({
              codeError: "*Mã khách hàng " + code + " đã tồn tại!",
            });
        }
      });
    }, 300);
  }
  handlePhoneError() {
    const value = this.state.phone;
    let error = "";
    if (value == "") {
      error = "Vui lòng nhập *Số điện thoại";
    }
    this.setState({ phoneError: error });
  }
  validateCode(value) {
    const re = /^[a-z0-9\-\_]+$/;
    return re.test(String(value).toLowerCase());
  }

  handleAddressError() {
    let error = "";
    if (this.state.address == "") {
      error = "Vui lòng nhập *Địa chỉ";
    }
    this.setState({ addressError: error });
  }
  handleEmailError() {
    const value = this.state.email;
    let error = "";
    if (value == "") {
      error = "Vui lòng nhập *Email";
    } else if (!this.validateEmail(value)) {
      error = "Sai định dạng email";
    }
    this.setState({ emailError: error });
  }

  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  validateName(name) {
    let arr = this.removeAscent(name).split(" ");
    //console.log(arr);
    var re = /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/; // regex here
    let result = arr.every((item) => {
      return re.test(item);
    });
    //console.log(result);
    return result;
  }
  removeAscent(str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
  }

  onSave() {
    this.handleError().then(() => {
      this.updateCustomer();
    });
  }

  handleProvinceError() {
    this.setState((state) => ({
      provinceError:
        state.province.value < 0 ? "Vui lòng chọn *Tỉnh/Thành" : "",
    }));
  }
  handleDistrictError() {
    this.setState((state) => ({
      districtError:
        state.district.value < 0 ? "Vui lòng chọn *Quận/Huyện" : "",
    }));
  }
  handleWardError() {
    this.setState((state) => ({
      wardError: state.ward.value < 0 ? "Vui lòng chọn *Phường/Xã" : "",
    }));
  }

  handleError = async () => {
    this.handleFullNameError();
    this.handleCodeError();
    this.handleEmailError();
    this.handleAddressError();
    this.handleProvinceError();
    this.handleDistrictError();
    this.handleWardError();
    return new Promise((resolve) => {
      resolve();
    });
  };

  updateCustomer() {
    //console.log(this.state.address
    if (
      this.state.codeError != "" ||
      this.state.fullnameError != "" ||
      this.state.emailError != "" ||
      this.state.phoneError != "" ||
      this.state.provinceError != "" ||
      this.state.districtError != "" ||
      this.state.wardError != "" ||
      this.state.addressError != ""
    )
      return;

    var obj = {
      code: this.state.code,
      fullname: this.state.fullname,
      phone: this.state.phone,
      email: this.state.email,
      address: this.state.address,
      province: this.state.province.value,
      district: this.state.district.value,
      ward: this.state.ward.value,
      emergency_contact_person: this.state.fullname_relative,
      emergency_contact_phone: this.state.phone_relative,
      birth_date: this.state.birthDate,
      gender: this.state.gender.value,
      facebook_link: this.state.fb,
      job_title: this.state.job,
      created_user: 1,
      //customer_priority: 1,
      customer_source: this.state.source.value,
      customer_type: this.state.customerType.value,
      note: this.state.note,
    };
    //console.log(obj);
    //return;
    CustomerService.updateCustomer(this.state.id, obj)
      .then((response) => {
        //this.props.onDone();
        //console.log(response.data);
        //return;
        this.props.history.push({
          pathname: "/customer/list",
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  handleCancel() {
    this.props.history.push({
      pathname: "/system/customer/list",
    });
  }

  render() {
    const genders = [
      { value: "M", label: "Nam" },
      { value: "F", label: "Nữ" },
    ];
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
              {/* <button
                className="btn btn-info btn-sm"
                style={{ marginLeft: "10px" }}
                onClick={this.handleCreateCustomer}
              >
                <i className="fas fa-user-plus"></i>
              </button> */}
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
                  <h6>Customer Detail</h6>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#">customer</a>
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
                {this.state.code != undefined && this.state.code} -
                {this.state.fullname != undefined && this.state.fullname}
                {/* {this.state.code +
                  " - " +
                  this.state.last_name +
                  " " +
                  this.state.first_name} */}
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
                    <label className="col-form-label col-sm-4" htmlFor="code">
                      Mã Khách hàng (*)
                    </label>

                    <input
                      type="text"
                      value={this.state.code}
                      id="code"
                      className="form-control form-control-sm col-sm-8"
                      onChange={(e) => {
                        this.setState(
                          { code: e.target.value },
                          this.handleCodeError
                        );
                      }}
                    />
                    <span
                      className="error invalid-feedback  text-center"
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
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-form-label col-sm-4">
                      Loại khách hàng (*)
                    </label>
                    <Select
                      className="col-sm-8 p-0"
                      classNamePrefix="mySelect"
                      styles={customSelectStyle}
                      value={this.state.customerType}
                      options={this.state.customerTypes}
                      onChange={(option) => {
                        this.setState({
                          customerType: option,
                        });
                      }}
                    ></Select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-form-label col-sm-4 pl-3">
                      Tên đăng ký (*)
                    </label>
                    <input
                      type="text"
                      className={`col-sm-8 form-control form-control-sm ${
                        this.state.fullnameError != "" ? "is-invalid" : ""
                      }`}
                      placeholder="Tên đăng ký"
                      value={this.state.fullname}
                      onChange={(e) => {
                        this.setState(
                          { fullname: e.target.value },
                          this.handleFullNameError
                        );
                      }}
                    />
                    <span
                      className="error invalid-feedback  text-center"
                      style={
                        this.state.fullnameError == ""
                          ? { display: "none" }
                          : { display: "block" }
                      }
                    >
                      {this.state.fullnameError}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-form-label col-sm-4" htmlFor="email">
                      Email (*)
                    </label>
                    <input
                      type="email"
                      className={`col-sm-8 form-control form-control-sm ${
                        this.state.emailError != "" ? "is-invalid" : ""
                      }`}
                      id="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={(e) => {
                        this.setState(
                          { email: e.target.value },
                          this.handleEmailError
                        );
                      }}
                    />
                    <span
                      className="error invalid-feedback  text-center"
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
                <div className="col-md-6">
                  <div className="form-group row">
                    <label
                      className="col-form-label col-sm-4 pl-3"
                      htmlFor="code"
                    >
                      Số điện thoại (*)
                    </label>
                    <input
                      type="text"
                      className={`col-sm-8 form-control form-control-sm ${
                        this.state.phoneError != "" ? "is-invalid" : ""
                      }`}
                      id="phone"
                      placeholder="Số điện thoại"
                      value={this.state.phone}
                      onChange={(e) => {
                        this.setState(
                          { phone: e.target.value },
                          this.handlePhoneError
                        );
                      }}
                    />

                    <span
                      className="error invalid-feedback  text-center"
                      style={
                        this.state.phoneError == ""
                          ? { display: "none" }
                          : { display: "block" }
                      }
                    >
                      {this.state.phoneError}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-form-label col-sm-4" htmlFor="gender">
                      Giới tính (*)
                    </label>
                    <Select
                      id="gender"
                      className="col-sm-8 p-0"
                      classNamePrefix="mySelect"
                      styles={customSelectStyle}
                      value={this.state.gender}
                      options={genders}
                      onChange={(option) => {
                        this.setState({
                          gender: option,
                        });
                      }}
                    ></Select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row">
                    <label
                      className="col-form-label col-sm-4 pl-3"
                      htmlFor="birthDate"
                    >
                      Ngày sinh (*)
                    </label>
                    <div className="customDatePickerWidth  col-sm-8">
                      <ReactDatePicker
                        id="birthDate"
                        className="form-control-sm form-control"
                        selected={this.state.defaultDate}
                        onChange={(date) => {
                          this.onChangeBirthDate(date);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-form-label col-sm-4">Nguồn</label>

                    <Select
                      classNamePrefix="mySelect"
                      className="col-sm-8 p-0"
                      styles={customSelectStyle}
                      value={this.state.source}
                      options={this.state.sources}
                      onChange={(option) => {
                        this.setState({ source: option });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row">
                    <label
                      className="col-form-label col-sm-4 pl-3"
                      htmlFor="facebook"
                    >
                      Link Facebook
                    </label>
                    <input
                      type="text"
                      id="facebook"
                      className="form-control form-control-sm col-sm-8"
                      value={this.state.fb}
                      onChange={(e) => {
                        this.setState({ fb: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label
                      className="col-form-label col-sm-4"
                      htmlFor="department"
                    >
                      Tỉnh / Thành (*)
                    </label>
                    <Select
                      id="department"
                      className="col-sm-8 p-0"
                      classNamePrefix="mySelect"
                      styles={customSelectStyle}
                      value={this.state.province}
                      //loadOptions={this.getJobTitles}
                      options={this.state.provinces}
                      onChange={this.onChangeProvince}
                    />
                    <span
                      className="error invalid-feedback text-center"
                      style={
                        this.state.provinceError == ""
                          ? { display: "none" }
                          : { display: "block" }
                      }
                    >
                      {this.state.provinceError}
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-form-label col-sm-4 pl-3">
                      Quận / Huyện (*)
                    </label>
                    <Select
                      classNamePrefix="mySelect"
                      className="p-0 col-sm-8"
                      styles={customSelectStyle}
                      value={this.state.district}
                      //loadOptions={this.getJobTitles}
                      options={this.state.districts}
                      onChange={this.onChangeDistrict}
                    />
                    <span
                      className="error invalid-feedback  text-center"
                      style={
                        this.state.districtError == ""
                          ? { display: "none" }
                          : { display: "block" }
                      }
                    >
                      {this.state.districtError}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-form-label col-sm-4">
                      Phường / Xã (*)
                    </label>
                    <Select
                      classNamePrefix="mySelect"
                      className="col-sm-8 p-0"
                      styles={customSelectStyle}
                      value={this.state.ward}
                      options={this.state.wards}
                      onChange={this.onChangeWard}
                    />
                    <span
                      className="error invalid-feedback  text-center"
                      style={
                        this.state.wardError == ""
                          ? { display: "none" }
                          : { display: "block" }
                      }
                    >
                      {this.state.wardError}
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-form-label col-sm-4 pl-3">
                      Địa chỉ (*)
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm col-sm-8"
                      value={this.state.address}
                      onChange={(e) => {
                        this.setState(
                          { address: e.target.value },
                          this.handleAddressError
                        );
                      }}
                    />
                    <span
                      className="error invalid-feedback  text-center"
                      style={
                        this.state.addressError == ""
                          ? { display: "none" }
                          : { display: "block" }
                      }
                    >
                      {this.state.addressError}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-form-label col-sm-4">
                      Họ tên người thân
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm col-sm-8"
                      value={this.state.fullname_relative}
                      onChange={(e) => {
                        this.setState({ fullname_relative: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-form-label col-sm-4 pl-3">
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm col-sm-8"
                      value={this.state.phone_relative}
                      onChange={(e) => {
                        this.setState({ phone_relative: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group row">
                    <label className="col-form-label col-sm-2">Ghi chú</label>
                    <textarea
                      type="text"
                      rows="2"
                      className="form-control form-control-sm col-sm-10"
                      style={{ resize: "none" }}
                      value={this.state.note}
                      onChange={(e) => {
                        this.setState({ note: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group row"></div>
                </div>
                <div className="col-md-6"></div>
              </div>
              {/* <div>{this.getErrorHtml()}</div> */}
            </div>

            <div className="card-footer d-flex">
              <button
                type="submit"
                className="btn btn-info btn-sm pl-3 pr-3 ml-auto"
                onClick={this.onSave}
              >
                Save
              </button>
              <button
                type="submit"
                className="btn btn-default btn-sm pl-3 pr-3 ml-5 "
                onClick={this.handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//$(".select2").select2();
