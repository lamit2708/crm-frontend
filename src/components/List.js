import React, { Component } from "react";
import ConfirmDeletePopup from "../popup/ConfirmDeletePopup";
import EditCustomerPopup from "../popup/EditCustomerPopup";
import customerService from "../services/customer.service";
import "./css/style.css";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopupEdit: false,
      showPopupDelete: false,
      seletedIndex: null,
    };
    this.getPopupDelete = this.getPopupDelete.bind(this);
  }

  handleEdit(index) {
    this.setState({
      showPopupEdit: true,
      seletedIndex: index,
    });
  }

  handleDelete(index) {
    this.setState({
      showPopupDelete: true,
      seletedIndex: index,
    });
  }

  getPopupEdit() {
    if (this.state.showPopupEdit) {
      return (
        <EditCustomerPopup
          customerData={this.props.data[this.state.seletedIndex]}
          visible={this.state.showPopupEdit}
          onDone={() => {
            this.props.onRefresh();
            this.setState({
              showPopupEdit: false,
            });
          }}
        />
      );
    } else {
      return null;
    }
  }

  getPopupDelete() {
    if (this.state.showPopupDelete) {
      const customer = this.props.data[this.state.seletedIndex];

      return (
        <ConfirmDeletePopup
          //visible={true}
          handleCancel={() => {
            //this.props.onRefresh();
            this.setState({ showPopupDelete: false });
          }}
          handleConfirm={() => {
            customerService.delete(customer.id).then((response) => {
              this.setState({ showPopupDelete: false });
              this.props.onRefresh();
            });
          }}
          title="Xác nhận"
          body={
            "Xóa thông tin hồ sơ của khách hàng " +
            customer.code +
            " - " +
            customer.fullname
          }
          //customerData={customer}
          //buttonText="Xóa"
        />
      );
    }
  }

  buildHeaderHtml() {
    if (this.props.titleHeader != null && this.props.titleHeader != 0) {
      var template = this.props.titleHeader.map((element, idx) => (
        <th key={idx} style={{ backgroundColor: "#0ab0c0" }}>
          {element}
        </th>
      ));
      return <tr>{template}</tr>;
    }
    return null;
  }

  convertTime(dateTime) {
    var time = new Date(dateTime);
    var format =
      time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear();
    // " - " +
    // time.getHours() +
    // ":" +
    // time.getMinutes();
    return format;
  }

  buildBodyHtml() {
    if (this.props.data != null && this.props.data.length != 0) {
      var index = -1;
      var template = this.props.data.map((element, idx) => {
        index++;
        return (
          <tr
            key={idx}
            row={index}
            // className={
            //   this.props.itemClickFunc == null ||
            //   this.props.itemClickFunc == undefined
            //     ? ""
            //     : "item-list"
            // }
            style={{ backgroundColor: index % 2 == 0 ? "white" : "#ddfbfb" }}
          >
            {/* <td row={index} col="id" style={{ padding: "5px 0 5px 1.5rem" }}>
              {element.id}
            </td> */}
            <td row={index} col="code">
              {element.code}
            </td>
            <td
              row={index}
              col="fullname"
              onClick={(e) => {
                if (
                  this.props.itemClickFunc != null &&
                  this.props.itemClickFunc != undefined
                ) {
                  this.props.itemClickFunc(
                    this.props.data[e.target.getAttribute("row")]
                  );
                }
              }}
              style={{ color: "#d35400", cursor: "pointer" }}
            >
              {element.fullname}
            </td>
            <td
              row={index}
              col="gender"
              // style={{ padding: "3px 0 3px 0.25rem" }}
            >
              {element.gender == "M" ? "Nam" : "Nữ"}
            </td>
            <td
              row={index}
              col="birthdate"
              // style={{ padding: "5px 0 5px 0.75rem" }}
            >
              {this.convertTime(element.birth_date)}
            </td>
            <td
              row={index}
              col="phone"
              // style={{ padding: "5px 0 5px 0.75rem" }}
            >
              {element.phone}
            </td>
            {/* <td row={index} col="fb" style={{ padding: "5px 0 5px 0.75rem" }}>
              {element.facebook_link}
            </td> */}
            {/* <td
              row={index}
              col="address"
              style={{ padding: "5px 0 5px 0.75rem" }}
            >
              {element.address}
            </td>
            <td
              row={index}
              col="note"
              style={{ padding: "5px 0 5px 0.75rem" }}
            ></td> */}
            <td
              row={index}
              col="created_user"
              // style={{ padding: "5px 0 5px 0.75rem" }}
            >
              {element.created_user}
            </td>
            <td
              row={index}
              col="created_date"
              // style={{ padding: "5px 0 5px 0.75rem" }}
            >
              {this.convertTime(element.created_date)}
            </td>
            <td
              row={index}
              col="edit"
              // style={{ padding: "5px 0 5px 0.75rem" }}
            >
              <button
                style={{ padding: "0 0.25rem" }}
                className="btn btn-info btn-sm"
                row={index}
                // onClick={(event) => {
                //   this.handleEdit(event.target.getAttribute("row"));
                // }}
                onClick={(e) => {
                  this.props.onItemDetail(
                    this.props.data[e.target.getAttribute("row")]
                  );
                }}
              >
                <i row={index} className="fas fa-edit"></i>
              </button>
            </td>
            <td
              row={index}
              col="delete"
              // style={{ padding: "5px 0 5px 0.75rem" }}
            >
              <button
                style={{ padding: "0 0.25rem" }}
                className="btn btn-info btn-sm"
                row={index}
                onClick={(event) => {
                  this.handleDelete(event.target.getAttribute("row"));
                }}
              >
                <i row={index} className="fas fa-trash-alt"></i>
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
              <h4 className="card-title">
                <strong>{this.props.title}</strong>
              </h4>
            </div>
            {/* /.card-header */}
            <div
              className="card-body table-responsive p-0"
              style={{
                height: this.props.height == null ? "100%" : this.props.height,
              }}
            >
              <table className="table table-head-fixed text-nowrap">
                <thead>{this.buildHeaderHtml()}</thead>
                <tbody>{this.buildBodyHtml()}</tbody>
              </table>
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </div>
        {this.getPopupDelete()}
        {this.getPopupEdit()}
      </div>
    );
  }
}
