import React, { Component } from "react";
import Menu from "../components/Menu";
import GroupWidget from "../components/Widget";

const data = [
  /*{
    groupName: "Quản Lý Công việc",
    machineName: "quanLyCongViec",
    icon: "fas fa-clipboard-list",
    numCol: 4,
    dataWidgets: [
      {
        color: "blue",
        title: "Chi Nhánh",
        des: "Quản lý chi nhánh",
        icon: "fas fa-hotel",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
      {
        color: "blue",
        title: "Bộ Phận",
        des: "Quản lý bộ phận",
        icon: "fas fa-sitemap",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
      {
        color: "blue",
        title: "Phòng Ban",
        des: "Quản lý phòng ban",
        icon: "fas fa-laptop-house",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
      {
        color: "blue",
        title: "Nhân Viên",
        des: "Quản lý nhân viên",
        icon: "fas fa-user-tie",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
      {
        color: "blue",
        title: "Vai trò",
        des: "Quản lý vai trò",
        icon: "fas fa-user-tag",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
    ],
  },*/

  /*{
    groupName: "Quản Lý Danh Mục",
    machineName: "quanLyDanhMuc",
    icon: "fas fa-sitemap",
    numCol: 4,
    dataWidgets: [
      {
        color: "yellow",
        title: "Vùng Miền",
        des: "Quản lý danh mục vùng miền",
        icon: "fas fa-location-arrow",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
      {
        color: "yellow",
        title: "Nhóm Dịch Vụ",
        des: "Quản lý nhóm dịch vụ",
        icon: "fas fa-layer-group",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
      {
        color: "yellow",
        title: "Dịch Vụ",
        des: "Quản lý dịch vụ",
        icon: "fab fa-servicestack",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
      {
        color: "yellow",
        title: "Trạng Thái Khách",
        des: "Quản lý danh sách trạng thái khách",
        icon: "fas fa-user-edit",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
      {
        color: "yellow",
        title: "Trạng Thái Dịch Vụ",
        des: "Quản lý danh sách trạng thái dịch vụ",
        icon: "fas fa-satellite-dish",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
      {
        color: "yellow",
        title: "Tình Trạng Khách Hàng",
        des: "Quản lý khách hàng",
        icon: "fas fa-user-md",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
      {
        color: "yellow",
        title: "Nguồn Giới Thiệu",
        des: "Quản lý danh mục nguồn giới thiệu",
        icon: "fas fa-network-wiblue",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
    ],
  },*/
  {
    groupName: "QUY TRÌNH",
    machineName: "quy-trinh",
    icon: "fas fa-random",
    numCol: 4,
    dataWidgets: [
      {
        color: "blue",
        title: "Lễ Tân",
        des: "Lễ tân",
        icon: "fas fa-concierge-bell",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/reception",
      },
      {
        color: "blue",
        title: "Tư Vấn",
        des: "Bác sĩ tư vấn",
        icon: "fas fa-calendar-alt",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/consultant",
      },
      {
        color: "blue",
        title: "Kế Toán",
        des: "Kế toán",
        icon: "fas fa-map-marked-alt",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/accountant",
      },
      {
        color: "blue",
        title: "Điều Trị",
        des: "Phẫu thuật",
        icon: "fas fa-desktop",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/surgery",
      },
    ],
  },
  {
    groupName: "KHÁCH HÀNG",
    machineName: "khach-hang",
    icon: "fas fa-user-tie",
    numCol: 4,
    dataWidgets: [
      {
        color: "blue",
        title: "Khách tiềm năng",
        des: "",
        icon: "fas fa-users",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/lead/list",
      },
      {
        color: "blue",
        title: "Khách Hàng",
        des: "",
        icon: "fas fa-users",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/customer/list",
      },
      {
        color: "blue",
        title: "Lịch Hẹn",
        des: "Quản lý lịch hẹn",
        icon: "fa fa-calendar",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/calendar",
      },
      // {
      //   color: "blue",
      //   title: "Chăm Sóc",
      //   des: "Hậu phẫu",
      //   icon: "fas fa-x-ray",
      //   footer: "Đi đến",
      //   footerIcon: "fas fa-arrow-circle-right",
      //   linkTo: "/postoperative",
      // },
    ],
  },

  {
    groupName: "BÁO CÁO",
    machineName: "bao-cao",
    icon: "fas fa-chart-line",
    numCol: 4,
    dataWidgets: [
      {
        color: "blue",
        title: "Tiếp Nhận",
        des: "Danh sách tiếp nhận",
        icon: "fas fa-sign-in-alt",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/customer-in-day",
      },
    ],
  },
  /*{
    groupName: "Đối Tượng Nghiệp Vụ",
    machineName: "doiTuongNghiepVu",
    icon: "fas fa-user-tie",
    numCol: 4,
    dataWidgets: [
      {
        color: "red",
        title: "Danh Sách Khách",
        des: "Danh sách khách hàng",
        icon: "fas fa-users",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/customer-list",
      },
      {
        color: "red",
        title: "Danh Sách Nhận",
        des: "Danh sách tiếp nhận",
        icon: "fas fa-sign-in-alt",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/customer-in-day",
      },
      {
        color: "red",
        title: "Bảng Giá Dịch Vụ",
        des: "Quản lý bảng giá dịch vụ",
        icon: "far fa-cblueit-card",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
      {
        color: "red",
        title: "Đơn Hàng",
        des: "Quản lý hồ sơ phẫu thuật",
        icon: "fas fa-print",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
      {
        color: "red",
        title: "Bảng Giá Toa Thuốc",
        des: "Quản lý toa thuốc",
        icon: "fas fa-file-invoice",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
    ],
  },*/
  {
    groupName: "HỆ THỐNG",
    machineName: "he-thong",
    icon: "fas fa-cog",
    numCol: 4,
    dataWidgets: [
      /*{
        color: "green",
        title: "Quyền Sử Dụng",
        des: "Quản lý quyền sử dụng",
        icon: "fas fa-user-shield",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },*/
      {
        color: "blue",
        title: "Tài Khoản",
        des: "Quản lý tài khoản",
        icon: "fas fa-user-friends",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/system/account",
      },
      {
        color: "blue",
        title: "Nhóm",
        des: "Quản lý Nhóm",
        icon: "fas fa-address-card",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/system/group",
      },
      {
        color: "blue",
        title: "Nhân viên",
        des: "Quản lý Nhân viên",
        icon: "fas fa-address-card",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/system/staff",
      },
      /*{
        color: "green",
        title: "Phân Quyền",
        des: "Quản lý phân quyền",
        icon: "fas fa-users-cog",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },*/
    ],
  },
  /*{
    groupName: "Cơ Bản",
    machineName: "coBan",
    icon: "fas fa-tachometer-alt",
    numCol: 4,
    dataWidgets: [
      {
        color: "blue",
        title: "Shell",
        des: "Khung ứng dụng",
        icon: "fas fa-tachometer-alt",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
      {
        color: "blue",
        title: "Chuyển Khách",
        des: "Chuyển khách",
        icon: "fas fa-exchange-alt",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
      {
        color: "blue",
        title: "Tìm Khách",
        des: "Tìm khách",
        icon: "fas fa-search",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
      {
        color: "blue",
        title: "Tìm Module",
        des: "Tìm module",
        icon: "fas fa-search-location",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
      {
        color: "blue",
        title: "Thông Tin Khách Hàng",
        des: "Thông tin khách hàng",
        icon: "fas fa-info-circle",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
    ],
  },*/

  /*{
    groupName: "Kế Toán",
    machineName: "keToan",
    icon: "fas fa-calculator",
    numCol: 4,
    dataWidgets: [
      {
        color: "yellow",
        title: "Báo Cáo Phiếu Thu",
        des: "Báo cáo phiếu thu",
        icon: "fas fa-calendar-alt",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/test",
      },
      {
        color: "yellow",
        title: "Báo Cáo Phiếu Chi",
        des: "Báo cáo phiếu chi",
        icon: "fas fa-calendar-minus",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
    ],
  },
  {
    groupName: "Chăm Sóc Khách Hàng",
    machineName: "chamSocKhachHang",
    icon: "fas fa-hands-helping",
    numCol: 4,
    dataWidgets: [
      {
        color: "red",
        title: "Chăm Sóc Khách Sau Tư Vấn",
        des: "Chăm sóc khách sau tư vấn",
        icon: "fas fa-phone",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
      {
        color: "red",
        title: "Chăm Sóc Khách Sau Phẫu Thuật",
        des: "Chăm sóc khách sau phẫu thuật",
        icon: "fas fa-hand-holding-medical",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
      {
        color: "red",
        title: "Nhắc Hẹn",
        des: "Nhắc hẹn",
        icon: "fas fa-user-clock",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
      {
        color: "red",
        title: "Điều Dưỡng",
        des: "Điều dưỡng",
        icon: "fas fa-user-md",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
      {
        color: "red",
        title: "Hình Ảnh Khách Hàng",
        des: "Hình ảnh khách hàng",
        icon: "far fa-images",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
      {
        color: "red",
        title: "Theo Dõi Khách",
        des: "Theo dõi khách",
        icon: "far fa-address-card",
        footer: "Đi đến",
        footerIcon: "fas fa-arrow-circle-right",
        linkTo: "/",
      },
    ],
  },*/
];

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempKeyword: "",
    };
  }

  getEachGroupWidget(data) {
    const listItems = data.map((item, index) => (
      <GroupWidget data={item} key={index} />
    ));
    return listItems;
  }

  searchModule() {
    alert(this.state.tempKeyword);
  }

  render() {
    return (
      <div>
        <Menu history={this.props.history} />
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav">
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
                placeholder="Tìm Module"
                aria-label="Search"
                onChange={(event) => {
                  this.setState({
                    tempKeyword: event.target.value,
                  });
                }}
                onKeyUp={(event) => {
                  if (event.keyCode == 13) {
                    this.searchModule(this.state.tempKeyword);
                  }
                }}
              />
            </li>
          </ul>
        </nav>
        <div
          className="content-wrapper"
          style={{ overflowY: "scroll", height: "90vh" }}
        >
          {/* {this.getEachGroupWidget(data)} */}
          {data.map((item, index) => (
            <GroupWidget data={item} key={index} />
          ))}
        </div>
      </div>
    );
  }
}
