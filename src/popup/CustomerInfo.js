import React, { Component } from "react";
import { Modal } from "react-bootstrap";

export default class CustomerInfo extends Component {
  constructor(props) {
    super(props);
  }

  getNameSource() {
    switch (this.props.customerData.customer_source) {
      case 1:
        return "Facebook";
      case 2:
        return "Google";
      case 3:
        return "Người quen";
      default:
        return "Unknow";
    }
  }

  render() {
    return (
      <Modal show={this.props.visible} onHide={this.props.onDone}>
        <Modal.Header closeButton style={{ padding: "5px 17px" }}>
          <Modal.Title>Thông tin khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row" style={{ marginBottom: "8px" }}>
              <div className="col-md-3">
                <strong>Mã KH:</strong> {this.props.customerData.code}
              </div>
              <div className="col-md-5">
                <strong>Họ tên:</strong> {this.props.customerData.fullname}
              </div>
              <div className="col-md-4">
                <strong>Giới tính:</strong>{" "}
                {this.props.customerData.gender == "M" ? "Nam" : "Nữ"}
              </div>
            </div>
            <div className="row" style={{ marginBottom: "8px" }}>
              <div className="col-md-8">
                <strong>Địa chỉ:</strong> {this.props.customerData.address}
              </div>
              <div className="col-md-4">
                <strong>Số ĐT:</strong> {this.props.customerData.phone}
              </div>
            </div>
            <div className="row" style={{ marginBottom: "8px" }}>
              <div className="col-md-8">
                <strong>Ngày sinh:</strong> {this.props.customerData.birth_date}
              </div>
              <div className="col-md-4">
                <strong>Công việc:</strong> {this.props.customerData.job_title}
              </div>
            </div>
            <div className="row" style={{ marginBottom: "10px" }}>
              <div className="col-md-8">
                <strong>Người thân:</strong>{" "}
                {this.props.customerData.emergency_contact_person}
              </div>
              <div className="col-md-4">
                <strong>Số ĐT:</strong>{" "}
                {this.props.customerData.emergency_contact_phone}
              </div>
            </div>
            <div
              className="row"
              style={{
                marginBottom: "8px",
                paddingTop: "10px",
                borderTop: "1px solid #f0f0f0",
              }}
            >
              <div className="col-md-3">
                <strong>Độ ưu tiên:</strong>{" "}
                {this.props.customerData.customer_priority}
              </div>
              <div className="col-md-3">
                <strong>Nguồn KH:</strong>{" "}
                {this.getNameSource()}
              </div>
              <div className="col-md-6">
                <strong>Facebook:</strong>{" "}
                {this.props.customerData.facebook_link}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
