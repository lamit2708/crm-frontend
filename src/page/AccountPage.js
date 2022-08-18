import React, { Component } from "react";
import ListAccount from "../components/ListAccount";
import Menu from "../components/Menu";
import userService from "../services/user.service";

export default class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountData: null,
      filterKeyword: "",
      filteraccountData: null,
      visibleCreateCustomerPopup: false,
      fromDate: null,
      toDate: null,
    };
    this.searchAccount = this.searchAccount.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.handleRefresh();
  }

  searchAccount(keyWord) {
    if (keyWord == "") {
      this.setState({
        filteraccountData: this.state.accountData,
      });
    } else {
      var tempArr = [];
      this.state.accountData.forEach((element) => {
        var fullSt = element.id + element.username + element.email;
        var fullUnsignSt = this.convertUnsignedString(fullSt);
        var lastFullSt = fullSt + fullUnsignSt;
        if (lastFullSt.toLowerCase().includes(keyWord.toLowerCase())) {
          tempArr.push(element);
        }
      });
      this.setState({
        filteraccountData: tempArr,
      });
    }
  }

  getCreateAccountPopup() {}

  handleRefresh() {
    userService.get().then((response) => {
      this.setState({
        accountData: response.data,
      });
      this.searchAccount(this.state.filterKeyword);
      console.log(response.data);
    });
  }

  handleCreateAccount() {
    this.setState({
      visibleCreateCustomerPopup: true,
    });
  }

  onSetFromDate(date) {
    this.setState({
      fromDate: date,
    });
  }

  onSetToDate(date) {
    this.setState({
      toDate: date,
    });
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
                placeholder="Tìm tài khoản"
                aria-label="Search"
                onChange={(event) => {
                  this.setState({
                    filterKeyword: event.target.value,
                  });
                }}
                onKeyUp={(event) => {
                  if (event.keyCode == 13) {
                    this.searchAccount(this.state.filterKeyword);
                  }
                }}
              />
            </li>
            <button
              className="btn btn-info"
              style={{ marginLeft: "10px" }}
              onClick={this.handleCreateCustomer}
            >
              Tạo tài khoản
            </button>
          </ul>
        </nav>
        <div
          className="content-wrapper"
          style={{ overflowY: "scroll", paddingTop: "20px" }}
        >
          <ListAccount
            title="DANH SÁCH TÀI KHOẢN"
            titleHeader={[
              "Id",
              "Tên tài khoản",
              "Email",
              "Nhân viên",
              "Kích hoạt",
              "Ngày tạo",
              "Lần cuối đăng nhập",
              "Thao tác",
            ]}
            data={this.state.filteraccountData}
            key={this.state.filteraccountData}
            onRefresh={this.handleRefresh}
          />
        </div>
        {this.getCreateAccountPopup()}
      </div>
    );
  }
}
