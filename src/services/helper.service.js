import axios from "axios";
import * as URL from "./url.service";

class HelperSevices {
  getDepartments() {
    return axios.get(URL.API_URL + "department/");
  }
  getJobTitles() {
    return axios.get(URL.API_URL + "job-title/");
  }
  getStaffGroups() {
    return axios.get(URL.API_URL + "staff-group/");
  }
  getCustomerSources() {
    return axios.get(URL.API_URL + "customer-source/");
  }
  getCustomerTypes() {
    return axios.get(URL.API_URL + "customer-type/");
  }
}

export default new HelperSevices();
