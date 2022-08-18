import React, { Component } from "react";
import Menu from "../components/Menu";
import WaitingList from "../components/WaitingList";
import CustomerInfo from "../popup/CustomerInfo";
import SearchCustomer from "../popup/SearchCustomer";
import customerService from "../services/customer.service";

export default class SurgeryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerData: null,
      searchKey: "",
      visibleSearchCustomerPop: false,
      listSearch: null,
      visibleViewCustomerPop: false,
      customerView: null
    };
    this.handleRefresh = this.handleRefresh.bind(this);
    this.onSearchPopupClose = this.onSearchPopupClose.bind(this);
    this.onViewCustomer = this.onViewCustomer.bind(this);
    this.onViewPopupClose = this.onViewPopupClose.bind(this);
    this.handleRefresh();
  }

  handleRefresh() {
    customerService.getAll().then((response) => {
      this.setState({
        customerData: response.data.results,
      });
    });
  }

  searchCustomer(keyword) {
    customerService.search(keyword).then((respone) => {
      this.setState({
        visibleSearchCustomerPop: true,
        listSearch: respone.data.results,
      });
    });
  }

  getPopupSearchCustomer() {
    if (this.state.visibleSearchCustomerPop) {
      return (
        <SearchCustomer
          visible={this.state.visibleSearchCustomerPop}
          data={this.state.listSearch}
          onDone={this.onSearchPopupClose}
          hasAddButton={false}
          onViewCustomer = {this.onViewCustomer}
        />
      );
    }
    return null;
  }

  onSearchPopupClose() {
    this.setState({
      visibleSearchCustomerPop: false,
      listSearch: null,
    });
    this.handleRefresh();
  }

  onViewCustomer(customerData) {
    this.setState({
      visibleSearchCustomerPop: false,
      listSearch: null,
      visibleViewCustomerPop: true,
      customerView: customerData,
    })
  }

  getPopupViewCustomer(){
    if (this.state.visibleViewCustomerPop) {
      return (
        <CustomerInfo
          visible={this.state.visibleViewCustomerPop}
          customerData={this.state.customerView}
          onDone={this.onViewPopupClose}
        />
      );
    }
    return null;
  }

  onViewPopupClose(){
    this.setState({
      visibleViewCustomerPop: false,
      customerView: null,
    });
  }

  render() {
    return (
      <div>
        <Menu history={this.props.history}/>
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
        <div
          className="content-wrapper"
          style={{ overflowY: "scroll", paddingTop: "20px" }}
        >
          <WaitingList
            key={this.state.customerData}
            data={this.state.customerData}
            depId="4"
            depName='Điều trị'
            refreshTable={this.handleRefresh}
          />
        </div>
        {this.getPopupSearchCustomer()}
        {this.getPopupViewCustomer()}
      </div>
    );
  }
}
