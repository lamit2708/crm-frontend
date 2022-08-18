import React, { Component } from "react";

export default class ContextMenuEvent extends Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.props.onClose();
  }

  render() {
    if (!this.props.show) return null;

    return (
      <ul
        className="calendar-menu"
        style={{
          position: "fixed",
          top: this.props.yPos,
          left: this.props.xPos,
          zIndex: 1000,
          fontSize: "0.8rem",
          boxShadow: "0 0.25rem 0.5rem rgba(0, 0, 0, 0.5)",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          borderRadius: "0.3rem",
        }}
      >
        <li
          className="border btn btn-light d-block"
          style={{
            borderBottomLeftRadius: "0",
            borderBottomRightRadius: "0",
          }}
          onClick={() => {
            this.props.onView();
          }}
        >
          Xem lịch hẹn
        </li>
        <li
          className="border btn d-block btn-light"
          style={{
            borderRadius: "0",
          }}
          onClick={() => {
            this.props.onEdit();
          }}
        >
          Sửa lịch hẹn
        </li>
        <li
          className="border btn d-block btn-light"
          style={{
            borderRadius: "0",
          }}
          onClick={() => {
            this.onClose();
            this.props.onDelete();
          }}
        >
          Xóa lịch hẹn
        </li>
        {/* <li
          className="border btn d-block btn-light"
          style={{
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0",
          }}
          onClick={() => {
            this.onClose();
            this.props.onViewHistory();
          }}
        >
          Xem lịch sử
        </li> */}
      </ul>
    );
  }
}
