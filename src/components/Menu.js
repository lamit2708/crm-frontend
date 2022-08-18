import { render } from "@testing-library/react";
import React, { Component } from "react";
import authService from "../services/auth.service";
import { NavLink } from "react-router-dom";

const arrayMenu = [
  {
    id: 1,
    name: "DASHBOARD",
    machineName: "home",
    icon: "fas fa-random",
  },
  {
    id: 2,
    name: "KHÁCH HÀNG",
    machineName: "khach-hang",
    icon: "fas fa-user-tie",
  },
  {
    id: 3,
    name: "BÁO CÁO",
    machineName: "bao-cao",
    icon: "fas fa-chart-line",
  },
  {
    id: 4,
    name: "HỆ THỐNG",
    machineName: "he-thong",
    icon: "fas fa-cog",
  },
  /*{
    name: "Cơ Bản",
    machineName: "coBan",
    icon: "fas fa-tachometer-alt",
  },
  {
    name: "Nghiệp Vụ",
    machineName: "nghiepVu",
    icon: "fas fa-briefcase",
  },
  {
    name: "Kế Toán",
    machineName: "keToan",
    icon: "fas fa-calculator",
  },
  {
    name: "Chăm Sóc Khách Hàng",
    machineName: "chamSocKhachHang",
    icon: "fas fa-hands-helping",
  },*/
];

class MenuComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="nav-item">
        <a href={"/home" + "#" + this.props.link} className="nav-link">
          <i className={"nav-icon " + this.props.icon} />
          &nbsp;<p style={{ color: "white" }}>{this.props.name}</p>
        </a>
      </li>
    );
  }
}

const listItems = arrayMenu.map((item) => (
  <MenuComponent
    key={item.id}
    name={item.name}
    icon={item.icon}
    link={item.machineName}
  />
));

export default class Menu extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const user = authService.getCurrentUser();
    if (user == null) {
      this.props.history.push("/login");
      window.location.reload();
    }
  }
  render() {
    const pathname = window.location.pathname;
    const system = ["/account", "/group", "/staff"];
    const activeSystem = pathname.match(system.join("|"));
    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a
          href="/home"
          className="brand-link"
          style={{ textAlign: "center", fontSize: "24px" }}
        >
          {/*<img
            src="assets/img/logo.png"
            alt="AZNose"
            className="brand-image img-rectangle elevation-3"
            style={{
              opacity: ".8",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          />*/}
          <span className="brand-text font-weight-light">
            <span style={{ color: "#f07c22" }}>
              {" "}
              <b>CR</b>
            </span>
            M
          </span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div
            className="user-panel mt-3 pb-3 mb-3 d-flex"
            style={{ paddingBottom: "0" }}
          >
            <div className="image">
              <img
                src="/assets/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div style={{ width: "75%", paddingLeft: "10px" }}>
              <a
                href="#"
                className="d-block"
                style={{
                  fontSize: "20px",
                  color: "rgb(240, 124, 34)",
                  paddingBottom: "5px",
                }}
              >
                {authService.getCurrentUser().username}
              </a>
            </div>
            <div className="info">
              <a
                href="/login"
                className="d-block"
                onClick={() => {
                  authService.logout();
                }}
              >
                <i
                  className="fas fa-sign-out-alt"
                  style={{ color: "lightblue", fontSize: "20px" }}
                ></i>
              </a>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* {listItems} */}
              <li className="nav-item">
                <a href="/home#home" className="nav-link">
                  <i className="nav-icon fas fa-random" />
                  &nbsp;<p style={{ color: "white" }}>DASHBOARD</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/home#khach-hang" className="nav-link">
                  <i className="nav-icon fas fa-user-tie" />
                  &nbsp;<p style={{ color: "white" }}>KHÁCH HÀNG</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/home#bao-cao" className="nav-link">
                  <i className="nav-icon fas fa-chart-line" />
                  &nbsp;<p style={{ color: "white" }}>BÁO CÁO</p>
                </a>
              </li>
              <li
                className={
                  "nav-item has-treeview " + `${activeSystem && "menu-open"}`
                }
              >
                <a
                  href="/home#he-thong"
                  className={`nav-link ` + `${activeSystem && "active"}`}
                >
                  <i className="nav-icon fas fa-cog" />
                  &nbsp;
                  <p style={{ color: "white" }}>
                    HỆ THỐNG
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <NavLink to={`/system` + system[0]} className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>TÀI KHOẢN</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={`/system` + system[1]} className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>NHÓM</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={`/system` + system[2]} className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>NHÂN VIÊN</p>
                    </NavLink>
                  </li>
                </ul>
              </li>
              {/* 
  
  {
    id: 4,
    name: "HỆ THỐNG",
    machineName: "he-thong",
    icon: "fas fa-cog",
  }, */}
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    );
  }
}
