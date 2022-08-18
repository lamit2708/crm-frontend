import axios from "axios";
import * as URL from "./url.service";

class AppointmentService {
  getAll() {
    return axios.get(URL.API_URL_APPOINTMENT);
  }
  getAllUser() {
    return axios.get(URL.API_URL_USER);
  }
  getFilterDate(from, to) {
    return axios.get(
      URL.API_URL_APPOINTMENT +
        "?created_date_after=" +
        from +
        "&created_date_before=" +
        to
    );
  }
  update(index, object) {
    return axios.put(URL.API_URL_APPOINTMENT + index + "/", object);
  }

  delete(index) {
    return axios.delete(URL.API_URL_APPOINTMENT + index + "/");
  }

  search(keyword) {
    return axios.get(URL.API_URL_APPOINTMENT + "?search=" + keyword);
  }
  create(object) {
    return axios.post(URL.API_URL_APPOINTMENT, object);
  }
}

export default new AppointmentService();
