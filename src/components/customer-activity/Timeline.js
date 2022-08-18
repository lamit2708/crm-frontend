import React, { Component } from "react";
import moment from "moment";
import ActivityService from "../../services/activity.service";
import AuthService from "../../services/auth.service";

export default class Timeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todayLabel: moment().format("DD/MM/YYYY"),
      user: AuthService.getCurrentUser().id,
      customer: this.props.customer,
      activityData: null,
    };
    this.timelineBuilder = this.timelineBuilder.bind(this);
    this.showItemType = this.showItemType.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getAll();
    this.groupActivityByDate = this.groupActivityByDate.bind(this);
    this.timelineItemBody = this.timelineItemBody.bind(this);
  }
  groupActivityByDate(activities) {
    var result = {};
    activities.forEach(function (item, index) {
      var dateLabel = moment(item.created_date).format("DD/MM/YYYY");
      if (result[dateLabel] === undefined) result[dateLabel] = [item];
      else {
        result[dateLabel].push(item);
      }
    });
    return result;
  }
  getAll() {
    //console.log(this.state.customer);
    ActivityService.getAllBy(this.state.customer.id, this.state.user).then(
      (response) => {
        var activityData = this.groupActivityByDate(response.data);
        this.setState({ activityData: activityData });
      }
    );
  }
  showItemType(typeId) {
    var type = {
      1: "fas fa-tasks bg-info",
      2: "fas fa-clock bg-primary",
      3: "fas fa-cart-plus bg-purple",
      4: "far fa-credit-card bg-warning",
    };
    return type[typeId];
  }

  timelineItemBody(activities) {
    if (activities == null) return;
    return activities.map((el) => {
      return (
        <div>
          <i className={this.showItemType(el.activity_type)} />
          <div className="timeline-item">
            <span className="time">
              <i className="far fa-clock" />{" "}
              {moment(el.created_date).toString("DD-MM-YYYY HH:mm")}
            </span>
            <h3 className="timeline-header">{el.subject}</h3>
            <div className="timeline-body"></div>
            <div className="timeline-footer">
              <a
                data-toggle="tab"
                href={el.activity_type == 1 ? "#task" : "#"}
                className="btn btn-info btn-flat btn-sm"
              >
                View
              </a>
            </div>
          </div>
        </div>
      );
    });
  }
  timelineBuilder() {
    if (this.state.activityData == null) return;
    console.log(this.state.todayLabel);
    return Object.keys(this.state.activityData).map((key) => {
      var value = this.state.activityData[key];
      return (
        <React.Fragment>
          <div className="time-label">
            <span
              className={
                this.state.todayLabel == key ? "bg-danger" : "bg-success"
              }
            >
              {key}
            </span>
          </div>
          {this.timelineItemBody(value)}
        </React.Fragment>
      );
    });
  }
  render() {
    return (
      <div className="active tab-pane" id="timeline">
        <div className="timeline timeline-inverse">
          {this.timelineBuilder()}
          <div>
            <i className="far fa-clock bg-gray" />
          </div>
        </div>
      </div>
    );
  }
}
