import axios from "axios";
import * as URL from "./url.service";

//const API_URL = "http://112.213.86.173:8000/api/customer-transfer-history/";

class TransferHistoryService {
  getAll(from, to) {
    return axios.get(
      URL.API_URL_TRANSFER_HISTORY +
        "?transfer_user_after=" +
        from +
        "&transfer_date_before=" +
        to
    );
  }
}

export default new TransferHistoryService();
