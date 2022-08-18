import React, { Component } from "react";
import { Link } from "react-router-dom";

class Widget extends Component {
  constructor(props) {
    super(props);
  }

  colorToCode(value) {
    switch (value) {
      case "red":
        return "bg-danger";
      case "green":
        return "bg-success";
      case "blue":
        return "bg-info";
      case "yellow":
        return "bg-warning";
    }
  }

  render() {
    return (
      <div className={"col-lg-" + 12 / this.props.numCol + " col-6"}>
        <Link
          to={this.props.data.linkTo}
          className={"small-box " + this.colorToCode(this.props.data.color)}
        >
          <div className="inner col-lg-9 col-12">
            <h6>{this.props.data.title}</h6>
            {/* <p style={{ color: "white" }}>{this.props.data.des}</p> */}
          </div>
          <div className="icon">
            <i className={this.props.data.icon} />
          </div>
          <p href="#" className="small-box-footer">
            {this.props.data.footer}&nbsp;{" "}
            <i className={this.props.data.footerIcon} />
          </p>
        </Link>
      </div>
    );
  }
}

export default class GroupWidget extends Component {
  constructor(props) {
    super(props);
  }

  getRowWidget(dataGroup) {
    const numCol = dataGroup.numCol;
    const dataWidgets = dataGroup.dataWidgets;
    const listItems = dataWidgets.map((item, idx) => (
      <Widget key={idx} data={item} numCol={numCol} />
    ));
    return listItems;
  }

  getFlexibleHeader(dataGroup) {
    if (dataGroup.numCol > 9) {
      return (
        <h5>
          <i className={this.props.data.icon} />
          &nbsp;{this.props.data.groupName}
        </h5>
      );
    } else if (dataGroup.numCol > 5) {
      return (
        <h3>
          <i className={this.props.data.icon} />
          &nbsp;{this.props.data.groupName}
        </h3>
      );
    } else {
      return (
        <h6>
          <i className={this.props.data.icon} />
          &nbsp;{this.props.data.groupName}
        </h6>
      );
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div group={this.props.data.groupName}>
          <div
            id={this.props.data.machineName}
            title={this.props.data.groupName}
            style={{
              borderBottom: "1px solid black",
              marginTop: "20px",
              marginBottom: "20px",
              display: "inline-block",
            }}
          >
            {this.getFlexibleHeader(this.props.data)}
          </div>
          <div className="row">{this.getRowWidget(this.props.data)}</div>
        </div>
      </div>
    );
  }
}
