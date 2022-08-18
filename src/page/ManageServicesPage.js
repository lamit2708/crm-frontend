import React, { Component } from "react";
import ListServices from "../components/ListServices";
import Menu from "../components/Menu";

export default class ManageServicesPage extends Component {
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
                placeholder="Tìm Khách Hàng"
                aria-label="Search"
                onChange={(event) => {
                  this.setState({
                    searchKey: event.target.value,
                  });
                }}
                onKeyUp={(event) => {
                  if (event.keyCode == 13) {
                    this.searchCustomer(this.state.searchKey);
                  }
                }}
              />
            </li>
            <button
              className="btn btn-info"
              style={{ marginLeft: "10px" }}
              onClick={this.handleRefresh}
            >
              Làm mới
            </button>
          </ul>
        </nav>

        {/*Main Content */}
        <div
          className="content-wrapper pl-3 pr-3"
          style={{ overflowY: "scroll", paddingTop: "20px" }}
        ><ListServices /></div>
      </div>
    );
  }
}
