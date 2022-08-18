import axios from "axios";
import * as URL from "./url.service";
//const API_URL_USER = URL.API_URL + "user/";
//const API_URL = "http://localhost:8000/api/user/";

class UserService {
  get() {
    return axios.get(URL.API_URL_USER);
  }
  search(keyword) {
    return axios.get(URL.API_URL_USER);
  }
}

export default new UserService();
