import React, { Component } from "react";
import ConfirmDeletePopup from "../popup/ConfirmDeletePopup";
import EditCustomerPopup from "../popup/EditCustomerPopup";
import staffService from "../services/staff.service";
import "./css/style.css";

export default class StaffList extends Component {
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
    const customer = this.props.data[index];
    this.props.itemClickFunc(customer);
  }
  // handleEdit(index) {
  //   this.setState({
  //     showPopupEdit: true,
  //     seletedIndex: index,
  //   });
  // }

  handleDelete(index) {
    this.setState({
      showPopupDelete: true,
      seletedIndex: index,
    });
  }

  // getPopupEdit() {
  //   if (this.state.showPopupEdit) {
  //     return (
  //       <EditCustomerPopup
  //         customerData={this.props.data[this.state.seletedIndex]}
  //         visible={this.state.showPopupEdit}
  //         onDone={() => {
  //           this.props.onRefresh();
  //           this.setState({
  //             showPopupEdit: false,
  //           });
  //         }}
  //       />
  //     );
  //   } else {
  //     return null;
  //   }
  // }

  getPopupDelete() {
    if (this.state.showPopupDelete) {
      const staff = this.props.data[this.state.seletedIndex];
      console.log(staff);
      return (
        <ConfirmDeletePopup
          //visible={this.state.showPopupDelete}
          handleCancel={() => {
            //this.props.onRefresh();
            this.setState({ showPopupDelete: false });
          }}
          handleConfirm={() => {
            staffService.delete(staff.id).then((response) => {
              this.props.onRefresh();
              this.setState({ showPopupDelete: false });
            });
          }}
          title="Xác nhận"
          body={
            "Xóa thông tin hồ sơ của nhân viên " +
            staff.code +
            " - " +
            staff.full_name
          }
          //customerData={this.props.data[this.state.seletedIndex]}
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
            className={
              this.props.itemClickFunc == null ||
              this.props.itemClickFunc == undefined
                ? ""
                : "item-list"
            }
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
              col="full_name"
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
              {element.full_name}
            </td>
            <td row={index} col="job_title">
              {element.job_title_name}
            </td>
            <td row={index} col="department">
              {element.department_name}
            </td>
            <td row={index} col="email">
              {element.email}
            </td>
            <td row={index} col="staff_group">
              {element.staff_group_name}
            </td>
            {/* <td row={index} col="gender">
              {element.gender == "M" ? "Nam" : "Nữ"}
            </td>
            <td row={index} col="birthdate">
              {element.birth_day +
                "/" +
                element.birth_month +
                "/" +
                element.birth_year}
            </td>
            <td row={index} col="phone">
              {element.phone}
            </td> */}

            {/* <td
              row={index}
              col="address"
              
            >
              {element.address}
            </td>
            <td
              row={index}
              col="note"
              
            ></td> */}
            {/* <td
              row={index}
              col="created_user"
              
            >
              {element.created_user}
            </td>
            <td
              row={index}
              col="created_date"
              
            >
              {this.convertTime(element.created_date)}
            </td> */}
            <td
              row={index}
              col="edit"
              // style={{ padding: "5px 0 5px 0.75rem" }}
            >
              <button
                style={{ padding: "0 0.25rem" }}
                className="btn btn-info btn-sm"
                row={index}
                onClick={(e) => {
                  //this.handleEdit(event.target.getAttribute("row"));
                  this.props.itemClickFunc(
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
            {/* <div className="card-header">
              <h4 className="card-title">
                <strong>{this.props.title}</strong>
              </h4>
            </div> */}
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
        {
          //this.getPopupEdit()
        }
      </div>
    );
  }
}
