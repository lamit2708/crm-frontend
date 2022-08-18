import React, { Component } from "react";

export default class Edit1 extends Component {
  render() {
    return (
      <div className="tab-pane" id="edit">
        <form className="form-horizontal">
          <div className="form-group row">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">
              Tên
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                placeholder="Họ tên"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputName2" className="col-sm-2 col-form-label">
              Số ĐT
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                placeholder="Số điện thoại"
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputExperience"
              className="col-sm-2 col-form-label"
            >
              Địa chỉ
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                placeholder="Địa chỉ"
                defaultValue={""}
              />
            </div>
          </div>
          {/* <div className="form-group row">
            <label htmlFor="inputSkills" className="col-sm-2 col-form-label">
              CMND/CMT
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                placeholder="Số CMND / CMT"
              />
            </div>
          </div> */}
          <div className="form-group row">
            <label htmlFor="inputSkills" className="col-sm-2 col-form-label">
              Mã KH
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder="Mã khách hàng"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputSkills" className="col-sm-2 col-form-label">
              Trạng thái
            </label>
            <div className="col-sm-10">
              <select
                type="number"
                className="form-control"
                placeholder="Skills"
              >
                {this.getOptionSelectList(this.state.taskPriorityData)}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-sm-2 col-sm-10">
              <button type="submit" className="btn btn-danger">
                Lưu
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
