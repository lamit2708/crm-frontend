# Load data into Calendar step by step

## Create Service to call api

/user/appointment.service.js

```JS
const API_URL = "http://112.213.86.173:8000/api/";
const API_URL_APPOINTMENT = API_URL + "appointment/";

class AppointmentService {
  getAll() {
    return axios.get(API_URL + "appointment/");
  }
  getAllUser() {
    return axios.get(API_URL + "user/");
  }
  getFilterDate(from, to) {
    return axios.get(
      API_URL_APPOINTMENT +
        "?created_date_after=" +
        from +
        "&created_date_before=" +
        to
    );
  }
  update(index, object) {
    return axios.put(API_URL_APPOINTMENT + index + "/", object);
  }

  delete(index) {
    return axios.delete(API_URL_APPOINTMENT + index + "/");
  }

  search(keyword) {
    return axios.get(API_URL_APPOINTMENT + "?search=" + keyword);
  }
  create(object) {
    return axios.post(API_URL_APPOINTMENT, object);
  }
}

export default new AppointmentService();
```

## Create the function to call service on component and save into state

/page/CalendarPage.js

```JS
import AppointmentService from "../services/appointment.service";
export default class CalendarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentData: null, //data in state here
    };
    this.getAllAppointment = this.getAllAppointment.bind(this);
    this.getAllAppointment();
  }
  getAllAppointment() {
    AppointmentService.getAll().then((response) => {
      console.log(response.data);
      this.setState({
        appointmentData: response.data,
      });
    });
  }
}
```

## Send data from State into the child component

/page/CalendarPage.js

```JSX
<CalendarManage
// Rerender Calendar when userData or appointmentData changes their values
  key={[this.state.userData, this.state.appointmentData]}
  userData={this.state.userData}
  appointmentData={this.state.appointmentData}
/>

```

## Receive data from the father component

/page/CalendarManage.js

```JSX
export default class CalendarManage extends Component {

  handleData = () => {
    var resourceMap = [];
    var events = [];
    this.props.userData.forEach((element) => {
      resourceMap.push({
        resourceId: element.id,
        resourceTitle: element.username,
      });
    });

    this.props.appointmentData.forEach((element) => {
      events.push({
        id: element.id,
        title: element.title,
        start: new Date(element.from_date),
        end: new Date(element.to_date),
        resourceId: element.staff,
      });
    });
    return [resourceMap, events];
  };
```

## Assign data into the componenet

```JSX
 render() {
    if (this.props.userData == null || this.props.appointmentData == null)
      return null;
    var rs = this.handleData();
    return (
      <div className="pl-2 pr-2 mb-4">
        <Calendar
          selectable
          events={rs[1]} />
          </div>

```
