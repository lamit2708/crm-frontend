import axios from "axios";

const API_URL = "http://localhost:8080/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "api/token/obtain/", { username, password })
      .then((response) => {
        console.log(response.data);
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "api/user/create/", {
      username,
      email,
      password,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
