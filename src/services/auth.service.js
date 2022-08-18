import axios from "axios";
import * as URL from "./url.service";
const ROOT_URL = URL.ROOT_URL;
class AuthService {
  login(username, password, remember) {
    return axios
      .post(ROOT_URL + "api/token/", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.access) {
          localStorage.removeItem("user");
          localStorage.setItem(
            "user",
            JSON.stringify(
              Object.assign(response.data, { isremember: remember })
            )
          );
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(ROOT_URL + "signup", {
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
