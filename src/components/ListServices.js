import React, { Component } from "react";
import ManageServicesService from "../dataDemo/ManageServices.service";
import CreateService from "../popup/CreateService";
import "./css/style.css";

export default class ListServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedServiceId: null,
      oldData: ManageServicesService.getChildService(null),
      newData: null,
      createPop: false,
    };
  }

  getCreatePopup() {
    if (this.state.createPop) {
      return (
        <CreateService
          show={this.state.createPop}
          onClose={() => this.setState({ createPop: false })}
        />
      );
    }
    return null;
  }

  buildArrayData(oldData, newData, selectId) {
    if (oldData == null && oldData == undefined && oldData.lenght == 0)
      return newData;
    var oldDataCop = [...oldData];
    var newDataCop = [...newData];
    var index = 0;
    while (selectId != oldDataCop[index].id) {
      index++;
    }
    var arr1 = oldDataCop.slice(0, index + 1);
    var arr2 = oldDataCop.slice(index + 1);
    return arr1.concat(newDataCop, arr2);
  }

  hasChildInData(pId) {
    var rs = false;
    this.state.oldData.forEach((el) => {
      if (el.pId == pId) {
        rs = true;
        return rs;
      }
    });
    return rs;
  }

  getServiceInData(id) {
    var rs = null;
    this.state.oldData.forEach((el) => {
      if (el.id == id) {
        rs = el;
        return rs;
      }
    });
    return rs;
  }

  setExpand(id, data) {
    var dataCop = [...data];
    dataCop.forEach((el) => {
      if (el.id == id) {
        if (el.isExpand) {
          el.isExpand = false;
        } else {
          el.isExpand = true;
        }
        return dataCop;
      }
    });
    return dataCop;
  }

  setHide(id, data) {
    var dataCop = [...data];
    var service = this.getServiceInData(id);
    dataCop.forEach((el) => {
      if (el.rId == service.rId && el.depth > service.depth) {
        el.hide = true;
      }
    });
    var rs = this.setExpand(id, dataCop);
    return rs;
  }

  setShow(id, data) {
    var dataCop = [...data];
    var service = this.getServiceInData(id);
    dataCop.forEach((el) => {
      if (el.rId == service.rId && el.depth == service.depth + 1) {
        el.hide = false;
      }
    });
    var rs = this.setExpand(id, dataCop);
    return rs;
  }

  getBodyBuilder(data) {
    if (data != null) {
      var template = data.map((element) => (
        <tr index={element.id} className={element.hide ? "d-none" : ""}>
          <td
            index={element.id}
            className={
              "pt-2 pb-1 pr-1 item-suggest pl-" +
              (element.depth + 1 + (element.depth - 1) * 1)
            }
            onClick={(e) => {
              if (!element.hasChild) return;
              var selectedServiceId = e.target.getAttribute("index");
              if (this.getServiceInData(selectedServiceId).isExpand) {
                this.setState({
                  selectedServiceId: selectedServiceId,
                  newData: null,
                  oldData: this.setHide(selectedServiceId, this.state.oldData),
                });
              } else {
                if (this.hasChildInData(selectedServiceId)) {
                  this.setState({
                    selectedServiceId: selectedServiceId,
                    newData: null,
                    oldData: this.setShow(
                      selectedServiceId,
                      this.state.oldData
                    ),
                  });
                } else {
                  var newData = ManageServicesService.getChildService(
                    selectedServiceId
                  );
                  this.setState({
                    selectedServiceId: selectedServiceId,
                    newData: newData,
                    oldData: this.buildArrayData(
                      this.setExpand(selectedServiceId, this.state.oldData),
                      newData,
                      selectedServiceId
                    ),
                  });
                }
              }
            }}
          >
            <i
              index={element.id}
              class={
                "fas item-suggest" +
                (element.isExpand ? " fa-caret-down" : " fa-caret-right") +
                (!element.hasChild ? " invisible" : "")
              }
            ></i>
            &nbsp;{element.name}
          </td>
          <td className="pl-2 pt-2 pb-1 pr-1">{element.des}</td>
          <td className="pl-2 pt-2 pb-1 pr-1">{element.unit}</td>
          <td className="pl-2 pt-2 pb-1 pr-1">{element.price}</td>
          <td className="pl-2 pt-2 pb-1 pr-1">{element.currency}</td>
          <td className="pl-2 pt-1 pb-1 pr-1">
            <button
              className="mr-1 btn btn-sm btn-info border"
              index={element.id}
              onClick={(e) => {
                alert("Add" + e.target.getAttribute("index"));
              }}
            >
              <i index={element.id} class="fas fa-plus"></i>
            </button>
            <button
              className="mr-1 btn btn-sm btn-warning border"
              index={element.id}
              onClick={(e) => {
                alert("Edit" + e.target.getAttribute("index"));
              }}
            >
              <i index={element.id} class="far fa-edit"></i>
            </button>
            <button
              className="mr-1 btn btn-sm btn-danger border"
              index={element.id}
              onClick={(e) => {
                alert("Delete" + e.target.getAttribute("index"));
              }}
            >
              <i index={element.id} class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      ));
      return template;
    }
    return null;
  }

  render() {
    return (
      <div className="card">
        {/* Title */}
        <div className="card-header pt-2 pb-2 pl-3">
          <h3 className="card-title font-weight-bold">Danh mục dịch vụ</h3>
          <div className="card-tools pb-1 pr-2">
            <button
              type="button"
              className="btn btn-tool border "
              onClick={() => {
                this.setState({ createPop: true });
              }}
            >
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="card-body p-0">
          <table className="table table-bordered" id="table-services">
            <thead>
              <tr>
                <th className="pt-2 pb-2 pl-3" style={{ width: "30%" }}>
                  Tên Danh Mục
                </th>
                <th className="pt-2 pb-2 pl-3" style={{ width: "30%" }}>
                  Mô tả / Chỉ Định
                </th>
                <th className="pt-2 pb-2 pl-3" style={{ width: "10%" }}>
                  Đơn Vị
                </th>
                <th className="pt-2 pb-2 pl-3" style={{ width: "10%" }}>
                  Đơn Giá
                </th>
                <th className="pt-2 pb-2 pl-3" style={{ width: "10%" }}>
                  Tiền Tệ
                </th>
                <th className="pt-2 pb-2 pl-3" style={{ width: "10%" }}>
                  Tác Vụ
                </th>
              </tr>
            </thead>
            <tbody>{this.getBodyBuilder(this.state.oldData)}</tbody>
          </table>
        </div>
        {this.getCreatePopup()}
      </div>
    );
  }
}
