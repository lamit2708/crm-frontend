import { Modal } from "react-bootstrap";
import React, { Component } from "react";
//import customerService from "../services/customer.service";

export default class ConfirmDeletePopup extends Component {
  constructor(props) {
    super(props);
    //this.handleConfirm = this.handleConfirm.bind(this);
  }

  // handleConfirm() {
  //   if (this.props.onConfirm != null) {
  //     customerService.delete(this.props.customerData.id).then((response) => {
  //       this.props.onDone();
  //     });
  //   }
  // else {
  //   this.props.onConfirm();
  // }
  //}

  render() {
    return (
      <Modal show={true} onHide={this.props.handleCancel}>
        <Modal.Header closeButton>
          <h4>{this.props.title}</h4>
        </Modal.Header>

        <Modal.Body>
          <p style={{ fontSize: "18px" }}>{this.props.body}</p>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="btn btn-secondary btn-sm pr-3 pl-3"
            onClick={this.props.handleCancel}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger btn-sm pr-3 pl-3 ml-5"
            onClick={this.props.handleConfirm}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
