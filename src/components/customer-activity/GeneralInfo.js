import React, { Component } from "react";

export default class GeneralInfo extends Component {
  constructor(props) {
    super(props);
    console.log(props.customer);
  }

  render() {
    const { customClass } = this.props;
    return (
      <div
        className={
          customClass == null || customClass == undefined
            ? "col-md-3"
            : customClass
        }
      >
        {/* Profile Image */}
        <div className="card card-primary card-outline">
          <div className="card-body box-profile">
            <div className="text-center">
              <img
                className="profile-user-img img-fluid img-circle"
                src="./assets/img/user4-128x128.jpg"
                alt="User profile picture"
              />
            </div>
            <h3 className="profile-username text-center">
              {this.props.customer.fullname}
            </h3>
            <p className="text-muted text-center">
              {this.props.customer.job_title}
            </p>
            <p className="text-muted text-center">
              <b>Trạng thái</b>{" "}
              <a href="#" className="text-info">
                <u>{this.props.customer.customer_type_name}</u>
              </a>
            </p>
            <div className="row pt-3">
              <div className="col-3 text-center">
                <span className="btn bg-light btn-sm">
                  <i className="fas fa-tasks"></i>
                </span>
                <p className="text-muted text-center">Ghi</p>
              </div>
              {/* <div className="col-3 text-center">
                <span className="btn bg-light btn-sm">
                  <i className="fas fa-phone"></i>
                </span>
                <p className="text-muted text-center">Gọi</p>
              </div> */}
              {/* <div className="col-3 text-center">
                <span className="btn bg-light btn-sm">
                  <i className="fas fa-envelope-open-text"></i>
                </span>
                <p className="text-muted text-center">Email</p>
              </div> */}
              <div className="col-3 text-center">
                <span className="btn bg-light btn-sm">
                  <i className="far fa-calendar-alt"></i>
                </span>
                <p className="text-muted text-center">Hẹn</p>
              </div>
            </div>
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
        {/* About Me Box */}
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Thông tin chi tiết</h3>
          </div>
          {/* /.card-header */}
          <div className="pl-4 pr-4 pt-0 pb-0">
            <div className="border-bottom pb-2 pt-2">
              <strong>
                <i className="fas fa-phone pr-1" /> Số điện thoại
              </strong>
              <p className="text-muted pl-4">{this.props.customer.phone}</p>
            </div>

            <div className="border-bottom pb-2 pt-2">
              <strong>
                <i className="fas fa-envelope-open-text pr-1" /> Email
              </strong>
              <p className="text-muted pl-4">Chưa có</p>
            </div>

            <div className="border-bottom pb-2 pt-2">
              <strong>
                <i className="fas fa-street-view pr-1" /> Địa chỉ
              </strong>
              <p className="text-muted pl-4">{this.props.customer.address}</p>
            </div>

            {/* <div className="border-bottom pb-2 pt-2">
              <strong>
                <i className="fas fa-id-card pr-1" /> Số CMND/CMT
              </strong>
              <p className="text-muted pl-4">Chưa có</p>
            </div> */}

            <div className="border-bottom pb-2 pt-2">
              <strong>
                <i className="fas fa-laptop-code pr-1" /> Mã khách hàng
              </strong>
              <p className="text-muted pl-4">{this.props.customer.code}</p>
            </div>

            {/* <div className="border-bottom pb-2 pt-2">
              <strong>
                <i className="fas fa-users pr-1" /> Nhóm khách hàng
              </strong>
              <p className="text-muted pl-4">Tiềm năng</p>
            </div> */}
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </div>
    );
  }
}
