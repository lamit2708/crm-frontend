import axios from "axios";
import * as URL from "./url.service";

class TaskService {
  getAll() {
    return axios.get(URL.API_URL_TASK);
  }
  getAllBy(client_id, user) {
    return axios.get(
      URL.API_URL_TASK + "?client_id=" + client_id + "&user=" + user
    );
  }
  getAllTaskType() {
    return axios.get(URL.API_URL_TASK_TYPE);
  }
  getAllTaskPriority() {
    return axios.get(URL.API_URL_TASK_PRIORITY);
  }
  getAllTaskStatus() {
    return axios.get(URL.API_URL_TASK_STATUS);
  }
  update(index, object) {
    return axios.put(URL.API_URL_TASK + index + "/", object);
  }

  delete(index) {
    return axios.delete(URL.API_URL_TASK + index + "/");
  }

  // search(keyword) {
  //   return axios.get(URL.API_URL_TASK + "?search=" + keyword);
  // }
  create(object) {
    return axios.post(URL.API_URL_TASK, object);
  }
}

export default new TaskService();
