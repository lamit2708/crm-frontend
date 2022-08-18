import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AreaService from "../services/area.service";
import customerService from "../services/customer.service";
import autoBind from "react-autobind";
import Select from "react-select";
export default class CreateCustomer extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      defaultDate: new Date(1990, 0, 1),
      fullname: "",
      phone: "",
      email: "",
      birthDate: "1990-1-1",
      gender: { value: "M", label: "Nam" },
      fb: "",
      address: "",
      ward: { value: -1, label: "----------" },
      district: { value: -1, label: "----------" },
      province: { value: -1, label: "----------" },
      source: "",
      code: "",
      note: "",
      fullname_relative: "",
      job: "",
      phone_relative: "",
      isFullNameError: false,
      isPhoneError: false,
      //isGenderError: false,
      arrProvinces: [],
      arrDistricts: [],
      arrWards: [],
    };
    //this.onSetDate = this.onSetDate.bind(this);
    //this.onCityChange = this.onCityChange.bind(this);
    //this.onHandleCreate = this.onHandleCreate.bind(this);
  }
  componentDidMount() {
    this.getProvinces();
  }
  onHandleCreate() {
    if (this.state.fullname.trim() == "" || this.state.phone.trim() == "") {
      this.setState({
        isPhoneError: this.state.phone.trim() == "",
        isFullNameError: this.state.fullname.trim() == "",
        //isGenderError: this.state.gender != "M" && this.state.gender != "F",
      });
      return;
    }

    var customerObj = {
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
      customer_priority: 1,
      customer_source: this.state.source,
      customer_type: 1,
    };
    //console.log(customerObj);
    customerService
      .create(customerObj)
      .then((response) => {
        this.props.onDone();
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  getProvinces() {
    AreaService.getProvinces().then((response) => {
      let data = response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      this.setState({ arrProvinces: data });
    });
  }
  getDistricts() {
    AreaService.getDistricts(this.state.province.value).then((response) => {
      let data = response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      this.setState({ arrDistricts: data });
    });
  }
  getWards() {
    AreaService.getWards(this.state.district.value).then((response) => {
      let data = response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      this.setState({ arrWards: data });
    });
  }
  // getCityName() {
  //   var name = "";
  //   this.state.arrProvinces.forEach((element) => {
  //     if (element.id == this.state.city) name = element.name;
  //   });
  //   return name;
  // }

  // getDistrictName() {
  //   var name = "";
  //   this.state.arrDistricts.forEach((element) => {
  //     if (element.id == this.state.district) name = element.name;
  //   });
  //   return name;
  // }

  // getWardName() {
  //   var name = "";
  //   this.state.arrWards.forEach((element) => {
  //     if (element.id == this.state.ward) name = element.name;
  //   });
  //   return name;
  // }

  getErrorHtml() {
    if (
      this.state.isFullNameError ||
      this.state.isPhoneError
      //this.state.isGenderError
    ) {
      return (
        <p style={{ color: "red" }}>
          Trường{this.state.isFullNameError ? " *Tên đăng ký" : ""}
          {this.state.isPhoneError ? " *Số điện thoại" : ""} đang để trống
        </p>
      );
    }
    return null;
  }
  onProvinceChange(option) {
    //var idProvince = event.target.value;
    let id = option.value;
    if (id == -1) return;
    AreaService.getDistricts(id).then((response) => {
      const data = response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      this.setState({
        province: option,
        district: null,
        ward: null,
        arrDistricts: data,
      });
    });
  }
  onDistrictChange(option) {
    //var id = event.target.value;
    console.log(option);
    let id = option.value;
    if (id == -1) return;
    AreaService.getWards(id).then((response) => {
      const data = response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      this.setState({
        district: option,
        ward: null,
        arrWards: data,
      });
    });
  }

  onWardChange(option) {
    if (option.value == -1) return;
    this.setState({ ward: option });
  }
  // onCityChange(event) {
  //   var idCity = event.target.value;
  //   areaService.getDistricts(idCity).then((response) => {
  //     this.setState({
  //       city: idCity,
  //       district: null,
  //       ward: null,
  //       arrDistricts: response.data,
  //     });
  //   });
  // }

  // onDistrictChange(event) {
  //   var idDistrict = event.target.value;
  //   areaService.getWards(idDistrict).then((response) => {
  //     this.setState({
  //       district: idDistrict,
  //       ward: null,
  //       arrWards: response.data,
  //     });
  //   });
  // }

  // onWardChange(event) {
  //   this.setState({
  //     ward: event.target.value,
  //   });
  // }

  onSetDate(date) {
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

  getCity() {
    if (this.state.arrProvinces == null) {
      areaService.getProvinces().then((response) => {
        this.setState({
          arrProvinces: response.data,
        });
      });
      return null;
    } else {
      var listCity = this.state.arrProvinces.map((element) => {
        return <option value={element.id}>{element.name}</option>;
      });
      return listCity;
    }
  }

  getDistrict() {
    var listDistrict = null;
    if (this.state.arrDistricts != null) {
      listDistrict = this.state.arrDistricts.map((element) => {
        return <option value={element.id}>{element.name}</option>;
      });
      return listDistrict;
    } else {
      return listDistrict;
    }
  }

  getWard() {
    var listWard = null;
    if (this.state.arrWards != null && this.state.arrDistricts != null) {
      this.state.arrWards.forEach((element) => {
        listWard = this.state.arrWards.map((element) => {
          return <option value={element.id}>{element.name}</option>;
        });
      });
      return listWard;
    } else {
      return listWard;
    }
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
      <Modal show={this.props.visible} onHide={this.props.onDone} size="lg">
        <Modal.Header closeButton style={{ padding: "5px 17px" }}>
          <Modal.Title>Tạo mới khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body">
            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label
                    htmlFor="inputName"
                    style={{
                      color: this.state.isFullNameError ? "red" : "#212529",
                    }}
                  >
                    Tên đăng ký (*)
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    className="form-control"
                    onChange={(e) => {
                      this.setState({
                        fullname: e.target.value,
                        isFullNameError: false,
                      });
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="inputName"
                    style={{
                      color: this.state.isPhoneError ? "red" : "#212529",
                    }}
                  >
                    Số điện thoại (*)
                  </label>
                  <input
                    type="text"
                    id="phone"
                    className="form-control"
                    onChange={(e) => {
                      this.setState({
                        phone: e.target.value,
                        isPhoneError: false,
                      });
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputName">Email</label>
                  <input
                    type="text"
                    id="email"
                    className="form-control"
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="inputName">Ngày sinh</label>
                  <ReactDatePicker
                    className="form-control form-control-sm"
                    selected={this.state.defaultDate}
                    onChange={(date) => {
                      this.onSetDate(date);
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="inputName"
                    // style={{
                    //   color: this.state.isGenderError ? "red" : "#212529",
                    // }}
                  >
                    Giới tính (*)
                  </label>
                  <Select
                    value={this.state.gender}
                    options={genders}
                    onChange={(option) => {
                      this.setState({
                        gender: option,
                        //isGenderError: false,
                      });
                    }}
                  ></Select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputName">Link Facebook</label>
                  <input
                    type="text"
                    id="facebook"
                    className="form-control"
                    onChange={(e) => {
                      this.setState({ fb: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="department">Tỉnh / Thành</label>
                  <Select
                    id="department"
                    classNamePrefix="mySelect"
                    styles={customSelectStyle}
                    value={this.state.province}
                    //loadOptions={this.getJobTitles}
                    options={this.state.arrProvinces}
                    onChange={this.onProvinceChange.bind(this)}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputName">Quận / Huyện</label>
                  <Select
                    classNamePrefix="mySelect"
                    // className={`${
                    //   this.state.jobTitleError != "" ? "is-invalid" : ""
                    // }`}
                    styles={customSelectStyle}
                    value={this.state.district}
                    //loadOptions={this.getJobTitles}
                    options={this.state.arrDistricts}
                    onChange={this.onDistrictChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputName">Phường / Xã</label>
                  <Select
                    classNamePrefix="mySelect"
                    styles={customSelectStyle}
                    value={this.state.ward}
                    //loadOptions={this.getJobTitles}
                    options={this.state.arrWards}
                    onChange={this.onWardChange}
                  />
                  {/* <select
                    className="form-control custom-select"
                    onChange={(event) => {
                      this.onWardChange(event);
                    }}
                  >
                    <option selected disabled>
                      ---
                    </option>
                    {this.getWard()}
                  </select> */}
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="inputName">Địa chỉ</label>
                  <input
                    type="text"
                    id="facebook"
                    className="form-control"
                    onChange={(e) => {
                      this.setState({ address: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputName">Nguồn</label>
                  <select
                    className="form-control custom-select"
                    onChange={(e) => {
                      this.setState({ source: e.target.value });
                    }}
                  >
                    <option value="1">Facebook</option>
                    <option value="2">Google</option>
                    <option value="3">Người quen</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputName">Mã Khách hàng</label>
                  <input
                    type="text"
                    id="facebook"
                    className="form-control"
                    onChange={(e) => {
                      this.setState({ code: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="inputName">Công việc</label>
                  <input
                    type="text"
                    id="facebook"
                    className="form-control"
                    onChange={(e) => {
                      this.setState({ job: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputName">Họ tên người thân</label>
                  <input
                    type="text"
                    id="facebook"
                    className="form-control"
                    onChange={(e) => {
                      this.setState({ fullname_relative: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputName">Số điện thoại</label>
                  <input
                    type="text"
                    id="facebook"
                    className="form-control"
                    onChange={(e) => {
                      this.setState({ phone_relative: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-10">
                  <label htmlFor="inputName">Ghi chú</label>
                  <textarea
                    type="text"
                    rows="1"
                    className="form-control"
                    style={{ resize: "none" }}
                    onChange={(e) => {
                      this.setState({ note: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-2">
                  <label htmlFor="inputName">&nbsp; </label>
                  <button
                    className="btn btn-success"
                    style={{ width: "100%" }}
                    onClick={this.onHandleCreate}
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>{this.getErrorHtml()}</Modal.Footer>
      </Modal>
    );
  }
}
