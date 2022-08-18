import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AreaService from "../services/area.service";
import customerService from "../services/customer.service";
import Select from "react-select";
import autoBind from "react-autobind";
//import { thisTypeAnnotation } from "@babel/types";

export default class EditCustomerPopup extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    const customer = this.props.customerData;

    this.state = {
      startDate: new Date(this.props.customerData.birth_date),
      isFullNameError: false,
      isPhoneError: false,
      province: {
        value: customer.province,
        label: customer.province_name,
      },
      district: {
        value: customer.district,
        label: customer.district_name,
      },
      ward: { value: customer.ward, label: customer.ward_name },
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
      //street: arrAddress[0],
      source: customer.customer_source,
      code: customer.code,
      note: customer.note,
      fullname_relative: customer.emergency_contact_person,
      job: customer.job_title,
      phone_relative: customer.emergency_contact_phone,
      arrProvinces: [],
      arrDistricts: [],
      arrWards: [],
    };
    //this.onHandleSave = this.onHandleSave.bind(this);
    //this.onFirstLoadArea = this.onFirstLoadArea.bind(this);
    //this.getProvinces = this.getProvinces.bind(this);
    //this.onFirstLoadArea(arrAddress);
    //this.getProvinces = this.getProvinces.bind(this);
  }
  componentDidMount() {
    this.getProvinces();
    this.getDistricts();
    this.getWards();
  }
  onHandleSave() {
    if (this.state.fullname.trim() == "" || this.state.phone.trim() == "") {
      this.setState({
        isPhoneError: this.state.phone.trim() == "",
        isFullNameError: this.state.fullname.trim() == "",
      });
      return;
    }
    var customerObj = {
      code: this.state.code,
      fullname: this.state.fullname,
      phone: this.state.phone,
      email: this.state.email,
      province: this.state.province.value,
      district: this.state.district.value,
      ward: this.state.ward.value,

      address: this.state.address,
      emergency_contact_person:
        this.state.fullname_relative == ""
          ? null
          : this.state.fullname_relative,
      emergency_contact_phone:
        this.state.phone_relative == "" ? null : this.state.phone_relative,
      birth_date: this.state.birthDate,
      gender: this.state.gender.value,
      facebook_link: this.state.fb,
      job_title: this.state.job,
      customer_source: this.state.source,
    };
    customerService
      .updateCustomer(this.props.customerData.id, customerObj)
      .then((response) => {
        this.props.onDone();
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  getProvinceName() {
    var name = "";
    this.state.arrProvinces.forEach((element) => {
      if (element.id == this.state.province) name = element.name;
    });
    return name;
  }

  getDistrictName() {
    var name = "";
    this.state.arrDistricts.forEach((element) => {
      if (element.id == this.state.district) name = element.name;
    });
    return name;
  }

  getWardName() {
    var name = "";
    this.state.arrWards.forEach((element) => {
      if (element.id == this.state.ward) name = element.name;
    });
    return name;
  }

  getErrorHtml() {
    if (this.state.isFullNameError || this.state.isPhoneError) {
      return (
        <p style={{ color: "red" }}>
          Trường{this.state.isFullNameError ? " *Tên đăng ký" : ""}
          {this.state.isPhoneError ? " *Số điện thoại" : ""} đang để trống
        </p>
      );
    }
    return null;
  }

  // getProvinceId(name, arrProvinces) {
  //   var id = "";
  //   arrProvinces.forEach((element) => {
  //     if (element.name == name) id = element.id;
  //   });
  //   return id;
  // }

  // getDistrictId(name, arrDistrict) {
  //   var id = "";
  //   arrDistrict.forEach((element) => {
  //     if (element.name == name) id = element.id;
  //   });
  //   return id;
  // }

  getWardId(name, arrWard) {
    var id = "";
    arrWard.forEach((element) => {
      if (element.name == name) id = element.id;
    });
    return id;
  }

  onProvinceChange(option) {
    //var idProvince = event.target.value;
    let id = option.value;
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
    let id = option.value;
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
    // this.setState({
    //   ward: event.target.value,
    // });
    this.setState({ ward: option });
  }

  onSetDate(date) {
    const formated =
      date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDate();
    this.setState({
      startDate: date,
      birthDay: date.getDate(),
      birthMonth: date.getMonth() + 1,
      birthYear: date.getFullYear(),
      birthDate: formated,
    });
  }

  onFirstLoadArea(arrAddress) {
    AreaService.getProvinces().then((response) => {
      const allProvinces = response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      this.setState({ arrProvinces: allProvinces });

      AreaService.getDistricts(this.state.province.value).then((re) => {
        let allDistricts = re.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));

        AreaService.getWards(this.state.district.value).then((r) => {
          let allWards = r.data.map((item) => ({
            value: item.id,
            label: item.name,
          }));

          this.setState({
            arrDistricts: allDistricts,
            arrWards: allWards,
          });
        });
      });
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

  // getDistrict() {
  //   var listDistrict = null;
  //   if (this.state.arrDistricts != null) {
  //     listDistrict = this.state.arrDistricts.map((element, idx) => {
  //       return (
  //         <option key={idx} value={element.id}>
  //           {element.name}
  //         </option>
  //       );
  //     });
  //     return listDistrict;
  //   } else {
  //     return listDistrict;
  //   }
  // }

  // getWard() {
  //   var listWard = null;
  //   if (this.state.arrWards != null && this.state.arrDistricts != null) {
  //     this.state.arrWards.forEach((element) => {
  //       listWard = this.state.arrWards.map((element, idx) => {
  //         return (
  //           <option key={idx} value={element.id}>
  //             {element.name}
  //           </option>
  //         );
  //       });
  //     });
  //     return listWard;
  //   } else {
  //     return listWard;
  //   }
  // }

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
          <Modal.Title>Chỉnh sửa thông tin khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body">
            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label
                    htmlFor="fullname"
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
                    value={this.state.fullname}
                    placeholder="Tên đăng ký"
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
                    htmlFor="phone"
                    style={{
                      color: this.state.isPhoneError ? "red" : "#212529",
                    }}
                  >
                    Số điện thoại (*)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="form-control"
                    value={this.state.phone}
                    onChange={(e) => {
                      this.setState({
                        phone: e.target.value,
                        isPhoneError: false,
                      });
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
                    }}
                    value={this.state.email}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label>Ngày sinh</label>
                  <ReactDatePicker
                    className="form-control"
                    selected={this.state.startDate}
                    onChange={(date) => {
                      this.onSetDate(date);
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label>Giới tính (*)</label>
                  <Select
                    value={this.state.gender}
                    defaultOption={genders[1]}
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
                  <label htmlFor="facebook">Link Facebook</label>
                  <input
                    type="text"
                    id="facebook"
                    className="form-control"
                    onChange={(e) => {
                      this.setState({ fb: e.target.value });
                    }}
                    value={this.state.fb}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label>Tỉnh / Thành</label>
                  <Select
                    classNamePrefix="mySelect"
                    styles={customSelectStyle}
                    value={this.state.province}
                    //loadOptions={this.getJobTitles}
                    options={this.state.arrProvinces}
                    onChange={this.onProvinceChange.bind(this)}
                  />
                  {/* <select
                    className="form-control custom-select"
                    onChange={(event) => {
                      this.onCityChange(event);
                    }}
                    defaultValue={79}
                    value={this.state.city}
                  >
                    <option value={-1} disabled>
                      ---
                    </option>
                    {this.getCity()}
                  </select> */}
                </div>
                <div className="col-md-4">
                  <label>Quận / Huyện</label>
                  <Select
                    classNamePrefix="mySelect"
                    // className={`${
                    //   this.state.jobTitleError != "" ? "is-invalid" : ""
                    // }`}
                    styles={customSelectStyle}
                    value={this.state.district}
                    //loadOptions={this.getJobTitles}
                    options={this.state.arrDistricts}
                    onChange={this.onDistrictChange.bind(this)}
                  />
                  {/* <select
                    className="form-control custom-select"
                    onChange={(event) => {
                      this.onDistrictChange(event);
                    }}
                    defaultValue={-1}
                    value={this.state.district}
                  >
                    <option value={-1} disabled>
                      ---
                    </option>
                    {this.getDistrict()}
                  </select> */}
                </div>
                <div className="col-md-4">
                  <label>Phường / Xã</label>
                  <Select
                    classNamePrefix="mySelect"
                    // className={`${
                    //   this.state.jobTitleError != "" ? "is-invalid" : ""
                    // }`}
                    styles={customSelectStyle}
                    value={this.state.ward}
                    //loadOptions={this.getJobTitles}
                    options={this.state.arrWards}
                    onChange={this.onWardChange.bind(this)}
                  />
                  {/* <select
                    className="form-control custom-select"
                    onChange={(event) => {
                      this.onWardChange(event);
                    }}
                    value={this.state.ward}
                    defaultValue={-1}
                  >
                    <option value={-1} disabled>
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
                  <label htmlFor="address">Địa chỉ</label>
                  <input
                    type="text"
                    id="address"
                    className="form-control"
                    value={this.state.address}
                    onChange={(e) => {
                      this.setState({ address: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label>Nguồn</label>
                  <select
                    className="form-control custom-select"
                    onChange={(e) => {
                      this.setState({ source: e.target.value });
                    }}
                    value={this.state.source}
                  >
                    <option value="1">Facebook</option>
                    <option value="2">Google</option>
                    <option value="3">Người quen</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="code">Mã Khách hàng</label>
                  <input
                    type="text"
                    id="code"
                    className="form-control"
                    onChange={(e) => {
                      this.setState({ code: e.target.value });
                    }}
                    value={this.state.code}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="job">Công việc</label>
                  <input
                    type="text"
                    id="job"
                    className="form-control"
                    onChange={(e) => {
                      this.setState({ job: e.target.value });
                    }}
                    value={this.state.job}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="name_relative">Họ tên người thân</label>
                  <input
                    type="text"
                    id="name_relative"
                    className="form-control"
                    onChange={(e) => {
                      this.setState({ fullname_relative: e.target.value });
                    }}
                    value={this.state.fullname_relative}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="phone_relative">Số điện thoại</label>
                  <input
                    type="text"
                    id="phone_relative"
                    className="form-control"
                    onChange={(e) => {
                      this.setState({ phone_relative: e.target.value });
                    }}
                    value={this.state.phone_relative}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-10">
                  <label htmlFor="note">Ghi chú</label>
                  <textarea
                    id="note"
                    type="text"
                    rows="1"
                    className="form-control"
                    style={{ resize: "none" }}
                    value={this.state.note}
                    onChange={(e) => {
                      this.setState({ note: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-2">
                  <label>&nbsp; </label>
                  <button
                    className="btn btn-success"
                    style={{ width: "100%" }}
                    onClick={this.onHandleSave}
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
