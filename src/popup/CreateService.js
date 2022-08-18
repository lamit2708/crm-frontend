import React, { Component } from "react";
import { Modal } from "react-bootstrap";

export default class CreateService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isService: false,
    };
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onClose} size="lg">
        <Modal.Header closeButton style={{ padding: "5px 17px" }}>
          <Modal.Title>Tạo dịch vụ</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "5px 10px" }}>
          <div className="card-body" style={{ padding: "10px 10px" }}>
            <div className="form-group">
              <div className="row">
                <div className="col-md-12">
                  <label
                    htmlFor="fullname"
                    style={{
                      color: "#212529",
                    }}
                  >
                    Tên
                  </label>
                </div>
                <div className="col-md-6">
                  <input className="form-control" />
                </div>
                <div className="col-md-6 text-center pt-1">
                  <input
                    type="checkbox"
                    className="pt-1"
                    onChange={() => {
                      this.setState({
                        isService: this.state.isService ? false : true,
                      });
                    }}
                  />
                  &nbsp;Dịch vụ
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-12">
                  <label
                    htmlFor="fullname"
                    style={{
                      color: "#212529",
                    }}
                  >
                    Mô tả dịch vụ
                  </label>
                  <textarea
                    className="form-control"
                    rows="4"
                  />
                </div>
              </div>
            </div>

            <div
              className={"form-group" + (this.state.isService ? "" : " d-none")}
            >
              <div className="row">
                <div className="col-md-4">
                  <label
                    htmlFor="fullname"
                    style={{
                      color: "#212529",
                    }}
                  >
                    Đơn vị
                  </label>
                  <input className="form-control" />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="fullname"
                    style={{
                      color: "#212529",
                    }}
                  >
                    Đơn giá
                  </label>
                  <input className="form-control" />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="fullname"
                    style={{
                      color: "#212529",
                    }}
                  >
                    Loại tiền tệ
                  </label>
                  <select className="form-control">
                      <option>VND</option>
                      <option>USD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ padding: "5px 17px" }}>
          <button className="btn btn-primary btn-sm" onClick={this.onSave}>
            Lưu
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={this.props.onClose}
          >
            Thoát
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
