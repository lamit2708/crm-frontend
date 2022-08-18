import axios from "axios";
import * as URL from "./url.service";
//const API_URL_TRANSFER = "http://112.213.86.173:8000/api/customer-transfer/";
//const API_URL_CUSTOMER = "http://112.213.86.173:8000/api/customer/";

class StaffService {
  getAll() {
    return axios.get(URL.API_URL_STAFF);
  }

  update(index, content) {
    return axios.put(URL.API_URL_STAFF + index + "/", content);
  }

  delete(index) {
    return axios.delete(URL.API_URL_STAFF + index + "/");
  }
  create(item) {
    return axios.post(URL.API_URL_STAFF, item);
  }
  search(keyword) {
    return axios.get(URL.API_URL_STAFF + "?search=" + keyword);
  }
}

export default new StaffService();
