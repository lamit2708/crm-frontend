import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import authService from "../services/auth.service";
import customerService from "../services/customer.service";

export default class SearchCustomer extends Component {
  constructor(props) {
    super(props);
  }

  onViewAction(event) {
    var customerData =
      this.props.data[event.target.getAttribute("customerindex")];
    this.props.onViewCustomer(customerData);
  }

  onAddAction(event) {
    var customerData =
      this.props.data[event.target.getAttribute("customerindex")];
    var user = authService.getCurrentUser();
    customerService
      .createTransfer({
        customer: customerData.id,
        department: 1,
        transfer_user: user.id,
      })
      .then((response) => {
        this.props.onDone();
      });
  }

  getButtonAdd(index) {
    if (this.props.hasAddButton) {
      return (
        <button
          className="btn btn-info"
          customerIndex={index}
          onClick={(event) => {
            this.onAddAction(event);
          }}
          style={{
            marginRight: "5px",
          }}
        >
          <i class="fas fa-user-plus" customerIndex={index}></i>
        </button>
      );
    }
    return null;
  }

  buildBodyHtml() {
    if (this.props.data != null && this.props.data.length != 0) {
      var count = -1;
      var template = this.props.data.map((element) => {
        count++;
        return (
          <tr
            row={count}
            style={{ backgroundColor: count % 2 == 0 ? "white" : "#eeeeee" }}
          >
            <td row={count} style={{ padding: "5px 0 5px 1.5rem" }}>
              {element.code}
            </td>
            <td row={count} style={{ padding: "5px 0 5px 0.75rem" }}>
              {element.fullname}
            </td>
            <td row={count} style={{ padding: "5px 0 5px 0.75rem" }}>
              {this.getButtonAdd(count)}
              <button
                className="btn btn-info"
                customerIndex={count}
                onClick={(event) => {
                  this.onViewAction(event);
                }}
              >
                <i class="fas fa-eye" customerIndex={count}></i>
              </button>
            </td>
          </tr>
        );
      });
      return template;
    }
    return null;
  }

  render() {
    return (
      <Modal show={this.props.visible} onHide={this.props.onDone}>
        <Modal.Header closeButton style={{ padding: "5px 17px" }}>
          <Modal.Title>Tìm kiếm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="card-body table-responsive p-0"
            style={{
              height: this.props.height == null ? "100%" : this.props.height,
            }}
          >
            <table className="table table-head-fixed text-nowrap">
              <thead>
                <tr>
                  <th width="20%" style={{ backgroundColor: "#dadada" }}>
                    Mã KH
                  </th>
                  <th width="65%" style={{ backgroundColor: "#dadada" }}>
                    Họ tên
                  </th>
                  <th width="15%" style={{ backgroundColor: "#dadada" }}>
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>{this.buildBodyHtml()}</tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
