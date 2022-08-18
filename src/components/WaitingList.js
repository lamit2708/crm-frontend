import React, { Component } from "react";
import TransferDep from "../popup/TransferDep";

export default class WaitingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleTransferPop: false,
      customerDataSelect: null,
    };
    this.onTransferPopupClose = this.onTransferPopupClose.bind(this);
  }

  onTransferPopupClose() {
    this.setState({
      visibleTransferPop: false,
      customerDataSelect: null,
    });
    this.props.refreshTable();
  }

  getPopupTransfer() {
    if (this.state.visibleTransferPop) {
      return (
        <TransferDep
          visible={this.state.visibleTransferPop}
          customerData={this.state.customerDataSelect}
          onDone={this.onTransferPopupClose}
        />
      );
    }
    return null;
  }

  buildBodyHtml() {
    if (this.props.data != null && this.props.data.length != 0) {
      var count = -1;
      var index = -1;
      var template = this.props.data.map((element) => {
        index++;
        if (element.department == this.props.depId) {
          count++;
          return (
            <tr
              row={count}
              customerindex={index}
              style={{ backgroundColor: count % 2 == 0 ? "white" : "#eeeeee" }}
            >
              <td
                row={count}
                col="code"
                style={{ padding: "5px 0 5px 1.5rem" }}
              >
                {element.code}
              </td>
              <td
                row={count}
                col="fullname"
                style={{ padding: "5px 0 5px 0.75rem" }}
              >
                {element.fullname}
              </td>
              <td
                row={count}
                col="transfer"
                customerindex={index}
                style={{ padding: "5px 0 5px 0.75rem" }}
              >
                <button
                  className="btn btn-info"
                  customerindex={index}
                  onClick={(event) => {
                    var customerData = this.props.data[
                      event.target.getAttribute("customerindex")
                    ];
                    this.setState({
                      visibleTransferPop: true,
                      customerDataSelect: customerData,
                    });
                  }}
                >
                  <i customerindex={index} className="fas fa-exchange-alt"></i>
                </button>
              </td>
            </tr>
          );
        }
      });
      return template;
    }
    return null;
  }

  render() {
    return (
      <div
        className="row"
        style={{
          width: this.props.width == null ? "100%" : this.props.width,
          marginLeft: this.props.marginLeft == null ? 0 : this.props.marginLeft,
          marginRight:
            this.props.marginRight == null ? 0 : this.props.marginRight,
        }}
      >
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <strong>
                  DANH SÁCH KHÁCH HÀNG MỚI (PHÒNG: {this.props.depName.toUpperCase()})
                </strong>
              </h3>
              <div className="card-tools">
                <div
                  className="input-group input-group-sm"
                  style={{ width: 150 }}
                >
                  <input
                    type="text"
                    name="table_search"
                    className="form-control float-right"
                    placeholder="Tìm kiếm"
                  />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-default">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* /.card-header */}
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
                    <th width="70%" style={{ backgroundColor: "#dadada" }}>
                      Họ tên
                    </th>
                    <th width="10%" style={{ backgroundColor: "#dadada" }}>
                      Chuyển
                    </th>
                  </tr>
                </thead>
                <tbody>{this.buildBodyHtml()}</tbody>
              </table>
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </div>
        {this.getPopupTransfer()}
      </div>
    );
  }
}
