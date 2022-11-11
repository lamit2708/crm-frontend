import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/api/";

class UserService {
  // getPublicContent() {
  //   return axios.get(API_URL + "all");
  // }
  getPublicContent() {
    return axios.get(API_URL + "hello", { headers: authHeader() });
  }
  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();
