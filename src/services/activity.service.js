import axios from "axios";
import * as URL from "./url.service";

class ActivityService {
  getAll() {
    return axios.get(URL.API_URL_ACTIVITY);
  }
  getAllBy(client_id, created_user) {
    return axios.get(
      URL.API_URL_ACTIVITY +
        "?client_id=" +
        client_id +
        "&created_user=" +
        created_user
    );
  }
  getAllActivityType() {
    return axios.get(URL.API_URL_ACTIVITY_TYPE);
  }

  update(index, object) {
    return axios.put(URL.API_URL_ACTIVITY + index + "/", object);
  }

  delete(index) {
    return axios.delete(URL.API_URL_ACTIVITY + index + "/");
  }

  // search(keyword) {
  //   return axios.get(URL.API_URL_TASK + "?search=" + keyword);
  // }
  create(object) {
    return axios.post(URL.API_URL_ACTIVITY, object);
  }
}

export default new ActivityService();
