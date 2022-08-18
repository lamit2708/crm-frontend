import React, { Component } from "react";

export default class ListInDay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.sortData = this.sortData.bind(this);
  }

  sortData(list) {
    if (list == null) return;
    var newList = [];
    list.forEach((element) => {
      newList.push(Object.assign({}, element));
    });
    newList.sort(this.compare);
    return newList;
  }

  compare(a, b) {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
    return 0;
  }

  convertTime(dateTime) {
    var time = new Date(dateTime);
    var format = time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear() + ' - ' + time.getHours()+':'+time.getMinutes()
    return format;
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

  groupData(list) {
    var tempCode = list[0].code;
    var arrResult = [];
    var tempArr = [];
    list.forEach((element) => {
      if (element.code == tempCode) {
        tempArr.push(Object.assign({}, element));
      } else {
        arrResult.push(tempArr);
        tempArr = [];
        tempCode = element.code;
        tempArr.push(Object.assign({}, element));
      }
    });
    arrResult.push(tempArr);
    return arrResult;
  }

  buildBodyHtml() {
    if (this.props.data != null && this.props.data.length != 0) {
      var listData = this.sortData(this.props.data);
      console.log(listData);
      var listData = this.groupData(listData);
      console.log(listData);
      var index = -1;
      var template = listData.map((element) => {
        index++;
        return element.map((el) => {
          if (el == element[0]) {
            return (
              <tr
                row={index}
                style={{
                  backgroundColor: index % 2 == 0 ? "white" : "#eeeeee",
                }}
              >
                <td
                  row={index}
                  col="code"
                  style={{ padding: "5px 0 5px 1.5rem", verticalAlign: 'middle'}}
                  rowspan={element.length}
                >
                  {el.code}
                </td>
                <td
                  row={index}
                  col="fullname"
                  style={{ padding: "5px 0 5px 1.5rem" , verticalAlign: 'middle'}}
                  rowspan={element.length}
                >
                  {el.fullname}
                </td>
                <td
                  row={index}
                  col="phone"
                  style={{ padding: "5px 0 5px 1.5rem" , verticalAlign: 'middle', borderRight: '1px solid #ededed'}}
                  rowspan={element.length}
                >
                  {el.phone}
                </td>
                <td
                  row={index}
                  col="dep"
                  style={{ padding: "5px 0 5px 1.5rem" }}
                >
                  {el.department_name}
                </td>
                <td
                  row={index}
                  col="cr-user"
                  style={{ padding: "5px 0 5px 1.5rem" }}
                >
                  {el.transfer_user_fullname}
                </td>
                <td
                  row={index}
                  col="pr-user"
                  style={{ padding: "5px 0 5px 1.5rem" }}
                >
                  {el.process_user_fullname}
                </td>
                <td
                  row={index}
                  col="note"
                  style={{ padding: "5px 0 5px 1.5rem" }}
                >
                  {el.note}
                </td>
                <td
                  row={index}
                  col="time"
                  style={{ padding: "5px 0 5px 1.5rem" }}
                >
                  {this.convertTime(el.transfer_date)}
                </td>
              </tr>
            );
          } else {
            return (
              <tr
                row={index}
                style={{
                  backgroundColor: index % 2 == 0 ? "white" : "#eeeeee",
                }}
              >
                <td
                  row={index}
                  col="dep"
                  style={{ padding: "5px 0 5px 1.5rem" }}
                >
                  {el.department_name}
                </td>
                <td
                  row={index}
                  col="cr-user"
                  style={{ padding: "5px 0 5px 1.5rem" }}
                >
                  {el.transfer_user_fullname}
                </td>
                <td
                  row={index}
                  col="pr-user"
                  style={{ padding: "5px 0 5px 1.5rem" }}
                >
                  {el.process_user_fullname}
                </td>
                <td
                  row={index}
                  col="note"
                  style={{ padding: "5px 0 5px 1.5rem" }}
                >
                  {el.note}
                </td>
                <td
                  row={index}
                  col="time"
                  style={{ padding: "5px 0 5px 1.5rem" }}
                >
                  {this.convertTime(el.transfer_date)}
                </td>
              </tr>
            );
          }
        });
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
      </div>
    );
  }
}
