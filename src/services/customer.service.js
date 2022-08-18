import axios from "axios";
import * as URL from "./url.service";
//const API_URL_TRANSFER = "http://112.213.86.173:8000/api/customer-transfer/";
//const API_URL_CUSTOMER = "http://112.213.86.173:8000/api/customer/";

class CustomerService {
  getAll() {
    return axios.get(URL.API_URL_TRANSFER);
  }
  getAllCustomer() {
    return axios.get(URL.API_URL_CUSTOMER + "?customer_type=2");
  }
  getAllLead() {
    return axios.get(URL.API_URL_CUSTOMER + "?customer_type=1");
  }
  getCustomerFilterDate(from, to) {
    return axios.get(
      URL.API_URL_CUSTOMER +
        "?customer_type=1" +
        "&created_date_after=" +
        from +
        "&created_date_before=" +
        to
    );
  }
  getLeadFilterDate(from, to) {
    return axios.get(
      URL.API_URL_CUSTOMER +
        "?customer_type=2" +
        "&created_date_after=" +
        from +
        "&created_date_before=" +
        to
    );
  }
  updateTransfer(index, content) {
    return axios.put(URL.API_URL_TRANSFER + index + "/", content);
  }
  updateCustomer(index, content) {
    return axios.put(URL.API_URL_CUSTOMER + index + "/", content);
  }
  deleteTransfer(index) {
    return axios.delete(URL.API_URL_TRANSFER + index + "/");
  }
  delete(index) {
    return axios.delete(URL.API_URL_CUSTOMER + index + "/");
  }
  createTransfer(content) {
    return axios.post(URL.API_URL_TRANSFER, content);
  }
  search(keyword) {
    return axios.get(URL.API_URL_CUSTOMER + "?search=" + keyword);
  }
  create(obj) {
    return axios.post(URL.API_URL_CUSTOMER, obj);
  }
  getCustomerByCode(code) {
    return axios.get(URL.API_URL_CUSTOMER + "?code=" + code);
  }
  getLastCustomer() {
    return axios.get(URL.API_URL_CUSTOMER + "?last_code=1");
  }
}

export default new CustomerService();
