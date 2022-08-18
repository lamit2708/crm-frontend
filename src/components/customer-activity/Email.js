import React, { Component } from "react";

export default class Email extends Component {
  render() {
    return (
      <div className="tab-pane" id="email">
        <form className="form-horizontal">
          <div className="col-md-12">
            <div className="card card-primary card-outline">
              <div className="card-header">
                <h3 className="card-title">Soạn thư mới</h3>
              </div>
              {/* /.card-header */}
              <div className="card-body">
                <div className="form-group">
                  <input className="form-control" placeholder="Đến:" />
                </div>
                <div className="form-group">
                  <input className="form-control" placeholder="Tiêu đề..." />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control w-100"
                    rows="10"
                    placeholder="Nhập nội dung..."
                    style={{ resize: "none" }}
                  />
                </div>
                <div className="form-group">
                  <div className="btn btn-default btn-file">
                    <i className="fas fa-paperclip" /> Đính kèm
                    <input type="file" name="attachment" />
                  </div>
                  <p className="help-block">Max. 32MB</p>
                </div>
              </div>
              {/* /.card-body */}
              <div className="card-footer">
                <div className="float-right">
                  <button type="button" className="btn btn-default mr-2">
                    <i className="fas fa-pencil-alt" /> Lưu nháp
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="far fa-envelope" /> Gửi
                  </button>
                </div>
                <button type="reset" className="btn btn-default">
                  <i className="fas fa-times" /> Bỏ qua
                </button>
              </div>
              {/* /.card-footer */}
            </div>
            {/* /.card */}
          </div>
        </form>
      </div>
    );
  }
}
