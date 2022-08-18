import React, { Component } from "react";
import ReactDatePicker from "react-datepicker";
import StaffList from "../components/StaffList";
import Menu from "../components/Menu";
//import CreateCustomer from "../popup/CreateCustomer";
import staffService from "../services/staff.service";

export default class StaffListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffData: [],
      filterKeyword: "",
      filterStaffData: [],
      visibleCreateCustomerPopup: false,
      fromDate: null,
      toDate: null,
    };
    this.getAllStaff = this.getAllStaff.bind(this);
    this.getAllStaff();
    //this.searchCustomer = this.searchCustomer.bind(this);
    // this.handleRefresh = this.handleRefresh.bind(this);
    // this.handleCreateCustomer = this.handleCreateCustomer.bind(this);
    // this.onSetToDate = this.onSetToDate.bind(this);
    // this.onSetFromDate = this.onSetFromDate.bind(this);
    // this.handleSearchDate = this.handleSearchDate.bind(this);
  }

  // searchCustomer(keyWord) {
  //   if (keyWord == "") {
  //     this.setState({
  //       filterStaffData: this.state.staffData,
  //     });
  //   } else {
  //     var tempArr = [];
  //     this.state.staffData.forEach((element) => {
  //       var fullSt =
  //         element.id +
  //         element.code +
  //         element.fullname +
  //         element.phone +
  //         element.birth_day +
  //         "/" +
  //         element.birth_month +
  //         "/" +
  //         element.birth_year +
  //         element.birth_day +
  //         "-" +
  //         element.birth_month +
  //         "-" +
  //         element.birth_year +
  //         element.emergency_contact_person +
  //         element.emergency_contact_phone +
  //         //element.facebook_link +
  //         element.job_title;
  //       var fullUnsignSt = this.convertUnsignedString(fullSt);
  //       var lastFullSt = fullSt + fullUnsignSt;
  //       if (lastFullSt.toLowerCase().includes(keyWord.toLowerCase())) {
  //         tempArr.push(element);
  //       }
  //     });
  //     this.setState({
  //       filterStaffData: tempArr,
  //     });
  //   }
  // }

  getAllStaff() {
    staffService.getAll().then((response) => {
      //console.log(response.data);
      this.setState({
        filterStaffData: response.data,
        staffData: response.data,
      });
      //this.searchCustomer(this.state.filterKeyword);
    });
  }

  getCreateCustomerPopup() {
    // if (this.state.visibleCreateCustomerPopup) {
    //   return (
    //     <CreateCustomer
    //       visible={this.state.visibleCreateCustomerPopup}
    //       onDone={() => {
    //         this.setState({
    //           visibleCreateCustomerPopup: false,
    //         });
    //         this.handleRefresh();
    //       }}
    //     />
    //   );
    // }
    // return null;
  }

  handleRefresh = () => {
    this.getAllStaff();
  };

  handleAddStaff() {
    this.props.history.push({
      pathname: "/system/staff-add",
    });
  }

  onSetFromDate(date) {
    //   this.setState({
    //     fromDate: date,
    //   });
  }

  onSetToDate(date) {
    //   this.setState({
    //     toDate: date,
    //   });
  }

  handleSearchDate() {
    //   if (this.state.fromDate == null || this.state.toDate == null) {
    //     return;
    //   }
    //   var fromDateSt =
    //     this.state.fromDate.getFullYear() +
    //     "-" +
    //     (this.state.fromDate.getMonth() + 1) +
    //     "-" +
    //     this.state.fromDate.getDate();
    //   var toDateSt =
    //     this.state.toDate.getFullYear() +
    //     "-" +
    //     (this.state.toDate.getMonth() + 1) +
    //     "-" +
    //     this.state.toDate.getDate();
    //   if (this.state.fromDate < this.state.toDate) {
    //     customerService
    //       .getCustomerFilterDate(fromDateSt, toDateSt)
    //       .then((response) => {
    //         this.setState({
    //           filterStaffData: response.data.results,
    //           customerData: response.data.results,
    //         });
    //         this.searchCustomer(this.state.filterKeyword);
    //       });
    //   } else {
    //     if (fromDateSt == toDateSt) {
    //       customerService
    //         .getCustomerFilterDate(fromDateSt, toDateSt)
    //         .then((response) => {
    //           this.setState({
    //             filterStaffData: response.data.results,
    //             customerData: response.data.results,
    //           });
    //           this.searchCustomer(this.state.filterKeyword);
    //         });
    //     } else {
    //       alert("Ngày sau lớn hơn ngày đầu!");
    //       return;
    //     }
    //   }
  }

  convertUnsignedString(text) {
    var signedChars =
      "àảãáạăằẳẵắặâầẩẫấậđèẻẽéẹêềểễếệìỉĩíịòỏõóọôồổỗốộơờởỡớợùủũúụưừửữứựỳỷỹýỵÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬĐÈẺẼÉẸÊỀỂỄẾỆÌỈĨÍỊÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢÙỦŨÚỤƯỪỬỮỨỰỲỶỸÝỴ";
    var unsignedChars =
      "aaaaaaaaaaaaaaaaadeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyAAAAAAAAAAAAAAAAADEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYY";
    var pattern = new RegExp("[" + signedChars + "]", "g");
    var output = text.replace(pattern, function (m, key, value) {
      return unsignedChars.charAt(signedChars.indexOf(m));
    });
    return output;
  }

  render() {
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
            {/* SEARCH FORM */}
            <li className="nav-item" style={{ marginRight: "10px" }}>
              <input
                className="form-control form-control-navbar"
                type="search"
                placeholder="Tìm Nhân Viên"
                aria-label="Search"
                onChange={(event) => {
                  this.setState({
                    filterKeyword: event.target.value,
                  });
                }}
                onKeyUp={(event) => {
                  if (event.keyCode == 13) {
                    this.searchCustomer(this.state.filterKeyword);
                  }
                }}
              />
            </li>
            <li className="nav-item" style={{ marginRight: "15px" }}>
              <button
                className="btn btn-info btn-sm"
                style={{ marginLeft: "10px" }}
                onClick={this.handleAddStaff}
              >
                <i className="fas fa-user-plus"></i>
              </button>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li style={{ marginRight: "9px" }}>
              {/* <label style={{ display: "inline-block" }}>Từ&nbsp;</label> */}
              <ReactDatePicker
                className="form-control-navbar form-control"
                selected={this.state.fromDate}
                onChange={(date) => {
                  this.onSetFromDate(date);
                }}
                placeholderText="Từ"
                dateFormat="dd/MM/yyyy"
              />
            </li>
            <li style={{ marginRight: "12px" }}>
              {/* <label style={{ display: "inline-block" }}>đến&nbsp;</label> */}
              <ReactDatePicker
                className="form-control-navbar form-control"
                selected={this.state.toDate}
                onChange={(date) => {
                  this.onSetToDate(date);
                }}
                placeholderText="Đến"
                dateFormat="dd/MM/yyyy"
              />
            </li>
            <li className="nav-item" style={{ marginRight: "15px" }}>
              <button
                className="btn btn-info btn-sm"
                onClick={this.handleSearchDate}
              >
                <i className="fas fa-search"></i>
              </button>
            </li>

            <li className="nav-item" style={{ marginRight: "15px" }}>
              <button
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
              </button>
            </li>
          </ul>
        </nav>
        <div className="content-wrapper" style={{ overflowY: "scroll" }}>
          <section className="content-header">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  <h6>DANH SÁCH NHÂN VIÊN</h6>
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
          <StaffList
            //title="DANH SÁCH NHÂN VIÊN"
            titleHeader={[
              //"Id",
              "Mã",
              "Họ tên",
              "Vị trí",
              "Phòng ban",
              "email",
              "Nhóm",
              //"Họ tên",
              //"Giới tính",
              //"Ngày sinh",
              //"Điện thoại",
              //"Facebook",
              //"Địa chỉ",
              //"Ghi chú",
              //"Người tạo",
              //"Ngày tạo",
              "Sửa",
              "Xóa",
            ]}
            data={this.state.staffData}
            //key={this.state.filterStaffData}
            onRefresh={this.handleRefresh}
            itemClickFunc={(data) => {
              //console.log(data);
              this.props.history.push({
                pathname: "/system/staff-edit",
                state: { data },
              });
            }}
          />
        </div>
        {this.getCreateCustomerPopup()}
      </div>
    );
  }
}
