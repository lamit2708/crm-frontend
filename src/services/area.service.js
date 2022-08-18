import axios from "axios";
import * as URL from "./url.service";

class AreaSevices {
  getProvinces() {
    return axios.get(URL.API_URL + "province/");
  }
  getDistricts(idProvince) {
    return axios.get(URL.API_URL + "province/" + idProvince + "/district/");
  }
  getWards(idDistrict) {
    return axios.get(URL.API_URL + "district/" + idDistrict + "/ward/");
  }
}

export default new AreaSevices();
