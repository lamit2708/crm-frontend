import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/sass/styles.scss";
import ContextMenuEvent from "./ContextMenuEvent";
import EditCustomerPopup from "../popup/EditCustomerPopup";
import CtxViewEvent from "../popup/CtxViewEvent";
import CtxCreateEvent from "../popup/CtxCreateEvent";
import CtxEditEvent from "../popup/CtxEditEvent";
import CtxDeletePopup from "../popup/CtxDeletePopup";

// const events = [
//   {
//     id: 0,
//     title: "Board meeting",
//     start: new Date(2018, 0, 29, 9, 0, 0),
//     end: new Date(2018, 0, 29, 13, 0, 0),
//     resourceId: 1,
//   },
//   {
//     id: 1,
//     title: "MS training",
//     allDay: true,
//     start: new Date(2018, 0, 29, 14, 0, 0),
//     end: new Date(2018, 0, 29, 16, 30, 0),
//     resourceId: 2,
//   },
//   {
//     id: 2,
//     title: "Team lead meeting",
//     start: new Date(2018, 0, 29, 8, 30, 0),
//     end: new Date(2018, 0, 29, 12, 30, 0),
//     resourceId: 3,
//   },
//   {
//     id: 11,
//     title: "Birthday Party",
//     start: new Date(2018, 0, 30, 7, 0, 0),
//     end: new Date(2018, 0, 30, 10, 30, 0),
//     resourceId: 4,
//   },
// ];

// const resourceMap = [
//   { resourceId: 1, resourceTitle: "Board room" },
//   { resourceId: 2, resourceTitle: "Training room" },
//   { resourceId: 3, resourceTitle: "Meeting room 1" },
//   { resourceId: 4, resourceTitle: "Meeting room 2" },
// ];

//const globalizeLocalizer = momentLocalizer(moment);
const localizer = momentLocalizer(moment);
const dayFormat1 = "MM-DD" + " " + "星期" + "dd";
let formats = {
  timeGutterFormat: "HH:mm",
  eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
    localizer.format(start, "HH:mm", culture) +
    "-" +
    localizer.format(end, "HH:mm", culture),

  agendaDateFormat: "DD/MM/YYYY",
  agendaTimeRangeFormat: ({ start, end }, culture, localizer) =>
    localizer.format(start, "HH:mm", culture) +
    "-" +
    localizer.format(end, "HH:mm", culture),
  dayHeaderFormat: "DD/MM/YYYY",

  agendaHeaderFormat: ({ start, end }, culture, localizer) => {
    return (
      localizer.format(start, "DD/MM/YYYY", culture) +
      " - " +
      localizer.format(end, "DD/MM/YYYY", culture)
    );
  },
  // dayFormat: "DD/MM",
  // dayFormat: (date, culture, localizer) =>
  //   localizer.format(date, "DD-MM-YYYY", culture),
  // dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
  //   localizer.format(start, { date: "short" }, culture) +
  //   " — " +
  //   localizer.format(end, { date: "short" }, culture),
  // weekdayHeaderFormat: ({ start, end }, culture, localizer) =>
  //   localizer.format(start, "DD/MM/YYYY", culture) +
  //   " — " +
  //   localizer.format(end, "DD/MM/YYYY", culture),
};
export default class CalendarManage extends Component {
  constructor(props) {
    super(props);
    const defaultDate = this.props.defaultDate;
    this.state = {
      seletedIndex: null,
      showCtxMenu: false,
      xPosCtxM: null,
      yPosCtxM: null,
      selectEventHistory: [],
      selectEvent: null,
      selectSlot: null,
      showViewEvent: false,
      showCreateEvent: false,
      showEditEvent: false,
      showDeleteEvent: false,
      // defaultDate: this.props.defaultDate,
      minTime: new Date(
        defaultDate.getFullYear(),
        defaultDate.getMonth(),
        defaultDate.getDate(),
        8,
        0,
        0
      ),
      maxTime: new Date(
        defaultDate.getFullYear(),
        defaultDate.getMonth(),
        defaultDate.getDate(),
        21,
        0,
        0
      ),
    };
    this.getCtxMenu = this.getCtxMenu.bind(this);
    this.getDeleteEvent = this.getDeleteEvent.bind(this);
    this.onNavigate = this.onNavigate.bind(this);
    //this.trackSelectEvent = this.trackSelectEvent.bind(this);
  }
  // trackSelectEvent(identity_code) {
  //   //this.setState({ selectEvent: event });
  //   this.state.selectEventHistory.push(identity_code);
  // }
  onNavigate = (date, view) => {
    let start, end;

    if (view === "month") {
      start = moment(date).startOf("month").startOf("week");
      console.log(start);
      end = moment(date).endOf("month").endOf("week");
    }
    console.log("CHECKKKKK");
    console.log(start, end);

    return console.log({ start, end });
  };
  createFullEvent(event) {
    var resourceName = this.props.userData.find((u) => u.id == event.resourceId)
      .fullname;
    return Object.assign({}, event, { resourceName: resourceName });
  }

  getCreateEvent() {
    if (this.state.showCreateEvent) {
      return (
        <CtxCreateEvent
          show={this.state.showCreateEvent}
          onClose={() =>
            this.setState({ showCreateEvent: false, selectSlot: null })
          }
          onDone={() => {
            this.setState({
              showCreateEvent: false,
            });
            this.props.onDone();
          }}
          selectSlot={this.state.selectSlot}
        />
      );
    } else return null;
  }

  getViewEvent() {
    //console.log(this.state.selectEvent);
    if (this.state.showViewEvent) {
      return (
        <CtxViewEvent
          //eventData={this.state.selectEvent}
          show={this.state.showViewEvent}
          onClose={() => {
            this.setState({ showViewEvent: false, selectEvent: null });
            //this.trackSelectEvent("getViewEvent_NULL");
          }}
          selectEvent={this.state.selectEvent}
        />
      );
    } else return null;
  }

  getEditEvent() {
    console.log("EDITEvent");
    console.log(this.state.selectEvent);
    console.log(this.state.selectEventHistory);
    if (this.state.showEditEvent) {
      return (
        <CtxEditEvent
          //eventData={this.state.selectEvent}
          show={this.state.showEditEvent}
          onDone={() => {
            this.setState({
              showEditEvent: false,
            });
            this.props.onDone();
          }}
          onClose={() => {
            this.setState({ showEditEvent: false, selectEvent: null });
            //("getEditEvent_NULL");
          }}
          selectEvent={this.state.selectEvent}
        />
      );
    } else return null;
  }

  getDeleteEvent() {
    // console.log("DeleteEvent");
    // console.log(this.state.selectEvent);
    // console.log(this.state.selectEventHistory);

    if (this.state.showDeleteEvent) {
      return (
        <CtxDeletePopup
          visible={this.state.showDeleteEvent}
          onDone={() => {
            this.setState({ showDeleteEvent: false, selectEvent: null });
            this.props.onDone();
            //this.trackSelectEvent("getDeleteEvent_NULL");
          }}
          selectEvent={this.state.selectEvent}
          //title={"Xóa cuộc hẹn"}
          //body={message}
          //buttonText={"Xóa"}
          // onConfirm={() => {
          //   alert("Xóa cuộc hẹn");
          //   //todo delete
          // }}
        />
      );
    } else return null;
  }

  getCtxMenu() {
    if (this.state.showCtxMenu) {
      return (
        <ContextMenuEvent
          key={this.state.showCtxMenu}
          show={this.state.showCtxMenu}
          xPos={this.state.xPosCtxM}
          yPos={this.state.yPosCtxM}
          onClose={() => {
            // this.setState({ showCtxMenu: false, selectEvent: null });
            this.setState({ showCtxMenu: false });
            //this.trackSelectEvent("getCtxMenu_CLOSE_NULL");
          }}
          selectEvent={this.state.selectEvent}
          onView={() =>
            this.setState({ showViewEvent: true, showCtxMenu: false })
          }
          onEdit={() =>
            this.setState({ showEditEvent: true, showCtxMenu: false })
          }
          onDelete={() =>
            this.setState({ showDeleteEvent: true, showCtxMenu: false })
          }
        />
      );
    } else return null;
  }

  handleData = () => {
    var resourceMap = [];
    var events = [];
    this.props.userData.forEach((element) => {
      resourceMap.push({
        resourceId: element.id,
        resourceTitle: element.fullname,
      });
    });

    this.props.appointmentData.forEach((element) => {
      // console.log(element);
      events.push({
        id: element.id,
        title: element.customer_fullname + " - " + element.title,
        realTitle: element.title,
        start: new Date(element.start_date),
        end: new Date(element.end_date),
        resourceId: element.user,
        description: element.description,
        customer: element.customer,
        customerFullname: element.customer_fullname,
      });
    });
    // console.log(resourceMap);
    // console.log(events);
    return [resourceMap, events];
  };

  render() {
    //console.log(this.props.appointmentData);
    //return null;
    if (this.props.userData == null || this.props.appointmentData == null)
      return null;
    var rs = this.handleData();
    console.log(rs[1]);
    return (
      <div className="pl-2 pr-2 mb-4">
        {this.getCtxMenu()}
        {this.getViewEvent()}
        {this.getCreateEvent()}
        {this.getEditEvent()}
        {this.getDeleteEvent()}
        <Calendar
          // formats={{ dayFormat1 }}
          formats={formats}
          selectable
          events={rs[1]}
          localizer={localizer}
          defaultView={"day"}
          views={["week", "work_week", "day", "agenda"]}
          step={15}
          defaultDate={this.props.defaultDate}
          resources={rs[0]}
          resourceIdAccessor="resourceId"
          resourceTitleAccessor="resourceTitle"
          min={this.state.minTime}
          max={this.state.maxTime}
          startAccessor="start"
          endAccessor="end"
          onRangeChange={(selectRange) => {
            this.props.onHandleSelectRange(selectRange);
            //console.log(e);
          }}
          onSelectEvent={(event, e) => {
            // alert(
            //   "Từ " +
            //     event.start +
            //     " đến " +
            //     event.end +
            //     " có việc " +
            //     event.title
            // );
            this.setState({
              showCtxMenu: true,
              xPosCtxM: e.nativeEvent.screenX,
              yPosCtxM: e.nativeEvent.clientY,
              selectEvent: this.createFullEvent(event),
            });
            //this.trackSelectEvent("Calendar_setSelectEvent");
          }}
          onSelectSlot={(e) => {
            var resourceName = this.props.userData.find(
              (u) => u.id == e.resourceId
            ).fullname;
            if (this.state.showCtxMenu == true)
              this.setState({ showCtxMenu: false, selectEvent: null });
            else
              this.setState({
                showCreateEvent: true,
                selectSlot: Object.assign({}, e, {
                  resourceName: resourceName,
                }),
                showCtxMenu: false,
                selectEvent: null,
              });
          }}
        />
      </div>
    );
  }
}
