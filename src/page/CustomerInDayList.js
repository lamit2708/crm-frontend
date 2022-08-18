import React, { Component } from "react";
import ReactDatePicker from "react-datepicker";
import ListInDay from "../components/ListInDay";
import Menu from "../components/Menu";
import customerTransferHistoryService from "../services/transfer.history.service";

export default class CustomerInDayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerData: null,
      filterKeyword: "",
      filterCustomerData: null,
      visibleCreateCustomerPopup: false,
      fromDate: null,
      toDate: null,
      searchFrom: null,
      searchTo: null,
    };
    this.handleSearchDate = this.handleSearchDate.bind(this);
    this.handleRefresh(this.getToday(), this.getToday());
  }

  getToday() {
    var currentDate = new Date();
    var today = this.transferDate(currentDate);
    return today;
  }

  transferDate(date) {
    var dateFormat =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return dateFormat;
  }

  searchCustomer(keyWord) {
    if (keyWord == "") {
      this.setState({
        filterCustomerData: this.state.customerData,
      });
    } else {
      var tempArr = [];
      this.state.customerData.forEach((element) => {
        var fullSt =
          element.id + element.code + element.fullname + element.phone;
        var fullUnsignSt = this.convertUnsignedString(fullSt);
        var lastFullSt = fullSt + fullUnsignSt;
        if (lastFullSt.toLowerCase().includes(keyWord.toLowerCase())) {
          tempArr.push(element);
        }
      });
      this.setState({
        filterCustomerData: tempArr,
      });
    }
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

  onSetFromDate(date) {
    if (date == null) {
      this.setState({
        fromDate: null,
        searchFrom: this.transferDate(this.getToday),
      });
    } else {
      this.setState({
        fromDate: date,
        searchFrom: this.transferDate(date),
      });
    }
  }

  onSetToDate(date) {
    if (date == null) {
      this.setState({
        toDate: null,
        searchTo: this.transferDate(this.getToday),
      });
    }
    this.setState({
      toDate: date,
      searchTo: this.transferDate(date),
    });
  }

  handleRefresh(from, to) {
    customerTransferHistoryService.getAll(from, to).then((response) => {
      this.setState({
        customerData: response.data.results,
      });
      this.searchCustomer(this.state.filterKeyword);
    });
  }

  handleSearchDate() {
    if (this.state.fromDate == null || this.state.toDate == null) {
      return;
    }
    if (this.state.fromDate < this.state.toDate) {
      this.handleRefresh(this.state.searchFrom, this.state.searchTo);
    } else {
      if (this.state.searchFrom == this.state.searchTo) {
        this.handleRefresh(this.state.searchFrom, this.state.searchTo);
      } else {
        alert("Ngày sau lớn hơn ngày đầu!");
        return;
      }
    }
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
                placeholder="Tìm Khách Hàng"
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
          </ul>

          <ul class="navbar-nav ml-auto">
            <li style={{ marginRight: "9px" }}>
              <label style={{ display: "inline-block" }}>Từ ngày&nbsp;</label>
              <ReactDatePicker
                className="form-control-navbar form-control"
                selected={this.state.fromDate}
                onChange={(date) => {
                  this.onSetFromDate(date);
                }}
              />
            </li>
            <li style={{ marginRight: "12px" }}>
              <label style={{ display: "inline-block" }}>đến&nbsp;</label>
              <ReactDatePicker
                className="form-control-navbar form-control"
                selected={this.state.toDate}
                onChange={(date) => {
                  this.onSetToDate(date);
                }}
              />
            </li>
            <li className="nav-item" style={{ marginRight: "15px" }}>
              <button className="btn btn-info" onClick={this.handleSearchDate}>
                <i class="fas fa-search"></i>
              </button>
            </li>

            <li className="nav-item" style={{ marginRight: "15px" }}>
              <button
                className="btn btn-info"
                onClick={() => {
                  this.setState({
                    fromDate: null,
                    toDate: null,
                    searchFrom: this.getToday(),
                    searchTo: this.getToday(),
                  });
                }}
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </li>
          </ul>
        </nav>
        <div
          className="content-wrapper"
          style={{ overflowY: "scroll", paddingTop: "20px" }}
        >
          <ListInDay
            title="LỊCH SỬ NHẬN KHÁCH"
            titleHeader={[
              "Mã",
              "Họ tên",
              "Điện thoại",
              "Bộ phận",
              "Người tạo",
              "Người xử lý",
              "Ghi chú",
              "Thời gian",
            ]}
            data={this.state.filterCustomerData}
            key={this.state.filterCustomerData}
            onRefresh={this.handleRefresh}
          />
        </div>
      </div>
    );
  }
}
