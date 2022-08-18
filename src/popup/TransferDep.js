import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import authService from "../services/auth.service";
import customerService from "../services/customer.service";

export default class TransferDep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: "",
      depChoose: "",
    };
  }

  transferCustomer(customerData, indexDepMove) {
    customerData.department = indexDepMove;
    customerData.note = this.state.note;
    var objectTransfer = Object.assign({}, customerData, {
      transfer_user: authService.getCurrentUser().id,
    });
    console.log(objectTransfer);
    customerService
      .updateTransfer(objectTransfer.id, objectTransfer)
      .then((response) => {
        this.props.onDone();
      });
  }

  deleteCustomer(customerData) {
    customerService.deleteTransfer(customerData.id).then((response) => {
      this.props.onDone();
    });
  }

  render() {
    const styleDefault = {
      display: "inline-block",
      width: "33%",
      padding: "10px",
    };
    const styleButtonDefault = {
      display: "inline-block",
      width: "100%",
      height: "100px",
    };
    return (
      <Modal show={this.props.visible} onHide={this.props.onDone}>
        <Modal.Header closeButton style={{ padding: "5px 17px" }}>
          <Modal.Title>Chuyển khách</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex" }}>
            <div
              style={{
                border: "1px solid black",
                width: "50%",
                display: "inline-block",
                margin: "5px 2px 5px 0",
                padding: "5px",
              }}
            >
              <div>
                <strong>Mã KH:</strong> {this.props.customerData.code}
              </div>
              <div>
                <strong>Tên KH:</strong> {this.props.customerData.fullname}
              </div>
              <div>
                <strong>Bộ phận:</strong> {this.state.depChoose}
              </div>
            </div>
            <div
              style={{
                width: "50%",
                display: "inline-block",
                margin: "5px 0 5px 2px",
                height: "84px",
              }}
            >
              <textarea
                placeholder="Ghi chú..."
                onChange={(event) => {
                  this.setState({
                    note: event.target.value,
                  });
                }}
                style={{
                  resize: "none",
                  margin: "0",
                  height: "100%",
                  width: "100%",
                  padding: "5px",
                  boxSizing: "border-box",
                  outline: "1px solid black",
                }}
              ></textarea>
            </div>
          </div>
          <div style={{ border: "1px solid black" }}>
            <div>
              <div style={styleDefault}>
                <button
                  alt="transfer"
                  className="btn btn-inline btn-info"
                  onClick={() => {
                    this.transferCustomer(this.props.customerData, "1");
                  }}
                  style={styleButtonDefault}
                  onMouseEnter={() => this.setState({ depChoose: "Lễ Tân" })}
                  onMouseLeave={() => this.setState({ depChoose: "" })}
                >
                  <div>
                    <i class="fas fa-concierge-bell"></i>
                  </div>
                  Lễ Tân
                </button>
              </div>
              <div style={styleDefault}>
                <button
                  alt="transfer"
                  className="btn btn-inline btn-info"
                  onClick={() => {
                    this.transferCustomer(this.props.customerData, "2");
                  }}
                  style={styleButtonDefault}
                  onMouseEnter={() => this.setState({ depChoose: "Tư vấn" })}
                  onMouseLeave={() => this.setState({ depChoose: "" })}
                >
                  <div>
                    <i class="fas fa-calendar-alt"></i>
                  </div>
                  Tư vấn
                </button>
              </div>
              <div style={styleDefault}>
                <button
                  alt="transfer"
                  className="btn btn-inline btn-info"
                  onClick={() => {
                    this.transferCustomer(this.props.customerData, "3");
                  }}
                  style={styleButtonDefault}
                  onMouseEnter={() => this.setState({ depChoose: "Kế Toán" })}
                  onMouseLeave={() => this.setState({ depChoose: "" })}
                >
                  <div>
                    <i class="fas fa-map-marked-alt"></i>
                  </div>
                  Kế Toán
                </button>
              </div>
              <div style={styleDefault}>
                <button
                  alt="transfer"
                  className="btn btn-inline btn-info"
                  onClick={() => {
                    this.transferCustomer(this.props.customerData, "4");
                  }}
                  style={styleButtonDefault}
                  onMouseEnter={() => this.setState({ depChoose: "Điều trị" })}
                  onMouseLeave={() => this.setState({ depChoose: "" })}
                >
                  <div>
                    <i class="fas fa-desktop"></i>
                  </div>
                  Điều trị
                </button>
              </div>
              <div style={styleDefault}>
                <button
                  alt="transfer"
                  className="btn btn-inline btn-info"
                  onClick={() => {
                    this.transferCustomer(this.props.customerData, "5");
                  }}
                  style={styleButtonDefault}
                  onMouseEnter={() => this.setState({ depChoose: "Chăm sóc" })}
                  onMouseLeave={() => this.setState({ depChoose: "" })}
                >
                  <div>
                    <i class="fas fa-x-ray"></i>
                  </div>
                  Chăm sóc
                </button>
              </div>
              <div style={styleDefault}>
                <button
                  alt="transfer"
                  className="btn btn-inline btn-info"
                  onClick={() => {
                    this.deleteCustomer(this.props.customerData);
                  }}
                  style={styleButtonDefault}
                  onMouseEnter={() => this.setState({ depChoose: "Ra về" })}
                  onMouseLeave={() => this.setState({ depChoose: "" })}
                >
                  <div>
                    <i class="far fa-comments"></i>
                  </div>
                  Ra về
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
