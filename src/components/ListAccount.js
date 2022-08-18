import React, { Component } from "react";
import ConfirmPopup from "../popup/ConfirmPopup";
import EditCustomerPopup from "../popup/EditCustomerPopup";

export default class ListAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopupEdit: false,
      showPopupDelete: false,
      seletedIndex: null,
    };
    this.getPopupDelete = this.getPopupDelete.bind(this);
  }
  
  convertTime(dateTime) {
    var time = new Date(dateTime);
    var format = time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear() + ' - ' + time.getHours()+':'+time.getMinutes()
    return format;
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
      return (
        <ConfirmPopup
          visible={this.state.showPopupDelete}
          onDone={() => {
            this.props.onRefresh();
            this.setState({ showPopupDelete: false });
          }}
          title="Xác nhận"
          body={
            "Xóa tài khoản hồ sơ của " +
            this.props.data[this.state.seletedIndex].fullname
          }
          customerData={this.props.data[this.state.seletedIndex]}
          buttonText="Xóa"
        />
      );
    } else {
      return null;
    }
  }

  buildHeaderHtml() {
    if (this.props.titleHeader != null && this.props.titleHeader != 0) {
      var template = this.props.titleHeader.map((element) => (
        <th style={{ backgroundColor: "#dadada" }}>{element}</th>
      ));
      return <tr>{template}</tr>;
    }
    return null;
  }

  buildBodyHtml() {
    console.log(this.props.data);
    if (this.props.data != null && this.props.data.length != 0) {
      var index = -1;
      var template = this.props.data.map((element) => {
        index++;
        return (
          <tr
            row={index}
            style={{ backgroundColor: index % 2 == 0 ? "white" : "#eeeeee" }}
          >
            <td row={index} col="id" style={{ padding: "5px 0 5px 1.5rem" }}>
              {element.id}
            </td>
            <td
              row={index}
              col="username"
              style={{ padding: "5px 0 5px 1.5rem" }}
            >
              {element.username}
            </td>
            <td
              row={index}
              col="email"
              style={{ padding: "5px 0 5px 0.75rem" }}
            >
              {element.email}
            </td>
            <td
              row={index}
              col="is_staff"
              style={{ padding: "5px 0 5px 2.5rem" }}
            >
              {element.is_staff ? <i class="fas fa-check"></i> : ""}
            </td>
            <td
              row={index}
              col="is_active"
              style={{ padding: "5px 0 5px 3rem" }}
            >
              {element.is_active ? <i class="fas fa-check"></i> : ""}
            </td>
            <td
              row={index}
              col="date_joined"
              style={{ padding: "5px 0 5px 0.75rem" }}
            >
              {this.convertTime(element.date_joined)}
            </td>
            <td
              row={index}
              col="last_login"
              style={{ padding: "5px 0 5px 0.75rem" }}
            >
              {this.convertTime(element.last_login)}
            </td>
            <td
              row={index}
              col="action"
              style={{ padding: "5px 0 5px 0.75rem" }}
            >
              <button
                className="btn btn-info"
                row={index}
                style={{ marginRight: "10px" }}
                onClick={(event) => {
                  alert("edit row " + event.target.getAttribute("row"));
                }}
              >
                <i row={index} class="fas fa-edit"></i>
              </button>
              <button
                className="btn btn-info"
                row={index}
                onClick={(event) => {
                  alert("delete row " + event.target.getAttribute("row"));
                }}
              >
                <i row={index} class="fas fa-trash-alt"></i>
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
              <h3 className="card-title">
                <strong>{this.props.title}</strong>
              </h3>
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
